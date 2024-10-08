<script>
    import { selectedTeamStore } from '$stores/teamSelection';
    import Graphic from "$components/nba/Graphic.svelte";
    export let copy;

    const jerseysList = ["association", "icon", "statement", "city"];

    console.log($selectedTeamStore)
</script>

{#if copy.contentType == "heading"}
    <div class="heading-wrapper">
        <div class="heading-circle"></div>
        <h3>{copy.heading}</h3>
    </div>
    <div class="after-line"></div>
{:else if copy.contentType == "prose"}
    <div class="prose">
        <div class="line-inset">
            {#each copy.text as graf, i}
                <p>{@html graf.value}</p>
            {/each}
        </div>    
    </div>
    <div class="after-line"></div>
{:else if copy.contentType == "list"}
    <div class="full-court-wrapper">
        <div class="left-circle"></div>
        <ul>
            {#each copy.list as item, i}
                {@const listTitle = item.split(" ")[0]}
                {@const listDesc = item.split("(")[1].split(")")[0]}
                <li>
                    <div class="img-wrapper">
                        <img src="/assets/jerseys/{$selectedTeamStore}_{jerseysList[i]}.png" alt="{$selectedTeamStore} {jerseysList[i]} jersey"/>
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
{/if}

<style>
    .heading-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: center;
        align-items: center;
        height: 10rem;
    }

    .heading-wrapper h3 {
        font-family: var(--sans);
        font-size: var(--48px);
        font-weight: 700;
        text-transform: uppercase;
        z-index: 999;
    }

    .heading-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10rem;
        height: 10rem;
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
    }

    .left-circle, .right-circle {
        height: 100%;
        position: absolute;
        aspect-ratio: 1;
        border: 5px solid var(--color-gray-1000);
        border-radius: 50%;
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

    ul {
        display: flex;
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
        width: 25%;
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
    }
</style>