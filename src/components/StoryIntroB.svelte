<script>
    import { getContext, setContext, onMount } from "svelte";
    import { showSelectBarStore } from '$stores/showSelectBar';
    import Icon from "$components/helpers/Icon.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
    import { fly, fade } from 'svelte/transition';
    import StoryHeaderGrid from "$components/StoryHeaderGrid.svelte";
    import viewport from "$stores/viewport.js";
    import { reducedMotion } from "$stores/reducedMotion.js";

    let scrollIndex;
    let innerWidth;
    let innerHeight;
    let leftProps;
    let rightProps;

    const introCopy = getContext("copy")?.copy.filter(
		(section) => section.contentType === "intro"
	)[0];

    const leftPropsDesktop = ["width:calc(50% - 2.5px); transform: translateX(-110%); opacity: 0", 
                                "width:calc(50% - 2.5px); transform: translateX(0%); opacity: 1", 
                                "width:100%; transform: translateX(0%); opacity: 1",
                                "width:20%; transform: translateX(0%); opacity: 1", 
                                "width:20%; transform: translateX(0%); opacity: 1", 
                                "width:20%; transform: translateX(-110%); opacity: 1"
                            ];
    const leftPropsMobile = ["height:calc(50% - 2.5px); transform: translateY(-110%); opacity: 0", 
                                "height:calc(50% - 2.5px); transform: translateY(0%); opacity: 1", 
                                "height:100%; transform: translateY(0%); opacity: 1",
                                "height:20%; transform: translateY(0%); opacity: 1", 
                                "height:20%; transform: translateY(0%); opacity: 1", 
                                "height:20%; transform: translateY(-110%); opacity: 1"
                            ];
    const rightPropsDesktop = ["width:calc(50% - 2.5px); transform: translateX(110%); background-color: rgba(26, 66, 138, 0.9); opacity: 0",
                                "width:calc(50% - 2.5px); transform: translateX(0%); opacity: 1; background-color: rgba(26, 66, 138, 0.9)", 
                                "width:0%; transform: translateX(110%); opacity: 0; background-color: transparent", 
                                "width:calc(80% - 5px); transform: translateX(110%); opacity: 0; background-color: transparent", 
                                "width:calc(80% - 5px); transform: translateX(0%); opacity: 1; background-color: transparent",
                                "width:calc(80% - 5px); transform: translateX(110%); background-color: transparent; opacity: 1"
                            ];
    const rightPropsMobile = ["height:calc(50% - 2.5px); transform: translateY(110%); background-color: rgba(26, 66, 138, 0.9); opacity: 0",
                            "height:calc(50% - 2.5px); transform: translateY(0%); opacity: 1; background-color: rgba(26, 66, 138, 0.9)", 
                            "height:0%; transform: translateY(0%); opacity: 0; background-color: transparent", 
                            "height:calc(80% - 5px); transform: translateY(110%); opacity: 0; background-color: transparent", 
                            "height:calc(80% - 5px); transform: translateY(0%); opacity: 1; background-color: transparent",
                            "height:calc(80% - 5px); transform: translateY(110%); background-color: transparent; opacity: 1"
                        ]
    $: imgMax = mobile ? `max-height: ${innerHeight/5}px` : `max-width: ${innerWidth/5}px`

    function setProps(scrollIndex, mobile) {
        console.log(scrollIndex, mobile)
        if (scrollIndex == undefined) {
            leftProps = mobile ? leftPropsMobile[0] : leftPropsDesktop[0];
            rightProps = mobile ? rightPropsMobile[0] : rightPropsDesktop[0];
            showSelectBarStore.set(false);
        } else if (scrollIndex == "exit") {
            leftProps = mobile ? leftPropsMobile[leftPropsMobile.length - 1] : leftPropsDesktop[leftPropsDesktop.length - 1];
            rightProps = mobile ? rightPropsMobile[rightPropsMobile.length - 1] : rightPropsDesktop[rightPropsDesktop.length - 1];
            showSelectBarStore.set(true);
        } else {
            leftProps = mobile ? leftPropsMobile[scrollIndex+1] : leftPropsDesktop[scrollIndex+1];
            rightProps = mobile ? rightPropsMobile[scrollIndex+1] : rightPropsDesktop[scrollIndex+1];
            showSelectBarStore.set(false);

            if (scrollIndex == 4) {
                showSelectBarStore.set(true);
            }
        }
    }

    $: mobile = $viewport.width < 700;
    $: setProps(scrollIndex, mobile);
</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight}/>

