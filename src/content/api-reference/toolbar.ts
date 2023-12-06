import type { APISchema } from "@/types";
import { asChild, enums } from "@/content/api-reference/helpers.js";
import type * as Toolbar from "$lib/bits/toolbar/_types.js";
import * as C from "@/content/constants.js";
import { union, builderAndAttrsSlotProps } from "./helpers";

const root: APISchema<Toolbar.Props> = {
	title: "Root",
	description: "The root component which contains the toolbar.",
	props: {
		loop: {
			default: C.TRUE,
			type: C.BOOLEAN,
			description: "Whether or not the toolbar should loop when navigating."
		},
		orientation: {
			default: C.HORIZONTAL,
			type: enums(C.HORIZONTAL, C.VERTICAL),
			description: "The orientation of the toolbar."
		},
		asChild
	},
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "orientation",
			description: "The orientation of the toolbar."
		},
		{
			name: "toolbar-root",
			description: "Present on the root element."
		}
	]
};

const button: APISchema<Toolbar.ButtonProps> = {
	title: "Button",
	description: "A button in the toolbar.",
	props: { asChild },
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "toolbar-button",
			description: "Present on the button element."
		}
	]
};

const link: APISchema<Toolbar.LinkProps> = {
	title: "Link",
	description: "A link in the toolbar.",
	props: { asChild },
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "toolbar-link",
			description: "Present on the link element."
		}
	]
};

const group: APISchema<Toolbar.GroupProps<"multiple">> = {
	title: "Group",
	description: "A group of toggle items in the toolbar.",
	props: {
		value: {
			type: union(C.STRING, "string[]"),
			description:
				"The value of the toggle group. If the type is multiple, this will be an array of strings, otherwise it will be a string."
		},
		onValueChange: {
			type: C.FUNCTION,
			description: "A callback function called when the value changes."
		},
		disabled: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description: "Whether or not the switch is disabled."
		},
		type: {
			default: "single",
			description: "The type of toggle group.",
			type: enums("single", "multiple")
		},
		asChild
	},
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "toolbar-group",
			description: "Present on the group element."
		}
	]
};

const groupItem: APISchema<Toolbar.GroupItemProps> = {
	title: "GroupItem",
	description: "A toggle item in the toolbar toggle group.",
	props: {
		value: {
			type: C.STRING,
			description:
				"The value of the toolbar toggle group item. When the toolbar toggle group item is selected, toolbar the toggle group's value will be set to this value if in single mode, or this value will be pushed to the toggle group's array value if in multiple mode."
		},
		disabled: {
			default: C.FALSE,
			type: C.BOOLEAN,
			description: "Whether or not the item is disabled."
		},
		asChild
	},
	slotProps: { ...builderAndAttrsSlotProps },
	dataAttributes: [
		{
			name: "state",
			description: "Whether the toolbar toggle item is in the on or off state.",
			value: enums("on", "off"),
			isEnum: true
		},
		{
			name: "value",
			description: "The value of the toolbar toggle item."
		},
		{
			name: "disabled",
			description: "Present when the toolbar toggle item is disabled."
		},
		{
			name: "toolbar-item",
			description: "Present on the item element."
		}
	]
};

export const toolbar = [root, button, link, group, groupItem];