<script>
	import { getContext } from "svelte";	import { LayerCake, Svg } from "layercake";

	import * as d3 from "d3";
	import { selectedTeamStore } from "$stores/teamSelection";
	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import Beeswarm from "$components/nba/Beeswarm.html.svelte";
	import Lollipop from "$components/nba/Lollipop.svelte";
	import StackedBarChart from './StackedBarChart.svelte';

	import flair23 from "$data/nba2324/flairScore.json";
	import flair13 from "$data/nba2324/flairScore13.json";

	export let id;	
    let clientWidth;

	const data = getContext("data");
    const data1314 = getContext("data1314");
	const teams = getContext("teams");

	$: selectedTeam = $selectedTeamStore;
    $: selectedTeamName = teams.find((d) => d.code === selectedTeam)?.team;

	$: flairData = flair23.map((d) => ({
		team: d.team,
		"2023 Score": Number(d.score),
		"2013 Score": Number(flair13.find((f) => f.team === d.team).score)
	})).sort((a, b) => {
		return a.team.localeCompare(b.team);
	});

	function filterFlairData(arr, teamName) {
		const index = arr.findIndex(obj => obj.team === teamName);
		
		if (index === -1) {
			return [];
		}
		
		// Calculate the start and end indices for slicing
		const start = Math.min(arr.length - 5, Math.max(0, index - 2)); // Ensures it doesn't go below 0
		const end = start + 5; // Ensures it doesn't exceed array length
		
		// Slice the array to get the 5 objects (or fewer if near the start/end)
		return arr.slice(start, end);
	}

	$: flairDataFiltered = filterFlairData(flairData, selectedTeamName);
</script>

<section>
	{#if id == "waffle-home-away"}
		<div class="middle-line"></div>
		<div class="chart-wrapper">
			<JerseyLayout
				title={`Home`}
				{data}
				teamCode={selectedTeam}
				homeAwayFilter={"home"}
			/>
		</div>
		<div class="chart-wrapper">
			<JerseyLayout
				title={`Away`}
				{data}
				teamCode={selectedTeam}
				homeAwayFilter={"away"}
			/>
		</div>
    {:else if id == "bars-compare"}
        <div class="compare-bars graphic-wide graphic">
            <div class="chart-wrapper chart-wrapper__wide">
                <JerseyLayout
                    title={`2013-14 Season at Home`}
                    data={data1314}
                    teamCode={selectedTeam}
                    homeAwayFilter={"home"}
                    showJerseyWaffle={false}
                />
            </div>
            <div class="chart-wrapper chart-wrapper__wide">
                <JerseyLayout
                    title={`2023-24 Season at Home`}
                    {data}
                    teamCode={selectedTeam}
                    homeAwayFilter={"home"}
                    showJerseyWaffle={false}
                />
            </div>
        </div>
	{:else if id == "beeswarm-flair-23"}
		<div class="beeswarm graphic-wide graphic">
			<LayerCake data={flairData} x={"2023 Score"} height={400}>
				<Beeswarm {selectedTeamName} />
			</LayerCake>
		</div>
	{:else if id == "beeswarm-flair-13"}
		<div class="lollipop graphic-wide graphic">
			<LayerCake
				ssr
				percentRange
				padding={{ right: 10, bottom: 20, left: 30 }}
				x={Object.keys(flairData[0]).filter((d) => d !== "team")}
				y={"team"}
				yScale={d3.scaleBand().paddingInner(0.05).round(true)}
                yRange={[0, 90]}
				xDomain={[0, null]}
				xPadding={[2, 0]}
				zScale={d3.scaleOrdinal()}
				data={flairDataFiltered}
			>
				<Lollipop />
			</LayerCake>
		</div>
	{/if}
</section>
<div class="after-line"></div>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: row;
		padding: 2rem;
		gap: 4rem;
		justify-content: center;
		position: relative;
	}

	.middle-line {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		height: 100%;
		width: 5px;
		background-color: var(--color-gray-1000);
	}

	.chart-wrapper {
		width: calc(50% - 2rem);
		max-width: 400px;
		background-color: rgba(255, 255, 255, 0.75);
		padding: 1rem;
		border: 5px solid var(--color-gray-1000);
	}

    .chart-wrapper.chart-wrapper__wide {
        width: 100%;
        max-width: unset;
        border: unset;
    }
    .graphic-wide {
		max-width: unset;
		margin: 0 auto 25px;
		padding: 10px 75px;
		border-top: 8px solid black;
		border-bottom: 8px solid black;
		background-color: rgba(255, 255, 255, 0.75);
        width: 100%;
	}

	.graphic-wide.clear {
		border-top: none;
		border-bottom: none;
		background-color: unset;
	}

	.lollipop, .beeswarm {

		height: 300px;
	}
</style>