<section id="scrolly">
	<div class="sticky">
        {#if scrollIndex == undefined && innerWidth}
            <div class="intro-video-wrapper" out:fade={{duration: 300}}>
                <div class="iframe-wrapper">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/ODN_L2ke-d4?si=Lz09zUCdEPbIGdxL"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
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
        <div class="slides" in:fade={{duration: 300}}>
            <div class="left" style={leftProps}>
                <div class="text">
                    {#if scrollIndex > 0}
                        <p class="year">2013-14</p>
                    {/if}
                    <p>Home</p>
                </div>
                {#if scrollIndex >= 1}
                    <img in:fade={{ delay: 300, duration: 300}} style="{imgMax}" src="assets/imgs/steph-2013.png" alt="Stephen Curry 2013-2014" />
                {/if}
            </div>
            {#if scrollIndex >= 0 && scrollIndex < 4 && scrollIndex !== "exit" }
                <div class="middle-line"></div>
            {/if}
            <div class="right" style={rightProps}>
                {#if scrollIndex >= 3}
                    <div transition:fly={!$reducedMotion ? {delay: 0, duration: 300, x: mobile ? 0 : innerWidth, y: mobile ? innerHeight : 0} : undefined} class="right-edition" style="background-color: rgba(255,255,255,0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} src="assets/imgs/steph-association.png" alt="Stephen Curry association jersey" />
                    </div>
                    <div transition:fly={!$reducedMotion ? {delay: 250, duration: 300, x: mobile ? 0 : innerWidth, y: mobile ? innerHeight : 0} : undefined} class="right-edition" style="background-color: rgba(26, 66, 138, 0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} src="assets/imgs/steph-icon.png" alt="Stephen Curry icon jersey" />
                    </div>
                    <div transition:fly={!$reducedMotion ? {delay: 500, duration: 300,x: mobile ? 0 : innerWidth, y: mobile ? innerHeight : 0} : undefined} class="right-edition" style="background-color: rgba(39, 46, 83, 0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} src="assets/imgs/steph-statement.png" alt="Stephen Curry statement jersey" />
                    </div>
                    <div transition:fly={!$reducedMotion ? {delay: 750, duration: 300, x: mobile ? 0 : innerWidth, y: mobile ? innerHeight : 0} : undefined} class="right-edition" style="background-color: rgba(0, 0, 0, 0.9)">
                        <img in:fade={{ delay: 300, duration: 300}} src="assets/imgs/steph-city.png" alt="Stephen Curry city jersey" />
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
		transition: all calc(var(--1s) * 0.5);
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

    .step-inner {
        padding: 0 1rem;
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
        height: 100svh;
        top: 3rem;
        left: 0;
        padding: 0 2rem;
    }

    .iframe-wrapper {
        aspect-ratio: 16 / 9;
		width: 100%;
        max-width: 900px;
		outline: 5px solid var(--color-fg);
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

    :global(.intro-top a:hover) {
        color: var(--color-orange);
    }

    .icon-wrapper {
		display: flex;
		align-items: center;
		transform: translateY(0);
		animation: bounce 0.7s ease-in-out infinite;
	}

    .slides {
        width: 100%;
        height: 100svh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-x: hidden;
    }

    .middle-line {
        background: var(--color-fg);
        width: 5px;
        height: 100svh;
    }

    .left {
        background: rgba(255, 255, 255, 0.9);
        height: 100svh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: 2rem 0;
        transform: translateX(-110%);
        transition: all calc(var(--1s) * 0.3) ease-out;
    }

    .right {
        height: 100svh;
        display: flex;
        flex-direction: row;
        padding: 0;
        transform: translateX(110%);
        transition: all calc(var(--1s) * 0.3) ease-out;
    }

    .right-edition {
        width: 25%;
        height: 100%;
        padding: 6.5rem 0;
        display: flex;
        align-items: end;
    }

    .right-edition img {
        width: 100%;
        height: auto;
    }

    .text {
        font-family: var(--headline);
        font-weight: 700;
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

    @media(max-width: 700px){
        .intro-top {
            font-size: var(--36px);
        }
        .slides {
            flex-direction: column;
        }

        .left, .right {
            width: 100%;
            align-items: flex-start;
        }
        .left {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0.5rem 0.5rem 0.5rem 2rem;
        }
        .left {
            transform: translateY(-110%);
        }
        .right {
            transform: translateY(110%);
        }
        .text {
            align-items: flex-start;
        }
        .text p, .text p.year {
            text-align: left;
        }
        .text p.year {
            padding: 0;
        }
        .left img {
            height: 100%;
            width: auto;
            order: 2;
        }
        .middle-line {
            width: 100%;
            height: 5px;
        }
        .right {
            flex-direction: column;
        }
        .right-edition {
            width: 100%;
            height: 25%;
            padding: 0.5rem 0;
            justify-content: flex-end;
        }
        .right-edition img {
            height: 100%;
            width: auto;
        }
        .right .text {
            color: white;
            position: absolute;
            bottom: 2rem;
            left: 2rem;
            transform: translate(0,0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .icon-wrapper {
            animation: none;
        } 
    }
 </style>


