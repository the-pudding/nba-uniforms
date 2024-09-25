<script>
		import { getContext } from 'svelte';
    import { selectedTeamStore } from '$stores/teamSelection';
	import JerseyLayout from "$components/nba/JerseyLayout.svelte";
	import teams from "$data/nba2324/teamNames.json";

  	$: selectedTeam = $selectedTeamStore;

	function handleChange(event) {
		selectedTeam = event.target.value;
	}

	const copy = getContext("copy").copy;
	console.log(copy);
</script>

<div id="nba">
	<h1>NBA</h1>
	<label for="team-dropdown">Select a Team</label>
	<select id="team-dropdown" bind:value={selectedTeam} on:change={handleChange}>
	{#each teams as team}
		<option value={team.code}>{team.team}</option>
	{/each}
	</select>

	{#if copy}
		{#each copy as section}
			{#if section.type === 'text'}
					<p>{section.value}</p>
			{:else if section.type === 'list'}
				<ul>
					{#each section.value as item}
						<li>{item}</li>
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
