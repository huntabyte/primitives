import { CalendarDateTime, type DateValue } from "@internationalized/date";
import type { BitsFocusEvent, BitsKeyboardEvent } from "$lib/internal/types.js";
import { kbd } from "$lib/internal/kbd.js";
import { isNumberString } from "$lib/internal/is.js";
import {
	handleSegmentNavigation,
	isSegmentNavigationKey,
	moveToNextSegment,
	moveToPrevSegment,
} from "$lib/internal/date-time/field/segments.js";
import { toDate } from "$lib/internal/date-time/utils.js";
import type { DateFieldRootState } from "./date-field.svelte.js";
import type { SegmentPart } from "$lib/shared/index.js";
import { isSegmentPart } from "$lib/internal/date-time/field/helpers.js";

export interface SegmentConfig<T extends DateValue> {
	min: number;
	max: number;
	formatValue?: (value: number) => string;
	getAnnouncement?: (value: number, root: DateFieldRootState) => string;
	cycleValue?: (
		placeholder: T,
		prevValue: string | null,
		direction: 1 | -1,
		root: DateFieldRootState
	) => number;
	handleSpecialCases?: (value: number, root: DateFieldRootState) => string | undefined;
	onZeroKey?: (
		num: number,
		root: DateFieldRootState
	) => { value: string; moveToNext: boolean } | undefined;
}

export interface SegmentContext {
	root: DateFieldRootState;
	part: SegmentPart;
	segmentState: {
		hasLeftFocus: boolean;
		lastKeyZero: boolean;
		updating: string | null;
	};
}

export class SegmentHandler<T extends DateValue> {
	min: SegmentConfig<T>["min"];
	max: SegmentConfig<T>["max"];
	formatValue: (value: number) => string;
	getAnnouncement: (value: number, root: DateFieldRootState) => string;
	cycleValue: SegmentConfig<T>["cycleValue"];
	handleSpecialCases: SegmentConfig<T>["handleSpecialCases"];
	root: SegmentContext["root"];
	updateSegment: (typeof this.root)["updateSegment"];
	placeholder: (typeof this.root)["placeholder"];
	part: SegmentContext["part"];
	segmentState: SegmentContext["segmentState"];
	maxStart: number;

	constructor(config: SegmentConfig<T>, context: SegmentContext) {
		this.min = config.min;
		this.max = config.max;
		this.maxStart = Math.floor(this.max / 10);
		this.formatValue =
			config.formatValue ?? ((value) => (value < 10 ? `0${value}` : `${value}`));
		this.getAnnouncement = config.getAnnouncement ?? ((value) => `${value}`);
		this.cycleValue = config.cycleValue;
		this.handleSpecialCases = config.handleSpecialCases;
		this.root = context.root;
		this.updateSegment = context.root.updateSegment;
		this.placeholder = context.root.placeholder;
		this.part = context.part;
		this.segmentState = context.segmentState;
	}

	handleArrowKey(e: BitsKeyboardEvent, direction: 1 | -1) {
		if (!isSegmentPart(this.part)) return;
		this.updateSegment(this.part, (prev: string | null) => {
			if (prev === null) {
				const next = this.cycleValue
					? this.cycleValue(this.placeholder.current as T, prev, direction, this.root)
					: direction === 1
						? this.min
						: this.max;
				this.root.announcer.announce(this.getAnnouncement?.(next, this.root));
				return this.formatValue?.(next);
			}

			const currentValue = Number.parseInt(prev);
			const next = this.cycleValue
				? this.cycleValue(this.placeholder.current as T, prev, direction, this.root)
				: // @ts-expect-error - shh
					placeholder.set({ [part]: currentValue }).cycle(part, direction)[part];

			// Handle special cases (like hour 0 -> 12 in 12h format)
			const specialCase = this.handleSpecialCases?.(next, this.root);
			if (specialCase) {
				this.root.announcer.announce(specialCase);
				return specialCase;
			}

			this.root.announcer.announce(this.getAnnouncement(next, this.root));
			return this.formatValue(next);
		});
	}

