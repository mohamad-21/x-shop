import { createClient } from "@/lib/supabase/server";
import Header from "./Header";
import { UserSelect } from "@/features/user/user.types";

export default async function HeaderWrapper() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();
	const { data: profile } = await supabase.from("users").select("(id, name, email, created_at)").eq("email", user?.email).single<UserSelect>();

	return <Header user={profile} />
}
