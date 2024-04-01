/* eslint-disable ts/ban-types */

/**
 * We define prop types without the HTMLAttributes here so that we can use them
 * to type-check our API documentation, which requires we document each prop,
 * but we don't want to document the HTML attributes.
 */
import type { CreateRadioGroupProps, RadioGroupItemProps } from "@melt-ui/svelte";
import type {
	DOMElement,
	Expand,
	ObjectVariation,
	OmitValue,
	OnChangeFn,
} from "$lib/internal/index.js";

type Props = Expand<
	OmitValue<CreateRadioGroupProps> & {
		/**
		 * The value of the radio group.
		 * You can bind this to a value to programmatically control the value.
		 *
		 * @defaultValue undefined
		 */

		value?: CreateRadioGroupProps["defaultValue"] & {};

		/**
		 * A callback function called when the value changes.
		 */

		onValueChange?: OnChangeFn<CreateRadioGroupProps["defaultValue"] & {}>;
	} & DOMElement
>;

type InputProps = DOMElement<HTMLInputElement>;

type ItemProps = Expand<ObjectVariation<RadioGroupItemProps> & DOMElement<HTMLButtonElement>>;

type ItemIndicatorProps = DOMElement;

export type { Props, InputProps, ItemProps, ItemIndicatorProps };