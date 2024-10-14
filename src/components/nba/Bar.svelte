<script>
	import { getContext } from "svelte";

	const gamesData = getContext("data");

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	function fill(team, edition) {
		return gamesData?.filter(
			(d) => (d.homeTeam === team && d.homeTeamEdition === edition)
		)[0].homeTeamHex;
	}

	$: console.log(
		gamesData?.filter(
			(d) => (d.homeTeam === 'New York Knicks' && d.homeTeamEdition === 'City Edition')
		)
	)
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
		<text x={x + width - 0.5} y={y + height / 2} dy=".35em" font-size="2px" font-family="var(--sans)" font-weight="bold" text-transform="uppercase" text-anchor="end"
			fill="{["Boston Celtics", "San Antonio Spurs", "Houston Rockets"].includes(d.team) ? "#000" : "#fff"}" 
		>{d['City Edition']}</text>
	{/each}
</g>
