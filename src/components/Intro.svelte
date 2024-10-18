<script>
	import { getContext, onMount } from "svelte";
	import { selectedTeamStore } from "$stores/teamSelection";
	import wordmark from "$svg/wordmark-shadow.svg";
	import Section from "$components/nba/Section.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";

	const introCopy = getContext("copy")?.copy.filter(
		(section) => section.contentType === "intro"
	)[0];

	let scrollIndex;
	let scrollY = 0;
	let progress = 0;
	let introContainer;

	// This function will be called on scroll to update the scroll position
	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const containerHeight = introContainer.offsetHeight;
		const containerTop = introContainer.getBoundingClientRect().top + scrollTop;
		const containerBottom = containerTop + containerHeight;

		// Ensure that we are only calculating the progress when scrolling within the component's div
		if (scrollTop >= containerTop && scrollTop <= containerBottom) {
			scrollY = scrollTop - containerTop;
			progress = scrollY / containerHeight;
		} else if (scrollTop < containerTop) {
			progress = 0;
		} else if (scrollTop > containerBottom) {
			progress = 1;
		}
	};

	onMount(() => {
		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener on component destroy
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	$: console.log("Scroll progress:", progress);
</script>

<div class="intro" bind:this={introContainer}>
	<div class="intro-panels">
		<div
			class="intro-panel"
			style="
      background-color: rgba(255, 255, 255, 0.8);
      width: 50%;
      left: {Math.min(
				Math.min(1250 * progress - 200, -1250 * progress + 300),
				0
			)}%;
    "
		>
      <span class="intro-homeaway">Home</span>
    </div>
		<div
			class="intro-panel"
			style="
      background-color: rgba(0, 62, 165, 0.8);
      width: 50%;
      right: {Math.min(
				Math.min(1250 * progress - 200, -1250 * progress + 300),
				0
			)}%;
    "
		>
      <span class="intro-homeaway" style="color:#fff;">Away</span>
    </div>
		<div
			class="intro-panel"
			style="
      background-color: rgba(255, 255, 255, 1);
      left: {Math.min(
				Math.min(2500 * progress - 800, -2500 * progress + 1000),
				0
			)}%;
    "
		></div>
		<div
			class="intro-panel"
			style="
      background-color: rgba(0, 0, 0, 0.5);
      left: {Math.min(
				Math.min(1250 * progress - 800, -1250 * progress + 900),
				0
			)}%;
    "
		></div>
	</div>
	<Scrolly bind:value={scrollIndex}>
		{#each introCopy.text as graf, i}
			{#if i == 0}
				<div class="intro-top">
					<div class="intro-video-wrapper">
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/ODN_L2ke-d4?si=Lz09zUCdEPbIGdxL"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
					</div>
					<p>{@html graf.value}</p>
				</div>
			{:else}
				{#if i == 5}
					<div class="intro-video-wrapper" style="margin-bottom: 25vh;">
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/eLx9CVbj32c?si=Z28SF2UvfRknL5v-&amp;start=60"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
					</div>
				{/if}
				<div class="intro-block">
					<p>{@html graf.value}</p>
				</div>
			{/if}
		{/each}
	</Scrolly>
</div>

<style>
	.intro-top {
		font-family: var(--sans);
		font-weight: 900;
		font-style: italic;
		font-size: 58px;
		line-height: 64px;
		width: 80%;
		max-width: 900px;
		text-align: center;
		margin: 0 auto 50vh;
	}

	.intro-panel {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		display: block;
		z-index: -1;
	}

  .intro-homeaway {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 4rem;
    width: 100%;
    font-size: 30px;
		font-family: var(--sans);
    text-transform: uppercase;
    font-weight: 900;
  }

	.intro-video-wrapper {
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}

	.intro-block {
		font-family: var(--sans);
		width: 75%;
		max-width: 500px;
		margin: 0 auto 50vh;
		padding: 0 20px;
		background-color: rgba(255, 255, 255, 0.75);
		padding: 20px;
		border: 5px solid black;
	}

	.intro-block:last-child {
		margin-bottom: 2rem;
	}

  :global(.select-prompt) {
    display: block;
    font-family: var(--sans);
    font-weight: 900;
    text-transform: uppercase;
    margin: 1rem 0;
  }
</style>
