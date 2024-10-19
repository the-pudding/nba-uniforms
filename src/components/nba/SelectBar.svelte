<script>	
	import { getContext } from 'svelte';
  import { selectedTeamStore } from '$stores/teamSelection';
  import { showSelectBarStore } from '$stores/showSelectBar';
	import geolocateTarget from '$svg/geolocate.svg';

	import locate from "$utils/locate";
	import findClosestPoint from "$utils/findClosestPoint";
	
	const teams = getContext("teams");

	$: showSelectBar = $showSelectBarStore;
  $: selectedTeam = $selectedTeamStore;

	function handleChange(event) {
		selectedTeamStore.set(event.target.value);
	}

	function handleGeolocate() {
		locate(true).then(data => {
			const [lat, lon] = data.loc.split(',').map(Number);
			const closestArena = findClosestPoint({ lat: lat, lon: lon }, teams);
			selectedTeamStore.set(closestArena.code);
		}).catch(err => {
			console.error(err);
		});
	}
</script>


<div class={`select-bar ${showSelectBar ? '' : 'hidden'}`}>
	<button aria-label="Find nearest team to me" on:click={handleGeolocate}>
		{@html geolocateTarget}
	</button>
	<label for="team-dropdown">Your team is the </label>
	<div class="select-container">
		<select id="team-dropdown" bind:value={selectedTeam} on:change={handleChange}>
		{#each teams as team}
			<option value={team.code}>{team.team}</option>
		{/each}
		</select>
	</div>
</div>

<style>
	div.select-bar {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0.5em;
		background: var(--color-fg);
		color: var(--color-input-bg);
		font-family: var(--sans);
		font-size: 16px;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 4rem;
		transition: opacity 0.5s;
	}
	.hidden {
		opacity: 0;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-input-bg);
	}
	
	label {
		position: relative;
		top: -1px;
	}

	select {
		background-color: var(--color-fg);
		color: var(--color-input-bg);
		border: none;
		border-bottom: 2px solid var(--color-input-bg);
		padding: 4px 0;
		appearance: none; /* Removes default arrow */
		-webkit-appearance: none;
		-moz-appearance: none;
		position: relative;
		width: 100%;
		font-weight: 700;
		margin-left: 6px;
	}

	.select-container {
		position: relative;
		display: inline-block;
		width: 220px;
	}

	.select-container::after {
		width: 0; 
		height: 0; 
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 7px solid white;
		position: absolute;
		top: 30%;
		right: 0;
		content: "";
		z-index: 98;
		pointer-events: none;
	}

</style>
