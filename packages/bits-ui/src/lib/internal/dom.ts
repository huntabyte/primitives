import { isDocument, isHTMLElement, isShadowRoot, isWindow } from "./is.js";

export function getFirstNonCommentChild(element: HTMLElement | null) {
	if (!element) return null;
	for (const child of element.childNodes) {
		if (child.nodeType !== Node.COMMENT_NODE) {
			return child;
		}
	}
	return null;
}

// Credit to ZagJS on the idea/code to support the Shadow DOM
export function getDocument(node: Element | Window | Node | Document | null | undefined) {
	if (isDocument(node)) return node;
	if (isWindow(node)) return node.document;
	return node?.ownerDocument ?? document;
}

export function getDocumentElement(
	node: Element | Node | Window | Document | null | undefined
): HTMLElement {
	return getDocument(node).documentElement;
}

export function getWindow(node: Node | ShadowRoot | Document | null | undefined) {
	if (isShadowRoot(node)) return getWindow(node.host);
	if (isDocument(node)) return node.defaultView ?? window;
	if (isHTMLElement(node)) return node.ownerDocument?.defaultView ?? window;
	return window;
}

export function getActiveElement(rootNode: Document | ShadowRoot): HTMLElement | null {
	let activeElement = rootNode.activeElement as HTMLElement | null;

	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement as HTMLElement | null;
		if (el === activeElement) break;
		else activeElement = el;
	}

	return activeElement;
}
