<script>
	import { getContext } from "svelte";
	import convertToPercent from "../../utils/convertToPercent";
	import viewport from "$stores/viewport.js";

	import * as d3 from "d3";
	import { Home } from "lucide-svelte";

	export let width;
	export let margin = { top: 0, right: 0, bottom: 0, left: 0 };

	// const { xGet, height, zGet, xScale, yScale } = getContext('LayerCake');
	export let data;
	let svg;
	let groupedData = [];

	export let height;
	let barStroke = 1.5;
	const barSpacing = 2;

	let fontSize = 12;

	const editions = [
		'Association Edition',
		'Icon Edition',
		'Statement Edition',
		'City Edition',
		'Classic Edition',
		'City 2 Edition',
		'Home',
		'Away',
		'Alternate'
	]
	
	const editionsOrder = editions.reduce((map, item, index) => {
		map[item] = index;
		return map;
	}, {});

	$: {
		let runningTotal = 0;

	groupedData = Array.from(
		d3.rollups(
			data.sort((a, b) => {
				return editionsOrder[a.edition] - editionsOrder[b.edition];
			}),
			(v) => ({
				total: v.length,
				colorHex: v[0].colorHex
			}),
			(d) => d.edition
		)
		.map(([key, { total, colorHex }]) => {
			runningTotal += total;
			return {
				edition: key,
				total: total,
				colorHex: colorHex,
				cumulative: runningTotal - total
			};
		})
	);
	}

	$: x = d3.scaleLinear()
			.domain([0, d3.sum(groupedData, (d) => d.total)])
			.range([0, width - (groupedData.length * (barSpacing + barStroke))]);

		$: y = d3.scaleBand()
			.domain([0, 1])
			.range([0, height])
			.padding(0.1);

			const { top, right, bottom, left } = margin;

</script>

<svg>
	<g
		{width}
		{height}
		transform={`translate(${left+1},${top})`}
	>
	  {#each groupedData as d, i}
		<g>
		{#if d.total / 41 >= .05}
			<text
				x={x(d.cumulative) + i * (barSpacing + barStroke)}
				y={$viewport.width <= 600 && i % 2 !== 0  ? 60 : 10}
				fill="#000"
				text-anchor="left"
				font-size={`${fontSize}px`}
				font-family="sans-serif"
				font-weight=700
			>
				{`${d.edition.replace(' Edition', '')}`}
			</text>
			<text
				x={x(d.cumulative) + i * (barSpacing + barStroke)}
				y={$viewport.width <= 600 && i % 2 !== 0  ? 74 : 24}
				fill="#000"
				text-anchor="left"
				font-size={`${fontSize}px`}
				font-family="sans-serif"
			>
				{`${convertToPercent(d.total, 41)}`}
			</text>
		{/if}
		<rect
		  class="bar"
			x={x(d.cumulative) + i * (barSpacing + barStroke)}
			y={28}
			fill={d.colorHex}
			width={x(d.total)}
			stroke="#000"
			stroke-width={barStroke}
			height={y.bandwidth()}
		/>
	</g>
		{/each}
	</g>
</svg>

<style>
	svg {
		width: 100%;
	}

	svg text {
		font-family: var(--sans);
	}
	.x-axis path,
	.y-axis path {
		display: none;
	}

	.x-axis line,
	.y-axis line {
		stroke: #ccc;
	}
</style>
