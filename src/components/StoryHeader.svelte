<script>
	import { getContext } from "svelte";
  import { selectedTeamStore } from '$stores/teamSelection';	
	import wordmark from "$svg/wordmark.svg";

	const teams = getContext("teams");

	$: selectedTeam = $selectedTeamStore;

	function handleTeamSelect(event) {
		selectedTeamStore.set(event.target.alt);
	}
</script>

<header>
  <div class="header-grid__container">
    {#each teams as team}
			<div class="header-grid__jersey">
				<button aria-label={`Select ${team.team}`} on:click={handleTeamSelect}>
					<img src={`/assets/jerseys/${team.code}_icon.png`} alt={team.code} class={team.code === selectedTeam ? 'selected-team-jersey' : ''}/>
				</button>
			</div>
		{/each}
    <div class="header-grid__title">
			{@html wordmark}
			<h1>Rep Your Team</h1>
		</div>
  </div>
</header>


<style>
.header-grid__container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px; /* Optional gap between cells */
}

.header-grid__jersey img {
	cursor: pointer;
	opacity: 0.5;

	&:hover,
	&.selected-team-jersey {
		opacity: 1;
	}
}

.header-grid__jersey button {
	background-color: unset;
}

.header-grid__title {
  grid-area: 2 / 4 / 4 / 7;
  display: flex;
	flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
