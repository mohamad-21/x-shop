import React from 'react'
import { Spinner } from "./spinner"

export default function WrapperSpinner() {
	return (
		<div className="flex items-center justify-center p-4 h-24">
			<Spinner className="size-7" />
		</div>
	)
}
