import { getContext, setContext } from "svelte";
import {
	getAriaChecked,
	getAriaPressed,
	getAttrAndSelector,
	getDataDisabled,
	getDataOrientation,
} from "$lib/internal/attrs.js";
import type { Box, BoxedValues, ReadonlyBoxedValues } from "$lib/internal/box.svelte.js";
import { getDirectionalKeys, kbd } from "$lib/internal/kbd.js";
import { getElemDirection } from "$lib/internal/locale.js";
import { useNodeById } from "$lib/internal/use-node-by-id.svelte.js";
import type { Orientation } from "$lib/shared/index.js";
import { verifyContextDeps } from "$lib/internal/context.js";

const [ROOT_ATTR] = getAttrAndSelector("toggle-group-root");
const [ITEM_ATTR, ITEM_SELECTOR] = getAttrAndSelector("toggle-group-item");

type ToggleGroupBaseStateProps = ReadonlyBoxedValues<{
	id: string;
	disabled: boolean;
	rovingFocus: boolean;
	loop: boolean;
	orientation: Orientation;
}>;

class ToggleGroupBaseState {
	id = undefined as unknown as ToggleGroupBaseStateProps["id"];
	node: Box<HTMLElement | null>;
	disabled = undefined as unknown as ToggleGroupBaseStateProps["disabled"];
	rovingFocus = undefined as unknown as ToggleGroupBaseStateProps["rovingFocus"];
	loop = undefined as unknown as ToggleGroupBaseStateProps["loop"];
	orientation = undefined as unknown as ToggleGroupBaseStateProps["orientation"];

	constructor(props: ToggleGroupBaseStateProps) {
		this.id = props.id;
		this.node = useNodeById(this.id);
		this.disabled = props.disabled;
		this.rovingFocus = props.rovingFocus;
		this.loop = props.loop;
		this.orientation = props.orientation;
	}

	getItemNodes() {
		const node = this.node.value;
		if (!node) return [];
		return Array.from(node.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
			(el) => !el.hasAttribute("data-disabled")
		);
	}

	props = $derived({
		id: this.id.value,
		[ROOT_ATTR]: "",
		role: "group",
		"data-orientation": getDataOrientation(this.orientation.value),
		"data-disabled": getDataDisabled(this.disabled.value),
	} as const);
}

//
// SINGLE
//

type ToggleGroupSingleStateProps = ToggleGroupBaseStateProps &
	BoxedValues<{
		value: string;
	}>;

class ToggleGroupSingleState extends ToggleGroupBaseState {
	value = undefined as unknown as ToggleGroupSingleStateProps["value"];
	isMulti = false;

	constructor(props: ToggleGroupSingleStateProps) {
		super(props);
		this.value = props.value;
	}

	includesItem(item: string) {
		return this.value.value === item;
	}

	toggleItem(item: string) {
		this.value.value = this.includesItem(item) ? "" : item;
	}

	anyPressed() {
		return this.value.value !== "";
	}
}

//
// MULTIPLE
//

type ToggleGroupMultipleStateProps = ToggleGroupBaseStateProps &
	BoxedValues<{
		value: string[];
	}>;

class ToggleGroupMultipleState extends ToggleGroupBaseState {
	value = undefined as unknown as ToggleGroupMultipleStateProps["value"];
	isMulti = true;

	constructor(props: ToggleGroupMultipleStateProps) {
		super(props);
		this.value = props.value;
	}

	includesItem(item: string) {
		return this.value.value.includes(item);
	}

	toggleItem(item: string) {
		if (this.includesItem(item)) {
			this.value.value = this.value.value.filter((v) => v !== item);
		} else {
			this.value.value.push(item);
		}
	}

	anyPressed() {
		return this.value.value.length > 0;
	}
}

type ToggleGroupState = ToggleGroupSingleState | ToggleGroupMultipleState;

//
// ITEM
//

type ToggleGroupItemStateProps = ReadonlyBoxedValues<{
	id: string;
	value: string;
	disabled: boolean;
}> & {
	rootState: ToggleGroupState;
};

class ToggleGroupItemState {
	#id = undefined as unknown as ToggleGroupItemStateProps["id"];
	#root = undefined as unknown as ToggleGroupItemStateProps["rootState"];
	#value = undefined as unknown as ToggleGroupItemStateProps["value"];
	#node: Box<HTMLElement | null>;
	#disabled = undefined as unknown as ToggleGroupItemStateProps["disabled"];
	#isDisabled = $derived(this.#disabled.value || this.#root.disabled.value);

