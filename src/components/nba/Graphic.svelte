<script>
    import { selectedTeamStore } from '$stores/teamSelection';
    import JerseyLayout from "$components/nba/JerseyLayout.svelte";

    export let id;

    $: selectedTeam = $selectedTeamStore;
</script>

<section>
    {#if id == "waffle-home-away"}
        <div class="middle-line"></div>
        <div class="chart-wrapper">
            <JerseyLayout
                teamCode={selectedTeam}
                homeAwayFilter={'home'}
            />
        </div>
        <div class="chart-wrapper">
            <JerseyLayout
                teamCode={selectedTeam}
                homeAwayFilter={'away'}
            />
        </div>
    {/if}
</section>
<div class="after-line"></div>

<style>
   section {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 2rem;
        gap: 4rem;
        position: relative;
   }

   .middle-line {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,0)
;        height: 100%;
        width: 5px;
        background-color: var(--color-gray-1000);
   }

   .chart-wrapper {
        width: calc(50% - 2rem);
        background-color: rgba(255, 255, 255, 0.75);
        padding: 1rem;
        border: 5px solid var(--color-gray-1000);
   }
</style>