	handleNumberKey(e: BitsKeyboardEvent) {
		const num = Number.parseInt(e.key);
		let moveToNext = false;
		const numIsZero = num === 0;
		if (!isSegmentPart(this.part)) return;

		this.updateSegment(this.part, (prev: string | null) => {
			if (this.segmentState.hasLeftFocus) {
				prev = null;
				this.segmentState.hasLeftFocus = false;
			}

			if (prev === null) {
				if (numIsZero) {
					this.segmentState.lastKeyZero = true;
					this.root.announcer.announce("0");
					return "0";
				}

				if (this.segmentState.lastKeyZero || num > this.maxStart) {
					moveToNext = true;
				}

				this.segmentState.lastKeyZero = false;

				if (moveToNext && String(num).length === 1) {
					this.root.announcer.announce(String(num));
					return this.formatValue(num);
				}

				return String(num);
			}

			const total = Number.parseInt(prev + num.toString());

			if (this.segmentState.lastKeyZero) {
				if (num !== 0) {
					moveToNext = true;
					this.segmentState.lastKeyZero = false;
					return this.formatValue(num);
				}
				return prev;
			}

			if (total > this.max) {
				moveToNext = true;
				return this.formatValue(num);
			}

			moveToNext = true;
			return String(total);
		});

		return moveToNext;
	}

	handleBackspace(_: BitsKeyboardEvent) {
		let moveToPrev = false;
		if (!isSegmentPart(this.part)) return;

		this.updateSegment(this.part, (prev: string | null) => {
			this.segmentState.hasLeftFocus = false;
			if (prev === null) {
				moveToPrev = true;
				this.root.announcer.announce(null);
				return null;
			}

			if (prev.length === 2 && prev.startsWith("0")) {
				this.root.announcer.announce(null);
				return null;
			}

			const str = prev.toString();
			if (str.length === 1) {
				this.root.announcer.announce(null);
				return null;
			}

			const next = str.slice(0, -1);
			this.root.announcer.announce(next);
			return next;
		});

		return moveToPrev;
	}

	handleKeyDown = (e: BitsKeyboardEvent) => {
		if (e.ctrlKey || e.metaKey || this.root.disabled.current) return;
		if (e.key !== kbd.TAB) e.preventDefault();
		if (!isAcceptableSegmentKey(e.key)) return;

		if (isArrowUp(e.key)) {
			this.handleArrowKey(e, 1);
			return;
		}

		if (isArrowDown(e.key)) {
			this.handleArrowKey(e, -1);
			return;
		}

		const fieldNode = this.root.getFieldNode();

		if (isNumberString(e.key)) {
			const shouldMoveNext = this.handleNumberKey(e);
			if (shouldMoveNext) {
				moveToNextSegment(e, fieldNode);
			}
		}

		if (isBackspace(e.key)) {
			const shouldMovePrev = this.handleBackspace(e);
			if (shouldMovePrev) {
				moveToPrevSegment(e, fieldNode);
			}
		}

		if (isSegmentNavigationKey(e.key)) {
			handleSegmentNavigation(e, fieldNode);
		}
	};
}

function isBackspace(key: string) {
	return key === kbd.BACKSPACE;
}

// Helper functions
function isArrowUp(key: string) {
	return key === kbd.ARROW_UP;
}

function isArrowDown(key: string) {
	return key === kbd.ARROW_DOWN;
}

function isAcceptableSegmentKey(key: string) {
	return (
		isNumberString(key) ||
		isArrowUp(key) ||
		isArrowDown(key) ||
		key === kbd.BACKSPACE ||
		isSegmentNavigationKey(key)
	);
}

export function createDaySegmentHandler(context: SegmentContext) {
	return new SegmentHandler(
		{
			min: 1,
			max: 31, // the actual max will be constrained by the current month,
			cycleValue: (placeholder, prev, direction) => {
				if (prev === null) return placeholder.day;
				return placeholder.set({ day: Number.parseInt(prev) }).cycle("day", direction).day;
			},
		},
		context
	).handleKeyDown;
}
export function createMonthSegmentHandler(context: SegmentContext) {
	return new SegmentHandler(
		{
			min: 1,
			max: 12,
			getAnnouncement: (month, root) => {
				return `${month} - ${root.formatter.fullMonth(toDate(root.placeholder.current.set({ month })))}`;
			},
			cycleValue: (placeholder, prev, direction) => {
				if (prev === null) return placeholder.month;
				return placeholder.set({ month: Number.parseInt(prev) }).cycle("month", direction)
					.month;
			},
		},
		context
	).handleKeyDown;
}

