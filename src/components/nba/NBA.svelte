<script>
	import { browser } from "$app/environment";
	import { getContext } from 'svelte';
  import { selectedTeamStore } from '$stores/teamSelection';
	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import allTeams from "$data/nba2324/teamNames.json";

  $: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = allTeams.find(d => d.code === selectedTeam).team;
	$: statFill(selectedTeam, copy);

	const copy = getContext("copy").copy;
	const data = getContext("data");
	console.log(copy);

	function handleChange(event) {
		selectedTeam = event.target.value;
	}
	
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
	<label for="team-dropdown">Select a Team</label>
	<select id="team-dropdown" bind:value={selectedTeam} on:change={handleChange}>
	{#each allTeams as team}
		<option value={team.code}>{team.team}</option>
	{/each}
	</select>

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
</style>
