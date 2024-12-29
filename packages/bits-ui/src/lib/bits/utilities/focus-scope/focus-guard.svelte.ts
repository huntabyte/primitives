import { type WithRefProps, srOnlyStylesString, useRefById } from "svelte-toolbelt";
import { useEventListener } from "runed";
import { kbd } from "$lib/internal/kbd.js";
import { isSafari } from "$lib/internal/is.js";
import { getAriaHidden } from "$lib/internal/attrs.js";

let activeElement: HTMLElement | undefined;
let timeoutId: number | undefined;

function setActiveElementOnTab(e: KeyboardEvent) {
	if (e.key === kbd.TAB) {
		activeElement = e.target as typeof activeElement;
		clearTimeout(timeoutId);
	}
}

type FocusGuardProps = WithRefProps;

class FocusGuard {
	role = $state<"button" | undefined>();
	#ref: FocusGuardProps["ref"];
	#id: FocusGuardProps["id"];

	constructor(props: FocusGuardProps) {
		this.#ref = props.ref;
		this.#id = props.id;

		useRefById({
			id: this.#id,
			ref: this.#ref,
		});

		$effect(() => {
			if (isSafari()) {
				this.role = "button";
			}
		});

		useEventListener(document, "keydown", setActiveElementOnTab);
	}

	props = $derived.by(
		() =>
			({
				id: this.#id.current,
				tabIndex: 0,
				role: this.role,
				"aria-hidden": getAriaHidden(Boolean(this.role)),
				"data-focus-guard": "",
				style: srOnlyStylesString,
			}) as const
	);
}

export function useFocusGuard(props: FocusGuardProps) {
	return new FocusGuard(props);
}
