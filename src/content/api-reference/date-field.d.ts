import type * as DateField from "$lib/bits/date-field/_types.js";
import type { APISchema } from "@/types";
export declare const root: APISchema<DateField.Props>;
export declare const segment: APISchema<DateField.SegmentProps>;
export declare const label: APISchema<DateField.LabelProps>;
export declare const dateField: (APISchema<{
    disabled?: boolean | undefined;
    minValue?: import("@internationalized/date").DateValue | undefined;
    maxValue?: import("@internationalized/date").DateValue | undefined;
    isDateUnavailable?: import("@melt-ui/svelte").Matcher | undefined;
    locale?: string | undefined;
    readonly?: boolean | undefined;
    hourCycle?: 12 | 24 | undefined;
    granularity?: import("@melt-ui/svelte").Granularity | undefined;
    hideTimeZone?: boolean | undefined;
    value?: import("@internationalized/date").DateValue | undefined;
    onValueChange?: import("../../lib/internal").OnChangeFn<import("@internationalized/date").DateValue | undefined> | undefined;
    placeholder?: import("@internationalized/date").DateValue | undefined;
    onPlaceholderChange?: import("../../lib/internal").OnChangeFn<import("@internationalized/date").DateValue> | undefined;
    validationId?: string | undefined;
    descriptionId?: string | undefined;
}> | APISchema<{
    asChild?: boolean | undefined;
    el?: HTMLDivElement | undefined;
}>)[];
