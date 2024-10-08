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
						opponent: d.awayTeam,
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
						opponent: d.homeTeam,
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
							opponent: d.awayTeam,
							colorHex: d.homeTeamHex,
							colorName: d.homeTeamColor,
							edition: d.homeTeamEdition
						}
					} else {
						return {
							gameDate: d.gameDate,
							team: d.awayTeam,
							opponent: d.homeTeam,
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

	let clientWidth;
	$: console.log(clientWidth)
</script>

<figure bind:clientWidth>
	<h2>{homeAwayFilter}</h2>
	{#if clientWidth}
		<div class="stacked-bar-wrapper">
			<StackedBarChart
				data={formattedGames}
				width={clientWidth}
				height={48}
			/>
		</div>
	{/if}
	{#if formattedGames.length > 0}
		<div class="jersey-heatmap-wrapper">
			{#each formattedGames as game}
				<BasketballJersey
					fill={game.colorHex}
					city={game.edition === 'City Edition'}
					edition={game.edition}
					gameDate={game.gameDate}
					opponent={game.opponent}
					width={clientWidth/8}
					place={homeAwayFilter}
				/>
			{/each}
		</div>
	{/if}
</figure>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
	}

	.stacked-bar-wrapper {
		width: 100%;
		margin: 1rem 0;
	}

	.jersey-heatmap-wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	h2 {
		font-family: var(--sans);
		font-weight: 700;
		text-transform: uppercase;
		font-size: var(--24px);
	}
</style>
