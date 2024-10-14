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
		<div class="bar-label" style="left: {width + 4}%; top: {y * .97}%;">
			{d.team}
		</div>
	{/each}
</div>

<style>
	.bar-label {
		position: absolute;
    font-family: var(--sans);
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
		transform: translate(0, 0);
	}
</style>