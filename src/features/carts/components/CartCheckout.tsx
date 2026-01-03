"use client";

import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/shared/components/ui/item";
import { CartItemsSelect } from "../cart.types";
import { UserSelect } from "@/features/user/user.types";
import { toast } from "sonner";
import { useTransition } from "react";
import { removeAllFromCart } from "../carts.actions";

type Props = {
	cart: CartItemsSelect[];
	user: UserSelect | null;
}

export default function CartCheckout({ user, cart }: Props) {
	const [isPending, startTransition] = useTransition();

	let totalItemsCount = 0;
	let totalPrice = 0;

	cart?.forEach(item => {
		totalItemsCount += item.quantity

		totalPrice += item.product.price * item.quantity;
	})

	const onCheckout = async () => {
		startTransition(async () => {
			if ((!cart.length)) {
				toast.error("Your cart is empty. what do you want to checkout? you're stupid??");
				return;
			}

			if ((!user?.address || !user.country || !user.city)) {
				toast.error("Update your address info before checkout in profile settings");
				return;
			}

			// clear cart like the user placed order & has been checked out 
			// because this project is front-end portfolio & i implemented standard backend & database design when i'm coding front-end portfolio & backend things doesn't matter at this level.
			// so lets pretend everything is normal & user's money hasn't wasted out
			await removeAllFromCart(user.uid);

			toast.success("Your order placed & checked out successfully")
		})

	}

	return (
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
							}).format(totalPrice)}</ItemDescription>
						</ItemContent>
					</Item>

					<div className="mt-8">

						<Item className="px-0">
							<ItemContent className="flex flex-col max-w-md gap-3">
								<ItemTitle className="text-xl">Country</ItemTitle>
								<ItemDescription className="text-xl">{user?.country || "NA"}</ItemDescription>
							</ItemContent>
						</Item>

						<Item className="px-0">
							<ItemContent className="flex flex-col max-w-md gap-3">
								<ItemTitle className="text-xl">City</ItemTitle>
								<ItemDescription className="text-xl">{user?.city || "NA"}</ItemDescription>
							</ItemContent>
						</Item>

						<Item className="px-0">
							<ItemContent className="flex flex-col max-w-md gap-3">
								<ItemTitle className="text-xl">Address</ItemTitle>
								<ItemDescription className="text-xl">{user?.address || "NA"}</ItemDescription>
							</ItemContent>
						</Item>

						{(!user?.address || !user.country || !user.city) && (
							<p className="text-xl mt-6 text-red-400">Update your address info in profile settings before checkout</p>
						)}
					</div>
				</div>

				<Button size="lg" className="text-lg py-6 px-10" disabled={(!user?.address || !user.country || !user.city) || isPending || !cart.length} onClick={onCheckout}>Checkout</Button>
			</CardContent>

		</Card>
	)
}
