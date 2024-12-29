import {
	type AutoPlacementOptions,
	type Coords,
	type Derivable,
	type FlipOptions,
	type HideOptions,
	type InlineOptions,
	type LimitShiftOptions,
	type Middleware,
	type MiddlewareState,
	type OffsetOptions,
	type ShiftOptions,
	type SizeOptions,
	autoPlacement as baseAutoPlacement,
	flip as baseFlip,
	hide as baseHide,
	inline as baseInline,
	limitShift as baseLimitShift,
	offset as baseOffset,
	shift as baseShift,
	size as baseSize,
} from "@floating-ui/dom";
import type { MaybeGetter } from "svelte-toolbelt";
import { type ArrowOptions, arrow as baseArrow } from "./arrow.js";

type DependencyList = MaybeGetter<unknown> | Array<MaybeGetter<unknown>>;

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
export function offset(
	options?: OffsetOptions,
	deps?: MaybeGetter<unknown> | Array<MaybeGetter<unknown>>
): Middleware {
	return {
		...baseOffset(options),
		options: [options, deps],
	};
}

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
export function shift(
	options?: ShiftOptions | Derivable<ShiftOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseShift(options),
		options: [options, deps],
	};
}

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
export function limitShift(
	options?: LimitShiftOptions | Derivable<LimitShiftOptions>,
	deps?: DependencyList
): {
	fn: (state: MiddlewareState) => Coords;
	// eslint-disable-next-line ts/no-explicit-any
	options: any;
} {
	return {
		...baseLimitShift(options),
		options: [options, deps],
	};
}

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
export function flip(
	options?: FlipOptions | Derivable<FlipOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseFlip(options),
		options: [options, deps],
	};
}

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
export function size(
	options?: SizeOptions | Derivable<SizeOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseSize(options),
		options: [options, deps],
	};
}

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
export function autoPlacement(
	options?: AutoPlacementOptions | Derivable<AutoPlacementOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseAutoPlacement(options),
		options: [options, deps],
	};
}

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
export function hide(
	options?: HideOptions | Derivable<HideOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseHide(options),
		options: [options, deps],
	};
}

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
export function inline(
	options?: InlineOptions | Derivable<InlineOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseInline(options),
		options: [options, deps],
	};
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
export function arrow(
	options: ArrowOptions | Derivable<ArrowOptions>,
	deps?: DependencyList
): Middleware {
	return {
		...baseArrow(options),
		options: [options, deps],
	};
}
