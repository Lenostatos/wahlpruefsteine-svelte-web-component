<script lang="ts">
	import { getContext } from 'svelte';
	import AnswerBubble from '$lib/components/AnswerBubble.svelte';
	import type { Answer, AppState } from '$lib/state/appState.svelte';
	import viewState from '$lib/state/viewState.svelte';

	const appState: AppState = getContext('appState');

	const selectedQuestion = $derived(viewState.selectedQuestion);

	const answers = $derived(selectedQuestion ? appState.answersTo(selectedQuestion) : []);

	const isCollapsed = (answer: Answer): boolean => {
		const answerPartyName = answer.byParty.name;
		const unfoldedPartyName = viewState.unfoldedParty ? viewState.unfoldedParty.name : '';
		return answerPartyName !== unfoldedPartyName;
	};
</script>

{#if answers.length === 0}
	<p>Keine Antworten verfügbar</p>
{/if}

<ul class="flex flex-col gap-3">
	{#each answers as answer}
		<li>
			<AnswerBubble
				{answer}
				collapsed={isCollapsed(answer)}
				toggleCollapsed={() => {
					viewState.unfoldedParty = answer.byParty;
				}}
			/>
		</li>
	{/each}
</ul>
