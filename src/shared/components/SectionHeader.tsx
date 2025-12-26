import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react"
import Link from "next/link"
import React from 'react'

type Props = {
	title: string;
	href?: string;
	subtitle?: string;
	children?: React.ReactNode;
	subtitleType?: "row" | "col";
	className?: string;
}

export default function SectionHeader({ title, href, subtitle, children, subtitleType = "row", className = "" }: Props) {
	return (
		<div className={cn("flex items-center justify-between gap-5 mb-8", className)}>
			<div>
				<h2 className="text-2xl mb-1">{title}</h2>
				{(subtitle && subtitleType === "col") && (
					<p className="inline-flex items-center gap-1 text-muted-foreground">
						{subtitle}
					</p>
				)}
			</div>

			<div className="flex items-center gap-5">
				{href && (
					<Link href={href} className="inline-flex items-center gap-1 text-muted-foreground">View More <IconArrowUpRight /></Link>
				)}
				{(subtitle && subtitleType === "row") && (
					<p className="inline-flex items-center gap-1 text-muted-foreground">
						{subtitle}
					</p>
				)}
				{children && children}
			</div>
		</div>
	)
}
