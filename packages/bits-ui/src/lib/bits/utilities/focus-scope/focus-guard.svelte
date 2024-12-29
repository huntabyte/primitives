<script lang="ts">
	import { type WithElementRef, box, mergeProps } from "svelte-toolbelt";
	import { useFocusGuard } from "./focus-guard.svelte.js";
	import type { BitsPrimitiveSpanAttributes } from "$lib/shared/attributes.js";
	import { useId } from "$lib/internal/use-id.js";

	let {
		ref = $bindable(null),
		id = useId(),
		...restProps
	}: WithElementRef<BitsPrimitiveSpanAttributes> = $props();

	const guard = useFocusGuard({
		id: box.with(() => id),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		),
	});

	const mergedProps = $derived(mergeProps(guard.props, restProps));
</script>

<span {...mergedProps}></span>
