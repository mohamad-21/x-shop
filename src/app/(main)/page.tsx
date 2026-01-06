import Banner from "@/features/home/components/Banner";
import ShoppingFeatures from "@/features/home/components/ShoppingFeatures";
import ProductsOverviewWrapper from "@/features/products/components/ProductsOverviewWrapper";

export default function HomePage() {
	return (
		<div className="w-full space-y-32">
			<Banner />
			<div className="inner-section flex flex-col gap-32">
				<ShoppingFeatures />
				<ProductsOverviewWrapper />

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