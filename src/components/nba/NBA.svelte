<script>
	import { browser } from "$app/environment";
	import { getContext } from 'svelte';
	import { LayerCake, Svg } from "layercake";
  import { selectedTeamStore } from '$stores/teamSelection';
	import * as d3 from "d3";

	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import Beeswarm from "$components/nba/Beeswarm.html.svelte";
	import Lollipop from "$components/nba/Lollipop.svelte";

	import flair23 from "$data/nba2324/flairScore.json";
	import flair13 from "$data/nba2324/flairScore13.json";

	$: flairData = flair23.map(d => ({
		...d,
		"2023 Score": Number(d.score),
		"2013 Score": Number(flair13.find(f => f.team === d.team).score)
	}));

  $: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find(d => d.code === selectedTeam)?.team;
	$: statFill(selectedTeam, copy);

	const copy = getContext("copy").copy;
	const data = getContext("data");
	const teams = getContext("teams");
	
	function statFill(team, copy) {
		if (browser) {
			const homeCityGames = data.filter(d => d.homeTeam === selectedTeamName && d.homeTeamEdition === 'City Edition').length;
			const awayCityGames = data.filter(d => d.awayTeam === selectedTeamName && d.awayTeamEdition === 'City Edition').length;

			document.querySelectorAll('.geo-team').forEach(span => {
					span.textContent = selectedTeamName;
			});

			document.querySelectorAll('.geo-white-at-home').forEach(span => {
					span.textContent = data.filter(d => d.homeTeam === selectedTeamName && d.homeTeamEdition === 'Association Edition').length;
			});

			document.querySelectorAll('.geo-white-at-road').forEach(span => {
					span.textContent = data.filter(d => d.awayTeam === selectedTeamName && d.awayTeamEdition === 'Association Edition').length;
			});

			document.querySelectorAll('.geo-city-instances').forEach(span => {
					span.textContent = homeCityGames + awayCityGames;
			});

			document.querySelectorAll('.geo-city-avg').forEach(span => {
					span.textContent = (homeCityGames + awayCityGames) > 13.833333333333334 ? 'above' : 'below';
			});
		}
	}
</script>

<div id="nba">
	<h1>NBA</h1>

	{#if copy}
		{#each copy as section}
			{#if section.type === 'text'}
					<p>{@html section.value}</p>
			{:else if section.type === 'heading'}
					<h2>{@html section.value}</h2>
			{:else if section.type === 'list'}
				<ul>
					{#each section.value as item}
						<li>{@html item}</li>
					{/each}
				</ul>
			{:else if section.type === 'graphic'}
				{#if section.value[0] === 'waffle-home-away'}
					<JerseyLayout
						teamCode={selectedTeam}
						homeAwayFilter={'home'}
					/>
					<JerseyLayout
						teamCode={selectedTeam}
						homeAwayFilter={'away'}
					/>
				{:else if section.value[0] === 'beeswarm-flair-23'}
				<div class="beeswarm">
					<LayerCake
						data={flairData}
						x={'2023 Score'}
						height={400}
					>
						<Beeswarm />
					</LayerCake>
				</div>
				{/if}
			{/if}
		{/each}
	{/if}
	
</div>

<style>
	#nba {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#nba section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#nba h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}

	p, ul {
		background-color: rgba(255, 255, 255, 0.75);
		border-left: 8px solid black;
		border-right: 8px solid black;
		max-width: 900px;
		padding: 5px 90px 15px;
		margin: 0
	}

	.beeswarm {
		max-width: 900px;
		margin: 0 auto;
		width: 100vh;
		height: 300px;
		padding: 10px;
		border: 1px solid black;
	}
</style>
