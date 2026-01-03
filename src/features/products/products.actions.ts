"use server";

import { ProductSelect, ProductsFilters } from "./product.type";
import { createClient } from "@/lib/supabase/server";

export async function getProducts({ searchTerm, category, sizes, colors, priceRange, sortBy, brand, page = 1 }: ProductsFilters = {}) {
	const supabase = await createClient();

	let productIds: string[] = [];
	let fetchOnIds = false;

	if (colors?.length) {
		const { data: productColors } = await supabase
			.from("colors")
			.select(`
				*,
				product_colors!inner(id, product_id, color_id)
			`)
			.in("name", colors || []);

		if (productColors?.length) {
			let colorIds = productColors?.map(proColor => {
				return proColor.product_colors.map((c: { id: number; color_id: number; product_id: any; }) => {
					return c.product_id;
				});
			});

			if (colorIds?.length) {
				colorIds = colorIds.toString().split(",");
				productIds = !productIds.length ? colorIds : productIds.filter(pid => colorIds.includes(pid));
			}
		}

		fetchOnIds = true;
	}

	if (sizes?.length) {
		const { data: productSizes } = await supabase
			.from("sizes")
			.select(`
				*,
				product_sizes!inner(id, product_id, size_id)
			`)
			.in("name", sizes || []);

		if (productSizes?.length) {
			let sizeIds = productSizes?.map(proSize => {
				return proSize.product_sizes.map((c: { id: number; size_id: number; product_id: any; }) => {
					return c.product_id;
				});
			})

			if (sizeIds?.length) {
				sizeIds = sizeIds.toString().split(",");
				productIds = !productIds.length ? sizeIds : productIds.filter(pid => sizeIds.includes(pid));
			}
		}

		fetchOnIds = true;
	}

	let query = supabase
		.from("products")
		.select(`
			*,
			category:categories!inner(id,name,display_name),
			brand:brands!inner(id,name,display_name)
		`, { count: "exact" })


	if (sortBy) {
		if (sortBy === "oldest") {
			query.order("created_at", { ascending: true });
		}
		if (sortBy === "newest") {
			query.order("created_at", { ascending: false });
		}
		if (sortBy === "price_lowest") {
			query.order("price", { ascending: true });
		}
		if (sortBy === "price_highest") {
			query.order("price", { ascending: false });
		}
		if (sortBy === "category") {
			query.order("category(name)", { ascending: false });
		}
		if (sortBy === "brand") {
			query.order("brand(id)", { ascending: false });
		}
	} else {
		query.order("created_at", { ascending: false });
	}

	if (fetchOnIds) {
		query.in("id", productIds);
	}

	if (searchTerm?.trim()) {
		query.ilike("title", `%${searchTerm}%`);
	}

	if ((priceRange?.from || priceRange?.from === 0) && priceRange?.to) {
		query.gte("price", priceRange.from).lte("price", priceRange.to);
	}

	if (category && category !== "all") {
		query.eq("categories.name", category);
	}

	if (brand && brand !== "all") {
		query.eq("brands.name", brand);
	}

	const { count: totalProducts } = await query;

	const perPage = 2;
	const totalPages = Math.ceil(totalProducts! / perPage);
	const from = (page - 1) * perPage;
	const to = from + perPage - 1;

	query
		.range(from, to);

	const { data: products, error } = await query
		.overrideTypes<Array<ProductSelect>>();

	return { products, error, page, totalPages, totalData: totalProducts!, from, to };
}

export async function getProduct(id: number | string) {
	const supabase = await createClient();

	const { data: pro, error } = await supabase.from("products")
		.select(`
			*,
			category:categories!inner(id, name, display_name),
			brand:brands!inner(id,name,display_name),
			subImages:product_subimages!inner(id, image_url),
			cart:carts(*)
		`)
		.eq("id", id)
		.single<ProductSelect & { cart: { id: number; product_id: number; user_id: number; quantity: number; created_at: string }[], subImages: { id: number; image_url: string; }[] }>()


	const { data: proColors } = await supabase
		.from("colors")
		.select(`
			*,
			product_colors!inner(*)
		`)
		.eq("product_colors.product_id", pro!.id);


	const { data: proSizes } = await supabase
		.from("sizes")
		.select(`
			*,
			product_sizes!inner(*)
			`)
		.eq("product_sizes.product_id", pro!.id);

	return { pro, colors: proColors, sizes: proSizes, error };
}

export async function getRelatedProducts({ productId, categoryId }: { productId: number | string, categoryId: number | string }) {
	const supabase = await createClient();

	const { data: relatedProducts, error } = await supabase
		.from("products")
		.select(`
			*,
			category:categories!inner(id, name, display_name),
			brand:brands!inner(id,name,display_name)
		`)
		.eq("category_id", categoryId)
		.neq("id", productId)
		.overrideTypes<Array<ProductSelect>>()

	console.log(relatedProducts)


	return { relatedProducts, error }
}