import {
	type Derivable,
	type Middleware,
	type Padding,
	arrow as arrowCore,
} from "@floating-ui/dom";
import { type Box, box } from "svelte-toolbelt";

export interface ArrowOptions {
	/**
	 * The arrow element to be positioned.
	 * @default undefined
	 */
	element: Box<Element | null> | Element | null;
	/**
	 * The padding between the arrow element and the floating element edges.
	 * Useful when the floating element has rounded corners.
	 * @default 0
	 */
	padding?: Padding;
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
export function arrow(options: ArrowOptions | Derivable<ArrowOptions>): Middleware {
	return {
		name: "arrow",
		options,
		fn(state) {
			const { element, padding } = typeof options === "function" ? options(state) : options;

			if (element && box.isBox(element)) {
				if (element.current != null) {
					return arrowCore({ element: element.current, padding }).fn(state);
				}

				return {};
			}

			if (element) return arrowCore({ element, padding }).fn(state);

			return {};
		},
	};
}
