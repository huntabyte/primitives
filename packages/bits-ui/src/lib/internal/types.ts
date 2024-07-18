import type { Snippet } from "svelte";
import type { Action } from "svelte/action";
import type {
	HTMLAnchorAttributes,
	HTMLAttributes,
	HTMLButtonAttributes,
	HTMLImgAttributes,
	HTMLInputAttributes,
	HTMLLabelAttributes,
	HTMLLiAttributes,
	HTMLTableAttributes,
	HTMLTdAttributes,
	HTMLThAttributes,
	SVGAttributes,
} from "svelte/elements";
import type { TransitionConfig } from "svelte/transition";
import type { Box, ReadableBoxedValues, WritableBoxedValues } from "./box.svelte.js";
import type { StyleProperties } from "$lib/shared/index.js";

export type ObjectVariation<T> = T extends object ? T : never;
// eslint-disable-next-line ts/no-explicit-any
export type Transition = (node: Element, params?: any) => TransitionConfig;
export type TransitionParams<T extends Transition> = Parameters<T>[1];

export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;
export type HTMLSpanAttributes = HTMLAttributes<HTMLSpanElement>;
export type HTMLHeadingAttributes = HTMLAttributes<HTMLHeadingElement>;

export type OmitOpen<T> = Omit<T, "open" | "defaultOpen" | "onOpenChange">;
export type OmitValue<T> = Omit<T, "value" | "defaultValue" | "onValueChange">;
export type OmitChecked<T> = Omit<T, "checked" | "defaultChecked" | "onCheckedChange">;
export type OmitPressed<T> = Omit<T, "pressed" | "defaultPressed" | "onPressedChange">;
export type OmitForceVisible<T> = Omit<T, "forceVisible">;
export type OmitIds<T> = Omit<T, "ids">;
export type OmitDates<T> = Omit<
	T,
	| "value"
	| "defaultValue"
	| "placeholder"
	| "defaultPlaceholder"
	| "onPlaceholderChange"
	| "onValueChange"
	| "ids"
>;

export type OmitFloating<T> = OmitOpen<
	Omit<T, "forceVisible" | "ids" | "arrowSize" | "positioning">
>;

export type OnChangeFn<T> = (value: T) => void;

export type Expand<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: O[K] }
		: never
	: T;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type Builder = {
	[x: PropertyKey]: unknown;
	// eslint-disable-next-line ts/no-explicit-any
	action: Action<HTMLElement, any, any>;
};

export type DOMEl<T extends Element = HTMLDivElement> = Expand<{
	/**
	 * Wheter to expose the underlying DOM element.
	 */
	el?: T;
}>;

export type DOMElement<T extends Element = HTMLDivElement> = Expand<{
	/**
	 * Whether to delegate rendering the element to your own
	 * custom element.
	 *
	 * @see https://www.bits-ui.com/docs/delegation
	 */
	asChild?: boolean;

	/**
	 * Bind to the underlying DOM element of the component.
	 */
	el?: T;
}>;

export type TransitionProps<
	T extends Transition = Transition,
	In extends Transition = Transition,
	Out extends Transition = Transition,
> = Expand<{
	/**
	 * A transition function to use during both the in and out transitions.
	 */
	transition?: T;

	/**
	 * The configuration to pass to the `transition` function.
	 */
	transitionConfig?: TransitionParams<T>;

	/**
	 * A transition function to use during the in transition.
	 *
	 * If provided, this will override the `transition` function.
	 */
	inTransition?: In;

	/**
	 * The configuration to pass to the `inTransition` function.
	 */
	inTransitionConfig?: TransitionParams<In>;

	/**
	 * A transition function to use during the out transition.
	 *
	 * If provided, this will override the `transition` function.
	 */
	outTransition?: Out;

	/**
	 * The configuration to pass to the `outTransition` function.
	 */
	outTransitionConfig?: TransitionParams<Out>;
}>;

type Primitive<T> = Omit<T, "style" | "id" | "children"> & { id?: string };
export type PrimitiveButtonAttributes = Primitive<HTMLButtonAttributes>;
export type PrimitiveDivAttributes = Primitive<HTMLDivAttributes>;
export type PrimitiveInputAttributes = Primitive<HTMLInputAttributes>;
export type PrimitiveSpanAttributes = Primitive<HTMLSpanAttributes>;
export type PrimitiveImgAttributes = Primitive<HTMLImgAttributes>;
export type PrimitiveHeadingAttributes = Primitive<HTMLHeadingAttributes>;
export type PrimitiveLabelAttributes = Primitive<HTMLLabelAttributes>;
export type PrimitiveSVGAttributes = Primitive<SVGAttributes<SVGElement>>;
export type PrimitiveAnchorAttributes = Primitive<HTMLAnchorAttributes>;
export type PrimitiveLiAttributes = Primitive<HTMLLiAttributes>;
export type PrimitiveElementAttributes = Primitive<HTMLAttributes<HTMLElement>>;
export type PrimitiveUListAttributes = Primitive<HTMLAttributes<HTMLUListElement>>;
export type PrimitiveTdAttributes = Primitive<HTMLTdAttributes>;
export type PrimitiveThAttributes = Primitive<HTMLThAttributes>;
export type PrimitiveTableAttributes = Primitive<HTMLTableAttributes>;
export type PrimitiveTbodyAttributes = Primitive<HTMLAttributes<HTMLTableSectionElement>>;
export type PrimitiveTrAttributes = Primitive<HTMLAttributes<HTMLTableRowElement>>;
export type PrimitiveTheadAttrbutes = Primitive<HTMLAttributes<HTMLTableSectionElement>>;
export type PrimitiveHeaderAttributes = Primitive<HTMLAttributes<HTMLElement>>;

export type ElementRef = Box<HTMLElement | null>;

export type WithChild<
	/**
	 * The props that the component accepts.
	 */
	Props extends Record<PropertyKey, unknown> = {},
	/**
	 * The props that are passed to the `child` and `children` snippets. The `ElementProps` are
	 * merged with these props for the `child` snippet.
	 */
	SnippetProps extends Record<PropertyKey, unknown> = { _default: never },
	/**
	 * The underlying DOM element being rendered. You can bind to this prop to
	 * programatically interact with the element.
	 */
	Ref = HTMLElement,
> = Omit<Props, "child" | "children"> & {
	child?: SnippetProps extends { _default: never }
		? Snippet<[{ props: Record<string, unknown> }]>
		: Snippet<[SnippetProps & { props: Record<string, unknown> }]>;
	children?: SnippetProps extends { _default: never } ? Snippet : Snippet<[SnippetProps]>;
	style?: StyleProperties;
	ref?: Ref | null;
};

export type WithChildren<Props> = Props & {
	children?: Snippet;
};

/**
 * Constructs a new type by omitting properties from type
 * 'T' that exist in type 'U'.
 *
 * @template T - The base object type from which properties will be omitted.
 * @template U - The object type whose properties will be omitted from 'T'.
 * @example
 * type Result = Without<{ a: number; b: string; }, { b: string; }>;
 * // Result type will be { a: number; }
 */
export type Without<T extends object, U extends object> = Omit<T, keyof U>;

export type Arrayable<T> = T[] | T;

export type Fn = () => void;
// eslint-disable-next-line ts/no-explicit-any
export type AnyFn = (...args: any[]) => any;

export type ValueOf<T> = T[keyof T];

export type WithRefProps<T = {}> = T &
	ReadableBoxedValues<{ id: string }> &
	WritableBoxedValues<{ ref: HTMLElement | null }>;
