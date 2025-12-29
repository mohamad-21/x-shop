"use client";

import React from 'react'

export default function Error({ error: { message }, reset }: any) {
	return (
		<div className="min-h-screen flex items-center justify-center flex-col p-6">
			<h2 className="text-2xl">An Unexpected error occurred</h2>
			{message && (
				<p className="text-muted-foreground mt-3">{message}</p>
			)}
		</div>
	)
}
