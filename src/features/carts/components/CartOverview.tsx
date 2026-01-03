import { ProductSelect } from "@/features/products/product.type"
import React, { useEffect, useState, useTransition } from 'react'
import CartItem from "./CartItem";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { getCart } from "../carts.actions";
import { createClient } from "@/lib/supabase/client";
import { CartItemsSelect } from "../cart.types";
import { Spinner } from "@/shared/components/ui/spinner";
import { UserSelect } from "@/features/user/user.types";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

type Props = {
	user: UserSelect | null;
}

export default function CartOverview({ user }: Props) {
	const [cartItems, setCartItems] = useState<CartItemsSelect[]>([]);
	const [isPending, startTransition] = useTransition();
	const supabase = createClient();

	const getCartItems = () => {
		startTransition(async () => {
			console.log(user);
			if (!user) return;

			const { data } = await supabase
				.from("carts")
				.select(`
					*,
					product:products(*)	
				`)
				.eq("user_id", user.uid)
				.overrideTypes<Array<CartItemsSelect>>();

			if (data) {
				setCartItems(data);
			}
		})
	}

	const onCartItemRemove = () => {
		getCartItems();
	}

	useEffect(() => {
		getCartItems();
	}, []);


	return (
		<ScrollArea className="py-4 px-3 flex flex-col max-h-[80dvh]">
			<div className="flex items-center justify-between gap-4 mb-6">
				<h2 className="text-xl">Cart</h2>
				<div className="text-muted-foreground">{cartItems.length} items</div>
			</div>

			<div className="flex flex-col gap-3">
				{isPending ? (
					<div className="py-6 flex justify-center">
						<Spinner />
					</div>
				) : (
					<>
						{cartItems.map(item => (
							<CartItem pro={item.product} quantity={item.quantity} user={user} key={item.id} onDelete={onCartItemRemove} />
						))}
					</>
				)}
			</div>

			<Link href="/cart" className="block">
				<Button className="mt-7 w-full" size="lg">View Cart</Button>
			</Link>
		</ScrollArea>
	)
}
