import { getCart } from "@/features/carts/carts.actions"
import CartViewList from "@/features/carts/components/CartViewList";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/shared/components/ui/item";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React from 'react'

export default async function CartPage() {
	const { cart, error } = await getCart();

	let totalItemsCount = 0;
	let totalPay = 0;

	cart?.forEach(item => {
		totalItemsCount += item.quantity

		totalPay += item.product.price * item.quantity;
	})

	const onCheckout = () => {

	}

	return (
		<div className="page">
			<div className="inner-section grid xl:grid-cols-2 grid-cols-1 gap-8">
				<CartViewList cart={cart || []} />
				<Card className="py-8">
					<CardHeader>
						<SectionHeader title="Payment Info" className="mb-4" />
					</CardHeader>

					<CardContent className="space-y-8">
						<div>
							<Item className="px-0">
								<ItemContent className="flex flex-row items-center justify-between max-w-max gap-3">
									<ItemTitle className="text-xl">Total Items</ItemTitle>
									<ItemDescription className="text-2xl">{totalItemsCount}</ItemDescription>
								</ItemContent>
							</Item>
							<Item className="px-0">
								<ItemContent className="flex flex-row items-center justify-between max-w-max gap-3">
									<ItemTitle className="text-xl">Total Discount</ItemTitle>
									<ItemDescription className="text-2xl">0%</ItemDescription>
								</ItemContent>
							</Item>
							<Item className="px-0">
								<ItemContent className="flex flex-row items-center justify-between max-w-max gap-3">
									<ItemTitle className="text-xl">Total Price</ItemTitle>
									<ItemDescription className="text-2xl text-primary">{Intl.NumberFormat("en-us", {
										currency: "USD",
										style: "currency"
									}).format(totalPay)}</ItemDescription>
								</ItemContent>
							</Item>
						</div>

						<Button size="lg" className="text-lg py-6 px-10">Checkout</Button>
					</CardContent>

				</Card>
			</div>
		</div>
	)
}
