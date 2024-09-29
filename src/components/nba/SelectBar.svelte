<script>	
	import { getContext } from 'svelte';
  import { selectedTeamStore } from '$stores/teamSelection';
	import geolocateTarget from '$svg/geolocate.svg';


	import locate from "$utils/locate";
	import findClosestPoint from "$utils/findClosestPoint";
	
	const teams = getContext("teams");

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


<div class="select-bar">
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
		padding: 1.25em;
		background: var(--color-fg);
		color: var(--color-input-bg);
		font-family: var(--sans);
		font-size: 16px;
	}
	svg {
		cursor: pointer;
		fill: var(--color-input-bg);
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-input-bg);
	}

	select {
		background-color: var(--color-fg);
		color: var(--color-input-bg);
		border: none;
		border-bottom: 2px solid var(--color-input-bg);
		padding: 8px;
		appearance: none; /* Removes default arrow */
		-webkit-appearance: none;
		-moz-appearance: none;
		position: relative;
		width: 100%;
		font-weight: 700;
	}

	.select-container {
		position: relative;
		display: inline-block;
	}

	.select-container::after {
			content: '';
			position: absolute;
			top: 50%;
			right: 10px;
			width: 0.8em;
			height: 0.8em;
			pointer-events: none;
			transform: translateY(-50%);
			background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><polygon points="5,6 15,6 10,12"/></svg>');
			background-size: contain;
			background-repeat: no-repeat;
			color: var(--color-input-bg);
			}

</style>
