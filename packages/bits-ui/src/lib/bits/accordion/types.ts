import type {
	EventCallback,
	OnChangeFn,
	PrimitiveButtonAttributes,
	PrimitiveDivAttributes,
	Transition,
	TransitionParams,
	WithAsChild,
} from "$lib/internal/index.js";

type BaseAccordionProps = {
	disabled?: boolean;
};

export type SingleAccordionProps = BaseAccordionProps & {
	type: "single";
	value?: string;
	onValueChange?: OnChangeFn<string>;
};

export type MultipleAccordionProps = BaseAccordionProps & {
	type: "multiple";
	value?: string[];
	onValueChange?: OnChangeFn<string[]>;
};

export type AccordionRootPropsWithoutHTML =
	| WithAsChild<SingleAccordionProps>
	| WithAsChild<MultipleAccordionProps>;

export type AccordionRootProps = AccordionRootPropsWithoutHTML & PrimitiveDivAttributes;

export type AccordionTriggerPropsWithoutHTML = WithAsChild<{
	id?: string;
	disabled?: boolean;
	onclick?: EventCallback<MouseEvent>;
	onkeydown?: EventCallback<KeyboardEvent>;
}>;

export type AccordionTriggerProps = AccordionTriggerPropsWithoutHTML &
	Omit<PrimitiveButtonAttributes, "disabled" | "onclick" | "onkeydown">;

export type AccordionItemContext = {
	value: string;
	disabled: boolean;
};

export type AccordionItemPropsWithoutHTML = WithAsChild<{
	value: string;
	disabled?: boolean;
}>;

export type AccordionItemProps = AccordionItemPropsWithoutHTML & PrimitiveDivAttributes;

export type AccordionContentPropsWithoutHTML<
	T extends Transition = Transition,
	In extends Transition = Transition,
	Out extends Transition = Transition,
> = WithAsChild<{
	transition?: T;
	transitionConfig?: TransitionParams<T>;
	inTransition?: In;
	inTransitionConfig?: TransitionParams<In>;
	outTransition?: Out;
	outTransitionConfig?: TransitionParams<Out>;
	forceMount?: boolean;
	id?: string;
}>;

export type AccordionContentProps<
	T extends Transition = Transition,
	In extends Transition = Transition,
	Out extends Transition = Transition,
> = AccordionContentPropsWithoutHTML<T, In, Out> & Omit<PrimitiveDivAttributes, "id">;

export type AccordionHeaderPropsWithoutHTML = WithAsChild<{
	asChild?: boolean;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}>;

export type AccordionHeaderProps = AccordionHeaderPropsWithoutHTML & PrimitiveDivAttributes;
