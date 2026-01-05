import { getCart } from "@/features/carts/carts.actions";
import CartCheckout from "@/features/carts/components/CartCheckout";
import CartViewList from "@/features/carts/components/CartViewList";
import { UserSelect } from "@/features/user/user.types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CartPage() {
	const { cart, user: session, error } = await getCart();

	if ((error && error === "session is not set") || !session) return redirect("/auth/login");

	const supabase = await createClient();

	const { data: user } = await supabase
		.from("users")
		.select("*")
		.eq("uid", session.id)
		.single<UserSelect>();

	return (
		<div className="page">
			<div className="inner-section grid xl:grid-cols-2 grid-cols-1 gap-8">
				<CartViewList cart={cart || []} />
				<CartCheckout user={user} cart={cart || []} />
			</div>
		</div>
	)
}
