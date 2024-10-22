<script>
    import { getContext, setContext, onMount } from "svelte";
    import { showSelectBarStore } from '$stores/showSelectBar';
    import Icon from "$components/helpers/Icon.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import { fly, fade } from 'svelte/transition';
    import StoryHeaderGrid from "$components/StoryHeaderGrid.svelte";
    import viewport from "$stores/viewport.js";

    let scrollIndex;
    let innerWidth;
    let leftProps;
    let rightProps;

    const introCopy = getContext("copy")?.copy.filter(
		(section) => section.contentType === "intro"
	)[0];

    function setProps(scrollIndex) {
        if (scrollIndex == undefined) {
            leftProps = "width:50%; transform: translateX(-100%)"
            rightProps = "width:50%; transform: translateX(100%); background-color: rgba(26, 66, 138, 0.9)";
            showSelectBarStore.set(false);
        } else if (scrollIndex == 0) {
            leftProps = "width:50%; transform: translateX(0%)"
            rightProps = "width:50%; transform: translateX(0%); opacity: 1; background-color: rgba(26, 66, 138, 0.9)";
            showSelectBarStore.set(false);
        } else if (scrollIndex == 1) {
            leftProps = "width:100%"
            rightProps = "width:0%; transform: translateX(100%); opacity: 0; background-color: transparent";
            showSelectBarStore.set(false);
        } else if (scrollIndex == 2) {
            leftProps = "width:calc(20% - 0.5rem)"
            rightProps = "width:calc(80% - 1rem); transform: translateX(100%); opacity: 0; background-color: transparent";
            showSelectBarStore.set(false);
        }
        else if (scrollIndex == 3) {
            leftProps = "width:calc(20% - 0.5rem)"
            rightProps = "width:calc(80% - 0.5rem); transform: translateX(0%); opacity: 1; background-color: transparent";
            showSelectBarStore.set(false);
        } else if (scrollIndex == 4 || scrollIndex == "exit") {
            leftProps = "width:calc(20% - 0.5rem); transform: translateX(-100%); opacity: 1;"
            rightProps = "width:calc(80% - 0.5rem); transform: translateX(100%); background-color: transparent; opacity: 1;";
            showSelectBarStore.set(true);
        }
    }

    $: setProps(scrollIndex);
    $: mobile = $viewport.width < 700;
</script>

<svelte:window bind:innerWidth={innerWidth} />

