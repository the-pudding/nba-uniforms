<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import { LayerCake, Svg } from "layercake";
	import loadCsv from "$utils/loadCsv.js";
	import getTeamCode from "$utils/getTeamCode.js";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import BasketballJersey from "$components/figure/Figure.BasketballJersey.svelte";  
	import StackedBarChart from './StackedBarChart.svelte';
	import teamNames from "$data/nba2324/teamNames.json";


	export let teamCode = "ATL";
	export let homeAwayFilter = "total";

	let allGames;
	let formattedGames = [];
	onMount(async () => {
		allGames = await loadCsv("./src/data/nba2324/output.csv");
	});

	$: team = teamNames.find((d) => d.code === teamCode).team || "ATL";

	$: {
		if (allGames) {
			if (homeAwayFilter === 'home') {
				let filteredGames = allGames.filter((d) => d.homeTeam === team);
				formattedGames = filteredGames.map((d) => {
					return {
						gameDate: d.gameDate,
						team: d.homeTeam,
						colorHex: d.homeTeamHex,
						colorName: d.homeTeamColor,
						edition: d.homeTeamEdition
					}
				});
			} else if (homeAwayFilter === 'away') {
				let filteredGames = allGames.filter((d) => d.awayTeam === team);
				formattedGames = filteredGames.map((d) => {
					return {
						gameDate: d.gameDate,
						team: d.awayTeam,
						colorHex: d.awayTeamHex,
						colorName: d.awayTeamColor,
						edition: d.awayTeamEdition
					}
				});
			} else {
				let filteredGames = allGames.filter((d) => ((d.homeTeam === team) || (d.awayTeam === team)));
				formattedGames = filteredGames.map((d) => {
					if (d.homeTeam === team) {
						return {
							gameDate: d.gameDate,
							team: d.homeTeam,
							colorHex: d.homeTeamHex,
							colorName: d.homeTeamColor,
							edition: d.homeTeamEdition
						}
					} else {
						return {
							gameDate: d.gameDate,
							team: d.awayTeam,
							colorHex: d.awayTeamHex,
							colorName: d.awayTeamColor,
							edition: d.awayTeamEdition
						}
					}
				});
			}
		}
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
	<h2>{homeAwayFilter}</h2>
	<StackedBarChart
		data={formattedGames}
		width={600}
		height={100}
	/>
	{#if formattedGames.length > 0}
		{#each formattedGames as game}
			<img src={`/assets/jerseys/${getTeamCode(game.team)}_${game.edition.split(' ')[0].toLowerCase()}.png`} alt={getTeamCode(game.team)} class="jersey-illustration" />
		{/each}
	{/if}
</section>

<style>
	.jersey-illustration {
		width: 50px;
		height: 75px;
		display: inline-block;
	}
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 25vh;
	}
</style>
