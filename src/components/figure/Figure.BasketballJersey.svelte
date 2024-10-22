<script>
	import { selectedTeamStore } from '$stores/teamSelection';
	import * as d3 from "d3";

	export let fill = "#000";
	export let city = false;
	export let width;
	export let edition;
	export let gameDate;
	export let opponent;
	export let place;

	let editionFormatted = edition.split(" ")[0].toLowerCase();

	let height = width*1.5;

	let tooltipVisible = false;

	function onMouseOver() {
		let el = this;
		tooltipVisible = true;
		d3.selectAll(".figure-jersey").style("opacity", 0.3);
		d3.select(el).style("opacity", 1);
	}

	function onMouseLeave() {
		tooltipVisible = false;
		d3.selectAll(".figure-jersey").style("opacity", 1);
	}
</script>

<figure
	class="figure-jersey"
	on:mouseover={onMouseOver}
	on:mouseleave={onMouseLeave}
>
	<img src="/assets/jerseys/{$selectedTeamStore}_{editionFormatted}.png" alt="{$selectedTeamStore} {editionFormatted} jersey" />
	{#if tooltipVisible}
		<div class="tooltip">
			<p>{gameDate}</p>
			{#if place == "home"}
				<p>vs. {opponent}</p>
			{:else}
				<p>@ {opponent}</p>
			{/if}
		</div>
	{/if}
	<!-- <svg
		width={width}
		height={height}
		viewBox={`0 0 ${width} ${height}`}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<path
				d="M10 2C10 6.25 12.5 11.5 19 11.5C25.5 11.5 28 6.25 28 2C30.4 2.8 32.9167 3.83333 33.875 4.25C32.7917 10.375 31.9 22.9 37 24V54.5C34.9583 55.75 28.5 58.25 19 58.25C9.5 58.25 3.04167 55.75 1 54.5V24C6.1 22.9 5.20833 10.375 4.125 4.25C5.08333 3.83333 7.6 2.8 10 2Z"
				fill={fill}
				stroke="black"
				stroke-width="2"
			/>
            {#if city}
                <text x={width/2} y={height-10} fill="#7f7f7f" text-anchor="middle">CITY</text>
            {/if}
		</g>
	</svg> -->
</figure>

<style>
	figure {
		width: 10.5%;
		max-width: 50px;
		position: relative;
		transition: opacity 250ms linear;
		cursor: pointer;
	}

	.tooltip {
		position: absolute;
		top: 50%;
		left: 50%;
		font-family: var(--sans);
		font-size: var(--12px);
		background-color: white;
		padding: 0.25rem;
		z-index: 999;
		width: 120px;
		border: 2px solid var(--color-gray-1000);
		pointer-events: none;
	}

	.tooltip p {
		padding: 0;
		margin: 0;
		line-height: 1.125;
	}

	img {
		width: 100%;
	}

	text {
		font-weight:400;
		font-size: 10px;
		font-family:"Arial Narrow", Helvetica, sans-serif
	}
</style>
