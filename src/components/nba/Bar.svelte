<script>
	import { getContext } from "svelte";

	const gamesData = getContext("data");

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	function fill(team, edition) {
		return gamesData?.filter(
			(d) => (d.homeTeam === team && d.homeTeamEdition === edition)
		)[0].homeTeamHex;
	}
</script>

<g>
	{#each $data as d, i}
		{@const x = $xScale.range()[0]}
		{@const y = $yGet(d)}
		{@const width = $xGet(d)}
		{@const height = $yScale.bandwidth()}
		<rect data-id={i} {x} {y} {width} {height}
			fill={fill(d.team, 'City Edition')}
		/>
	{/each}
</g>
