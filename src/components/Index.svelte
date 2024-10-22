<script>
	import { setContext, getContext } from 'svelte';
  import { selectedTeamStore } from '$stores/teamSelection';
	import StoryBody from "$components/StoryBody.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Header from "$components/Header.svelte";
	import StoryIntroB from "$components/StoryIntroB.svelte";
	import StoryHeaderGrid from "$components/StoryHeaderGrid.svelte";
	import Footer from "$components/Footer.svelte";
	import SelectBar from "$components/nba/SelectBar.svelte";
	import Annotation from "$components/nba/Annotation.svelte";
	import { annotationVisible } from "$stores/misc.js";

	import locate from "$utils/locate";
	import findClosestPoint from "$utils/findClosestPoint";

	import teams from "$data/nba2324/teamNames.json";

	export let scrollProgress;

	locate(true).then(data => {
		const [lat, lon] = data.loc.split(',').map(Number);
		const closestArena = findClosestPoint({ lat: lat, lon: lon }, teams);
        selectedTeamStore.set(closestArena.code);
	}).catch(err => {
		console.error(err);
	});

	const copy = getContext("copy");
	const data = getContext("data");
</script>

<!-- <WIP /> -->
<StoryIntroB />
<SelectBar />
<StoryBody />
{#if $annotationVisible[0]}
	<Annotation />
{/if}
<Footer />
