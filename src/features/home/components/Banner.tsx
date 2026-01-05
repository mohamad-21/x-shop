import { BackgroundBeamsWithCollision } from "@/shared/components/ui/background-beams-with-collision"
import { HoverBorderGradient } from "@/shared/components/ui/hover-border-gradient"
import Link from "next/link"

const images = [
	"https://htmldemo.net/norda/norda/assets/images/slider/hm-3-slider-1.png", "https://htmldemo.net/norda/norda/assets/images/slider/hm-3-slider-3.png"
]

export default function Banner() {

	return (
		<BackgroundBeamsWithCollision className="h-auto! md:h-auto!">
			<div className="flex items-center justify-between md:flex-row flex-col-reverse inner-section max-w-4xl! gap-10 py-20 md:pb-0">
				<div className="flex flex-col gap-8 md:max-w-sm">
					<p className="text-primary">New Arrival</p>
					<h2 className="md:text-5xl sm:text-4xl text-3xl md:leading-14">
						Basic Thick Knit T-Shirt
					</h2>
					<p className="text-sm text-muted-foreground leading-6">
						Men's basic coat with a high lapel collar and side packets with button fastening
					</p>
					<Link href="/shop">
						<HoverBorderGradient className="bg-background">
							Shop Now
						</HoverBorderGradient>
					</Link>
				</div>

				<div className="flex">
					<img src={images[Math.floor(Math.random() * images.length)]} className="w-[260px]" alt="banner" />
				</div>
			</div>
		</BackgroundBeamsWithCollision>
	)
}
