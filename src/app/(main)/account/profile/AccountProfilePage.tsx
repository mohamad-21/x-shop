'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updatePassword, updateProfile } from "@/features/user/user.actions";
import { UserSelect } from "@/features/user/user.types";
import SectionHeader from "@/shared/components/SectionHeader";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";

// ---- Schema
const ProfileSchema = z.object({
	name: z.string().trim().min(3, "Name must be at least 3 characters"),
	email: z.email("Invalid email address"),
	country: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

const PasswordUpdateSchema = z.object({
	currentPassword: z.string().min(2, "Enter Current Password"),
	newPassword: z.string().min(6, "New Password must be at least 6 characters"),
	confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
})
	.superRefine(({ newPassword, confirmPassword }, ctx) => {
		if (newPassword !== confirmPassword) {
			ctx.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords don't match" })
		}
	})

type PasswordUpdateFormValues = z.infer<typeof PasswordUpdateSchema>;


type UserProfile = UserSelect;

type Props = {
	user: UserProfile;
};

export default function AccountProfile({ user }: Props) {
	const [open, setOpen] = useState(false);
	const [isPendingForm1, startTransition1] = useTransition();
	const [isPendingForm2, startTransition2] = useTransition();

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: user.name ?? "",
			email: user.email ?? "",
			country: user.country ?? "",
			address: user.address ?? "",
			city: user.city ?? "",
		}
	});

	const updatePasswordForm = useForm<PasswordUpdateFormValues>({
		resolver: zodResolver(PasswordUpdateSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: ""
		}
	});

	async function handleSubmit(values: ProfileFormValues) {

		startTransition1(async () => {
			const res = await updateProfile(user.id, values);

			if (res.error) {
				toast.error(`Profile update error: ${res.error.message}`);
				return;
			}

			toast.success("Profile Successfully updated");
			setOpen(false);
		})
	}

	async function handlePasswordUpdateSubmit(values: PasswordUpdateFormValues) {
		startTransition2(async () => {
			const res = await updatePassword(user.id, values.currentPassword, values.newPassword);

			if (res.error) {
				updatePasswordForm.setError("root", { message: res.error.message });
				return;
			}

			toast.success("Your Password Successfully updated");

			updatePasswordForm.reset();
		})
	}

	return (
		<div className="inner-section space-y-12!">
			<div>
				<SectionHeader title="Profile Details" />
				<div className="space-y-4 max-w-xl">
					<div className="grid gap-3">
						<Label htmlFor="name">Name</Label>
						<Input className="py-5" id="name" readOnly {...form.register("name")} placeholder="John Doe" />
					</div>

					<div className="grid gap-3">
						<Label htmlFor="email">Email</Label>
						<Input className="py-5" id="email" readOnly type="email" {...form.register("email")} placeholder="john@example.com" />
					</div>

					<div className="grid gap-3">
						<Label htmlFor="country">Country</Label>
						<Input className="py-5" id="country" readOnly {...form.register("country")} placeholder="Your Country" />
					</div>

					<div className="grid gap-3">
						<Label htmlFor="city">City</Label>
						<Input className="py-5" id="city" readOnly type="city" {...form.register("city")} placeholder="Your city" />
					</div>

					<div className="grid gap-3">
						<Label htmlFor="address">Address</Label>
						<Input className="py-5" id="address" readOnly {...form.register("address")} placeholder="Your Address" />
					</div>

					<Button type="button" onClick={() => setOpen(true)}>
						Edit Profile
					</Button>
				</div>

			</div>

			<div className="mt-20">
				<SectionHeader title="Update Password" />
				<form
					onSubmit={updatePasswordForm.handleSubmit(handlePasswordUpdateSubmit)}
					className="space-y-4 max-w-xl"
				>
					<div className="grid gap-3">
						<Label htmlFor="currentPassword">Current Password</Label>
						<Input type="password" className="py-5" id="currentPassword" {...updatePasswordForm.register("currentPassword")} disabled={isPendingForm2} placeholder="Current Password" />

						{updatePasswordForm.formState.errors.currentPassword && (
							<p className="text-sm text-destructive">{updatePasswordForm.formState.errors.currentPassword.message}</p>
						)}
					</div>

					<div className="grid gap-3">
						<Label htmlFor="newPassword">New Password</Label>
						<Input type="password" className="py-5" id="newPassword" {...updatePasswordForm.register("newPassword")} disabled={isPendingForm2} placeholder="New Password" />

						{updatePasswordForm.formState.errors.newPassword && (
							<p className="text-sm text-destructive">{updatePasswordForm.formState.errors.newPassword.message}</p>
						)}
					</div>

					<div className="grid gap-3">
						<Label htmlFor="confirm">Confirm</Label>
						<Input type="password" className="py-5" id="confirm" {...updatePasswordForm.register("confirmPassword")} disabled={isPendingForm2} placeholder="Confirm New Password" />

						{updatePasswordForm.formState.errors.confirmPassword && (
							<p className="text-sm text-destructive">{updatePasswordForm.formState.errors.confirmPassword.message}</p>
						)}
					</div>

					{updatePasswordForm.formState.errors.root && (
						<p className="text-sm text-destructive">{updatePasswordForm.formState.errors.root.message}</p>
					)}
					<Button type="submit" disabled={isPendingForm2}>
						{isPendingForm2 ? "Saving..." : "Update Password"}
					</Button>
				</form>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-xl">
					<DialogHeader>
						<DialogTitle className="text-xl">Edit profile</DialogTitle>
						<DialogDescription>Update your information and save your changes.</DialogDescription>
					</DialogHeader>

					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" disabled={isPendingForm1} {...form.register("name")} placeholder="John Doe" />
							{form.formState.errors.name && (
								<p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
							)}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" disabled={isPendingForm1} {...form.register("email")} placeholder="john@example.com" />
							{form.formState.errors.email && (
								<p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
							)}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="country">Country</Label>
							<Input id="country" disabled={isPendingForm1} {...form.register("country")} placeholder="Your Country" />
							{form.formState.errors.country && (
								<p className="text-sm text-destructive">{form.formState.errors.country.message}</p>
							)}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="city">City</Label>
							<Input id="city" disabled={isPendingForm1} {...form.register("city")} placeholder="Your City" />
							{form.formState.errors.city && (
								<p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
							)}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="address">Address</Label>
							<Textarea id="address" disabled={isPendingForm1} {...form.register("address")} placeholder="Your Address" />
							{form.formState.errors.address && (
								<p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
							)}
						</div>

						<DialogFooter className="gap-4">
							<Button type="button" variant="outline" disabled={isPendingForm1} onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" disabled={isPendingForm1}>
								{isPendingForm1 ? "Saving..." : "Save changes"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div >
	);
}
