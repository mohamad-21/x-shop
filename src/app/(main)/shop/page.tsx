import MainShopping from "@/features/products/components/MainShopping";
import { getProducts } from "@/features/products/products.actions";
import { createClient } from "@/lib/supabase/server";
import WrapperSpinner from "@/shared/components/ui/WrapperSpinner";
import { Suspense } from "react";

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
	const params = await searchParams;

	const allowedSorts = ["price_lowest", "price_highest", "category", "brand", "newest", "oldest"];

	const colors = params?.color?.toString().split(",") || [];
	const sizes = params?.size?.toString().split(",") || [];
	const sortBy = allowedSorts.includes(params?.sortby as string) ? (params?.sortby as string) : undefined;
	const currentPage = parseInt(params?.page as string) || 1;
	const priceFrom = parseInt(params?.price_from as string);
	const priceTo = parseInt(params?.price_to as string);
	const priceRange = (priceFrom || priceFrom === 0) && priceTo ? {
		from: priceFrom,
		to: priceTo
	} : undefined;

	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	const { products, error, page, from, to, totalPages, totalData } = await getProducts({
		searchTerm: params?.s as string,
		category: params?.cat as string,
		brand: params?.brand as string,
		colors,
		sizes,
		sortBy,
		page: currentPage,
		priceRange,
	});

	const pagination = {
		page: currentPage,
		totalPages: totalPages,
		from: from,
		to: to,
		totalData: totalData
	}

	return (
		<div className="page">
			<Suspense fallback={<WrapperSpinner />}>
				<MainShopping
					products={products!}
					pagination={pagination}
					user={user}
				/>
			</Suspense>
		</div>
	)
}