	constructor(props: ToggleGroupItemStateProps) {
		this.#value = props.value;
		this.#disabled = props.disabled;
		this.#root = props.rootState;
		this.#id = props.id;
		this.#node = useNodeById(this.#id);

		$effect(() => {
			const node = this.#node.value;
			if (!node) return;
			const items = this.#root.getItemNodes();
			const anyPressed = this.#root.anyPressed();
			if (!anyPressed && items[0] === node) {
				node.tabIndex = 0;
			}
		});
	}

	#onclick = () => {
		if (this.#isDisabled) return;
		this.#root.toggleItem(this.#value.value);
	};

	#onkeydown = (e: KeyboardEvent) => {
		if (this.#isDisabled) return;
		if (e.key === kbd.ENTER || e.key === kbd.SPACE) {
			e.preventDefault();
			this.#root.toggleItem(this.#value.value);
			return;
		}
		if (!this.#root.rovingFocus.value) return;

		const node = this.#node.value;
		if (!node) return;
		const items = this.#root.getItemNodes();

		const currentIndex = items.indexOf(node);

		const dir = getElemDirection(node);
		const { nextKey, prevKey } = getDirectionalKeys(dir, this.#root.orientation.value);

		const keyToIndex = {
			[nextKey]: currentIndex + 1,
			[prevKey]: currentIndex - 1,
			[kbd.HOME]: 0,
			[kbd.END]: items.length - 1,
		};

		let itemIndex = keyToIndex[e.key];
		if (itemIndex === undefined) return;
		e.preventDefault();
		const loop = this.#root.loop.value;

		if (itemIndex < 0 && loop) {
			itemIndex = items.length - 1;
		} else if (itemIndex === items.length && loop) {
			itemIndex = 0;
		}

		const itemToFocus = items[itemIndex];
		if (!itemToFocus) return;
		itemToFocus.focus();
	};

	isPressed() {
		return this.#root.includesItem(this.#value.value);
	}

	getAriaPressed() {
		return this.#root.isMulti
			? getAriaPressed(this.#root.includesItem(this.#value.value))
			: undefined;
	}

	getAriaChecked() {
		return this.#root.isMulti
			? undefined
			: getAriaChecked(this.#root.includesItem(this.#value.value));
	}

	getTabIndex() {
		if (this.#root.rovingFocus.value) {
			return this.isPressed() ? 0 : -1;
		}
		return 0;
	}

	props = $derived({
		id: this.#id.value,
		role: this.#root.isMulti ? undefined : "radio",
		tabindex: this.getTabIndex(),
		"data-orientation": getDataOrientation(this.#root.orientation.value),
		"data-disabled": getDataDisabled(this.#isDisabled),
		"data-state": getToggleItemDataState(this.isPressed()),
		"data-value": this.#value.value,
		"aria-pressed": this.getAriaPressed(),
		"aria-checked": this.getAriaChecked(),
		[ITEM_ATTR]: "",
		//
		onclick: this.#onclick,
		onkeydown: this.#onkeydown,
	});
}

//
// HELPERS
//

function getToggleItemDataState(condition: boolean) {
	return condition ? "on" : "off";
}

//
// CONTEXT METHODS
//

const TOGGLE_GROUP_ROOT_KEY = Symbol("ToggleGroup.Root");

type InitToggleGroupProps = {
	type: "single" | "multiple";
	value: Box<string> | Box<string[]>;
} & ReadonlyBoxedValues<{
	id: string;
	disabled: boolean;
	rovingFocus: boolean;
	loop: boolean;
	orientation: Orientation;
}>;

export function setToggleGroupRootState(props: InitToggleGroupProps) {
	const { type, ...rest } = props;
	const rootState =
		type === "single"
			? new ToggleGroupSingleState(rest as ToggleGroupSingleStateProps)
			: new ToggleGroupMultipleState(rest as ToggleGroupMultipleStateProps);
	return setContext(TOGGLE_GROUP_ROOT_KEY, rootState);
}

export function getToggleGroupRootState(): ToggleGroupState {
	verifyContextDeps(TOGGLE_GROUP_ROOT_KEY);
	return getContext(TOGGLE_GROUP_ROOT_KEY);
}

export function setToggleGroupItemState(props: Omit<ToggleGroupItemStateProps, "rootState">) {
	const rootState = getToggleGroupRootState();
	return new ToggleGroupItemState({ ...props, rootState });
}
