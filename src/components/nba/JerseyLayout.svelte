<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import { LayerCake, Svg } from "layercake";
	import loadCsv from "$utils/loadCsv.js";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import BasketballJersey from "$components/figure/Figure.BasketballJersey.svelte";  
	import StackedBarChart from './StackedBarChart.svelte';
	import teamNames from "$data/nba2324/teamNames.json";


	export let teamCode = "BOS";
	export let location = "home";

	let allGames;
	let filteredGames = [];
	onMount(async () => {
		allGames = await loadCsv("./src/data/nba2324/output.csv");
	});

	$: team = teamNames.find((d) => d.code === teamCode).team || "ATL";

	$: {
		if (allGames) {
			if (location === 'home') {
				filteredGames = allGames.filter((d) => d.homeTeam === team);
			} else if (location === 'away') {
				filteredGames = allGames.filter((d) => d.awayTeam === team);
			} else {
				filteredGames = allGames;
			}
		}
		console.log(filteredGames);
	}

	const x = "x";
	const y = "y";
	const p = 20;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};
	const squarewidth = 6.5;
</script>

<section>
	<h2>{location}</h2>
	<StackedBarChart
		data={filteredGames}
		stackKey={location === 'home' ? "homeTeamEdition" : "awayTeamEdition"}
		width={600}
		height={100}
	/>
	{#if filteredGames.length > 0}
		{#each filteredGames as game}
			<BasketballJersey
				fill={location === 'home' ? game.homeTeamHex : game.awayTeamHex}
				city={location === 'home' ? (game.homeTeamEdition === "City Edition") : (game.awayTeamEdition === "City Edition")}
			/>
		{/each}
	{/if}
</section>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 25vh;
	}
</style>
