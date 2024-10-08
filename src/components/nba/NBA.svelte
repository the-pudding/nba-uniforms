<script>
	import { browser } from "$app/environment";
	import { getContext } from 'svelte';
	import { LayerCake, Svg } from "layercake";
  	import { selectedTeamStore } from '$stores/teamSelection';
	import Section from "$components/nba/Section.svelte";

	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import Beeswarm from "$components/nba/Beeswarm.html.svelte";

	import flair23 from "$data/nba2324/flairScore.json";
	import flair13 from "$data/nba2324/flairScore13.json";

  $: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find(d => d.code === selectedTeam)?.team;
	$: statFill(selectedTeam, copy);

	const copy = getContext("copy");
	const data = getContext("data");
	const teams = getContext("teams");

	console.log(copy)
	
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
	{#each copy.copy as section, i}
		<Section copy={section} />
	{/each}
</div>

<style>

</style>
