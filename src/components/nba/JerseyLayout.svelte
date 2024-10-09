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

	export let data;
	export let title;
	export let teamCode = "ATL";
	export let homeAwayFilter = "total";

	let allGames;
	let formattedGames = [];

	$: console.log('data', data ? data : 'no data');

	$: team = teamNames.find((d) => d.code === teamCode).team || "ATL";

	$: {
		if (data && data.length > 0) {
			if (homeAwayFilter === 'home') {
				let filteredGames = data.filter((d) => d.homeTeam === team);
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
				let filteredGames = data.filter((d) => d.awayTeam === team);
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
				let filteredGames = data.filter((d) => ((d.homeTeam === team) || (d.awayTeam === team)));
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
	<h2>{title}</h2>
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
		{#each formattedGames as game}
			<img src={`/assets/jerseys/${getTeamCode(game.team)}_${game.edition.split(' ')[0].toLowerCase()}.png`} alt={getTeamCode(game.team)} class="jersey-illustration" />
		{/each}
	{/if}
</figure>

<style>
	.jersey-waffle {
		padding: 25px;
		border: 8px solid black;
		background-color: rgba(255, 255, 255, 0.75);
		width: 400px;
	}
	.jersey-illustration {
		width: 50px;
		height: 75px;
		display: inline-block;
	}
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
