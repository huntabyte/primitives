import type { RadioGroupItemPropsWithoutHTML, RadioGroupRootPropsWithoutHTML } from "bits-ui";
import { builderAndAttrsSlotProps, domElProps, withChildProps } from "./helpers.js";
import { attrsSlotProp, enums } from "$lib/content/api-reference/helpers.js";
import * as C from "$lib/content/constants.js";
import type { APISchema } from "$lib/types/index.js";

export const root: APISchema<RadioGroupRootPropsWithoutHTML> = {
	title: "Root",
	description:
		"The radio group component used to group radio items under a common name for form submission.",
	props: {
		disabled: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description:
				"Whether or not the radio group is disabled. This prevents the user from interacting with it.",
		},
		required: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description: "Whether or not the radio group is required.",
		},
		name: {
			type: C.STRING,
			description:
				"The name of the radio group used in form submission. If provided, a hidden input element will be rendered to submit the value of the radio group.",
		},
		loop: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description:
				"Whether or not the radio group should loop through the items when navigating with the arrow keys.",
		},
		orientation: {
			default: "'vertical'",
			type: {
				type: C.ENUM,
				definition: enums("vertical", "horizontal"),
			},
			description: "The orientation of the radio group.",
		},
		value: {
			type: C.STRING,
			description:
				"The value of the currently selected radio item. You can bind to this value to control the radio group's value from outside the component.",
		},
		onValueChange: {
			type: {
				type: C.FUNCTION,
				definition: "(value: string | undefined) => void",
			},
			description: "A callback that is fired when the radio group's value changes.",
		},
		...withChildProps({ elType: "HTMLDivElement" }),
	},
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "orientation",
			value: enums("vertical", "horizontal"),
			description: "The orientation of the radio group.",
			isEnum: true,
		},
		{
			name: "radio-group-root",
			description: "Present on the root element.",
		},
	],
};

export const item: APISchema<RadioGroupItemPropsWithoutHTML> = {
	title: "Item",
	description: "An radio item, which must be a child of the `RadioGroup.Root` component.",
	props: {
		disabled: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description:
				"Whether or not the radio item is disabled. This prevents the user from interacting with it.",
		},
		value: {
			type: C.STRING,
			description:
				"The value of the radio item. This should be unique for each radio item in the group.",
			required: true,
		},
		...withChildProps({ elType: "HTMLButtonElement" }),
	},
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "disabled",
			description: "Present when the radio item is disabled.",
		},
		{
			name: "value",
			description: "The value of the radio item.",
		},
		{
			name: "state",
			value: enums("checked", "unchecked"),
			isEnum: true,
			description: "The radio item's checked state.",
		},
		{
			name: "orientation",
			value: enums("vertical", "horizontal"),
			isEnum: true,
			description: "The orientation of the parent radio group.",
		},
		{
			name: "radio-group-item",
			description: "Present on the radio item element.",
		},
	],
};

export const radioGroup = [root, item];
