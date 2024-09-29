<script>	
	import { getContext } from 'svelte';
  import { selectedTeamStore } from '$stores/teamSelection';
	
	const teams = getContext("teams");

  $: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find(d => d.code === selectedTeam)?.team;

	function handleChange(event) {
		selectedTeamStore.set(event.target.value);
	}
</script>


<div>
	
	<label for="team-dropdown">Select a Team</label>
	<select id="team-dropdown" bind:value={selectedTeam} on:change={handleChange}>
	{#each teams as team}
		<option value={team.code}>{team.team}</option>
	{/each}
	</select>
</div>

<style>
	div {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 1.25em;
		background: var(--color-fg);
		color: var(--color-bg);
		font-family: monospace;
		font-size: 16px;
	}
</style>