<section id="scrolly">
	<div class="sticky">
        {#if scrollIndex == undefined && innerWidth}
            <div class="intro-video-wrapper" out:fade={{duration: 300}}>
                <iframe
                    width="100%"
                    height="{mobile ? 300 : 450}px"
                    src="https://www.youtube.com/embed/ODN_L2ke-d4?si=Lz09zUCdEPbIGdxL"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                <div class="intro-top">
                    <p>{@html introCopy.text[0].value}</p>
                    <div class="icon-wrapper">
                        <Icon
                            name="arrow-down-circle"
                            width={mobile ? "2rem" : "3.5rem"}
                            height={mobile ? "2rem" : "3.5rem"}
                            stroke="#262626"
                            fill="#FF661F"
                            strokeWidth="2"
                        />
                    </div>
                </div>
            </div>
        {/if}
        <div class="slides" in:fade={{duration: 300}} style="{scrollIndex >=3 ? "gap:1rem" : "gap:0"}">
            <div class="left" style={leftProps}>
                <div class="text">
                    {#if scrollIndex > 0}
                        <p class="year">2013-14</p>
                    {/if}
                    <p>Home</p>
                </div>
                {#if scrollIndex >= 1}
                    <img in:fade={{ delay: 300, duration: 300}} style="max-width: {innerWidth/5}px" src="assets/imgs/steph-2013.png" alt="Stephen Curry 2013-2014" />
                {/if}
            </div>
            <div class="right" style={rightProps}>
                {#if scrollIndex >= 3}
                    <div transition:fly={{delay: 0, duration: 300, x: innerWidth}} class="right-edition" style="background-color: rgba(255,255,255,0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} style="width: 100%" src="assets/imgs/steph-association.png" alt="Stephen Curry association jersey" />
                    </div>
                    <div transition:fly={{delay: 250, duration: 300, x: innerWidth}} class="right-edition" style="background-color: rgba(26, 66, 138, 0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} style="width: 100%" src="assets/imgs/steph-icon.png" alt="Stephen Curry icon jersey" />
                    </div>
                    <div transition:fly={{delay: 500, duration: 300, x: innerWidth}} class="right-edition" style="background-color: rgba(39, 46, 83, 0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} style="width: 100%" src="assets/imgs/steph-statement.png" alt="Stephen Curry statement jersey" />
                    </div>
                    <div transition:fly={{delay: 750, duration: 300, x: innerWidth}} class="right-edition" style="background-color: rgba(0, 0, 0, 0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} style="width: 100%" src="assets/imgs/steph-city.png" alt="Stephen Curry city jersey" />
                    </div>
                {/if}
                <div class="text">
                    {#if scrollIndex > 0}
                        <p class="year">2023-14</p>
                    {/if}
                    <p>{scrollIndex >= 3 ? "Home" : "Away"}</p>
                </div>
            </div>
        </div>
        {#if scrollIndex == 4 || scrollIndex == "exit"}
        <StoryHeaderGrid />
        {/if}
    </div>
	<Scrolly bind:value={scrollIndex}>
        {#if introCopy}
            {#each introCopy.text.slice(1, introCopy.text.length) as text, i}
                <div class="step">
					<div class="step-inner">
						<p>{@html text.value}</p>
					</div>
                </div>
            {/each}
        {/if}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
    #scrolly {
		position: relative;
		margin: 0;
		z-index: 1000;
        pointer-events: none;
	}
    .sticky {
		position: sticky;
		top: 0;
		transition: all 1s;
		min-height: 100svh;
        z-index: 1;
        overflow-x: hidden;
		pointer-events: none;
		display: flex;
		justify-content: center;
        align-items: center;
	}
	.spacer {
		height: 75vh;
	}
	.step {
		height: 80vh;
		text-align: center;
        z-index: 1000;
        max-width: 30rem;
        margin: 0 auto;
		pointer-events: auto;
        z-index: 1000;
        position: relative;
        pointer-events: none;
	}

    .step p {
        background: rgba(255,255,255,0.95);
        padding: 2rem 2rem;
        border: 5px solid var(--color-fg);
        text-align: left;
        pointer-events: auto;
    }

    .intro-video-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 3rem;
        left: 0;
        padding: 0 2rem;

        & iframe {
			aspect-ratio: 16 / 9;
			width: 100%;
            max-width: 900px;
		    outline: 5px solid var(--color-fg);
		}
    }

    .intro-top {
        font-family: var(--headline);
        font-weight: 700;
        color: var(--color-fg);
        font-style: italic;
        font-size: var(--48px);
        width: 100%;
        max-width: 700px;
        text-align: center;
        line-height: 1;
        margin: 3rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    :global(.intro-top a) {
        color: var(--color-fg);
        cursor: pointer;
        pointer-events: auto;
        text-decoration: underline;
        border-bottom: none;
    }

    .icon-wrapper {
		display: flex;
		align-items: center;
		transform: translateY(0);
		animation: bounce 0.7s ease-in-out infinite;
	}

    .slides {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-x: hidden;
    }

    .left {
        background: rgba(255, 255, 255, 0.9);
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: 2rem 0;
        transition: all calc(var(--1s) * 0.2) ease-out;
    }

    .right {
        height: 100vh;
        display: flex;
        flex-direction: row;
        padding: 0;
        transition: all calc(var(--1s) * 0.2) ease-out;
    }

    .right-edition {
        width: 25%;
        height: 100%;
        padding: 6.5rem 0;
        display: flex;
        align-items: end;
    }

    .text {
        font-family: var(--headline);
        font-weight: 700;
        font-style: italic;
        text-transform: uppercase;
        font-size: var(--48px);
        color: var(--color-fg);
        order: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .text p {
        padding: 0;
        margin: 0 0 0 -1rem;
        line-height: 1;
        text-align: center; 
    }
    .text p.year {
        font-size: var(--24px);
        padding-left: 0.75rem;
        margin: 0 0 0 -1rem;
        line-height: 1;
        text-align: center;
    }
    .right .text {
        color: white;
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translate(-50%,0);
    }
    .left img, .right img {
        order: 1;
    }

    @keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
		100% {
			transform: translateY(0);
		}
	}
 </style>