export function createYearSegmentHandler(context: SegmentContext) {
	const { root } = context;
	let pressedKeys: string[] = [];
	let backspaceCount = 0;

	function resetBackspaceCount() {
		backspaceCount = 0;
	}

	function incrementBackspaceCount() {
		backspaceCount++;
	}

	const handleKeyDown = (e: BitsKeyboardEvent) => {
		if (e.ctrlKey || e.metaKey || root.disabled.current) return;
		if (e.key !== kbd.TAB) e.preventDefault();
		if (!isAcceptableSegmentKey(e.key)) return;

		const placeholder = root.placeholder.current;

		if (isArrowUp(e.key)) {
			resetBackspaceCount();
			root.updateSegment("year", (prev) => {
				if (prev === null) {
					const next = placeholder.year;
					root.announcer.announce(next);
					return `${next}`;
				}
				const next = placeholder.set({ year: Number.parseInt(prev) }).cycle("year", 1).year;
				root.announcer.announce(next);
				return `${next}`;
			});
			return;
		}

		if (isArrowDown(e.key)) {
			resetBackspaceCount();
			root.updateSegment("year", (prev) => {
				if (prev === null) {
					const next = placeholder.year;
					root.announcer.announce(next);
					return `${next}`;
				}
				const next = placeholder
					.set({ year: Number.parseInt(prev) })
					.cycle("year", -1).year;
				root.announcer.announce(next);
				return `${next}`;
			});
			return;
		}

		if (isNumberString(e.key)) {
			pressedKeys.push(e.key);
			let moveToNext = false;
			const num = Number.parseInt(e.key);
			root.updateSegment("year", (prev) => {
				if (root.states.year.hasLeftFocus) {
					prev = null;
					root.states.year.hasLeftFocus = false;
				}

				if (prev === null) {
					root.announcer.announce(num);
					return `000${num}`;
				}

				const str = prev.toString() + num.toString();
				const mergedInt = Number.parseInt(str);
				const mergedIntDigits = String(mergedInt).length;

				if (mergedIntDigits < 4) {
					if (
						backspaceCount > 0 &&
						pressedKeys.length <= backspaceCount &&
						str.length <= 4
					) {
						root.announcer.announce(mergedInt);
						return str;
					}
					root.announcer.announce(mergedInt);
					return prependYearZeros(mergedInt);
				}

				root.announcer.announce(mergedInt);
				moveToNext = true;

				const mergedIntStr = `${mergedInt}`;
				if (mergedIntStr.length > 4) {
					return mergedIntStr.slice(0, 4);
				}

				return mergedIntStr;
			});

			if (pressedKeys.length === 4 || pressedKeys.length === backspaceCount) {
				moveToNext = true;
			}

			if (moveToNext) {
				moveToNextSegment(e, root.getFieldNode());
			}
		}

		if (isBackspace(e.key)) {
			pressedKeys = [];
			incrementBackspaceCount();
			let moveToPrev = false;
			root.updateSegment("year", (prev) => {
				root.states.year.hasLeftFocus = false;
				if (prev === null) {
					moveToPrev = true;
					root.announcer.announce(null);
					return null;
				}
				const str = prev.toString();
				if (str.length === 1) {
					root.announcer.announce(null);
					return null;
				}
				const next = str.slice(0, -1);
				root.announcer.announce(next);
				return `${next}`;
			});

			if (moveToPrev) {
				moveToPrevSegment(e, root.getFieldNode());
			}
		}

		if (isSegmentNavigationKey(e.key)) {
			handleSegmentNavigation(e, root.getFieldNode());
		}
	};

	const handleFocusOut = (_: BitsFocusEvent) => {
		root.states.year.hasLeftFocus = true;
		pressedKeys = [];
		resetBackspaceCount();
		root.updateSegment("year", (prev) => {
			if (prev && prev.length !== 4) {
				return prependYearZeros(Number.parseInt(prev));
			}
			return prev;
		});
	};

	return { handleKeyDown, handleFocusOut };
}

