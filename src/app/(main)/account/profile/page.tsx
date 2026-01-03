import React from 'react'
import AccountProfile from "./AccountProfilePage"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export default async function page() {
	const supabase = await createClient();

	const { data: { user: userSession } } = await supabase.auth.getUser();

	if (!userSession) {
		return redirect("/auth/login");
	}

	const { data: user } = await supabase
		.from("users")
		.select("*")
		.eq("uid", userSession.id)
		.single()

	return (
		<div className="page">
			<AccountProfile user={user} />
		</div>
	)
}
