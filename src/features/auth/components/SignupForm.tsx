"use client";

import { signIn, signUp } from "@/features/user/user.actions";
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
	name: z.string().min(3, "Enter your name"),
	email: z.email("Provide an valid email"),
	password: z.string("Enter your password"),
	passwordConfirmation: z.string("Confirm your password"),
})
	.superRefine(({ password, passwordConfirmation }, ctx) => {
		if (password !== passwordConfirmation) {
			ctx.addIssue({ code: "custom", path: ["passwordConfirmation"], message: "Passwords don't match" })
		}
	})

export default function SignupForm() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		}
	});

	const onSubmit = handleSubmit(async formData => {
		const { name, email, password } = formData;

		startTransition(async () => {
			const { data, error } = await signUp({ name, email, password });

			if (error) {
				toast.error(error!.message);
				return;
			}

			toast.success("Successfully Signed up");
			router.replace("/auth/login");
		});
	});

	return (
		<div className={"flex flex-col gap-6 w-full max-w-md px-6 py-20"}>
			<form onSubmit={onSubmit}>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center mb-4">
						<h1 className="sm:text-4xl text-2xl font-bold">Sign Up to X-Shop</h1>
					</div>
					<Controller
						disabled={isPending}
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="name">
									Name
								</FieldLabel>
								<Input
									{...field}
									disabled={isPending}
									id="name"
									aria-invalid={fieldState.invalid}
									placeholder="john doe"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						disabled={isPending}
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
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
						disabled={isPending}
						name="password"
						control={control}
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
					<Controller
						disabled={isPending}
						name="passwordConfirmation"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="passwordConfirmation">Password Confirmation</FieldLabel>
								<Input
									{...field}
									disabled={isPending}
									id="passwordConfirmation"
									aria-invalid={fieldState.invalid}
									placeholder="Confirm password"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Field>
						<Button type="submit" disabled={isPending} className="text-base" size="lg">Sign Up</Button>
					</Field>
					<FieldDescription className="text-center">
						have an account? <Link href="/auth/login" className="no-underline!">Login</Link>
					</FieldDescription>
				</FieldGroup>
			</form>
		</div>
	)
}