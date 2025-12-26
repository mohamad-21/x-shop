"use client";

import { ProductSelect } from "@/features/products/product.type";
import { Button } from "@/shared/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
	pro: ProductSelect
}

export default function ProductItem({ pro }: Props) {
	const [productIsLiked, setProductIsLiked] = useState(false);
	const [isAddedToCart, setIsAddedToCart] = useState(false);

	const onLikeProduct = () => {
		setProductIsLiked(!productIsLiked);
	}

	const onAddToCart = () => {
		setIsAddedToCart(!isAddedToCart);
	}

	return (
		<Card key={pro.id} className="pt-0">
			<CardHeader className="relative px-0 mt-0">
				<Link href={`/pro/${pro.id}`}>
					<img src={pro.image_url} alt={pro.title} className="rounded-y-xl" />
				</Link>
				<p className="absolute bottom-2 left-2 bg-black/40 py-2 px-3 text-xs rounded-full">{pro.brand.display_name}</p>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 px-4">
				<Link href={`/cat/${pro.category.name}`} className="text-primary">{pro.category.display_name}</Link>
				<Link href={`/pro/${pro.id}`}><CardTitle>{pro.title}</CardTitle></Link>
			</CardContent>
			<CardFooter className="mt-auto justify-between flex-wrap-reverse gap-4 px-4">
				<CardAction className="space-x-3">
					<Button variant={isAddedToCart ? "ghost" : "outline"} size="lg" onClick={onAddToCart} className={isAddedToCart ? "" : ""}>
						{isAddedToCart ? "Remove from cart" : "Add To Cart"}
					</Button>
					<Button variant={productIsLiked ? "destructive" : "outline"} size="icon-lg" onClick={onLikeProduct}>
						<IconHeart className={`${productIsLiked ? "text-red-500 fill-red-500" : ""}`} />
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
