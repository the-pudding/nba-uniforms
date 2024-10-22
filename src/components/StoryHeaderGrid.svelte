<script>
	import { getContext } from "svelte";
  import { selectedTeamStore } from '$stores/teamSelection';
  import pointer from "$svg/pointer.svg";
  import viewport from "$stores/viewport.js";

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
      {#if $viewport.width >= 750}
        <h1>
          <span>Colors</span>
          <span>of the</span>
          <span>Court</span>
        </h1>
      {:else}
        <h1>
          <span>Colors of</span>
          <span>the Court</span>
        </h1>
      {/if}
      <p class="pointer-prompt"><span class="svg-span">{@html pointer}</span>Pick a jersey or use the dropdown in the top left to select another team</p>
    </div>
  </div>



<style>
.header-grid__container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: 1fr;
  padding: 1rem;
  gap: 0.5rem;
  margin: 4rem auto 1rem auto;
  max-width: 1200px;
  pointer-events: auto;

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(6, 1fr);
    height: 100%;
    width: 80%;
    margin: 4rem auto 1rem auto;
  }

  @media screen and (max-width: 600px) {
    height: 100%;
    width: 100%;
    margin: 4rem auto 1rem auto;
  }
}

.header-grid__title {
    grid-area: 3 / 1 / 5 / 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 750px) {
      grid-area: 2 / 4 / 4 / 7;
    }
}

.header-grid__jersey {
  width: 100%;
  display: flex;
  align-items: center;
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
  width: 100%;
  aspect-ratio: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
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
    font-size: 110px;
    font-weight: 700;
    line-height: 0.75;
    text-transform: uppercase;
    z-index: 999;
    font-style: italic;
    text-align: center;
    margin: 0 0 0 -1rem;

    @media screen and (max-width: 1000px) {
      font-size: 80px;
    }

    @media screen and (max-width: 750px) {
      max-width: 545px;
      font-size: 90px;
    }

    @media screen and (max-width: 600px) {
      font-size: 60px;
    }
}
h1 span {
  display: block;

  @media screen and (max-width: 750px) {
      display: inline-block;
    }
}
.pointer-prompt {
  font-family: var(--sans);
  font-weight: 700;
  color: var(--color-fg);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  max-width: 280px;
  line-height: 1;
  margin: 0;

  @media screen and (max-width: 1000px) {
      font-size: var(--14px);
      max-width: 240px;
    }
  @media screen and (max-width: 600px) {
      font-size: 12px;
      max-width: 220px;
    }
}
.pointer-prompt span {
  width: 42px;
  height: 42px;
  margin-right: 0.5rem;
  animation: shake 1.5s cubic-bezier(.36,.07,.19,.97) infinite;
}

:global(.pointer-prompt span svg) {
  width: 100%;
}

@keyframes shake {
      10%, 90% {
          transform: translate3d(-1px, 0, 0);
      }
      
      20%, 80% {
          transform: translate3d(1px, 0, 0);
      }

      30%, 50%, 70% {
          transform: translate3d(-2px, 0, 0);
      }

      40%, 60% {
          transform: translate3d(2px, 0, 0);
      }
  }

  @media (prefers-reduced-motion: reduce) {
        .shake {
            animation: none;
        } 
    }
</style>
