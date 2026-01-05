import SectionHeader from "@/shared/components/SectionHeader";
import { Suspense } from "react";
import ProductsOverview from "./ProductsOverview";
import WrapperSpinner from "@/shared/components/ui/WrapperSpinner";

export default async function ProductsOverviewWrapper() {
	return (
		<div>
			<SectionHeader title="Latest Products" href="/shop" />
			<Suspense fallback={<WrapperSpinner />}>
				<ProductsOverview />
			</Suspense>
		</div>
	)
}

