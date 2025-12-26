"use client";

import { colorsClasses } from "@/lib/constants";
import { Button } from "@/shared/components/ui/button";
import { ProductSelect } from "../product.type";
import { IconHeart, IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { ImageZoom } from "@/components/animate-ui/primitives/effects/image-zoom";

type Props = {
	pro: ProductSelect & { subImages: { id: number; image_url: string; }[] };
	colors: any[];
	sizes: any[];
}

export default function ProductView({ pro, colors, sizes }: Props) {
	const [activeImageIdx, setActiveImageIdx] = useState(0);
	const [totalInCart, setTotalInCart] = useState(0);

	const images = [pro.image_url, ...pro.subImages.map(i => i.image_url)];

	return (
		<div className="inner-section space-y-28">
			<div className="flex lg:flex-row flex-col gap-8 gap-y-18">
				<div className="flex flex-col gap-3">
					<div className="w-full">
						<ImageZoom>
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
					<p className="text-primary">{pro.category.display_name}</p>

					<div className="space-y-3">
						<h2 className="text-2xl">{pro.title}</h2>
						<p className="text-muted-foreground text-sm">{pro.brand.display_name}</p>
					</div>

					<div className="space-y-3">
						<h3 className="text-xl">Colors</h3>

						<div className="flex gap-3">
							{colors.map(color => (
								<button className={`w-7 h-7 border border-border ${colorsClasses[color.name]}`} key={color.id}></button>
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

					<p className="text-2xl">{Intl.NumberFormat("en-us", {
						currency: "USD",
						style: "currency"
					}).format(pro.price)}</p>

					<div className="flex items-center gap-3 justify-between">
						{totalInCart > 0 ? (
							<div className="flex items-center space-x-4">
								<div className="space-x-2">
									<button className="text-muted-foreground" onClick={() => setTotalInCart(prev => prev - 1)}><IconMinus size={20} /></button>
									<button className="text-muted-foreground" onClick={() => setTotalInCart(prev => prev + 1)}><IconPlus size={20} /></button>
								</div>

								<div className="mb-1.5 text-lg">{totalInCart}</div>
							</div>
						) : (
							<Button size="lg" className="text-base p-6 font-bold" onClick={() => setTotalInCart(prev => prev + 1)}>Add To Cart</Button>
						)}
						<button><IconHeart className="hover:fill-red-500 hover:text-red-500" size={30} /></button>
					</div>

				</div>
			</div>

			<div className="space-y-7">
				<h2 className="text-2xl">Description</h2>

				<p className="whitespace-pre-line text-muted-foreground">{pro.description}</p>
			</div>
		</div>
	)
}
