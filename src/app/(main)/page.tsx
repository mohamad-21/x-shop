import Banner from "@/features/home/Banner";
import ProductsOverview from "@/features/products/components/ProductsOverview";
import ShoppingFeatures from "@/features/home/ShoppingFeatures";

export default function HomePage() {
	return (
		<div className="w-full">
			<div className="inner-section flex flex-col gap-20">
				<Banner />
				<ShoppingFeatures />
				<ProductsOverview />

				<div className="flex flex-wrap justify-evenly gap-10 py-20">
					<img src="/assets/images/brand-logo-1.webp" alt="brand logo" />
					<img src="/assets/images/brand-logo-2.webp" alt="brand logo" />
					<img src="/assets/images/brand-logo-3.webp" alt="brand logo" />
					<img src="/assets/images/brand-logo-4.webp" alt="brand logo" />
					<img src="/assets/images/brand-logo-5.webp" alt="brand logo" />
					<img src="/assets/images/brand-logo-6.webp" alt="brand logo" />
				</div>
			</div>
		</div>
	)
}