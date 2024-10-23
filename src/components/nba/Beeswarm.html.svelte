<!--
  @component
  Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import viewport from "$stores/viewport.js";
	import { getContext } from "svelte";
	import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
	import getTeamCode from "../../utils/getTeamCode";

	const { data, xGet, height, width, zGet, xScale, yScale } =
		getContext("LayerCake");

	let adjustedWidth;

	$: {
		if ($width) {
			adjustedWidth = $width - 42;
		}

		if ($xScale) {
			$xScale.range([0, adjustedWidth]);
		}
	}

	$: nodes = $data.map((d) => ({ ...d, code: getTeamCode(d.team) }));

	/** @type {Number} [r=4] - The circle radius size in pixels. */
	export let r = 16;

	/** @type {String} [fill='#f95346'] - The circle's fill color. */
	export let fill = "#f95346";

	/** @type {String} [stroke='#000'] - The circle's stroke color. */
	export let stroke = "#000";

	/** @type {Number} [strokeWidth=1] - The circle's stroke width. */
	export let strokeWidth = 1;

	/** @type {Number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength). */

	export let selectedTeamName;

	export let jerseySize = 36;

	// also adjust the Y using force
	$: simulation = forceSimulation(nodes)
		.force(
			"x",
			forceX()
				.x((d) => {
					// Use the reactive $xScale with the adjusted width if it exists
					const xPos = $xScale ? $xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0) : 0;
					return xPos;
				})
				.strength(0.99)
		)
		.force("y", forceY().strength($viewport.width >= 700 ? 0.05 : 0.59))
		.force("collide", forceCollide(r))
		.stop();

	$: {
		for (
			let i = 0,
				n = Math.ceil(
					Math.log(simulation.alphaMin()) /
						Math.log(1 - simulation.alphaDecay())
				);
			i < n;
			++i
		) {
			simulation.tick();
		}
	}

	function jerseyEnter(team, event) {
		if (team == selectedTeamName) {
			return
		} else {
			let teamContainer = event.currentTarget.parentElement.querySelector('.team-container');
			teamContainer.style.opacity = 1;
		}
	}
	function jerseyOut(team, event) {
		if (team == selectedTeamName) {
			return
		} else {
			let teamContainer = event.currentTarget.parentElement.querySelector('.team-container');
			teamContainer.style.opacity = 0;
		}
	}
</script>

{#if $viewport.width >= 700}
	<svg
		width="100%"
		height="2"
		style="position: absolute; top: {$height / 2}px;"
	>
		<line x1="0" y1="0" x2="100%" y2="0" stroke="black" stroke-width="2" />
	</svg>
	<div class="bee-container">
		<div class="flair-explain">
			<span class="left"><span class="caret-left"></span>Less flair
			</span>
			<span class="right">More flair <span class="caret-right"></span></span>
		</div>
		<!-- draw a full-width horizontal line halfway down the container -->
		{#each simulation.nodes() as node}
			<div class="node-wrapper">
				<div
					class="jersey-container"
					style="left: {node.x + 16}px; top: {node.y * 2 + $height / 2}px; width: {jerseySize}px;"
					on:mouseenter={(event) => jerseyEnter(node.team, event)}
					on:mouseout={(event) => jerseyOut(node.team, event)}
				>
					<img
						src={`./assets/jerseys/${node.code}_icon.png`}
						alt={`${getTeamCode(node.team)} icon jersey`}
						class="jersey-illustration"
					/>
				</div>
				<div
					class="team-container"
					style="left: {node.x + 16}px;
            			top: {node.y * 2 + $height / 2 - 60}px;
						opacity: {node.team === selectedTeamName ? 1 : 0}"
				>
					{#if node.team === selectedTeamName}
						<span>Your team:</span>
					{/if}
					<span><strong>{node.team}</strong></span>
					<div class="caret"></div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<svg
		width="2"
		height={$height}
		style="position: absolute; left: {$width / 2}px;"
	>
		<line y1="30" x1="0" y2={$height-30} x2="0" stroke="black" stroke-width="2" />
	</svg>
	<div class="bee-container">
		<div class="flair-explain">
			<span class="left"><span class="caret-left"></span> Less flair</span>
			<span class="right">More flair <span class="caret-right"></span></span>
		</div>
		<!-- draw a full-width horizontal line halfway down the container -->
		{#each simulation.nodes() as node}
		<div class="node-wrapper">
			<div
				class="jersey-container"
				style="top: {(node.x * $height/$width)+20}px; left: {node.y * 2 + $width / 2}px; width: {jerseySize}px;"
				on:mouseenter={(event) => jerseyEnter(node.team, event)}
				on:mouseout={(event) => jerseyOut(node.team, event)}
			>
				<img
					src={`./assets/jerseys/${node.code}_icon.png`}
					alt={getTeamCode(node.team)}
					class="jersey-illustration"
				/>
			</div>
			<div
				class="team-container"
				style="
				top: {(node.x * $height/$width)-30}px;
				left: {node.y * 2 + $width / 2}px;
				opacity: {node.team === selectedTeamName ? 1 : 0}
				"
			>
				{#if node.team === selectedTeamName}
					<span>Your team:</span>
				{/if}
				<span><strong>{node.team}</strong></span>
				<div class="caret"></div>
			</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.bee-container {
		width: 100%;
		position: relative;
		height: 100%;
	}

	.jersey-container {
		position: absolute;
		transform: translate(-50%, -50%);
		cursor: pointer;
	}
	.jersey-container:hover {
		z-index: 800;
	}
	.jersey-container:hover img {
		transform: scale(1.25);
		transform-origin: 50% 50%;
		transition: transform calc(var(--1s) * 0.3);
	}

	.team-container {
		display: inline-block;
		text-align: center;
		padding: 2px 2px;
		position: relative;
		font-size: 13px;
		line-height: 13px;
		width: 90px;
		position: absolute;
		transform: translate(-50%, -40%);
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 3px;
		border: 1px solid var(--color-fg);
		z-index: 2;
		font-family: var(--sans);
		pointer-events: none;
		transition: opacity calc(var(--1s) * 0.5);
		z-index: 900;
	}

	.caret {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #333;
		margin: 5px auto 0;
	}

	.flair-explain {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		font-family: var(--sans);
		font-size: 14px;
		width: 56px;
		font-weight: bold;

		@media screen and (min-width: 700px) {
			flex-direction: row;
			height: auto;
			width: 100%;
		}
	}

	.left,
	.right {
		display: flex;
		align-items: center;
	}

	.caret-left {
		@media screen and (min-width: 700px) {
			margin-right: 5px;
			width: 0;
			height: 0;
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			border-right: 5px solid #333;
		}
	}

	.caret-right {
		@media screen and (min-width: 700px) {
			margin-left: 5px;
			width: 0;
			height: 0;
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			border-left: 5px solid #333;
		}
	}
</style>
