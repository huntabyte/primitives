import type { Getter, MaybeGetter } from "svelte-toolbelt";

export function extract<T>(valueOrGetValue: MaybeGetter<T>): T {
	return typeof valueOrGetValue === "function"
		? (valueOrGetValue as Getter<T>)()
		: valueOrGetValue;
}
