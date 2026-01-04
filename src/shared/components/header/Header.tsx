"use client";

import CartOverview from "@/features/carts/components/CartOverview";
import { logout } from "@/features/user/user.actions";
import { UserSelect } from "@/features/user/user.types";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { IconMenu, IconSearch, IconShoppingCart, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Sidebar from "./Sidebar";

type Props = {
	user: UserSelect | null;
}

export default function Header({ user }: Props) {
	const [isActiveSearching, setIsActiveSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [openSidebar, setOpenSidebar] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();


	const onSearchSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!searchTerm.trim()) return;

		startTransition(() => {
			router.push(`/shop?s=${searchTerm}`);
			if (isActiveSearching) setIsActiveSearching(false);
		});
	}

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
							<NavigationMenu key={link.title}>
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

					<form className="md:hidden max-[630px]:hidden flex relative flex-1" onSubmit={onSearchSubmit}>
						<Input className="py-5 h-0! px-4 pr-12 w-full text-sm" placeholder="Search products" disabled={isPending} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
						<IconSearch size={17} className="absolute top-1/2 right-5 -translate-y-1/2" />
					</form>

					<div className="flex items-center gap-5">
						<button className="md:flex hidden" onClick={() => setIsActiveSearching(true)}>
							<IconSearch />
						</button>
						{!user ? (
							<Link href="/auth/login">
								<IconUser />
							</Link>
						) : (
							<DropdownMenu>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">{user.name}</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="">
										<DropdownMenuItem asChild>
											<Link href="/account/profile">Account</Link>
										</DropdownMenuItem>
										<DropdownMenuItem className="text-red-500" onClick={logout}>Logout</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</DropdownMenu>
						)}

						<Popover>
							<PopoverTrigger className="bg-transparent px-0! hover:bg-transparent! data-open:bg-transparent! data-open:hover:bg-transparent! focus:bg-transparent! data-open:focus:bg-transparent!">
								<IconShoppingCart />
							</PopoverTrigger>
							<PopoverContent className="-translate-x-[30px] w-[300px]">
								<CartOverview user={user} />
							</PopoverContent>
						</Popover>
						<button className="md:hidden flex" onClick={() => setOpenSidebar(!openSidebar)}>
							<IconMenu />
						</button>
					</div>
				</nav>
			</header>

			<div className={cn("fixed inset-0 bg-[#09090b]/80 backdrop-blur-md flex items-center justify-center inner-section z-10 duration-300 min-w-screen", `${isActiveSearching ? "opacity-100 top-0" : "opacity-0 -translate-y-full"}`)}>
				<div className="absolute inset-0" onClick={() => setIsActiveSearching(false)} />
				<form className="flex relative flex-1 max-w-md" onSubmit={onSearchSubmit}>
					<Input className="py-9 px-7 pr-12 w-full text-base! bg-background!" placeholder="Search products" autoFocus value={searchTerm} onChange={e => setSearchTerm(e.target.value)} disabled={isPending} />
					<IconSearch size={22} className="absolute top-1/2 right-8 -translate-y-1/2" />
				</form>
			</div>

			<Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
		</>
	)
}