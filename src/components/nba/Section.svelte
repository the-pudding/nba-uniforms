<script>
    import { browser } from "$app/environment";
    import { getContext } from 'svelte';
    import { selectedTeamStore } from '$stores/teamSelection';
    import Graphic from "$components/nba/Graphic.svelte";
    import { annotationVisible } from "$stores/misc.js";
    import inView from "$actions/inView.js";
    export let copy;

    function showAnno(annoID) { annotationVisible.set([true, +annoID]); }

    function hideAnno(annoID) { annotationVisible.set([false, +annoID]); }

	const data = getContext("data");
	const teams = getContext("teams");

    const jerseysList = ["association", "icon", "statement", "city"];

    $: selectedTeam = $selectedTeamStore;
	$: selectedTeamName = teams.find(d => d.code === selectedTeam)?.team;
	$: statFill(selectedTeam, copy);

    function statFill(team, copy) {
		if (browser) {
			const homeCityGames = data.filter(d => d.homeTeam === selectedTeamName && d.homeTeamEdition === 'City Edition').length;
			const awayCityGames = data.filter(d => d.awayTeam === selectedTeamName && d.awayTeamEdition === 'City Edition').length;

			document.querySelectorAll('.geo-team').forEach(span => {
					span.textContent = selectedTeamName;
			});

			document.querySelectorAll('.geo-white-at-home').forEach(span => {
					span.textContent = data.filter(d => d.homeTeam === selectedTeamName && d.homeTeamEdition === 'Association Edition').length;
			});

			document.querySelectorAll('.geo-white-at-road').forEach(span => {
					span.textContent = data.filter(d => d.awayTeam === selectedTeamName && d.awayTeamEdition === 'Association Edition').length;
			});

			document.querySelectorAll('.geo-city-instances').forEach(span => {
					span.textContent = homeCityGames + awayCityGames;
			});

			document.querySelectorAll('.geo-city-avg').forEach(span => {
					span.textContent = (homeCityGames + awayCityGames) > 13.833333333333334 ? 'above' : 'below';
			});
		}
	}
</script>

