import { getCart } from "@/features/carts/carts.actions"
import CartCheckout from "@/features/carts/components/CartCheckout";
import CartViewList from "@/features/carts/components/CartViewList";
import { UserSelect } from "@/features/user/user.types";
import { createClient } from "@/lib/supabase/server";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/shared/components/ui/item";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import React from 'react'

export default async function CartPage() {
	const { cart, error } = await getCart();
	const supabase = await createClient();

	const { data: { user: session } } = await supabase.auth.getUser();

	if (!session) return redirect("/auth/login");

	const { data: user } = await supabase
		.from("users")
		.select("*")
		.eq("uid", session.id)
		.single<UserSelect>();

	return (
		<div className="page">
			<div className="inner-section grid xl:grid-cols-2 grid-cols-1 gap-8">
				<CartViewList cart={cart || []} />
				<CartCheckout user={user} cart={cart || []} />
			</div>
		</div>
	)
}
