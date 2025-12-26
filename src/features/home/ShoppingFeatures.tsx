import { homeFeatureItems } from "@/lib/constants"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/shared/components/ui/item"
import React from 'react'

export default function ShoppingFeatures() {
	return (
		<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
			{homeFeatureItems.map(feature => (
				<Item key={feature.title} variant="muted">
					<ItemActions>
						<feature.icon size="35" />
					</ItemActions>
					<ItemContent className="gap-0">
						<ItemTitle className="text-base">{feature.title}</ItemTitle>
						<ItemDescription>{feature.desc}</ItemDescription>
					</ItemContent>
				</Item>
			))}
		</div>
	)
}
