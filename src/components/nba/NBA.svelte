<script>
	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import teamNames from "$data/nba2324/teamNames.json";

  	$: selectedTeam = 'ATL';

	function handleChange(event) {
		selectedTeam = event.target.value;
	}
</script>

<div id="nba">
	<h1>NBA</h1>
	<label for="team-dropdown">Select a Team</label>
	<select id="team-dropdown" bind:value={selectedTeam} on:change={handleChange}>
	{#each teamNames as team}
		<option value={team.code}>{team.team}</option>
	{/each}
	</select>
	
	<JerseyLayout
		teamCode={selectedTeam}
		homeAwayFilter={'total'}
	/>
	<JerseyLayout
		teamCode={selectedTeam}
		homeAwayFilter={'home'}
	/>
	<JerseyLayout
		teamCode={selectedTeam}
		homeAwayFilter={'away'}
	/>
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
