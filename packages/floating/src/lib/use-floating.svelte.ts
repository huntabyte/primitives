import { computePosition } from "@floating-ui/dom";
import type {
	ComputePositionConfig,
	ReferenceType,
	UseFloatingData,
	UseFloatingOptions,
	UseFloatingReturn,
} from "./types.js";
import { deepEqual } from "./utils/deep-equal.js";
import { getDPR, roundByDPR } from "./utils/dpr.js";
import { extract } from "./utils/extract.js";

export function useFloating<RT extends ReferenceType = ReferenceType>(
	options: UseFloatingOptions = {}
): UseFloatingReturn<RT> {
	const { whileElementsMounted } = options.whileElementsMounted;
	const open = $derived(extract(options.open) ?? true);
	const middleware = $derived(extract(options.middleware) ?? []);
	const transform = $derived(extract(options.transform) ?? true);
	const placement = $derived(extract(options.placement) ?? "bottom");
	const strategy = $derived(extract(options.strategy) ?? "absolute");
	const externalReference = $derived(extract(options.elements?.reference));
	const externalFloating = $derived(extract(options.elements?.floating));
	const platform = $derived(extract(options.platform));

	let data = $state.raw<UseFloatingData>({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false,
	});

	let latestMiddleware = $state.raw(middleware);

	if (!deepEqual(latestMiddleware, middleware)) {
		latestMiddleware = middleware;
	}

	let _reference = $state.raw<RT | null>(null);
	let _floating = $state.raw<HTMLElement | null>(null);

	let reference = $state<RT | null>(null);
	let floating = $state<HTMLElement | null>(null);
}
