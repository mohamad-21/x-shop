"use client";

import ProductItem from "@/features/products/components/ProductItem";
import { brandOptions, categoriesOptions, colors, sizes, sortOptions } from "@/lib/constants";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Slider } from "@/shared/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { ProductSelect } from "../product.type";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shared/components/ui/pagination";
import { User } from "@supabase/supabase-js";

type Props = {
	products: ProductSelect[];
	pagination: {
		totalPages: number;
		page: number;
		from: number;
		to: number;
		totalData: number;
	}
	user: User | null;
}

export default function MainShopping({ products, pagination: { page, from, to, totalPages, totalData }, user }: Props) {
	const searchParams = useSearchParams();
	const [priceRange, setPriceRange] = useState([0, 100000]);
	const [searchTerm, setSearchTerm] = useState(searchParams.get("s") || "");
	const [title, setTitle] = useState(`Showing ${from + 1}-${to + 1} of ${totalData} results`);
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const selectedColors = searchParams.getAll("color");
	const selectedSizes = searchParams.getAll("size");

	const defaultCatValue = categoriesOptions.some(cat => cat.value === searchParams.get("cat")) ? searchParams.get("cat")! : "";
	const defaultBrandValue = brandOptions.some(brand => brand.value === searchParams.get("brand")) ? searchParams.get("brand")! : "";
	const defaultSortValue = sortOptions.some(sort => sort.value === searchParams.get("sortby")) ? searchParams.get("sortby")! : "";

	const onFilterColor = (color: string, checked: string | boolean) => {
		const params = new URLSearchParams(searchParams);

		if (!checked) {
			params.delete("color", color);
		} else {
			params.append("color", color);
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	const onFilterSize = (size: string, checked: string | boolean) => {
		const params = new URLSearchParams(searchParams);

		if (!checked) {
			params.delete("size", size);
		} else {
			params.append("size", size);
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	const onFilterCategory = (value: string) => {
		const params = new URLSearchParams(searchParams);

		if (!value.trim() || value === "all") {
			params.delete("cat")
		} else {
			params.set("cat", value);
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	const onFilterBrand = (value: string) => {
		const params = new URLSearchParams(searchParams);

		if (!value.trim() || value === "all") {
			params.delete("brand")
		} else {
			params.set("brand", value);
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	const onSearchSubmit = (e: FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams);

		if (!searchTerm) {
			params.delete("s")
		} else {
			if (params.has("page")) {
				params.delete("page");
			}
			params.set("s", searchTerm);
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	const onSortChange = (value: string) => {
		const params = new URLSearchParams(searchParams);

		if (!value.trim() || value === "default") {
			params.delete("sortby")
		} else {
			params.set("sortby", value);
		}

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	const onClearFilters = () => {
		router.replace(pathname, { scroll: false });
	}

	const onSelectPage = (num: number) => {
		if (num > totalPages || num < 1) return;
		const params = new URLSearchParams(searchParams);
		params.set("page", num as unknown as string);
		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		});
	}

	const onUpdatePriceRange = () => {
		const params = new URLSearchParams(searchParams);
		params.set("price_from", priceRange[0] as unknown as string);
		params.set("price_to", priceRange[1] as unknown as string);

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		})
	}

	useEffect(() => {
		if (!products.length) {
			setTitle("No results founded");
		} else {
			setTitle(`Showing ${from + 1}-${to + 1} of ${totalData} results`);
		}
	}, [products]);

	useEffect(() => {
		setSearchTerm(searchParams.get("s") || "");
	}, [searchParams.get("s")]);

	return (
		<div className="inner-section flex lg:flex-row flex-col-reverse gap-7 gap-y-20">
			<div className="flex-1 max-w-lg">
				<SectionHeader title="Filter Results" className="items-start" />

				<div className="space-y-10">
					<form onSubmit={onSearchSubmit}>
						<Input
							className="py-6"
							placeholder="Search here..."
							value={searchTerm}
							disabled={isPending}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</form>

					<div className="space-y-3">
						<h3 className="text-xl mb-4">Price</h3>
						<Slider
							min={0}
							max={100000}
							value={priceRange}
							disabled={isPending}
							onValueChange={setPriceRange}
						/>
						<p className="text-muted-foreground text-sm">
							${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
						</p>

						<Button className="px-4 mt-2" onClick={onUpdatePriceRange} disabled={isPending}>Update</Button>
					</div>

					<div>
						<h3 className="text-xl mb-4">Category</h3>

						<Select onValueChange={onFilterCategory} defaultValue={defaultCatValue} disabled={isPending}>
							<SelectTrigger>
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent className="w-32.5">
								{categoriesOptions.map(item => (
									<SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<h3 className="text-xl mb-4">Brand</h3>

						<Select onValueChange={onFilterBrand} defaultValue={defaultBrandValue} disabled={isPending}>
							<SelectTrigger>
								<SelectValue placeholder="Brand" />
							</SelectTrigger>
							<SelectContent className="w-32.5">
								{brandOptions.map(item => (
									<SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<h3 className="text-xl mb-4">Color</h3>

						<div className="space-y-3 flex flex-col">
							{colors.map(color => (
								<div className="inline-flex items-center gap-2" key={color}>
									<Checkbox name={color} id={color} onCheckedChange={e => onFilterColor(color, e)} checked={selectedColors.some(c => c === color)} disabled={isPending} />
									<label className="capitalize" htmlFor={color}>{color}</label>
								</div>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-xl mb-4">Size</h3>

						<div className="space-y-3 flex flex-col">
							{sizes.map(size => (
								<div className="inline-flex items-center gap-2" key={size}>
									<Checkbox name={size} id={size} onCheckedChange={e => onFilterSize(size, e)} checked={selectedSizes.some(s => s === size)} disabled={isPending} />
									<label className="uppercase" htmlFor={size}>{size}</label>
								</div>
							))}
						</div>
					</div>

					<Button onClick={onClearFilters} disabled={isPending}>Clear Filters</Button>

				</div>
			</div>

			<div className="w-full flex-3">
				<SectionHeader title={title}>
					<Select name="sortby" onValueChange={onSortChange} defaultValue={defaultSortValue} disabled={isPending}>
						<SelectTrigger className="w-32.5">
							<SelectValue placeholder="Sort By" />
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map(item => (
								<SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</SectionHeader>

				<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
					{products?.map(pro => (
						<ProductItem pro={pro} user={user} key={pro.id} />
					))}
				</div>

				{products?.length > 0 && (
					<Pagination>
						<PaginationContent className="mt-16 space-x-1 mr-auto">
							{Array.from({ length: totalPages }).map((val, idx) => (
								<PaginationItem key={idx}>
									<Button variant={page === idx + 1 ? "default" : "outline"} size="icon-lg" className="text-base" onClick={() => onSelectPage(idx + 1)} disabled={isPending} key={idx}>{idx + 1}</Button>
								</PaginationItem>
							))}
							<PaginationItem className="ml-3">
								<Button variant="outline" size="lg" disabled={page === 1 || isPending}>
									<PaginationPrevious onClick={() => onSelectPage(page - 1)} />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button variant="outline" size="lg" disabled={page === totalPages || isPending}>
									<PaginationNext onClick={() => onSelectPage(page + 1)} />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}
			</div>
		</div>
	)
}
