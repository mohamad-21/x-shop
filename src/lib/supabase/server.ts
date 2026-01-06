import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs"


// export async function createClient() {
// 	const cookiesList = await cookies(); // Keep cookies in the JS execution context for Next.js build
// 	return createServerClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, { cookies: cookiesList })
// }

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have proxy refreshing
						// user sessions.
					}
				},
			},
		},
	);
}