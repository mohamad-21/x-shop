import { Database } from "@/lib/supabase/database.types";
import { ProductSelect } from "../products/product.type";

export type CartItemsSelect = Database["public"]["Tables"]["carts"]["Row"] & {
	product: ProductSelect
}