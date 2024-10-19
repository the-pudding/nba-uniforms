<script>
	import { setContext, getContext } from 'svelte';
  import { selectedTeamStore } from '$stores/teamSelection';
	import StoryBody from "$components/StoryBody.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Header from "$components/Header.svelte";
	import StoryIntro from "$components/StoryIntro.svelte";
	import StoryHeaderGrid from "$components/StoryHeaderGrid.svelte";
	import Footer from "$components/Footer.svelte";
	import SelectBar from "$components/nba/SelectBar.svelte";

	import locate from "$utils/locate";
	import findClosestPoint from "$utils/findClosestPoint";

	import teams from "$data/nba2324/teamNames.json";

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

<Header />
<StoryIntro />
<SelectBar />
<StoryHeaderGrid />
<StoryBody />
<Footer />
