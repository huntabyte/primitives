import type { DOMEl, HTMLDivAttributes, Transition } from "$lib/internal/index.js";
import type { CustomEventHandler } from "$lib/index.js";
import type { HTMLButtonAttributes } from "svelte/elements";
import type * as I from "./_types.js";

type Props = I.Props & HTMLDivAttributes & DOMEl<HTMLDivElement>;

type ContentProps<
	T extends Transition = Transition,
	In extends Transition = Transition,
	Out extends Transition = Transition
> = I.ContentProps<T, In, Out> & HTMLDivAttributes & DOMEl<HTMLDivElement>;

type TriggerProps = I.TriggerProps & HTMLButtonAttributes & DOMEl<HTMLButtonElement>;

type TriggerEvents = {
	click: CustomEventHandler<MouseEvent, HTMLButtonElement>;
};

export type {
	Props,
	ContentProps,
	TriggerProps,
	//
	TriggerEvents
};
