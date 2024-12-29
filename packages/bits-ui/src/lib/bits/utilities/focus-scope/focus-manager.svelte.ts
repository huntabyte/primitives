const LIST_LIMIT = 20;
let previouslyFocusedElements: Element[] = [];

function addPreviouslyFocusedElement(element: Element | null) {
	previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
}
