import { ProductSelect } from "@/features/products/product.type";
import { IconTrash } from "@tabler/icons-react";
import React from 'react'
import { removeFromCart } from "../carts.actions";
import { UserSelect } from "@/features/user/user.types";

type Props = {
	pro: ProductSelect;
	quantity: number;
	user: UserSelect | null;
	onDelete?: () => any;
}

export default function CartItem({ pro, quantity, user, onDelete }: Props) {

	const onRemoveItem = async () => {
		await removeFromCart(pro.id, user!.uid, false);
		onDelete?.();
	}

	return (
		<div className="flex items-center gap-4 justify-between">
			<div className="flex items-center gap-3">
				<div>
					<img src={pro.image_url} alt={pro.title} width={60} />
				</div>

				<div className="overflow-hidden max-w-[120px]">
					<h3 className="mb-2">{pro.title.slice(0, 20)}... X {quantity}</h3>
					<p className="text-muted-foreground text-sm">{Intl.NumberFormat("en-us", {
						currency: "USD",
						style: "currency"
					}).format(pro.price)}</p>
				</div>
			</div>

			<button onClick={onRemoveItem}><IconTrash size={23} className="text-red-500" /></button>
		</div>
	)
}
