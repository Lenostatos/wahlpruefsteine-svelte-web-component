<script lang="ts">
	import Wahlpruefsteine from '$lib/components/Wahlpruefsteine.svelte';
	import answerData from '../data/answerData.json';
</script>

<Wahlpruefsteine {...answerData} />
