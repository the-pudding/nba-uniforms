<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");
</script>

<div class="bar-label-wrapper">
	{#each $data as d, i}
		{@const x = $xScale.range()[0]}
		{@const y = $yGet(d)}
		{@const width = $xGet(d)}
		{@const height = $yScale.bandwidth()}		
		<div class="bar-data-label" style="text-align: right; left: calc({width}% - 20px); top: {y}%; height: {height}px; color:{['Boston Celtics', 'San Antonio Spurs', 'Houston Rockets'].includes(d.team) ? '#000' : '#fff'}">
			{d['City Edition']}
		</div>
		<div class="bar-label" style="left: calc({width}% - 3px); top: {y}%; height: {height}px">
			{d.team}
		</div>
	{/each}
</div>

<style>
	.bar-label, .bar-data-label {
		position: absolute;
    font-family: var(--sans);
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
		transform: translate(15%, -10%);
	}
</style>