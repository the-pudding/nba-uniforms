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
	import StackedBarChart from "./StackedBarChart.svelte";
	import teamNames from "$data/nba2324/teamNames.json";

	export let data;
	export let title;
	export let teamCode = "ATL";
	export let homeAwayFilter = "total";
	export let showJerseyWaffle = true;

	let allGames;
	let formattedGames = [];

	$: team = teamNames.find((d) => d.code === teamCode).team || "ATL";

	$: {
		if (data && data.length > 0) {
			if (homeAwayFilter === "home") {
				let filteredGames = data.filter((d) => d.homeTeam === team);
				formattedGames = filteredGames.map((d) => {
					return {
						gameDate: d.gameDate,
						team: d.homeTeam,
						opponent: d.awayTeam,
						colorHex: d.homeTeamHex,
						colorName: d.homeTeamColor,
						edition: d.homeTeamEdition
					};
				});
			} else if (homeAwayFilter === "away") {
				let filteredGames = data.filter((d) => d.awayTeam === team);
				formattedGames = filteredGames.map((d) => {
					return {
						gameDate: d.gameDate,
						team: d.awayTeam,
						opponent: d.homeTeam,
						colorHex: d.awayTeamHex,
						colorName: d.awayTeamColor,
						edition: d.awayTeamEdition
					};
				});
			} else {
				let filteredGames = data.filter(
					(d) => d.homeTeam === team || d.awayTeam === team
				);
				formattedGames = filteredGames.map((d) => {
					if (d.homeTeam === team) {
						return {
							gameDate: d.gameDate,
							team: d.homeTeam,
							opponent: d.awayTeam,
							colorHex: d.homeTeamHex,
							colorName: d.homeTeamColor,
							edition: d.homeTeamEdition
						};
					} else {
						return {
							gameDate: d.gameDate,
							team: d.awayTeam,
							opponent: d.homeTeam,
							colorHex: d.awayTeamHex,
							colorName: d.awayTeamColor,
							edition: d.awayTeamEdition
						};
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
</script>

<div class="jersey-waffle" bind:clientWidth>
	<h2>{title}</h2>
	{#if clientWidth}
		<div class="stacked-bar-wrapper" style="height:48px;">
			<StackedBarChart data={formattedGames} width={clientWidth} height={48} />
		</div>
	{/if}
	{#if formattedGames.length > 0 && showJerseyWaffle}
		<div class="jersey-waffle_wrapper">
			{#each formattedGames as game}
				<div class="jersey-waffle_game">
					<div class="jersey-waffle_game-date">
						{`${game.gameDate.substring(0, 5)} v ${getTeamCode(game.opponent)}`}
					</div>
					<img
						src={`./assets/jerseys/${getTeamCode(game.team)}_${game.edition.split(" ")[0].toLowerCase()}.png`}
						alt={getTeamCode(game.team)}
						class="jersey-waffle_illustration"
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.jersey-waffle_wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.jersey-waffle_game {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 3px;
		width: calc(20% - 0.25rem);

		&:hover {
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.jersey-waffle_game:hover .jersey-waffle_game-date {
			visibility: visible;
		}

	.jersey-waffle_game-date {
		font-family: var(--sans);
		font-size: var(--12px);
		height: 0.75rem;
		visibility: hidden;
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
