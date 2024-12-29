import { isHTMLElement, isNode, isShadowRoot } from "./is.js";
import { isAndroid } from "./platform.js";

export function getFirstNonCommentChild(element: HTMLElement | null) {
	if (!element) return null;
	for (const child of element.childNodes) {
		if (child.nodeType !== Node.COMMENT_NODE) {
			return child;
		}
	}
	return null;
}

export function hasWindow() {
	return typeof window !== "undefined";
}

// eslint-disable-next-line ts/no-explicit-any
export function getWindow(node: any): typeof window {
	return node?.ownerDocument?.defaultView || window;
}

export function getNodeName(node: Node | Window): string {
	if (isNode(node)) {
		return (node.nodeName || "").toLowerCase();
	}
	// Mocked nodes in testing environments may not be instances of Node. By
	// returning `#document` an infinite loop won't occur.
	return "#document";
}

export function getComputedStyle(element: Element): CSSStyleDeclaration {
	return getWindow(element).getComputedStyle(element);
}

export function activeElement(doc: Document) {
	let activeElement = doc.activeElement;

	while (activeElement?.shadowRoot?.activeElement != null) {
		activeElement = activeElement.shadowRoot.activeElement;
	}

	return activeElement;
}

export function contains(parent?: Element | null, child?: Element | null) {
	if (!parent || !child) return false;

	const rootNode = child.getRootNode?.();

	// first attempt with faster native method
	if (parent.contains(child)) return true;

	// then fallback to custom impl with shadow dom support
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			// @ts-expect-error - TS doesn't know about host property
			next = next.parentNode || next.host;
		}
	}

	// give up, result is false
	return false;
}

export function getDocument(node: Element | null) {
	return node?.ownerDocument || document;
}

// License: https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/utils/src/isVirtualEvent.ts
export function isVirtualClick(event: MouseEvent | PointerEvent): boolean {
	// eslint-disable-next-line ts/no-explicit-any
	if ((event as any).mozInputSource === 0 && event.isTrusted) return true;

	if (isAndroid() && (event as PointerEvent).pointerType) {
		return event.type === "click" && event.buttons === 1;
	}
	return event.detail === 0 && !(event as PointerEvent).pointerType;
}

export function isVirtualPointerEvent(event: PointerEvent) {
	return (
		(!isAndroid() && event.width === 0 && event.height === 0) ||
		(isAndroid() &&
			event.width === 1 &&
			event.height === 1 &&
			event.pressure === 0 &&
			event.detail === 0 &&
			event.pointerType === "mouse") ||
		(event.width < 1 &&
			event.height < 1 &&
			event.pressure === 0 &&
			event.detail === 0 &&
			event.pointerType === "touch")
	);
}

export const TYPEABLE_SELECTOR =
	"input:not([type='hidden']):not([disabled])," +
	"[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";

export function isTypeableElement(element: unknown): boolean {
	return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}

export function stopEvent(event: Event) {
	event.preventDefault();
	event.stopPropagation();
}

export function isTypeableCombobox(element: Element | null) {
	if (!element) return false;
	return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
