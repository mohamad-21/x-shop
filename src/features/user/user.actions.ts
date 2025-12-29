"use server";

import { createClient } from "@/lib/supabase/server";
import * as bcrypt from "bcrypt-ts";
import { revalidatePath } from "next/cache";
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

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();

	revalidatePath("/");
	redirect("/");
}