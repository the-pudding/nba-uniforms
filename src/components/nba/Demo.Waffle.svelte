<script>
	import { onMount } from "svelte"
	import * as d3 from "d3"
	import { LayerCake, Svg } from "layercake";
	import loadCsv from "$utils/loadCsv.js";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import demoData from "$components/demo/demo-layercake.csv";

	let data
 	onMount(
		async () => {
			let allGames = await loadCsv('./src/data/nba2324/output.csv')
			data = allGames.filter(d => d.homeTeam === "Milwaukee Bucks")
		}
	)
	$: console.log(data)

	const x = "x";
	const y = "y";
	const p = 20;
	const padding = {
		top: p,
		left: p,
		bottom: p,
		right: p
	};
	const squarewidth = 7;
</script>

<section>
	<h2>Waffle Chart</h2>
	<!-- for each item in data, output a 10x10 square that is colored in using data.homeTeamHex -->
	{#if data}
		<figure>
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				{#each data as game, i}
					<rect
						x={(i % 14) * squarewidth}
						y={Math.floor(i / 14) * squarewidth}
						width={squarewidth}
						height={squarewidth}
						fill={game.homeTeamHex}
						stroke="#aaa"
        				stroke-width="0.1"
					/>
				{/each}
			</svg>
		</figure>
	{/if}
</section>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 50vh;
	}
</style>
