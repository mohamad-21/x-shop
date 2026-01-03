import { createClient } from "@/lib/supabase/server";
import SectionHeader from "@/shared/components/SectionHeader";
import ProductItem from "./ProductItem";
import { ProductSelect } from "../product.type";
import { toast } from "sonner";
import { addToCart } from "@/features/carts/carts.actions";

export default async function ProductsOverview() {
	const supabase = await createClient();
	const { data: products, error } = await supabase.from("products").select(`
		*,
		category:categories(id, name, display_name),
		brand:brands(id,name,display_name)
	`).overrideTypes<Array<ProductSelect>>();

	const { data: { user } } = await supabase.auth.getUser();

	return (
		<div>
			<SectionHeader title="Latest Products" href="/shop" />
			<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
				{products?.map(pro => (
					<ProductItem pro={pro} user={user} key={pro.id} />
				))}
			</div>
		</div>
	)
}
