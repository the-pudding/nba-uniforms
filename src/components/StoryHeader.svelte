<script>
	import { getContext } from "svelte";
  import wordmark from "$svg/wordmark-shadow.svg";

	const teams = getContext("teams");
</script>

<header>
  <div class="header-grid__container">
    {#each teams as team}
			<div class="header-grid__jersey">
				<img src={`/assets/jerseys/${team.code}_icon.png`} alt={team.team} />
			</div>
		{/each}
    <div class="header-grid__title">
      <div class="wordmark">
        <a href="https://pudding.cool" aria-label="The Pudding" target="_self"
          >{@html wordmark}</a
        >
      </div>
      <h1>
        <span>From</span>
        <span>Tradition</span>
        <span>To Trend</span>
      </h1>
    </div>
  </div>
</header>


<style>
.header-grid__container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 0.5rem;
  gap: 5px; /* Optional gap between cells */
  margin: 0 auto 4rem auto;
  max-width: 1200px;
}

/* .header-grid__jersey {
  background-color: #f0f0f;
} */

.header-grid__title {
    grid-area: 2 / 4 / 4 / 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
