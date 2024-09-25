import type {
	SliderRangePropsWithoutHTML,
	SliderRootPropsWithoutHTML,
	SliderThumbPropsWithoutHTML,
	SliderTickPropsWithoutHTML,
} from "bits-ui";
import {
	controlledValueProp,
	createApiSchema,
	createBooleanProp,
	createEnumProp,
	createFunctionProp,
	createNumberProp,
	dirProp,
	enums,
	withChildProps,
} from "$lib/content/api-reference/helpers.js";
import * as C from "$lib/content/constants.js";

const root = createApiSchema<SliderRootPropsWithoutHTML>({
	title: "Root",
	description: "The root slider component which contains the remaining slider components.",
	props: {
		value: {
			default: "[]",
			type: "number[]",
			description: "The current value of the slider.",
			bindable: true,
		},
		onValueChange: createFunctionProp({
			definition: "(value: number[]) => void",
			description: "A callback function called when the value state of the slider changes.",
		}),
		onValueChangeEnd: createFunctionProp({
			definition: "(value: number[]) => void",
			description:
				"A callback function called when the user finishes dragging the thumb and the value changes. This is different than the `onValueChange` callback because it waits until the user stops dragging before calling the callback, where the `onValueChange` callback is called immediately after the user starts dragging.",
		}),
		controlledValue: controlledValueProp,
		disabled: createBooleanProp({
			default: C.FALSE,
			description: "Whether or not the switch is disabled.",
		}),
		max: createNumberProp({
			default: "100",
			description: "The maximum value of the slider.",
		}),
		min: createNumberProp({
			default: "0",
			description: "The minimum value of the slider.",
		}),
		orientation: createEnumProp({
			options: ["horizontal", "vertical"],
			default: '"horizontal"',
			description: "The orientation of the slider.",
		}),
		step: createNumberProp({
			default: "1",
			description: "The step value of the slider.",
		}),
		dir: dirProp,
		autoSort: createBooleanProp({
			default: C.TRUE,
			description:
				"Whether to automatically sort the values in the array when moving thumbs past one another.",
		}),
		...withChildProps({ elType: "HTMLSpanElement" }),
	},
	dataAttributes: [
		{
			name: "orientation",
			description: "The orientation of the slider.",
			value: enums("horizontal", "vertical"),
			isEnum: true,
		},
		{
			name: "slider-root",
			description: "Present on the root element.",
		},
	],
});

const thumb = createApiSchema<SliderThumbPropsWithoutHTML>({
	title: "Thumb",
	description: "A thumb on the slider.",
	props: {
		index: createNumberProp({
			description:
				"The index of the thumb in the array of thumbs provided by the `thumbs` `children` snippet prop.",
			required: true,
		}),
		disabled: createBooleanProp({
			default: C.FALSE,
			description: "Whether or not the thumb is disabled.",
		}),
		...withChildProps({ elType: "HTMLSpanElement" }),
	},
	dataAttributes: [
		{
			name: "slider-thumb",
			description: "Present on the thumb elements.",
		},
	],
});

const range = createApiSchema<SliderRangePropsWithoutHTML>({
	title: "Range",
	description: "The range of the slider.",
	props: withChildProps({ elType: "HTMLSpanElement" }),
	dataAttributes: [
		{
			name: "slider-range",
			description: "Present on the range elements.",
		},
	],
});

const tick = createApiSchema<SliderTickPropsWithoutHTML>({
	title: "Tick",
	description: "A tick mark on the slider.",
	props: {
		index: createNumberProp({
			description:
				"The index of the tick in the array of ticks provided by the `ticks` `children` snippet prop.",
			required: true,
		}),
		...withChildProps({ elType: "HTMLSpanElement" }),
	},
	dataAttributes: [
		{
			name: "bounded",
			description: "Present when the tick is bounded.",
		},
		{
			name: "slider-tick",
			description: "Present on the tick elements.",
		},
	],
});

export const slider = [root, range, thumb, tick];
