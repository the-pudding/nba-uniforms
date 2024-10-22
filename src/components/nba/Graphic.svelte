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
	import viewport from "$stores/viewport.js";

	import flair23 from "$data/nba2324/flairScore.json";
	import flair13 from "$data/nba2324/flairScore13.json";

	export let id;
	let clientWidth;
	let unfurlFlair = false;

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

<section class="graphic-wrapper"  bind:clientWidth>
	{#if id == "waffle-home-away"}
			{#if clientWidth >= 750}
				<div class="middle-line"></div>
			{/if}
			<div class="chart-wrapper with-bg with-padding-left">
				<JerseyLayout
					title={`2023-24 Home`}
					{data}
					teamCode={selectedTeam}
					homeAwayFilter={"home"}
				/>
			</div>
			<div class="chart-wrapper with-bg with-padding-right">
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
					title={`2023-24 Season at Home`}
					{data}
					teamCode={selectedTeam}
					homeAwayFilter={"home"}
					showJerseyWaffle={false}
				/>
			</div>
			<div class="chart-wrapper chart-wrapper__wide">
				<JerseyLayout
					title={`2013-14 Season at Home`}
					data={data1314}
					teamCode={selectedTeam}
					homeAwayFilter={"home"}
					showJerseyWaffle={false}
				/>
			</div>
		</div>
	{:else if id == "beeswarm-flair-23"}
		<div class="beeswarm graphic-wide graphic">
			<h3>All Teams By 2023-24 Flair</h3>
			<div class="graphic-inner">
				<LayerCake let:width data={flairData} x={"2023 Score"} height={({width}) => width >= 700 ? 600 : 1000}>
					<Beeswarm {selectedTeamName} />
				</LayerCake>
			</div>
		</div>
	{:else if id == "beeswarm-flair-13"}
		<div class={`lollipop graphic-wide graphic`}>
			<h3>Change in Flair from 2013-14 to 2023-24</h3>
			<button class={`lollipop-button ${unfurlFlair ? 'lollipop-button-unfurled' : ''}`} on:click={() => unfurlFlair = true}>View All Teams</button>
			<div class="graphic-inner">
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
					xRange={[0, 90]}
					y={"rank"}
					yScale={d3.scaleBand().paddingInner(0.2).round(true)}
					yRange={[0, 100]}
					zScale={d3.scaleOrdinal()}
					data={filterFlairData(flairData, selectedTeamName)}
				>
					<Lollipop  unfurlFlair={unfurlFlair}/>
				</LayerCake>
			</div>
		</div>
	{:else if id == "city-bars"}
		<div class="barchart graphic-wide graphic city-bars">
			<h3>All teams by edition usage</h3>
			<TeamCompare data={teamTotals} />
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

		@media screen and (min-width: 750px) {
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

		@media screen and (min-width: 750px) {
			width: calc(50% - 2rem);
			max-width: 500px;
		}
	}
	.with-padding-left {
		margin-left: 1rem;
	}

	.with-padding-right {
		margin-right: 1rem;
	}

	.chart-wrapper.chart-wrapper__wide {
		width: 100%;
		max-width: 1000px;
		border: unset;
		margin: 0 auto;
	}
    .graphic-wrapper {
        margin: 0 auto;
        padding: 0;
    }
	.graphic-wrapper-pad {
		padding: 0 1rem;
	}
	.graphic-wide {
		max-width: unset;
		padding: 2rem 1rem;
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

	.padding-wrapper {
		padding: 0 1rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 3rem;
	}

	:global(.graphic-wide .layercake-container) {
		max-width: 1000px;
		margin: 0 auto;
	}
	.graphic-wide.city-bars {
		padding: 0 0 3rem 0;
	}

	.graphic-wide.lollipop {
		padding: 0 0 2rem 0;
	}

	.lollipop{
			padding-left: 10px;
			height: auto;

			& .lollipop-button {
				width: calc(100% + 2rem);
				font-weight: 900;
				font-size: var(--20px);
				text-transform: uppercase;
				color: white;
				position: absolute;
				bottom: 0.25rem;
				z-index: 10;
				padding: 2rem 0 0.75rem;
				margin: 0 0 0 -2rem;
				background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
			}

			& .lollipop-button-unfurled {
				display: none;
    }
	}

	.beeswarm {
		height: 600px;
		overflow: hidden;
	}
	h3 {
			font-size: var(--28px);
			line-height: 1;
		}
	.beeswarm h3, .lollipop h3 {
		max-width: 1000px;
		margin: 0 auto 1rem auto;
	}

	.lollipop h3 {
		padding: 2rem 1rem 1rem 1rem;
		margin: 0 auto;
		background-color: rgba(255, 255, 255, 0.75);
	}

	.city-bars h3 {
		padding: 2rem 1rem 1rem 1rem;
		background-color: rgba(255, 255, 255, 0.75);
	}

	@media(max-width: 700px) {
		.beeswarm {
			height: 800px;
		}
	}

	.with-bg {
	background-color: rgba(255, 255, 255, 0.75);
	}

	.barchart {
		width: 100%;
	}

	.graphic-inner {
		width: 100%;
		height: calc(100% - 2rem);
		max-width: 1000px;
		margin: 0 auto;
	}

	:global(.graphic-wide.lollipop .graphic-inner, .graphic-wide.lollipop .layercake-container) {
		max-width: none;
	}

	@media(max-width: 750px) {
		.with-padding-left {
			width: calc(100% - 2rem);
			margin: 0 1rem 1rem 1rem;
		}

		.with-padding-right {
			width: calc(100% - 2rem);
			margin: 0 1rem;
		}
		h3 {
			font-size: var(--24px);
			line-height: 1;
		}
	}
</style>
