<script>
	import { getContext } from "svelte";
	import { LayerCake, Svg, ScaledSvg } from "layercake";

	import * as d3 from "d3";
	import { selectedTeamStore } from "$stores/teamSelection";
	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import Beeswarm from "$components/nba/Beeswarm.html.svelte";
	import Lollipop from "$components/nba/Lollipop.svelte";
	import StackedBarChart from "./StackedBarChart.svelte";
	import Bar from "$components/nba/Bar.svelte";
	import BarLabels from "$components/nba/BarLabels.svelte";
  	import AxisX from '$components/layercake/AxisX.html.svelte';
  	import AxisY from '$components/layercake/AxisY.html.svelte';
	import TeamCompare from "$components/nba/TeamCompare.svelte";

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
		return newArr;
	}
</script>

<section class="graphic-wrapper">
	{#if id == "waffle-home-away"}
		<div class="middle-line"></div>
		<div class="chart-wrapper with-bg">
			<JerseyLayout
				title={`2023-24 Home`}
				{data}
				teamCode={selectedTeam}
				homeAwayFilter={"home"}
			/>
		</div>
		<div class="chart-wrapper with-bg">
			<JerseyLayout
				title={`2023-24 Away`}
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
			<LayerCake let:width data={flairData} x={"2023 Score"} height={({width}) => width >= 500 ? 400 : 600}>
				<Beeswarm {selectedTeamName} />
			</LayerCake>
		</div>
	{:else if id == "beeswarm-flair-13"}
		<div class="lollipop graphic-wide graphic">
			<LayerCake
				let:width
				ssr
				percentRange
				padding={{ right: 10, bottom: 20, left: 30 }}
				x={Object.keys(filterFlairData(flairData, selectedTeamName)[0]).filter(
					(d) => !["team", "rank"].includes(d)
				)}
				xDomain={[0, null]}
				xPadding={[0, 0]}
				xRange={({width}) => width >= 500 
					? [30, 90] 
					: [25, 80]}
				y={"rank"}
				yScale={d3.scaleBand().paddingInner(0.2).round(true)}
				yRange={[0, 100]}
				zScale={d3.scaleOrdinal()}
				data={filterFlairData(flairData, selectedTeamName)}
			>
				<Lollipop />
			</LayerCake>
		</div>
	{:else if id == "city-bars"}
		<div class="barchart graphic-wide graphic">
			<TeamCompare data={teamTotals} />
			<!-- <LayerCake
				padding={{ bottom: 0, left: 0 }}

				x={'City Edition'}
				xDomain={[0, 41]}
				xRange={[0, 100]}
				y={'team'}
				yScale={d3.scaleBand().paddingInner(0.2)}
				yRange={[0, 100]}
				data={teamTotals}
			>
				<ScaledSvg>
					<Bar />
				</ScaledSvg>
				<BarLabels />
			</LayerCake> -->
		</div>
	{/if}
</section>
<div class="after-line"></div>

<style>
	section {
		width: 100%;
		padding: 2rem;
		justify-content: center;
		position: relative;

		@media screen and (min-width: 768px) {
			display: flex;
			flex-direction: row;
			gap: 4rem;
		}
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
		width: 100%;
		padding: 1rem;
		border: 5px solid var(--color-gray-1000);

		@media screen and (min-width: 768px) {
			width: calc(50% - 2rem);
			max-width: 400px;
		}
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
		padding: 0 0 4rem 0;
		border-top: 5px solid black;
		border-bottom: 5px solid black;
		background-color: rgba(255, 255, 255, 0.75);
		width: 100%;
	}

	.graphic-wide.clear {
		border-top: none;
		border-bottom: none;
		background-color: unset;
	}

	:global(.graphic-wide .layercake-container) {
		max-width: 1000px;
		margin:0 auto;
	}

	.lollipop{
			height: 1500px;
			padding-left: 10px;
    }

	.beeswarm {
		height: 600px;

		@media screen and (min-width: 500px) {
			height: 325px;
		}
	}

	.with-bg {
	background-color: rgba(255, 255, 255, 0.75);
	}

	.barchart {
		width: 100%;
	}
</style>
