import SectionHeader from "@/shared/components/SectionHeader"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/shared/components/ui/item"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { IconClock, IconMapPin, IconPhone } from "@tabler/icons-react"
import React from 'react'

export default function page() {
	return (
		<div className="page">
			<div className="inner-section">
				<div className="space-y-20">
					<div>
						<SectionHeader title="Contact Info" />

						<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
							<Item className="px-0">
								<ItemContent className="flex flex-col items-center gap-3">
									<IconMapPin className="size-11 mb-3" />
									<ItemTitle className="text-xl">Our Address</ItemTitle>
									<ItemDescription className="text-base">77 seventh Street, USA.</ItemDescription>
								</ItemContent>
							</Item>
							<Item className="px-0">
								<ItemContent className="flex flex-col items-center gap-3">
									<IconPhone className="size-11 mb-3" />
									<ItemTitle className="text-xl">Contact Number</ItemTitle>
									<ItemDescription className="text-base">716-298-1822</ItemDescription>
								</ItemContent>
							</Item>
							<Item className="px-0">
								<ItemContent className="flex flex-col items-center gap-3">
									<IconClock className="size-11 mb-3" />
									<ItemTitle className="text-xl">Opening Hour</ItemTitle>
									<ItemDescription className="text-base">Saturday - Friday - 9:00am - 5:00pm</ItemDescription>
								</ItemContent>
							</Item>
						</div>
					</div>

					<div className="max-w-2xl">
						<SectionHeader title="Get In Touch" />

						<form className="space-y-7">

							<div className="flex gap-3">
								<div className="grid gap-3 flex-1">
									<Label htmlFor="name">Name</Label>
									<Input className="py-5" id="name" placeholder="Name" required />
								</div>

								<div className="grid gap-3 flex-1">
									<Label htmlFor="email">Email</Label>
									<Input className="py-5" id="email" type="email" placeholder="Email" required />
								</div>

							</div>

							<div className="grid gap-3">
								<Label htmlFor="subject">Subject</Label>
								<Input className="py-5" id="subject" placeholder="Subject" required />
							</div>

							<div className="grid gap-3">
								<Label htmlFor="message">Message</Label>
								<Textarea className="py-3 min-h-24" id="message" placeholder="Message" required />
							</div>

							<Button size="lg" className="text-base px-7 py-6">Send Message</Button>

						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
