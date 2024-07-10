import type {
	OnChangeFn,
	PrimitiveDivAttributes,
	WithAsChild,
	Without,
} from "$lib/internal/types.js";
import type { Orientation } from "$lib/shared/index.js";
import type { Snippet } from "svelte";

export type ListboxRootBasePropsWithoutHTML = {
	/**
	 * Whether to loop through the listbox items when reaching the end via keyboard.
	 *
	 * @defaultValue false
	 */
	loop?: boolean;

	/**
	 * The orientation of the listbox. This is how the listbox items are laid out and will
	 * impact how keyboard navigation works within the component.
	 *
	 * @defaultValue "vertical"
	 */
	orientation?: Orientation;

	/**
	 * Whether to autofocus the first or last listbox item when the listbox is mounted.
	 * This is useful when composing a custom listbox component within a popover or dialog.
	 *
	 * @defaultValue false
	 */
	autoFocus?: boolean | "first" | "last";

	/**
	 * Whether the listbox is disabled.
	 */

	disabled?: boolean;

	children?: Snippet;
};

export type ListboxSingleRootPropsWithoutHTML = ListboxRootBasePropsWithoutHTML & {
	/**
	 * The value of the selected listbox item.
	 */
	value?: string;

	/**
	 * A callback function called when the value changes.
	 */
	onValueChange?: OnChangeFn<string>;

	/**
	 * The selection type of the listbox.
	 */
	type: "single";
};

export type ListboxMultipleRootPropsWithoutHTML = ListboxRootBasePropsWithoutHTML & {
	/**
	 * The value of the selected listbox items.
	 */
	value?: string[];

	/**
	 * A callback function called when the value changes.
	 */
	onValueChange?: OnChangeFn<string[]>;

	/**
	 * The selection type of the listbox.
	 */
	type: "multiple";
};

export type ListboxRootPropsWithoutHTML =
	| ListboxSingleRootPropsWithoutHTML
	| ListboxMultipleRootPropsWithoutHTML;

export type ListboxRootProps = ListboxRootPropsWithoutHTML;

export type ListboxContentPropsWithoutHTML = WithAsChild<{}>;

export type ListboxContentProps = ListboxContentPropsWithoutHTML &
	Without<PrimitiveDivAttributes, ListboxContentPropsWithoutHTML>;

export type ListboxItemSnippetProps = { selected: boolean };

export type ListboxItemPropsWithoutHTML = Omit<
	WithAsChild<
		{
			/**
			 * The value of the listbox item. This is used to populate the `value` prop of the
			 * `Listbox.Root` component.
			 */
			value: string;

			/**
			 * The label of the listbox item. This will be rendered as the text content of the listbox item
			 * by default. If a child is provided, this will only be used for typeahead purposes.
			 */
			label?: string;

			/**
			 * Whether the listbox item is disabled, which prevents users from interacting with it.
			 */
			disabled?: boolean;
		},
		ListboxItemSnippetProps
	>,
	"children"
> & {
	children?: Snippet<[ListboxItemSnippetProps]>;
};

export type ListboxItemProps = ListboxItemPropsWithoutHTML &
	Without<PrimitiveDivAttributes, ListboxItemPropsWithoutHTML>;

export type ListboxGroupPropsWithoutHTML = WithAsChild<{}>;

export type ListboxGroupProps = ListboxGroupPropsWithoutHTML &
	Without<PrimitiveDivAttributes, ListboxGroupPropsWithoutHTML>;

export type ListboxGroupLabelPropsWithoutHTML = WithAsChild<{}>;

export type ListboxGroupLabelProps = ListboxGroupLabelPropsWithoutHTML &
	Without<PrimitiveDivAttributes, ListboxGroupLabelPropsWithoutHTML>;

export type ListboxLabelPropsWithoutHTML = WithAsChild<{}>;

export type ListboxLabelProps = ListboxLabelPropsWithoutHTML &
	Without<PrimitiveDivAttributes, ListboxLabelPropsWithoutHTML>;
