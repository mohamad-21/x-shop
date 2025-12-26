import ProductView from "@/features/products/components/ProductView";
import { getProduct } from "@/features/products/products.actions";
import { notFound } from "next/navigation";
import React from 'react'

export default async function ProductPage({ params }: PageProps<"/pro/[id]">) {
	const { id } = await params;

	const { pro, colors, sizes, error } = await getProduct(id);

	if (error) {
		notFound();
	}

	return (
		<div className="page">
			<ProductView pro={pro!} sizes={sizes!} colors={colors!} />
		</div>
	)
}
