<script>
	import { getContext } from "svelte";
  import { selectedTeamStore } from '$stores/teamSelection';
  import wordmark from "$svg/wordmark-shadow.svg";

	const teams = getContext("teams");

	$: selectedTeam = $selectedTeamStore;

	function handleTeamSelect(event) {
		selectedTeamStore.set(event.target.alt);
	}
</script>

  <div class="header-grid__container">
    {#each teams as team}
			<div class="header-grid__jersey">
				<button aria-label={`Select ${team.team}`} on:click={handleTeamSelect}>
					<img src={`./assets/jerseys/${team.code}_icon.png`} alt={team.code} class={team.code === selectedTeam ? 'selected-team-jersey' : ''}/>
				</button>
			</div>
		{/each}
    <div class="header-grid__title">
      <div class="wordmark">
        <a href="https://pudding.cool" aria-label="The Pudding" target="_self"
          >{@html wordmark}</a
        >
      </div>
      <h1>
        <span>Colors</span>
        <span>of the</span>
        <span>Court</span>
      </h1>
    </div>
  </div>



<style>
.header-grid__container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  padding: 0.5rem;
  gap: 5px; /* Optional gap between cells */
  margin: 0 auto 4rem auto;
  max-width: 1200px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}

.header-grid__title {
    grid-area: 3 / 1 / 5 / 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 768px) {
      grid-area: 2 / 4 / 4 / 7;
    }
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

.wordmark {
    width: 100%;
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
    transform: rotate(-2deg);
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
  }

  :global(.wordmark svg) {
    max-width: 180px;
  }

.header-grid__title h1 {
    font-family: var(--headline);
    font-size: 92px;
    font-weight: 700;
    line-height: 0.85;
    text-transform: uppercase;
    z-index: 999;
    font-style: italic;
    text-align: center;
    margin: 0 0 0 -1rem;
}
</style>
