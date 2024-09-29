<script>
	import { onMount } from "svelte"
	import * as d3 from "d3"
	import { LayerCake, Svg } from "layercake";
	import loadCsv from "$utils/loadCsv.js";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import demoData from "$components/demo/demo-layercake.csv";
	import BasketballJersey from "$components/figure/Figure.BasketballJersey.svelte";

	let home, away
	let team = "LA Clippers"
 	onMount(
		async () => {
			let allGames = await loadCsv('./src/data/nba2324/output.csv')
			home = allGames.filter(d => d.homeTeam === team)
			away = allGames.filter(d => d.awayTeam === team)
		}
	)

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
			<h2>{location === home ? 'Home' : 'Away'}</h2>
			<figure>
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					{#each location as game, i}
						<rect
							x={(i % 14) * (squarewidth+0.5)}
							y={Math.floor(i / 14) * (squarewidth+0.5)}
							width={squarewidth}
							height={squarewidth}
							fill={location === home ? game.homeTeamHex : game.awayTeamHex}
						/>
						<BasketballJersey
							fill={location === home ? game.homeTeamHex : game.awayTeamHex}
						/>
					{/each}
				</svg>
			</figure>
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
