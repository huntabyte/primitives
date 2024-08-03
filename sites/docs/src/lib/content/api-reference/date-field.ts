import type {
	DateFieldInputPropsWithoutHTML,
	DateFieldLabelPropsWithoutHTML,
	DateFieldRootPropsWithoutHTML,
	DateFieldSegmentPropsWithoutHTML,
} from "bits-ui";
import {
	childrenSnippet,
	createApiSchema,
	createBooleanProp,
	createDataAttrSchema,
	createEnumDataAttr,
	createEnumProp,
	createFunctionProp,
	createStringProp,
	withChildProps,
} from "./helpers.js";
import { dateValueProp } from "./extended-types/index.js";
import { enums } from "$lib/content/api-reference/helpers.js";
import * as C from "$lib/content/constants.js";

export const root = createApiSchema<DateFieldRootPropsWithoutHTML>({
	title: "Root",
	description: "The root date field component.",
	props: {
		value: {
			type: dateValueProp,
			description: "The selected date.",
			bindable: true,
		},
		onValueChange: createFunctionProp({
			definition: "(date: DateValue | undefined) => void",
			description: "A function that is called when the selected date changes.",
		}),
		placeholder: {
			type: dateValueProp,
			description:
				"The placeholder date, which is used to determine what date to start the segments from when no value exists.",
			bindable: true,
		},
		onPlaceholderChange: createFunctionProp({
			definition: "(date: DateValue) => void",
			description: "A function that is called when the placeholder date changes.",
		}),

		required: createBooleanProp({
			description: "Whether or not the date field is required.",
			default: C.FALSE,
		}),
		isDateUnavailable: createFunctionProp({
			definition: "(date: DateValue) => boolean",
			description: "A function that returns whether or not a date is unavailable.",
		}),
		hourCycle: createEnumProp({
			options: ["12", "24"],
			description:
				"The hour cycle to use for formatting times. Defaults to the locale preference",
		}),
		granularity: createEnumProp({
			options: ["day", "hour", "minute", "second"],
			description:
				"The granularity to use for formatting the field. Defaults to `'day'` if a `CalendarDate` is provided, otherwise defaults to `'minute'`. The field will render segments for each part of the date up to and including the specified granularity.",
		}),
		hideTimeZone: createBooleanProp({
			description: "Whether or not to hide the time zone segment of the field.",
			default: C.FALSE,
		}),
		maxValue: {
			type: dateValueProp,
			description: "The maximum valid date that can be entered.",
		},
		minValue: {
			type: dateValueProp,
			description: "The minimum valid date that can be entered.",
		},
		locale: createStringProp({
			description: "The locale to use for formatting dates.",
			default: "'en-US'",
		}),
		disabled: createBooleanProp({
			default: C.FALSE,
			description: "Whether or not the accordion is disabled.",
		}),
		readonly: createBooleanProp({
			description: "Whether or not the field is readonly.",
			default: C.FALSE,
		}),
		readonlySegments: {
			type: {
				type: C.ARRAY,
				definition: "EditableSegmentPart[]",
			},
			description:
				"An array of segments that should be readonly, which prevent user input on them.",
		},
		children: childrenSnippet(),
	},
});

export const input = createApiSchema<DateFieldInputPropsWithoutHTML>({
	title: "Input",
	description: "The container for the segments of the date field.",
	props: {
		name: createStringProp({
			description:
				"The name of the date field used for form submission. If provided, a hidden input element will be rendered alongside the date field.",
		}),
		...withChildProps({ elType: "HTMLDivElement" }),
	},
	dataAttributes: [
		createDataAttrSchema({
			name: "invalid",
			description: "Present on the element when the field is invalid.",
		}),
		createDataAttrSchema({
			name: "disabled",
			description: "Present on the element when the field is disabled.",
		}),
		createDataAttrSchema({
			name: "date-field-input",
			description: "Present on the element.",
		}),
	],
});

export const segment = createApiSchema<DateFieldSegmentPropsWithoutHTML>({
	title: "Segment",
	description: "A segment of the date field.",
	props: {
		part: {
			type: {
				type: "SegmentPart",
				definition: enums(
					"month",
					"day",
					"year",
					"hour",
					"minute",
					"second",
					"dayPeriod",
					"timeZoneName",
					"literal"
				),
			},
			description: "The part of the date to render.",
			required: true,
		},
		...withChildProps({ elType: "HTMLDivElement" }),
	},
	dataAttributes: [
		createDataAttrSchema({
			name: "invalid",
			description: "Present on the element when the field is invalid",
		}),
		createDataAttrSchema({
			name: "disabled",
			description: "Present on the element when the field is disabled",
		}),
		createDataAttrSchema({
			name: "readonly",
			description: "Present on the element when the field or segment is readonly",
		}),
		createEnumDataAttr({
			name: "segment",
			description: "The part of the date to render.",
			options: [
				"day",
				"month",
				"year",
				"hour",
				"minute",
				"second",
				"dayPeriod",
				"timeZoneName",
				"literal",
			],
		}),
		createDataAttrSchema({
			name: "date-field-segment",
			description: "Present on the element.",
		}),
	],
});

export const label = createApiSchema<DateFieldLabelPropsWithoutHTML>({
	title: "Label",
	description: "The label for the date field.",
	props: withChildProps({ elType: "HTMLSpanElement" }),
	dataAttributes: [
		createDataAttrSchema({
			name: "invalid",
			description: "Present on the element when the field is invalid",
		}),
		createDataAttrSchema({
			name: "disabled",
			description: "Present on the element when the field is disabled",
		}),
		createDataAttrSchema({
			name: "date-field-label",
			description: "Present on the element.",
		}),
	],
});

export const dateField = [root, input, segment, label];
