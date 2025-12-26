"use client";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { IconMenu, IconSearch, IconShoppingCart, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";

export default function Header() {
	const [isActiveSearching, setIsActiveSearching] = useState(false);

	useEffect(() => {
		if (isActiveSearching) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isActiveSearching]);

	return (
		<>
			<div className="flex items-center justify-center py-3 bg-primary">
				<p className="text-sm">Free shipping worldwide for orders over $199</p>
			</div>
			<header className="py-6 flex items-center justify-center sticky top-0 left-0 right-0 bg-background/60 backdrop-blur-md z-10">
				<nav className="flex items-center justify-between gap-5 inner-section">
					<Link href="/">X SHOP</Link>

					<ul className="md:flex hidden items-center gap-5">
						{navLinks.map(link => (
							<NavigationMenu key={link.href}>
								<li>
									{link.haveSubLinks ? (
										<NavigationMenuList>
											<NavigationMenuItem>
												<NavigationMenuTrigger className="bg-transparent px-0! hover:bg-transparent! data-open:bg-transparent! data-open:hover:bg-transparent! focus:bg-transparent! data-open:focus:bg-transparent!">{link.title}</NavigationMenuTrigger>
												<NavigationMenuContent>
													<ul className="w-[200px] space-y-1 text-lg">
														{link.subLinks?.map(subLink => (
															<li key={subLink.href}>
																<Link className="text-sm px-3 py-3 hover:bg-muted w-full flex rounded-lg" href={subLink.href}>
																	{subLink.title}
																</Link>
															</li>
														))}
													</ul>
												</NavigationMenuContent>
											</NavigationMenuItem>
										</NavigationMenuList>
									) : (
										<Link href={link.href} key={link.href}>{link.title}</Link>
									)}
								</li>
							</NavigationMenu>
						))}
					</ul>

					<form className="md:hidden max-[630px]:hidden flex relative flex-1">
						<Input className="py-5 h-0! px-4 pr-12 w-full text-sm" placeholder="Search products" />
						<IconSearch size={17} className="absolute top-1/2 right-5 -translate-y-1/2" />
					</form>

					<div className="flex items-center gap-5">
						<button className="md:flex hidden" onClick={() => setIsActiveSearching(true)}>
							<IconSearch />
						</button>
						<button>
							<IconUser />
						</button>
						<button>
							<IconShoppingCart />
						</button>
						<button className="md:hidden flex">
							<IconMenu />
						</button>
					</div>
				</nav>
			</header>

			<div className={cn("fixed inset-0 bg-[#09090b]/70 backdrop-blur-md flex items-center justify-center inner-section z-10 duration-300", `${isActiveSearching ? "opacity-100 top-0" : "opacity-0 -translate-y-full"}`)}>
				<div className="absolute inset-0" onClick={() => setIsActiveSearching(false)} />
				<form className="flex relative flex-1 max-w-md">
					<Input className="py-9 px-7 pr-12 w-full text-base! bg-background!" placeholder="Search products" autoFocus />
					<IconSearch size={22} className="absolute top-1/2 right-8 -translate-y-1/2" />
				</form>
			</div>
		</>
	)
}