import { IconBrandTelegram, IconCreditCard, IconHeadphones, IconRefresh } from "@tabler/icons-react"

export const navLinks = [
	{
		title: "Home",
		href: "/",
		haveSubLinks: false
	},
	{
		title: "Shop",
		href: "/shop",
		haveSubLinks: false
	},
	{
		title: "Categories",
		href: "#",
		haveSubLinks: true,
		subLinks: [
			{
				title: "Shirts",
				href: "/shop?cat=shirt",
			},
			{
				title: "T-Shirts",
				href: "/shop?cat=t_shirt",
			},
			{
				title: "Hoodies",
				href: "/shop?cat=hoodie",
			},
		]
	},
	{
		title: "Brands",
		href: "#",
		haveSubLinks: true,
		subLinks: [
			{
				title: "Nike",
				href: "/shop?brand=nike",
			},
			{
				title: "Adidas",
				href: "/shop?brand=adidas",
			},
			{
				title: "Asos Design",
				href: "/shop?brand=asos",
			},
			{
				title: "Boss",
				href: "/shop?brand=boss",
			},
			{
				title: "Carhartt WIP",
				href: "/shop?brand=carhartt",
			},
		]
	},
	{
		title: "Contact",
		href: "/contact",
		haveSubLinks: false
	},
]

export const homeFeatureItems = [
	{
		title: "Free Shipping",
		desc: "Orders over $199",
		icon: IconBrandTelegram
	},
	{
		title: "90 Days Return",
		desc: "For any problems",
		icon: IconRefresh
	},
	{
		title: "Secure Payment",
		desc: "100% Guarantee",
		icon: IconCreditCard
	},
	{
		title: "24h Support",
		desc: "Dedicated support",
		icon: IconHeadphones
	},
]

export const sortOptions = [
	{
		label: "Default",
		value: "default"
	},
	{
		label: "Newest",
		value: "newest"
	},
	{
		label: "Oldest",
		value: "oldest"
	},
	{
		label: "Price lowest",
		value: "price_lowest"
	},
	{
		label: "Price highest",
		value: "price_highest"
	},
	{
		label: "Category",
		value: "category"
	},
	{
		label: "Brand",
		value: "brand"
	},
];

export const categoriesOptions = [
	{
		label: "All",
		value: "all"
	},
	{
		label: "Shirts",
		value: "shirt"
	},
	{
		label: "T-Shirts",
		value: "t_shirt"
	},
	{
		label: "Dresses",
		value: "dress"
	},
	{
		label: "Hoodies",
		value: "hoodie"
	},
]

export const brandOptions = [
	{
		label: "All",
		value: "all"
	},
	{
		label: "Nike",
		value: "nike"
	},
	{
		label: "Adidas",
		value: "adidas"
	},
	{
		label: "Asos Design",
		value: "asos"
	},
	{
		label: "Boss",
		value: "boss"
	},
	{
		label: "Carhartt WIP",
		value: "carhartt"
	}
];

export const colors = ["black", "white", "blue", "red"];

export const sizes = ["sm", "md", "lg", "xl"];

export const colorsClasses: any = {
	black: "bg-[#121212]",
	white: "bg-white",
	green: "bg-emerald-500",
	red: "bg-red-500",
	blue: "bg-blue-500",
	grey: "bg-grey-700"
}