<script>
	import { browser } from "$app/environment";
	import { getContext } from "svelte";
	import { LayerCake, Svg } from "layercake";
  	import { selectedTeamStore } from '$stores/teamSelection';
  	import { showSelectBarStore } from '$stores/showSelectBar';
	import Section from "$components/nba/Section.svelte";
	import * as d3 from "d3";
	import inView from "$actions/inView.js";

	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import Beeswarm from "$components/nba/Beeswarm.html.svelte";
	import Lollipop from "$components/nba/Lollipop.svelte";

	import flair23 from "$data/nba2324/flairScore.json";
	import flair13 from "$data/nba2324/flairScore13.json";

	$: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find((d) => d.code === selectedTeam)?.team;
	$: statFill(selectedTeam, copy);

	const copy = getContext("copy");
  const data = getContext("data");
  const data1314 = getContext("data1314");
	const teams = getContext("teams");

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

	function statFill(team, copy) {
		if (browser) {
			const homeCityGames = data.filter(
				(d) =>
					d.homeTeam === selectedTeamName &&
					d.homeTeamEdition === "City Edition"
			).length;
			const awayCityGames = data.filter(
				(d) =>
					d.awayTeam === selectedTeamName &&
					d.awayTeamEdition === "City Edition"
			).length;

			document.querySelectorAll(".geo-team").forEach((span) => {
				span.textContent = selectedTeamName;
			});

			document.querySelectorAll(".geo-white-at-home").forEach((span) => {
				span.textContent = data.filter(
					(d) =>
						d.homeTeam === selectedTeamName &&
						d.homeTeamEdition === "Association Edition"
				).length;
			});

			document.querySelectorAll(".geo-white-at-road").forEach((span) => {
				span.textContent = data.filter(
					(d) =>
						d.awayTeam === selectedTeamName &&
						d.awayTeamEdition === "Association Edition"
				).length;
			});

			document.querySelectorAll(".geo-city-instances").forEach((span) => {
				span.textContent = homeCityGames + awayCityGames;
			});

			document.querySelectorAll(".geo-city-avg").forEach((span) => {
				span.textContent =
					homeCityGames + awayCityGames > 13.833333333333334
						? "above"
						: "below";
			});
		}
	}
</script>

<div id="nba"
	use:inView={{ bottom: 0 }}
	on:enter={() => showSelectBarStore.set(true)}
>
	{#each copy.copy as section, i}
		<Section copy={section} />
	{/each}
</div>

<style>
	#nba > * {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	#nba > .graphic-wide {
		max-width: unset;
		margin: 0 auto 25px;
		padding: 10px 75px;
		border-top: 8px solid black;
		border-bottom: 8px solid black;
		background-color: rgba(255, 255, 255, 0.75);
	}

	#nba > .graphic-wide.clear {
		border-top: none;
		border-bottom: none;
		background-color: unset;
	}

	.lollipop, .beeswarm {

		height: 300px;
	}

	:global(#nba h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}

	p,
	ul {
		background-color: rgba(255, 255, 255, 0.75);
		border-left: 8px solid black;
		border-right: 8px solid black;
		max-width: 900px;
		padding: 5px 90px 15px;
		margin: 0;
	}

	.jersey-spread {
		display: flex;
		justify-content: space-around;
	}

	.jersey-spread__section {
		text-align: center;
		width: 25%;
	}

	.jersey-spread__section img {
		width: 100px;
		margin: 0 auto;
	}

	.jersey-layout__container {
		display: flex;
		justify-content: space-around;
	}
</style>
