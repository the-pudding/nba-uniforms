<script>
    import { onMount } from "svelte";
    import { selectedTeamStore } from "$stores/teamSelection";
    import getTeamCode from '../../utils/getTeamCode';
    import { flip } from 'svelte/animate';
    import * as d3 from "d3";

    export let data;

    let sortedBy = "association";
    let editions = ["association", "icon", "statement", "city", "classic"];
    let editionExists = {};
    let dataBars = data.map((d) => {
        const totalEditions = Object.keys(d).reduce((sum, key) => {
            if (key !== 'team') {
                sum += d[key];
            }
            return sum;
        }, 0);

        return {
            team: d.team,
            jerseys: [
                { type: 'association', percentage: Math.round(d["Association Edition"] / totalEditions * 100) },
                { type: 'icon', percentage: Math.round(d["Icon Edition"] / totalEditions * 100) },
                { type: 'statement', percentage: Math.round(d["Statement Edition"] / totalEditions * 100) },
                { type: 'city', percentage: Math.round((d["City Edition"] + d["City Edition 2"]) / totalEditions * 100) },
                { type: 'classic', percentage: Math.round(d["Classic Edition"] / totalEditions * 100) }
            ]
        };
    });

    $: yourTeam = dataBars ? dataBars.filter(d => getTeamCode(d.team) == $selectedTeamStore) : null;
    $: allOtherTeams = dataBars ? dataBars
        .filter(d => getTeamCode(d.team) !== $selectedTeamStore)
        .sort((a, b) => {
            const aIndex = a.jerseys.findIndex(j => j.type === sortedBy);
              const bIndex = b.jerseys.findIndex(j => j.type === sortedBy);
              return d3.descending(a.jerseys[aIndex]?.percentage, b.jerseys[bIndex]?.percentage);
        })
        : null;

     // Function to check if a jersey image exists
     async function fetchJersey(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Reactive block to update `editionExists` when team or editions change
    $: if ($selectedTeamStore && editions) {
        (async () => {
            for (const edition of editions) {
                const imageUrl = `assets/jerseys/${$selectedTeamStore}_${edition}.png`;
                editionExists[edition] = await fetchJersey(imageUrl);
            }
        })();
    }
    $: innerWidth = 0;

    function dataSort(edition) {
        sortedBy = edition;
        if (edition == "association") {
            allOtherTeams = allOtherTeams.sort((a, b) => d3.descending(a.jerseys[0].percentage, b.jerseys[0].percentage));
        } else if (edition == "icon") {
            allOtherTeams = allOtherTeams.sort((a, b) => d3.descending(a.jerseys[1].percentage, b.jerseys[1].percentage));
        } else if (edition == "statement") {
            allOtherTeams = allOtherTeams.sort((a, b) => d3.descending(a.jerseys[2].percentage, b.jerseys[2].percentage));
        } else if (edition == "city") {
            allOtherTeams = allOtherTeams.sort((a, b) => d3.descending(a.jerseys[3].percentage, b.jerseys[3].percentage));
        } else if (edition == "classic") {
            allOtherTeams = allOtherTeams.sort((a, b) => d3.descending(a.jerseys[4].percentage, b.jerseys[4].percentage));
        } else  {
            allOtherTeams = allOtherTeams.sort((a, b) => d3.descending(a.jerseys[0].percentage, b.jerseys[0].percentage));
        }
    }
</script>

<svelte:window bind:innerWidth />


{#if yourTeam}
<div class="your-team-wrapper">
    <div class="team-row your-team-row">
        <p class="name">{innerWidth > 600 ? yourTeam[0].team : getTeamCode(yourTeam[0].team)}</p>
        <div class="bar-wrapper">
            {#each yourTeam[0].jerseys as edition, i}
                <div class="jersey-wrapper">
                    <button on:click={() => dataSort(edition.type)} class:activeSort={sortedBy == edition.type}>
                        {edition.type}
                        <span>
                            {sortedBy == edition.type ? "▼" : "▲"}
                        </span>
                    </button>
                    <div class="jersey-img">
                        {#if editionExists[edition.type]}
                            <img src="assets/jerseys/{$selectedTeamStore}_{edition.type}.png">
                        {/if}
                    </div>
                    <div class="jersey-type">
                        <div class="inner-bar" style="width: {edition.percentage}%"></div>
                        <p>{edition.percentage}%</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
{/if}

{#if allOtherTeams}
    {#each allOtherTeams as team, i (team.team)}
        <div class="team-row" animate:flip>
            <p class="name">{innerWidth > 600 ? team.team : getTeamCode(team.team)}</p>
            <div class="bar-wrapper">
                {#each team.jerseys as edition, i}
                    <div class="jersey-type">
                        <div class="inner-bar" style="width: {edition.percentage}%"></div>
                        <p>{edition.percentage}%</p>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
{/if}

<style>
    .your-team-wrapper {
        position: sticky;
        top: 3.5rem;
        left: 0;
        background: rgba(255,255,255,0.95);
        padding: 0.5rem 0 0 0;
        z-index: 1000;
        margin-bottom: 2rem;
        border-bottom: 5px solid var(--color-fg);
    }
    .team-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0 0.5rem;
        max-width: 1000px;
        margin: 0 auto;
    }
    .your-team-row .name::after {
        content: "Your team";
        position: absolute;
        font-weight: 500;
        font-size: var(--12px);
        top: -0.75rem;
        right: 0;
        line-height: 1;
    }
    .your-team-row {
        padding-bottom: 0.5rem;
        align-items: flex-end;
        padding: 0.5rem 0.5rem 1rem 0.5rem;
        gap: 0.5rem;
    }
    .your-team-row .jersey-wrapper {
        display: flex;
        flex-direction: column;
        width: calc(20% - 1rem);
        justify-content: flex-end;
    }
    .your-team-wrapper .bar-wrapper {
        width: calc(100% - 10rem);
    }
    .jersey-img {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100px;
        margin: 0.25rem 0;
    }
    .jersey-img img {
        width: 100%;
        max-width: 60px;
        margin: 0.5rem 0;
    }
    .name {
        width: 10rem;
        font-family: var(--sans);
        font-weight: bold;
        text-align: right;
        margin: 0.25rem 0;
        font-size: var(--14px);
        position: relative;
    }
    .bar-wrapper {
        width: calc(100% - 10rem);
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
    }
    .jersey-type {
        width: 20%;
        border: 2px solid var(--color-fg);
        height: 20px;
        background: white;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .jersey-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .jersey-wrapper p {
        margin: 0;
        font-family: var(--sans);
        font-size: var(--12px);
        text-transform: uppercase;
        font-weight: 700;
    }
    .your-team-row .jersey-type {
        width: 100%;
    }
    .jersey-type p {
        margin: 0 0 0 0.125rem;
        font-family: var(--sans);
        font-size: var(--12px);
        font-weight: 500;
    }
    .inner-bar {
        height: 100%;
        background: var(--color-fg);
    }
    button {
        background: transparent;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid var(--color-fg);
        opacity: 0.5;
    }
    .activeSort {
        opacity: 1;
    }

    @media(max-width: 600px) {
        .name {
            width: 2rem;
        }
        .your-team-row .bar-wrapper, .bar-wrapper {
            width: calc(100% - 2rem);
        }
        .bar-wrapper {
            gap: 0.5rem;
        }
        .your-team-row .jersey-wrapper {
            width: calc(20% - 0.25rem);
        }
        .your-team-row .name::after {
            top: -1.75rem;
        }
    } 
</style>