<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import { LayerCake, Svg } from "layercake";
	import loadCsv from "$utils/loadCsv.js";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import demoData from "$components/demo/demo-layercake.csv";
	import BasketballJersey from "$components/figure/Figure.BasketballJersey.svelte";
	import teamNames from "$data/nba2324/teamNames.json";

	let home, away;
	let allGames;
	export let teamCode = "BOS";
	$: team = teamNames.find((d) => d.code === teamCode).team || "ATL";
	onMount(async () => {
		allGames = await loadCsv("./src/data/nba2324/output.csv");
	});

	$: {
		if (allGames) {
			home = allGames.filter((d) => d.homeTeam === team);
			away = allGames.filter((d) => d.awayTeam === team);
		}
	}
	$: console.log(home);

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
	{#each [home, away] as location}
		{#if location}
			<h2>{location === home ? "Home" : "Away"}</h2>
			{#each location as game, i}
				<BasketballJersey
					fill={location === home ? game.homeTeamHex : game.awayTeamHex}
				/>
			{/each}
		{/if}
	{/each}
</section>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 25vh;
	}
</style>
