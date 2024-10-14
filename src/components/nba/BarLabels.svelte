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
		<div class="bar-label" style="left: {width + 4}%; top: {y * .96}%; height: {height}px">
			{d.team}
		</div>
	{/each}
</div>

<style>
	.bar-label {
		position: absolute;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
		transform: translate(15%, -10%);

		@media screen and (min-width: 768px) {
    	font-size: 14px;
			transform: translate(0, 0);
		}
	}
</style>