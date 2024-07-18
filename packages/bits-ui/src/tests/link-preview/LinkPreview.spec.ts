import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { axe } from "jest-axe";
import { describe, it, vi } from "vitest";
import { getTestKbd, setupUserEvents } from "../utils.js";
import LinkPreviewTest, { type LinkPreviewTestProps } from "./LinkPreviewTest.svelte";

const kbd = getTestKbd();

function setup(props: LinkPreviewTestProps = {}) {
	const user = setupUserEvents();
	const { getByTestId, queryByTestId } = render(LinkPreviewTest, { ...props });
	const trigger = getByTestId("trigger");
	return { trigger, getByTestId, queryByTestId, user };
}

async function open(props: LinkPreviewTestProps = {}) {
	const { trigger, getByTestId, queryByTestId, user } = setup(props);
	expect(queryByTestId("content")).toBeNull();
	user.hover(trigger);
	await waitFor(() => expect(queryByTestId("content")).not.toBeNull());
	const content = getByTestId("content");
	return { trigger, getByTestId, queryByTestId, user, content };
}

describe("link preview", () => {
	it("has no accessibility violations", async () => {
		const { container } = render(LinkPreviewTest);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("has bits data attrs", async () => {
		const { getByTestId } = await open();
		const parts = ["trigger", "content"];

		for (const part of parts) {
			const el = getByTestId(part);
			expect(el).toHaveAttribute(`data-link-preview-${part}`);
		}
	});

	it("opens on hover", async () => {
		const { user, content } = await open();
		await user.click(content);
		expect(content).toBeVisible();
	});

	it.skip("closes on escape keydown", async () => {
		const mockEsc = vi.fn();
		const { user, content, queryByTestId } = await open({
			contentProps: {
				onEscapeKeydown: mockEsc,
			},
		});
		await user.click(content);
		await user.keyboard(kbd.ESCAPE);
		expect(mockEsc).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(queryByTestId("content")).toBeNull());
	});

	it.skip("closes when pointer moves outside the trigger and content", async () => {
		const { user, getByTestId, queryByTestId } = await open();
		const outside = getByTestId("outside");
		await user.hover(outside);
		await waitFor(() => expect(queryByTestId("content")).toBeNull());
	});

	it("portals to the body by default", async () => {
		const { content } = await open();
		expect(content.parentElement?.parentElement).toBe(document.body);
	});

	it("portals to a custom element if specified", async () => {
		const { content, getByTestId } = await open({
			portalProps: {
				to: "#portal-target",
			},
		});
		const portalTarget = getByTestId("portal-target");
		expect(content.parentElement?.parentElement).toBe(portalTarget);
	});

	it("does not portal if `disabled` is passed as portal prop", async () => {
		const { content, getByTestId } = await open({ portalProps: { disabled: true } });
		const main = getByTestId("main");
		expect(content.parentElement?.parentElement).toBe(main);
	});

	it("respects the close on escape prop", async () => {
		const { content, user, queryByTestId } = await open({
			contentProps: {
				escapeKeydownBehavior: "ignore",
			},
		});
		await user.click(content);
		await user.keyboard(kbd.ESCAPE);
		expect(queryByTestId("content")).not.toBeNull();
	});

	it("respects the close on outside click prop", async () => {
		const { content, user, queryByTestId, getByTestId } = await open({
			contentProps: {
				interactOutsideBehavior: "ignore",
			},
		});
		await user.click(content);
		const outside = getByTestId("outside");
		await user.click(outside);
		expect(queryByTestId("content")).not.toBeNull();
	});

	it("respects binding the open prop", async () => {
		const { queryByTestId, getByTestId, user } = await open({
			contentProps: {
				interactOutsideBehavior: "ignore",
			},
		});
		const binding = getByTestId("binding");
		expect(binding).toHaveTextContent("true");
		await user.click(binding);
		expect(binding).toHaveTextContent("false");
		expect(queryByTestId("content")).toBeNull();
		await user.click(binding);
		expect(binding).toHaveTextContent("true");
		expect(queryByTestId("content")).not.toBeNull();
	});
});
