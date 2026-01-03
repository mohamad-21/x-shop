"use client";

import { addToCart, getCart, removeFromCart } from "@/features/carts/carts.actions"
import SectionHeader from "@/shared/components/SectionHeader";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useState, useTransition } from 'react'
import { CartItemsSelect } from "../cart.types";
import { useRouter } from "next/navigation";
import { Spinner } from "@/shared/components/ui/spinner";

type Props = {
	cart: CartItemsSelect[];
}

export default function CartViewList({ cart }: Props) {
	const [updatingId, setUpdatingId] = useState(-99);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onAddToCart = (id: number) => {
		setUpdatingId(id);
		startTransition(async () => {
			await addToCart(id, cart[0].user_id, 1);
			router.refresh();
			setUpdatingId(-99);
		})
	}

	const onRemoveFromCart = (id: number, decrease: boolean = true) => {
		setUpdatingId(id);
		startTransition(async () => {
			await removeFromCart(id, cart[0].user_id, decrease);
			router.refresh();
			setUpdatingId(-99);
		})
	}

	return (
		<Card className="py-8">
			<CardHeader>
				<SectionHeader title="Your Cart" className="mb-4" />
			</CardHeader>

			<CardContent className="flex flex-col gap-4">
				{cart.length > 0 ? cart.map(item => (
					<div className={`relative flex items-center gap-4 justify-between bg-background rounded-xl overflow-hidden pr-3 max-w-max `} key={item.id}>

						<div className="flex items-center gap-3 relative">
							<div className="max-w-[120px]">
								<img src={item.product.image_url} alt={item.product.title} />
							</div>

							<div className="py-4 px-6">
								<h2 className="xl:text-base text-xl mb-2 max-w-xs">{item.product.title} - {item.quantity}X</h2>
								<div className="flex items-center gap-3">
									<p className="text-base text-muted-foreground">{Intl.NumberFormat("en-us", {
										currency: "USD",
										style: "currency"
									}).format(item.product.price)}</p>

									<div className="space-x-2 mt-2">
										<button className="text-muted-foreground" onClick={() => onRemoveFromCart(item.product_id)} disabled={isPending}><IconMinus size={24} /></button>
										<button className="text-muted-foreground" onClick={() => onAddToCart(item.product_id)} disabled={isPending}><IconPlus size={24} /></button>
									</div>
								</div>
							</div>
						</div>
						<button onClick={() => onRemoveFromCart(item.product_id, false)}><IconTrash size={23} className="text-red-500" /></button>

						{isPending && (updatingId === item.product_id) && (
							<div className="absolute inset-0 bg-background/60 flex items-center justify-center z-20">
								<Spinner className="size-6" />
							</div>
						)}
					</div>
				)) : (
					<h2 className="text-xl text-muted-foreground">There is no any products in your cart.</h2>
				)}
			</CardContent>
		</Card>
	)
}
