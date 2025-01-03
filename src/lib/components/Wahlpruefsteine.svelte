<script lang="ts">
	import {
		AppState,
		type AnswerData,
		type Party,
		type QuestionData
	} from '$lib/state/appState.svelte';
	import QuestionDropdown from '$lib/components/QuestionDropdown.svelte';
	import AnswerFeed from '$lib/components/AnswerFeed.svelte';
	import { setContext } from 'svelte';
	import viewState from '$lib/state/viewState.svelte';

	const {
		parties,
		questions,
		answers
	}: { parties: Array<Party>; questions: Array<QuestionData>; answers: Array<AnswerData> } =
		$props();

	const appState = new AppState(parties, questions, answers);
	setContext('appState', appState);

	viewState.selectedQuestion = appState.questions[0];
</script>

<div class="flex h-screen w-screen justify-center bg-sky-200">
	<div class="m-3 flex min-w-[250px] max-w-[600px] flex-col items-stretch gap-3">
		<QuestionDropdown />
		<div class="overflow-scroll px-3">
			<AnswerFeed />
		</div>
	</div>
</div>
