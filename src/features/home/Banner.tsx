import React from 'react'
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"

export default function Banner() {
	return (
		<div className="flex items-center justify-between md:flex-row flex-col-reverse gap-6 w-full max-w-4xl mx-auto">
			<div className="flex flex-col gap-5 md:max-w-sm">
				<p className="text-primary">New Arrival</p>
				<h2 className="md:text-5xl sm:text-4xl text-3xl md:leading-14">
					Basic Thick Knit T-Shirt
				</h2>
				<p className="text-sm text-muted-foreground leading-6">
					Men's basic coat with a high lapel collar and side packets with button fastening
				</p>
				<Link href="/shop">
					<Button size="lg" className="text-base py-6 px-5">Shop Now</Button>
				</Link>
			</div>

			<div>
				<img src="https://htmldemo.net/norda/norda/assets/images/slider/hm-3-slider-1.png" alt="banner" />
			</div>

		</div>
	)
}
