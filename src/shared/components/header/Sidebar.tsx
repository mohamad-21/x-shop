"use client";

import { navLinks } from "@/lib/constants";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState, useTransition } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export default function Sidebar({ openSidebar, setOpenSidebar }: { openSidebar: boolean, setOpenSidebar: Dispatch<SetStateAction<boolean>> }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onSearchSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!searchTerm.trim()) return;

		startTransition(() => {
			router.push(`/shop?s=${searchTerm}`);
			setOpenSidebar(false)
		});
	}

	useEffect(() => {

		if (openSidebar) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

	}, [openSidebar]);

	return (
		<aside className={`fixed inset-0 z-20 duration-200 ${openSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
			<div className="absolute inset-0 bg-background/70" onClick={() => setOpenSidebar(false)} />

			<div className="relative bg-background min-h-[100dvh] top-0 bottom-0 w-[350px] px-8 py-12 gap-10 flex flex-col overflow-auto">
				<nav className="flex flex-col items-center gap-10">
					<div className="space-y-5 text-center">
						<Link href="/" className="inline-block text-lg" onClick={() => setOpenSidebar(false)}>X SHOP</Link>

						<form className="flex relative" onSubmit={onSearchSubmit}>
							<Input className="py-5 h-0! px-4 pr-12 w-full text-sm" placeholder="Search products" disabled={isPending} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
							<IconSearch size={17} className="absolute top-1/2 right-5 -translate-y-1/2" />
						</form>
					</div>

					<ul className="flex flex-col gap-4 w-full overflow-auto">
						<ScrollArea>
							{navLinks.map(link => (
								<li key={link.title}>
									{link.haveSubLinks ? (
										<Accordion type="single" collapsible>
											<AccordionItem value={link.title}>
												<AccordionTrigger className="no-underline hover:no-underline py-2 text-base font-light">{link.title}</AccordionTrigger>
												<AccordionContent className="flex flex-col gap-4 text-balance! [&_a]:no-underline! py-3">
													<ul className="space-y-1 text-lg">
														{link.subLinks?.map(subLink => (
															<li key={subLink.href}>
																<Link className="text-sm px-3 py-3 w-full flex rounded-lg" href={subLink.href} onClick={() => setOpenSidebar(false)}>
																	{subLink.title}
																</Link>
															</li>
														))}
													</ul>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									) : (
										<Link href={link.href} className="block flex-1 py-3" onClick={() => setOpenSidebar(false)} key={link.href}>{link.title}</Link>
									)}
								</li>
							))}
						</ScrollArea>
					</ul>
				</nav>
			</div>
		</aside >
	)
}
