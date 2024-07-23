import type { ProgressRootPropsWithoutHTML } from "bits-ui";
import { builderAndAttrsSlotProps, domElProps, withChildProps } from "./helpers.js";
import { enums } from "$lib/content/api-reference/helpers.js";
import * as C from "$lib/content/constants.js";
import type { APISchema } from "$lib/types/index.js";

export const root: APISchema<ProgressRootPropsWithoutHTML> = {
	title: "Root",
	description: "The progress bar component.",
	props: {
		max: {
			type: C.NUMBER,
			default: "100",
			description:
				"The maximum value of the progress bar. Used to calculate the percentage of the progress bar.",
		},
		value: {
			type: C.NUMBER,
			default: "0",
			description: "The current value of the progress bar.",
		},
		...withChildProps({ elType: "HTMLDivElement" }),
	},
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "value",
			description: "The current value of the progress bar.",
		},
		{
			name: "state",
			description: "The current state of the progress bar.",
			value: enums("indeterminate", "complete", "loading"),
			isEnum: true,
		},
		{
			name: "max",
			description: "The maximum value of the progress bar.",
		},
		{
			name: "progress-root",
			description: "Present on the root element.",
		},
	],
};

export const progress = [root];
