"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/shared/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
	email: z
		.email("Provide an valid email"),
	password: z
		.string("Enter your password")
});

export default function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const supabase = createClient();

	const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "admin@xshop.com",
			password: "123456"
		}
	});

	const onSubmit = handleSubmit(async formData => {
		const { email, password } = formData;

		startTransition(async () => {
			const { data, error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) {
				toast.error(error!.message);
				return;
			}

			toast.success("Successfully Logged in!");
			router.replace("/shop");
		});

	});

	return (
		<div className={"flex flex-col gap-6 w-full max-w-md px-6"}>
			<form onSubmit={onSubmit}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center mb-4">
						<h1 className="sm:text-4xl text-2xl font-bold">Login to your account</h1>
					</div>
					<Controller
						name="email"
						control={control}
						disabled={isPending}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="email">
									Email
								</FieldLabel>
								<Input
									{...field}
									disabled={isPending}
									id="email"
									aria-invalid={fieldState.invalid}
									placeholder="johndoe@example.com"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="password"
						control={control}
						disabled={isPending}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									{...field}
									disabled={isPending}
									id="password"
									aria-invalid={fieldState.invalid}
									placeholder="Password"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Field>
						<Button type="submit" disabled={isPending} className="text-base" size="lg">Login</Button>
					</Field>
					<FieldDescription className="text-center">
						Don&apos;t have an account? <Link href="/auth/signup" className="no-underline!">Sign Up</Link>
					</FieldDescription>
				</FieldGroup>
			</form>
		</div>
	)
}