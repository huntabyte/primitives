import { type VariantProps, tv } from "tailwind-variants";

import Root from "./alert.svelte";
import Description from "./alert-description.svelte";
import Title from "./alert-title.svelte";

export const alertVariants = tv({
	base: "relative w-full rounded-[16px] p-5 [&>h5]:tracking-normal ",

	variants: {
		variant: {
			note: "bg-[#E0F2FE] text-[#363661] [&>.dot]:bg-[#363661] [&>h5]:text-[#363661] dark:[&>h5]:text-[#D6EFFF] dark:bg-[#20202B] dark:[&>.dot]:bg-[#D6EFFF] dark:text-foreground",
			danger: "border-rose-200 bg-rose-50 text-foreground dark:border-rose-600 dark:bg-rose-500/20 [&>h5]:text-red-600 dark:[&>h5]:text-red-300 [&>svg]:text-red-800 dark:[&>svg]:text-red-300",
			tip: "bg-[#FFE5E0] text-[#0040A7] [&>.dot]:bg-[#0040A7] [&>h5]:text-[#0040A7] dark:[&>h5]:text-[#FFC3BA] dark:bg-[#20202B] dark:[&>.dot]:bg-[#FFC3BA] dark:text-foreground",
			warning: "bg-[#FEFCE8] text-[#525252] [&>.dot]:bg-[#525252] [&>h5]:text-[#525252] dark:[&>h5]:text-[#FFF8B7] dark:bg-[#20202B] dark:[&>.dot]:bg-[#FFF8B7] dark:text-foreground",
		},
	},
	defaultVariants: {
		variant: "note",
	},
});

export type Variant = VariantProps<typeof alertVariants>["variant"];
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export {
	Root,
	Description,
	Title,
	//
	Root as Alert,
	Description as AlertDescription,
	Title as AlertTitle,
};
