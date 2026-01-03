"use client";

import { addToCart } from "@/features/carts/carts.actions";
import { ProductSelect } from "@/features/products/product.type";
import { Button } from "@/shared/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { User } from "@supabase/supabase-js";
import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
	pro: ProductSelect;
	user: User | null;
}

export default function ProductItem({ pro, user }: Props) {
	// const [productIsLiked, setProductIsLiked] = useState(false);
	const [isPending, startTransition] = useTransition();

	// const onLikeProduct = () => {
	// 	setProductIsLiked(!productIsLiked);
	// }

	const onAddToCart = async () => {
		startTransition(async (): Promise<any> => {
			if (!user) return toast.error("You should to login for using cart");

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
					<Link href={`/shop?cat=${pro.category?.name}`} className="text-primary">{pro.category?.display_name}</Link>
				)}
				<Link href={`/pro/${pro.id}`}><CardTitle>{pro.title}</CardTitle></Link>
			</CardContent>
			<CardFooter className="mt-auto justify-between flex-wrap-reverse gap-4 px-4">
				<CardAction className="space-x-3">
					<Button variant="outline" size="lg" onClick={onAddToCart} disabled={isPending}>
						Add To Cart
					</Button>
					{/* <Button variant={productIsLiked ? "destructive" : "outline"} size="icon-lg" onClick={onLikeProduct} disabled={isPending}>
						<IconHeart className={`${productIsLiked ? "text-red-500 fill-red-500" : ""}`} />
					</Button> */}
				</CardAction>
				<CardDescription className="text-base">{Intl.NumberFormat("en-us", {
					style: "currency",
					currency: "USD"
				}).format(pro.price)}</CardDescription>
			</CardFooter>
		</Card>
	)
}
