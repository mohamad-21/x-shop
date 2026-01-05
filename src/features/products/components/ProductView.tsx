"use client";

import { colorsClasses } from "@/lib/constants";
import { Button } from "@/shared/components/ui/button";
import { ProductSelect } from "../product.type";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState, useTransition } from "react";
import { ImageZoom } from "@/shared/components/ui/image-zoom";
import ProductItem from "./ProductItem";
import SectionHeader from "@/shared/components/SectionHeader";
import { addToCart, removeFromCart } from "@/features/carts/carts.actions";
import { Spinner } from "@/shared/components/ui/spinner";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

type Props = {
	pro: ProductSelect & { cart: { id: number; product_id: number; user_id: number; quantity: number; created_at: string }[], subImages: { id: number; image_url: string; }[] };
	colors: any[];
	sizes: any[];
	relatedProducts: ProductSelect[] | null;
	user: User | null;
}

export default function ProductView({ pro, colors, sizes, relatedProducts, user }: Props) {
	const [activeImageIdx, setActiveImageIdx] = useState(0);
	const [totalInCart, setTotalInCart] = useState(pro.cart.find(item => item.product_id === pro.id)?.quantity || 0);
	const [isPending, startTransition] = useTransition();

	const images = [pro.image_url, ...pro.subImages.map(i => i.image_url)];

	const onAddToCart = () => {
		if (!user?.id) {
			toast.error("You need be logged in to using cart");
			return;
		};
		startTransition(async () => {
			await addToCart(pro.id, user.id, 1);
			setTotalInCart(prev => prev + 1);
		})
	}

	const onRemoveFromCart = () => {
		if (!user?.id) {
			toast.error("You need be logged in to using cart");
			return;
		};
		startTransition(async () => {
			await removeFromCart(pro.id, user.id, true);
			setTotalInCart(prev => prev - 1);
		})
	}

	return (
		<div className="inner-section space-y-28">
			<div className="flex lg:flex-row flex-col gap-8 gap-y-18">
				<div className="flex flex-col gap-3">
					<div className="w-full">
						<ImageZoom className="max-w-max">
							<img src={images[activeImageIdx]} className="object-cover max-w-full" alt={pro.title} />
						</ImageZoom>
					</div>

					<div className="flex gap-3">
						{images.map((image, idx) => (
							<button className={`${idx === activeImageIdx ? "hidden" : "block"}`} onClick={() => setActiveImageIdx(idx)} key={image}>
								<img src={image} width={80} alt={pro.title} />
							</button>
						))}
					</div>
				</div>

				<div className="space-y-6">
					<p className="text-primary">{pro.category?.display_name}</p>

					<div className="space-y-3">
						<h2 className="text-2xl">{pro.title}</h2>
						<p className="text-muted-foreground text-sm">{pro.brand?.display_name}</p>
					</div>

					<p className="text-2xl">{Intl.NumberFormat("en-us", {
						currency: "USD",
						style: "currency"
					}).format(pro.price)}</p>

					<div className="space-y-3">
						<h3 className="text-xl">Colors</h3>

						<div className="flex gap-3">
							{colors.map(color => (
								<button className={`w-9 h-9 rounded-sm border border-border ${colorsClasses[color.name]}`} key={color.id}></button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<h3 className="text-xl">Sizes</h3>

						<div className="flex gap-3">
							{sizes.map(size => (
								<Button variant="outline" className="p-2 bg-muted border border-border" key={size.id}>{size.name?.toUpperCase()}</Button>
							))}
						</div>
					</div>

					<div className="flex items-center gap-3 justify-between">
						<div className="flex items-center space-x-4">
							{isPending && totalInCart > 0 && (
								<Spinner />
							)}
							{totalInCart > 0 && (
								<>
									<div className="space-x-2">
										<button className="text-muted-foreground" onClick={onRemoveFromCart} disabled={isPending}><IconMinus size={24} /></button>
										<button className="text-muted-foreground" onClick={onAddToCart} disabled={isPending}><IconPlus size={24} /></button>
									</div>

									<div className="mb-1.5 text-xl">{totalInCart}</div>
								</>
							)}
							<Button size="lg" className="text-base p-6 font-bold" onClick={onAddToCart} disabled={isPending || totalInCart > 0}>
								{isPending && totalInCart < 1 ?
									<>
										<Spinner />
										Adding
									</>
									:
									"Add To Cart"}
							</Button>
						</div>
					</div>

				</div>
			</div>

			<div className="space-y-7">
				<h2 className="text-2xl">Description</h2>

				<p className="whitespace-pre-line text-muted-foreground">{pro.description}</p>
			</div>

			<div>
				<SectionHeader title="Related Products" />
				<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
					{relatedProducts?.map(pro => (
						<ProductItem pro={pro} user={user} key={pro.id} />
					))}
				</div>
			</div>
		</div>
	)
}
