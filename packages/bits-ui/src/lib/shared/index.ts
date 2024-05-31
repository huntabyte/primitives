import type { DateValue } from "@internationalized/date";
import type { EditableSegmentPart, Month } from "@melt-ui/svelte";
import type * as CSS from "csstype";

export type Selected<Value> = {
	value: Value;
	label?: string;
};

export type DateRange = {
	start: DateValue | undefined;
	end: DateValue | undefined;
};

export type SegmentPart =
	| "month"
	| "day"
	| "year"
	| "hour"
	| "minute"
	| "second"
	| "dayPeriod"
	| "timeZoneName"
	| "literal";

export type FocusTarget = string | HTMLElement | SVGElement | null;
export type FocusProp = FocusTarget | ((defaultEl?: HTMLElement | null) => FocusTarget);

export type StyleProperties = CSS.Properties;

export type Orientation = "horizontal" | "vertical";
export type Direction = "ltr" | "rtl";

export type WithoutChildren<T> = Omit<T, "children" | "asChild" | "child">;

export type { Month, EditableSegmentPart };
