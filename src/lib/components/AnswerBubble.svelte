<script lang="ts">
	import type { Answer } from '$lib/state/appState.svelte';

	const {
		answer,
		collapsed,
		toggleCollapsed
	}: { answer: Answer; collapsed: boolean; toggleCollapsed: () => void } = $props();
</script>

<button
	class="h-full w-full rounded bg-sky-50 px-3 py-2 shadow hover:bg-white"
	onclick={toggleCollapsed}
>
	<p class="mb-1 text-left font-bold">{answer.byParty.name}</p>
	<p class={['text-left', collapsed && 'truncate', !collapsed && 'text-wrap']}>
		{answer.text}
	</p>
	<!-- Getting this transition to work is hard -->
	<!-- auto height can't be animated with CSS, but max-height can. The challenge is to get the animation direction right and get the animations of the different properties in the right order -->
	<!-- 'transition-[max-height_1000s_150s,text-wrap_1000s_1150s,white-space_1000s_1150s] text-left',
			collapsed && 'truncate max-h-10',
			!collapsed && 'text-wrap max-h-screen' -->
</button>
