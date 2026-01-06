import { createClient } from "@/lib/supabase/server";
import { ProductSelect } from "../product.type";
import ProductItem from "./ProductItem";

export default async function ProductsOverview() {
	const supabase = await createClient();
	const { data: products, error } = await supabase.from("products").select(`
		*,
		category:categories(id, name, display_name),
		brand:brands(id,name,display_name)
	`).overrideTypes<Array<ProductSelect>>();

	const { data: { user } } = await supabase.auth.getUser();

	return (
		<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
			{products?.map(pro => (
				<ProductItem pro={pro} user={user} key={pro.id} />
			))}
		</div>
	)
}