export function createHourSegmentHandler(context: SegmentContext) {
	const { root } = context;
	const is24Hour = root.hourCycle.current === 24;

	return new SegmentHandler<CalendarDateTime>(
		{
			min: is24Hour ? 0 : 1,
			max: is24Hour ? 23 : 12,
			formatValue: (value) => (value < 10 ? `0${value}` : `${value}`),
			cycleValue: (placeholder, prev, direction, root) => {
				const hourCycle = root.hourCycle.current;
				if (prev === null) {
					return placeholder.cycle("hour", direction, { hourCycle }).hour;
				}
				return placeholder
					.set({ hour: Number.parseInt(prev) })
					.cycle("hour", direction, { hourCycle }).hour;
			},
			handleSpecialCases: (value, root) => {
				if (value === 0) {
					if (root.dayPeriodNode && root.hourCycle.current !== 24) {
						return "12";
					}
					if (root.hourCycle.current === 24) {
						return "00";
					}
				}
				return undefined;
			},
		},
		context
	).handleKeyDown;
}
export function createMinuteSegmentHandler(context: SegmentContext) {
	return new SegmentHandler<CalendarDateTime>(
		{
			min: 0,
			max: 59,
			formatValue: (value) => (value < 10 ? `0${value}` : `${value}`),
			cycleValue: (placeholder, prev, direction) => {
				if (prev === null) return direction === 1 ? 0 : 59;
				return placeholder.set({ minute: Number.parseInt(prev) }).cycle("minute", direction)
					.minute;
			},
		},
		context
	).handleKeyDown;
}

export function createSecondSegmentHandler(context: SegmentContext) {
	return new SegmentHandler<CalendarDateTime>(
		{
			min: 0,
			max: 59,
			formatValue: (value) => (value < 10 ? `0${value}` : `${value}`),
			cycleValue: (placeholder, prev, direction) => {
				if (prev === null) {
					return direction === 1 ? 0 : 59;
				}
				return placeholder.set({ second: Number.parseInt(prev) }).cycle("second", direction)
					.second;
			},
		},
		context
	).handleKeyDown;
}

export function createLiteralSegmentHandler() {
	return (e: BitsKeyboardEvent) => {
		if (e.key !== kbd.TAB) e.preventDefault();
	};
}

export function createTimeZoneSegmentHandler(root: DateFieldRootState) {
	return (e: BitsKeyboardEvent) => {
		if (e.key !== kbd.TAB) e.preventDefault();
		if (root.disabled.current) return;
		if (isSegmentNavigationKey(e.key)) {
			handleSegmentNavigation(e, root.getFieldNode());
		}
	};
}

export function createDayPeriodSegmentHandler(context: SegmentContext) {
	const { root } = context;

	return function handleKeyDown(e: BitsKeyboardEvent) {
		if (e.ctrlKey || e.metaKey || root.disabled.current) return;
		if (e.key !== kbd.TAB) e.preventDefault();

		const isValidKey =
			isArrowUp(e.key) ||
			isArrowDown(e.key) ||
			isBackspace(e.key) ||
			e.key === kbd.A ||
			e.key === kbd.P ||
			e.key === kbd.a ||
			e.key === kbd.p ||
			isSegmentNavigationKey(e.key);

		if (!isValidKey) return;

		if (isArrowUp(e.key) || isArrowDown(e.key)) {
			root.updateSegment("dayPeriod", (prev) => {
				const next = prev === "AM" ? "PM" : "AM";
				root.announcer.announce(next);
				return next;
			});
			return;
		}

		if (isBackspace(e.key)) {
			root.states.dayPeriod.hasLeftFocus = false;
			root.updateSegment("dayPeriod", () => {
				const next = "AM";
				root.announcer.announce(next);
				return next;
			});
		}

		if (e.key === kbd.A || e.key === kbd.a || e.key === kbd.P || e.key === kbd.p) {
			root.updateSegment("dayPeriod", () => {
				const next = e.key.toUpperCase() === "A" ? "AM" : "PM";
				root.announcer.announce(next);
				return next;
			});
		}

		if (isSegmentNavigationKey(e.key)) {
			handleSegmentNavigation(e, root.getFieldNode());
		}
	};
}
function prependYearZeros(year: number) {
	const digits = String(year).length;
	const diff = 4 - digits;
	return `${"0".repeat(diff)}${year}`;
}
