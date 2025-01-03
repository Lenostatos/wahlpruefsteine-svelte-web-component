<script lang="ts">
	import type { AppState } from '$lib/state/appState.svelte';
	import viewState from '$lib/state/viewState.svelte';
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	const appState: AppState = getContext('appState');

	const questions = appState.questions;

	const selectedQuestion = $derived(viewState.selectedQuestion);

	let open = $state(false);

	function stopPropagation<E extends Event, F extends (event: E) => void>(fn: F) {
		return function (event: E) {
			event.stopPropagation();
			fn(event);
		};
	}
</script>

<svelte:document onclick={() => (open = false)} />

<div class="rounded-sm bg-sky-400">
	<button
		onclick={stopPropagation(() => (open = !open))}
		class="m-3 rounded-sm border-2 border-sky-300 p-1 hover:bg-sky-300"
	>
		<p class="font-bold">
			{selectedQuestion?.number}
			{selectedQuestion?.selectionHandle}
		</p>
		<p>{selectedQuestion?.text}</p>
	</button>

	<div class="relative">
		{#if open}
			<ul
				class="absolute inset-x-0 top-2 z-50 divide-y-2 divide-sky-300 rounded-sm bg-sky-400"
				transition:fly={{ y: -10, duration: 150 }}
			>
				{#each questions as question}
					<li class={['flex flex-col items-stretch']}>
						<button
							class={[
								'rounded-sm p-2 py-2 hover:bg-sky-300',
								question.number === selectedQuestion?.number && 'rounded-sm bg-sky-300'
							]}
							onclick={stopPropagation(() => {
								viewState.selectedQuestion = question;
								open = false;
							})}
						>
							<p class="font-bold">{question?.number} {question?.selectionHandle}</p>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
