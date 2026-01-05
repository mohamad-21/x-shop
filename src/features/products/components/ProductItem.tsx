"use client";

import { addToCart } from "@/features/carts/carts.actions";
import { ProductSelect } from "@/features/products/product.type";
import { Button } from "@/shared/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Spinner } from "@/shared/components/ui/spinner";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
	pro: ProductSelect;
	user: User | null;
}

export default function ProductItem({ pro, user }: Props) {
	const [isPending, startTransition] = useTransition();

	const onAddToCart = async () => {
		startTransition(async (): Promise<any> => {
			if (!user) return toast.error("You need be logged in to using cart");

			const res = await addToCart(pro.id, user.id, 1);

			if (res?.error) {
				return toast.error(`Error in adding to cart: ${res.error.message}`);
			}
			toast.success("Product added to your cart.")
		})
	}

	return (
		<Card key={pro.id} className="pt-0">
			<CardHeader className="relative px-0 mt-0">
				<Link href={`/pro/${pro.id}`}>
					<img src={pro.image_url} alt={pro.title} className="rounded-y-xl" />
				</Link>
				{pro.brand && (
					<p className="absolute bottom-2 left-2 bg-black/40 py-2 px-3 text-xs rounded-full">{pro.brand.display_name}</p>
				)}
			</CardHeader>
			<CardContent className="flex flex-col gap-4 px-4">
				{pro.category && (
					<Link href={`/shop?cat=${pro.category?.name}`} className="text-muted-foreground">{pro.category?.display_name}</Link>
				)}
				<Link href={`/pro/${pro.id}`}><CardTitle>{pro.title}</CardTitle></Link>
			</CardContent>
			<CardFooter className="mt-auto justify-between flex-wrap-reverse gap-4 px-4">
				<CardAction className="space-x-3">
					<Button size="lg" onClick={onAddToCart} disabled={isPending}>
						{isPending ? (
							<><Spinner /> Adding</>
						) : (
							"Add To Cart"
						)}
					</Button>
				</CardAction>
				<CardDescription className="text-base">{Intl.NumberFormat("en-us", {
					style: "currency",
					currency: "USD"
				}).format(pro.price)}</CardDescription>
			</CardFooter>
		</Card>
	)
}
