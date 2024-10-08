<script>
	import { getContext } from "svelte";

	const teams = getContext("teams");
</script>

<header>
  <div class="header-grid__container">
    {#each teams as team}
			<div class="header-grid__jersey">
				<img src={`/assets/jerseys/${team.code}_icon.png`} alt={team.team} />
			</div>
		{/each}
    <div class="header-grid__title">Content Here</div>
  </div>
</header>


<style>
.header-grid__container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 0.5rem;
  gap: 5px; /* Optional gap between cells */
  margin-bottom: 4rem;
}

/* .header-grid__jersey {
  background-color: #f0f0f;
} */

.header-grid__title {
  grid-area: 2 / 4 / 4 / 7;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #1e9943;
}

</style>
