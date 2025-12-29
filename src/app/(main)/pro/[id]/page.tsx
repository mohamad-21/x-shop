import ProductView from "@/features/products/components/ProductView";
import { getProduct, getRelatedProducts } from "@/features/products/products.actions";
import { notFound } from "next/navigation";
import React from 'react'

export default async function ProductPage({ params }: PageProps<"/pro/[id]">) {
	const { id } = await params;

	const { pro, colors, sizes, error } = await getProduct(id);

	if (!pro) {
		notFound();
	}

	const { relatedProducts, error: relatedProsError } = await getRelatedProducts({ productId: id, categoryId: pro!.category_id, colorId: colors![0].id });

	if (error || relatedProsError) {
		throw new Error(error?.message || relatedProsError?.message);
	}

	return (
		<div className="page">
			<ProductView
				pro={pro!}
				sizes={sizes!}
				colors={colors!}
				relatedProducts={relatedProducts}
			/>
		</div>
	)
}
