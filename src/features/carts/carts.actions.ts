"use server";

import { createClient } from "@/lib/supabase/server";
import { CartItemsSelect } from "./cart.types";
import { revalidatePath } from "next/cache";

export async function getCart() {
	const supabase = await createClient();

	const { data: { user } } = await supabase.auth.getUser();

	if (!user) return { cart: [], error: null };

	const { data: cart, error } = await supabase
		.from("carts")
		.select(`
			*,
			product:products(*)
		`)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false })
		.overrideTypes<Array<CartItemsSelect>>();

	return { cart, error };
}

export async function addToCart(productId: number, userId: string, quantity: number) {
	const supabase = await createClient();

	const { data: cart, count, error } = await supabase
		.from("carts")
		.select("*", { count: "exact" })
		.eq("user_id", userId)
		.eq("product_id", productId)
		.single();

	if (count! > 0) {
		const res = await supabase
			.from("carts")
			.update({ quantity: cart.quantity + quantity })
			.eq("id", cart.id)
			.select()

		return;
	};

	const res = await supabase
		.from("carts")
		.insert({ product_id: productId, user_id: userId, quantity });

	return res;
}

export async function removeFromCart(productId: number, userId: string, decrease: boolean = false) {
	const supabase = await createClient();

	const { data: cart, error } = await supabase
		.from("carts")
		.select("*", { count: "exact" })
		.eq("user_id", userId)
		.eq("product_id", productId)
		.single();
	console.log(cart, error);


	if (decrease && cart.quantity > 1) {
		const res = await supabase
			.from("carts")
			.update({ quantity: cart.quantity - 1 })
			.eq("product_id", productId)
			.eq("user_id", userId)
			.select()

		console.log(res);

		return;
	}
	const res = await supabase
		.from("carts")
		.delete()
		.eq("id", cart.id)
		.eq("user_id", userId)
		.select()

	console.log(res);

}

export async function removeAllFromCart(userId: string) {
	const supabase = await createClient();

	await supabase
		.from("carts")
		.delete()
		.eq("user_id", userId)

	revalidatePath("/cart");

}