{#if copy.contentType == "heading"}
    <div class="heading-wrapper">
        <div class="heading-circle"></div>
            <h2>{@html copy.heading}</h2>
    </div>
    <div class="after-line"></div>
{:else if copy.contentType == "prose"}
 <div class="prose">
        <div class="line-inset">
            {#each copy.text as graf, i}
                {#if ['subhead', 'byline', 'subbyline'].includes(graf.type)}
                    <span class={`intro_${graf.type}`}>{@html graf.value}</span>
                {:else}
                    {#if graf.value.includes("annotrigger")}
                        {@const annoID = graf.value.split("annotrigger")[1].split(">")[0]}
                        <p
                            use:inView={{ bottom: 300 }}
                            on:enter={() => showAnno(annoID)}
                            on:exit={() => hideAnno(annoID)}
                        >
                            {@html graf.value}</p>
                    {:else}
                        <p>{@html graf.value}</p>
                    {/if}
                {/if}
            {/each}
        </div>    
    </div>
    <div class="after-line"></div>
{:else if copy.contentType == "list"}
    <div class="full-court-wrapper">
        <div class="left-circle"></div>
        <ul class="edition-list-wrapper">
            {#each copy.list as item, i}
                {@const listTitle = item.split(" ")[0]}
                {@const listDesc = item.split("(")[1].split(")")[0]}
                <li>
                    <div class="img-wrapper">
                        <img src="./assets/jerseys/{$selectedTeamStore}_{jerseysList[i]}.png" alt="{$selectedTeamStore} {jerseysList[i]} jersey"/>
                    </div>
                    <span class="list-title">{listTitle}</span>
                    <span class="list-desc">{listDesc}</span>
                </li>
            {/each}
        </ul>
        <div class="right-circle"></div>
    </div>
    <div class="after-line"></div>
{:else if copy.contentType == "graphic"}
    <Graphic id={copy.graphicID} />
{:else if copy.contentType == "methods"}
    <div class="methods">
        <div class="methods-inner">
            <h3>{copy.hed}</h3>
            {#each copy.text as graf, i}
                <p>{@html graf.value}</p>
            {/each}
        </div>
    </div>
{/if}

<style>
    .heading-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: center;
        align-items: center;
        height: 9rem;
    }

    .heading-wrapper h2 {
        font-family: var(--headline);
        font-size: 120px;
        font-weight: 700;
        line-height: 0.85;
        text-transform: uppercase;
        z-index: 999;
        font-style: italic;
        text-align: center;
        margin: 2rem 0 0 -1rem;
    }

    .heading-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 9rem;
        height: 9rem;
        border: 5px solid var(--color-gray-1000);
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.75);
        z-index: 1;
    }

    .prose {
		border: 5px solid var(--color-gray-1000);
		background-color: rgba(255, 255, 255, 0.75);
        max-width: 40rem;
        width: calc(100% - 2rem);
        margin: 0 auto;
        line-height: 1.65rem;
	}

    .intro_subhead, .intro_byline, .intro_subbyline {
        display: block;
        font-family: var(--sans);
    }

    :global(.intro_byline a, .intro_subbyline a) {
        font-weight: 600;
    }

    .intro_subhead {
        font-size: var(--28px);
        font-weight: 700;
        margin: 0 0 2rem 0;
        line-height: 1.25;
    }

    .intro_byline {
        font-size: var(--20px);
        margin: 0 0 0.5rem 0;
    }
    .intro_subbyline {
        font-size: var(--14px);
        font-style: italic;
        line-height: 1;
        margin: 0 0 2rem 0;
    }

    :global(.prose a:hover, .methods a:hover) {
        color: #FF661F;
    }

    :global(.after-line) {
        height: 8rem;
        width: 5px;
        background-color:
        var(--color-gray-1000);
        margin: 0 auto;
    }

	.line-inset {
		background-image: linear-gradient(to bottom, #333 5px, rgba(255, 255, 255, 0) 0%), linear-gradient(to bottom, #333 5px, rgba(255, 255, 255, 0) 0%);
		background-position: left, right;
		background-size: 1rem 8rem;
		background-repeat: repeat-y;
		padding: 2rem 4rem;
	}

    .full-court-wrapper {
        width: 100%;
        border-top: 5px solid var(--color-gray-1000);
        border-bottom: 5px solid var(--color-gray-1000);
        background-color: rgba(255, 255, 255, 0.75);
        position: relative;
        height: 20rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-family: var(--sans);
        overflow: hidden;
        padding: 2rem 1rem;
    }

    .left-circle, .right-circle {
        visibility: hidden;

        @media screen and (min-width: 750px) {
            height: 100%;
            position: absolute;
            aspect-ratio: 1;
            border: 5px solid var(--color-gray-1000);
            border-radius: 50%;
            visibility: visible;
        }
    }

    .left-circle {
        left: 0;
        top: 0;
        transform: translate(-50%, 0);
    }

    .right-circle {
        right: 0;
        top: 0;
        transform: translate(50%, 0); 
    }

    .edition-list-wrapper {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 24rem);
        flex-direction: row;
        list-style: none;
        gap: 1rem;
        padding: 1rem 0;
    }

    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width:  calc(25% - 1rem);
        padding: 1rem 1rem 2rem 1rem;
    }

    .img-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100px;
    }

    li span {
        text-align: center;
    }

    .list-title {
        font-weight: 700;
        text-transform: uppercase;
    }

    .list-desc {
        font-size: var(--14px);
        line-height: 1;
    }

    .methods {
        width: 100%;
        border-top: 5px solid var(--color-gray-1000);
        background-color: rgba(255, 255, 255, 0.75);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem 2rem 6rem 2rem;
    }
    
    .methods-inner {
        max-width: 800px;
    }
    .methods p {
        font-family: var(--sans);
    }

    :global(.jersey-highlight) {
        font-family: var(--sans);
        font-weight: 700;
    }

    @media(max-width: 1000px) {
        .left-circle, .right-circle {
            display: none;
        }
        .edition-list-wrapper {
            width: 100%;
        }
    }
    @media(max-width: 750px) {
        .heading-wrapper {
            height: 6rem;
        }
        .heading-wrapper h2 {
            font-size: 100px;
        }
        .heading-circle {
            width: 6rem;
            height: 6rem;
        }
    }

    @media(max-width: 600px) {
        .line-inset {
            padding: 1rem 2rem;
        }

        .full-court-wrapper {
            height: auto;
            padding: 1rem;
        }

        .edition-list-wrapper {
            padding: 0;
        }

        li {
            width: calc(50% - 1rem);
        }

        .heading-wrapper h2 {
            font-size: 80px;
        }
    }
</style>