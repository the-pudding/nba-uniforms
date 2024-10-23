<!--
  @component
  Generates an HTML Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
	import { getContext } from "svelte";
	import { selectedTeamStore } from "$stores/teamSelection";
	import getTeamCode from "../../utils/getTeamCode";
	import viewport from "$stores/viewport.js";

	const teams = getContext("teams");

	const { data, xGet, yGet, zScale, yScale, config, width } =
		getContext("LayerCake");

	$: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find((d) => d.code === selectedTeam)?.team;

	export let r = 5;
	export let unfurlFlair = false;

	$: yourTeamData = $data.filter((d) => getTeamCode(d.team) == $selectedTeamStore);
	$: otherTeamData = $data.filter((d) => getTeamCode(d.team) !== $selectedTeamStore);

</script>

<div class="flair-explain">
	<div class="flair-inner">
		<span class="left"><span class="caret-left"></span> Less flair</span>
		<span class="right">More flair <span class="caret-right"></span></span>
	</div>
</div>
{#if yourTeamData !== undefined}
<div class="dot-plot your-team">
	<div class="dot-row {yourTeamData[0].team === selectedTeamName ? 'row-selected' : ''}">
		<div class="dot-row-inner">
			<div class="row-team">
				{#if yourTeamData[0].team === selectedTeamName}
				<span>Your team</span>
				{/if}
				{$viewport.width  >= 800 ? yourTeamData[0].team : getTeamCode(yourTeamData[0].team)}
			</div>
			<div class="row-data">
				<div class="line" style="left: calc({Math.min(...$xGet(yourTeamData[0]))}% + 50px); right: calc({100 - Math.max(...$xGet(yourTeamData[0]))}% + 50px);"></div>
				{#each $xGet(yourTeamData[0]) as circleX, i}
					{#if i === 0}
						<div class="year-text" style="top: calc(50% - 1px); left: calc({circleX}% - 15px);">
							{"2023-24"}
						</div>
						<div class="jersey-container" style="top: 50%;  left: calc({circleX}% - 35px); width: 36px; height: 54px;">
							<img
								src={`./assets/jerseys/${getTeamCode(yourTeamData[0].team)}_icon.png`}
								alt={`${yourTeamData[0].team} icon jersey`}
								class="jersey-illustration"
							/>
						</div>
					{:else}
						<div class="year-text" style="top: calc(50% - 1px); left: calc({circleX}% - 5px);">
							{"2013-14"}
						</div>
						<div class="circle" style="top: calc(50% - 1px); left: calc({circleX}% + 50px); width: {r * 2}px; height: {r * 2}px; background: black;"></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
{/if}
<div class={`${unfurlFlair ? 'dot-plot-unfurled' : 'dot-plot'}`}>
	{#each otherTeamData as row}
		{@const scaledYValue = $yGet(row)}
		{@const scaledXValues = $xGet(row)}
		<div class="dot-row {row.team === selectedTeamName ? 'row-selected' : ''}">
			<div class="dot-row-inner">
				<div class="row-team">
					{#if row.team === selectedTeamName}
					<span>Your team</span>
					{/if}
					{$viewport.width >= 800 ? row.team : getTeamCode(row.team)}
				</div>
				<div class="row-data">
					<div class="line" style="left: calc({Math.min(...scaledXValues)}% + 50px); right: calc({100 - Math.max(...scaledXValues)}% + 50px);"></div>
					{#each scaledXValues as circleX, i}
						{#if i === 0}
							<div class="year-text" style="top: calc(50% - 1px); left: calc({circleX}% - 15px);">
								{"2023-24"}
							</div>
							<div class="jersey-container" style="top: 50%;  left: calc({circleX}% - 35px); width: 36px; height: 54px;">
								<img
									src={`./assets/jerseys/${getTeamCode(row.team)}_icon.png`}
									alt={`${row.team} icon jersey`}
									class="jersey-illustration"
								/>
							</div>
						{:else}
							<div class="year-text" style="top: calc(50% - 1px); left: calc({circleX}% - 5px);">
								{"2013-14"}
							</div>
							<div class="circle" style="top: calc(50% - 1px); left: calc({circleX}% + 50px); width: {r * 2}px; height: {r * 2}px; background: black;"></div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.dot-plot {
		position: relative;
		width: 100%;
		height: 700px;
		overflow-y: hidden;
		transition: height calc(var(--1s) * 0.5);
	}

	.dot-plot.your-team {
		overflow: visible;
		position: sticky;
		background: rgba(255, 255, 255, 0.95);
		border-bottom: 3px solid var(--color-fg);
		position: sticky;
		top: 4rem;
		z-index: 999;
		height: 70px;
	}

	.dot-row {
		display: flex;
		align-items: center;
		height: 70px;
		margin: 0.5rem 0;
	}
	.dot-row-inner {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 0.5rem;
		gap: 0.5rem;
	}
	.row-selected {
		background: rgba(255, 255, 255, 0.95);
		border-bottom: 3px solid var(--color-fg);
		position: sticky;
		top: 4rem;
		z-index: 999;
		margin: 0 0 0.5rem 0;
	}

	.row-selected span {
		font-size: 12px;
		font-weight: 500;
	}

	.row-team {
		display: flex;
		justify-content: flex-end;
		line-height: 16px;
		font-family: var(--sans);
		font-size: 14px;
		text-align: right;
		font-weight: bold;
		width: 160px;
		display: flex;
		flex-direction: column;
		margin-bottom: 2px;
	}

	.row-data {
		width: calc(100% - 160px);
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.row-data p {
		font-family: var(--sans);
		font-size: var(--14px);
	}

	.line {
		position: absolute;
		border-bottom: 2px solid #000;
		transform: translate(0, -50%);
	}
	.circle {
		position: absolute;
		border-radius: 50%;
		border: 1px solid #000;
		stroke: #000;
		transform: translate(-50%, -50%);
	}

	.year-text {
		position: absolute;
		font-family: var(--sans);
		font-size: 13px;
    transform: translate(-0, -50%);
	}

	.jersey-container {
		position: absolute;
		transform: translate(-50%, -50%);
	}

	.flair-explain {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		width: 100%;
		margin: 0 auto;
		font-family: var(--sans);
		font-size: 14px;
		font-weight: bold;
		background-color: rgba(255, 255, 255, 0.75);
	}

	.flair-inner {
		max-width: 1000px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem 0 210px;
	}

	.left,
	.right {
		display: flex;
		align-items: center;
	}

	.caret-left {
		margin-right: 5px;
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-right: 5px solid #333;
	}

	.caret-right {
		margin-left: 5px;
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 5px solid #333;
	}

	@media(max-width: 800px) {
		.row-team {
			width: 30px;
		}
		.row-data {
			width: calc(100% - 30px);
		}
		.flair-explain {
			padding: 0 1rem 0 60px;
		}
	}
</style>
