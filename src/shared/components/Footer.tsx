"use client";

import React from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { IconBrandInstagram, IconBrandTelegram, IconBrandX, IconBrandYoutube, IconMail, IconPhone, IconSend } from "@tabler/icons-react";

export default function Footer() {
	return (
		<footer className="mt-20 pt-20 pb-10 bg-card">
			<div className="inner-section flex flex-col items-center gap-20">
				<div className="flex items-center gap-4 md:flex-row flex-col w-full">
					<div className="flex-1">
						<h2 className="text-xl mb-1">Subscribe Newsletter</h2>
						<p className="text-muted-foreground text-sm">
							Get updates by subscribing our newsletter quickly
						</p>
					</div>

					<form onSubmit={e => e.preventDefault()} className="flex flex-1">
						<Input className="py-6 px-4 rounded-none outline-none! border-none! ring-0!" placeholder="Enter your email address" />
						<Button className="py-6 px-4 rounded-none border-none">Subscribe</Button>
					</form>
				</div>

				<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 w-full">

					<div>
						<h2 className="text-lg mb-3">Quick Shop</h2>

						<ul className="flex flex-col gap-3 text-muted-foreground text-sm">
							<li><a href="#">New In</a></li>
							<li><a href="#">Men</a></li>
							<li><a href="#">Women</a></li>
							<li><a href="#">T-Shirts</a></li>
							<li><a href="#">Shirts</a></li>
							<li><a href="#">Dresses</a></li>
						</ul>
					</div>

					<div>
						<h2 className="text-lg mb-3">Useful Links</h2>

						<ul className="flex flex-col gap-3 text-muted-foreground text-sm">
							<li><a href="#">My Account</a></li>
							<li><a href="#">My WishList</a></li>
							<li><a href="#">Term & Conditions</a></li>
							<li><a href="#">Privacy Policy</a></li>
							<li><a href="#">Shop</a></li>
							<li><a href="#">About Us</a></li>
						</ul>
					</div>

					<div>
						<h2 className="text-lg mb-3">Contact Us</h2>

						<ul className="flex flex-col gap-4 text-muted-foreground text-sm">
							<li className="inline-flex items-center gap-2">
								<span><IconPhone /></span>
								<span>
									Got a question? Call us 24/7
									<br />
									(365) 8635 56 - 24-02
								</span>
							</li>

							<li className="inline-flex items-center gap-2">
								<span><IconSend /></span>
								<span>268 Orchard St, Mahattan, 12005, CA, United State</span>
							</li>

							<li className="inline-flex items-center gap-2">
								<span><IconMail /></span>
								<span>contact @norda.com</span>
							</li>

							<li className="inline-flex items-center gap-2">
								<span><a href="#"><IconBrandX /></a></span>
								<span><a href="#"><IconBrandTelegram /></a></span>
								<span><a href="#"><IconBrandInstagram /></a></span>
								<span><a href="#"><IconBrandYoutube /></a></span>
							</li>
						</ul>
					</div>

				</div>

				<div className="w-full flex items-center justify-between md:flex-row flex-col-reverse gap-7">
					<p className="text-muted-foreground text-sm md:max-w-sm">Copyright © 2022 HasThemes | Built with Norda by HasThemes.</p>
					<img src="/assets/images/payment.webp" alt="payments" />
				</div>
			</div>

		</footer>
	)
}
