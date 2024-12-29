import type { FocusableElement } from "tabbable";

interface Options {
	preventScroll?: boolean;
	cancelPrevious?: boolean;
	sync?: boolean;
}

let raf = 0;

export function enqueueFocus(node: FocusableElement | null, options: Options = {}) {
	const { preventScroll = false, cancelPrevious = true, sync = false } = options;
	if (cancelPrevious) cancelAnimationFrame(raf);
	const exec = () => node?.focus({ preventScroll });

	if (sync) {
		exec();
	} else {
		raf = requestAnimationFrame(exec);
	}
}
