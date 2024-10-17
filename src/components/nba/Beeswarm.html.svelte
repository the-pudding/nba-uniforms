<!--
  @component
  Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import { getContext } from "svelte";
	import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
	import getTeamCode from "../../utils/getTeamCode";

	const { data, xGet, height, width, zGet, xScale, yScale } =
		getContext("LayerCake");

	$: nodes = $data.map((d) => ({ ...d, code: getTeamCode(d.team) }));

	/** @type {Number} [r=4] - The circle radius size in pixels. */
	export let r = 4;

	/** @type {String} [fill='#f95346'] - The circle's fill color. */
	export let fill = "#f95346";

	/** @type {String} [stroke='#000'] - The circle's stroke color. */
	export let stroke = "#000";

	/** @type {Number} [strokeWidth=1] - The circle's stroke width. */
	export let strokeWidth = 1;

	/** @type {Number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength). */
	export let xStrength = 0.99;

	export let selectedTeamName;

	// also adjust the Y using force
	$: simulation = forceSimulation(nodes)
		.force(
			"x",
			forceX()
				.x((d) => $xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0))
				.strength(0.99)
		)
		.force("y", forceY().strength(1 / 1000))
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
</script>

{#if $width >= 500}
	<svg
		width="100%"
		height="2"
		style="position: absolute; top: {$height / 2}px;"
	>
		<line x1="0" y1="0" x2="100%" y2="0" stroke="black" stroke-width="2" />
	</svg>
	<div class="bee-container">
		<div class="flair-explain">
			<span class="left"><span class="caret-left"></span> Less flair</span>
			<span class="right">More flair <span class="caret-right"></span></span>
		</div>
		<!-- draw a full-width horizontal line halfway down the container -->
		{#each simulation.nodes() as node}
			<div
				class="jersey-container"
				style="
          left: {node.x}px;
          top: {node.y * 2 + $height / 2}px;
          width: 35px;
        "
			>
				<img
					src={`./assets/jerseys/${node.code}_icon.png`}
					alt={getTeamCode(node.team)}
					class="jersey-illustration"
				/>
			</div>
			{#if node.team === selectedTeamName}
				<div
					class="team-container"
					style="
            left: {node.x}px;
            top: {node.y * 2 + $height / 2 - 50}px;
            "
				>
					<span>Your team: <strong>{selectedTeamName}</strong> </span>
					<div class="caret"></div>
				</div>
			{/if}
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
			<div
				class="jersey-container"
				style="
        top: {$height - node.x - 50}px;
        left: {node.y * 2 + $width / 2}px;
        width: 35px;
      "
			>
				<img
					src={`./assets/jerseys/${node.code}_icon.png`}
					alt={getTeamCode(node.team)}
					class="jersey-illustration"
				/>
			</div>
			{#if node.team === selectedTeamName}
				<div
					class="team-container"
					style="
					top: {$height - node.x - 100}px;
					left: {node.y * 2 + $width / 2}px;
					"
				>
					<span>Your team: <strong>{selectedTeamName}</strong> </span>
					<div class="caret"></div>
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.bee-container {
		position: relative;
		height: 100%;
	}

	.jersey-container {
		position: absolute;
		transform: translate(-50%, -50%);
	}

	.team-container {
		display: inline-block;
		text-align: center;
		padding: 2px 2px;
		position: relative;
		font-size: 13px;
		line-height: 13px;
		width: 80px;
		position: absolute;
		transform: translate(-50%, -40%);
		background-color: rgba(255, 255, 255, 0.75);
		border-radius: 5px;
		border: 1px solid black;
		z-index: 2;
		font-family: var(--sans);
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
		padding: 10px;
		width: 100%;
		font-family: var(--sans);
		font-size: 14px;
		font-weight: bold;

		@media screen and (min-width: 500px) {
			flex-direction: row;
		}
	}

	.left,
	.right {
		display: flex;
		align-items: center;
	}

	.left {
		position: absolute;
		bottom: 15px;

    @media screen and (min-width: 500px) {
      position: unset;
      
    }
	}

	.caret-left {
		@media screen and (min-width: 500px) {
			margin-right: 5px;
			width: 0;
			height: 0;
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			border-right: 5px solid #333;
		}
	}

	.caret-right {
		@media screen and (min-width: 500px) {
			margin-left: 5px;
			width: 0;
			height: 0;
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			border-left: 5px solid #333;
		}
	}
</style>
