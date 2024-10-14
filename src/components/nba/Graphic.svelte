<script>
	import { getContext } from "svelte";
	import { LayerCake, Svg } from "layercake";

	import * as d3 from "d3";
	import { selectedTeamStore } from "$stores/teamSelection";
	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import Beeswarm from "$components/nba/Beeswarm.html.svelte";
	import Lollipop from "$components/nba/Lollipop.svelte";
	import StackedBarChart from "./StackedBarChart.svelte";

	import flair23 from "$data/nba2324/flairScore.json";
	import flair13 from "$data/nba2324/flairScore13.json";

	export let id;
	let clientWidth;

	const data = getContext("data");
	const data1314 = getContext("data1314");
	const teams = getContext("teams");

	$: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find((d) => d.code === selectedTeam)?.team;

	$: flairData = flair23
		.map((d) => ({
			team: d.team,
			"2023 Score": Number(d.score),
			"2013 Score": Number(flair13.find((f) => f.team === d.team).score)
		}))
		.sort((a, b) => {
			return a.team.localeCompare(b.team);
		});

	$: teamTotals = teams
			.map((t) => ({
				team: t.team,
				'Association Edition': data.filter((d) => (d.awayTeam === t.team && d.awayTeamEdition === 'Association Edition') || d.homeTeam === t.team && d.homeTeamEdition === 'Association Edition').length,
				'Icon Edition': data.filter((d) => (d.awayTeam === t.team && d.awayTeamEdition === 'Icon Edition') || d.homeTeam === t.team && d.homeTeamEdition === 'Icon Edition').length,
				'Statement Edition': data.filter((d) => (d.awayTeam === t.team && d.awayTeamEdition === 'Statement Edition') || d.homeTeam === t.team && d.homeTeamEdition === 'Statement Edition').length,
				'City Edition': data.filter((d) => (d.awayTeam === t.team && d.awayTeamEdition === 'City Edition') || d.homeTeam === t.team && d.homeTeamEdition === 'City Edition').length,
				'Classic Edition': data.filter((d) => (d.awayTeam === t.team && d.awayTeamEdition === 'Classic Edition') || d.homeTeam === t.team && d.homeTeamEdition === 'Classic Edition').length,
				'City Edition 2': data1314.filter((d) => (d.awayTeam === t.team && d.awayTeamEdition === 'City Edition 2') || d.homeTeam === t.team && d.homeTeamEdition === 'City Edition 2').length,
			})
		);
	
	$: console.log(teamTotals);

	function filterFlairData(arr, teamName) {
		let newArr = [...arr].sort((a, b) => {
			if (a["2023 Score"] !== b["2023 Score"]) {
				return b["2023 Score"] - a["2023 Score"];
			}
			return b["2013 Score"] - a["2013 Score"];
		});
		const index = newArr.findIndex((obj) => obj.team === teamName);
		const [selectedTeamData] = newArr.splice(index, 1);
		newArr.unshift(selectedTeamData);
		newArr.forEach((item, index) => {
			item.rank = index + 1; // Ranks start from 1
		});
		newArr = newArr.slice(0, 10);
		console.log(newArr);
		return newArr;
	}
</script>

<section class="graphic-wrapper">
	{#if id == "waffle-home-away"}
		<div class="middle-line"></div>
		<div class="chart-wrapper with-bg">
			<JerseyLayout
				title={`Home`}
				{data}
				teamCode={selectedTeam}
				homeAwayFilter={"home"}
			/>
		</div>
		<div class="chart-wrapper with-bg">
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
				x={Object.keys(filterFlairData(flairData, selectedTeamName)[0]).filter(
					(d) => !["team", "rank"].includes(d)
				)}
				xRange={[30, 90]}
				y={"rank"}
				yScale={d3.scaleBand().paddingInner(0.05).round(true)}
				yRange={[0, 80]}
				xDomain={[0, null]}
				xPadding={[2, 0]}
				zScale={d3.scaleOrdinal()}
				data={filterFlairData(flairData, selectedTeamName)}
			>
				<Lollipop />
			</LayerCake>
		</div>
	{:else if id == "bars-city"}
		<div class="barchart graphic">
			<LayerCake
				data={data}
				x={"date"}
				y={"count"}
				yScale={d3.scaleLinear()}
				yDomain={[0, null]}
				yTicks={5}
				yFormat={d3.format(".2s")}
				yLabel={"Games"}
				xScale={d3.scaleTime()}
				xDomain={[new Date(2023, 0, 1), new Date(2023, 11, 31)]}
				xTicks={12}
				xTickFormat={d3.timeFormat("%b")}
				xLabel={"Month"}
				padding={{ top: 10, right: 10, bottom: 30, left: 40 }}
			>
				<Bar />
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
		padding: 1rem;
		border: 5px solid var(--color-gray-1000);
	}

	.chart-wrapper.chart-wrapper__wide {
		width: 100%;
		max-width: unset;
		border: unset;
	}
    .graphic-wrapper {
        margin: 0 auto;
        padding: 0;
    }
	.graphic-wide {
		max-width: unset;
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

	.lollipop{
        height: 100vh;
        padding-left: 10px;
    }

	.beeswarm {
		height: 325px;
	}

    .with-bg {
		background-color: rgba(255, 255, 255, 0.75);
    }
</style>
