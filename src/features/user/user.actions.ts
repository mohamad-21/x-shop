"use server";

import { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import * as bcrypt from "bcrypt-ts";
import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type SignupProps = {
	name?: string;
	email: string;
	password: string;
}

export async function signUp({ name, email, password }: SignupProps) {
	const supabase = await createClient();
	const { count: exists } = await supabase
		.from("users")
		.select("*", { count: "exact" })
		.eq("email", email);

	if (exists) return { data: null, error: { message: "User with this email already exsists" } }

	const hashedPassword = bcrypt.hashSync(password);

	const { data, error } = await supabase.auth.signUp({
		email,
		password
	});

	if (!error && data.user) {
		const { data: signupData, error: signupError } = await supabase
			.from("users")
			.insert({ uid: data.user.id, name, email, hashed_password: hashedPassword })
			.select();
		return { data: signupData, error: signupError };
	} else {
		return { error, data };
	}

}

export async function signIn(email: string, password: string) {

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	return { data, error };
}

export async function updateProfile(id: number | string, profile: Database["public"]["Tables"]["users"]["Update"]) {
	const supabase = await createClient();

	const res = await supabase
		.from("users")
		.update(profile)
		.eq("id", id);

	revalidatePath("/account/profile");

	// revalidatePath and refresh and even router.refresh (in client) doesn't updated UI
	redirect("/account/profile");

	return res;
}

export async function updatePassword(id: number | string, currentPassword: string, newPassword: string) {
	const supabase = await createClient();

	const { data: user } = await supabase
		.from("users")
		.select("*", { count: "exact" })
		.eq("id", id)
		.single();

	const match = await bcrypt.compare(currentPassword, user.hashed_password);

	if (!match) {
		return { error: { message: "current password is not correct" } };
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	const res1 = await supabase.auth.updateUser({ password: newPassword });

	if (res1.error) {
		return res1;
	}

	const res2 = await supabase
		.from("users")
		.update({ hashed_password: hashedPassword })
		.eq("id", id);

	revalidatePath("/account/profile");

	return res2;
}


export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();

	revalidatePath("/");
	redirect("/");
}