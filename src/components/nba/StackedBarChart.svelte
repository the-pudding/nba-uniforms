<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import { Home } from "lucide-svelte";

	export let data = [];
	export let width = 600;
	export let height = 100;
	export let margin = { top: 0, right: 0, bottom: 0, left: 0 };

	let svg;
	let groupedData = [];

	const editions = [
		'Association Edition',
		'Icon Edition',
		'Statement Edition',
		'City Edition',
		'Classic Edition',
		'City 2 Edition'
	]
	
	const editionsOrder = editions.reduce((map, item, index) => {
		map[item] = index;
		return map;
	}, {});

	$: {
		groupedData = Array.from(
			d3.rollups(
					data,
					(v) => ({
						total: v.length,
						colorHex: v[0].colorHex
					}),
					(d) => d.edition
				)
				.map(([key, { total, colorHex }]) => ({
					edition: key,
					total: total,
					colorHex: colorHex
				}))
		);

		console.log(groupedData);
		
		groupedData.sort((a, b) => {
			return editionsOrder[a.edition] - editionsOrder[b.edition];
		});
		drawChart();
	}

	function drawChart() {
		const { top, right, bottom, left } = margin;
		const innerWidth = width - left - right;
		const innerHeight = height - top - bottom;

		// Clear previous content
		d3.select(svg).selectAll("*").remove();

		const x = d3
			.scaleLinear()
			.domain([0, d3.sum(groupedData, (d) => d.total)])
			.range([0, width]);

		const y = d3.scaleBand().domain([0, 1]).range([0, height]).padding(0.1);

		const g = d3
			.select(svg)
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${left},${top})`);

		let cumulative = 0;
		g.selectAll(".bar")
			.data(groupedData)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d) => {
				const prev = cumulative;
				cumulative += d.total;
				return x(prev);
			})
			.attr("y", 1)
			.attr("fill", (d) => d.colorHex)
			.attr("width", (d) => x(d.total))
			.attr("height", y.bandwidth());
	}
</script>

<svg bind:this={svg}></svg>

<style>
	.x-axis path,
	.y-axis path {
		display: none;
	}

	.x-axis line,
	.y-axis line {
		stroke: #ccc;
	}
</style>
