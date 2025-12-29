import { Database } from "@/lib/supabase/database.types";

export type ProductSelect = Database["public"]["Tables"]["products"]["Row"] & {
	category?: {
		id: number;
		name: string;
		display_name: string;
	}
	brand?: {
		id: number;
		name: string;
		display_name: string;
	}
};

export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export interface ProductsFilters {
	searchTerm?: string;
	priceRange?: {
		from: number;
		to: number
	}
	category?: string;
	brand?: string;
	colors?: string[];
	sizes?: string[];
	sortBy?: string;
	page?: number;
}

export type Color = Database["public"]["Tables"]["colors"]["Row"];
export type Size = Database["public"]["Tables"]["sizes"]["Row"];
