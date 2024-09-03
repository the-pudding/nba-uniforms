<script>
	import { getContext } from "svelte";
	import NBA from "$components/nba/NBA.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";

	import locate from "$utils/locate";
	import findClosestPoint from "$utils/findClosestPoint";

	import teams from "$data/nba2324/teamNames.json";

	$: selectedTeam = 'ATL';

	locate(true).then(data => {
		const [lat, lon] = data.loc.split(',').map(Number);
		const closestArena = findClosestPoint({ lat: lat, lon: lon }, teams);
		selectedTeam = closestArena.code;
	}).catch(err => {
		console.error(err);
	});

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<WIP />
<!-- <svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/> -->
<Header />
<NBA selectedTeam={selectedTeam} />
<Footer />
