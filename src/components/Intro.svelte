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

	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const containerHeight = introContainer.offsetHeight;
		const containerTop = introContainer.getBoundingClientRect().top + scrollTop;
		const containerBottom = containerTop + containerHeight;

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
      background-color: rgba(255, 255, 255, 0.75);
      width: 50%;
      left: {Math.min(
				Math.min(1250 * progress - 200, -1250 * progress + 300),
				0
			)}%;
    "
		>
			<span class="intro-panel-text">Home</span>
		</div>
		<div
			class="intro-panel"
			style="
      background-color: rgba(0, 62, 165, 0.75);
      width: 50%;
      right: {Math.min(
				Math.min(1250 * progress - 200, -1250 * progress + 300),
				0
			)}%;
    "
		>
			<span class="intro-panel-text" style="color:#fff;">Away</span>
		</div>
		<div
			class="intro-panel"
			style="
      background-color: rgba(255, 255, 255, 0.75);
      left: {Math.min(
				Math.min(2500 * progress - 800, -2500 * progress + 1000),
				0
			)}%;
    "
		>
      <img class="intro-panel-image intro-panel-image-2013" src="./assets/imgs/steph-2013.png" alt="Stephen Curry 2013-2014" />
			<span class="intro-panel-text">Home 2013-2014</span>
    </div>
		<div
			class="intro-panel"
			style="
      left: {Math.min(
				Math.min(1250 * progress - 800, -1250 * progress + 900),
				0
			)}%;
    "
		>
      <div class="current-spread">
        <div class="current-spread-association" style="background-color:#ffffffee">
          <img class="intro-panel-image" src="./assets/imgs/steph-association.png" alt="Stephen Curry in the 2023-2024 Association Edition jersey" />
        </div>
        <div class="current-spread-icon" style="background-color:#1a428aee">
          <img class="intro-panel-image" src="./assets/imgs/steph-icon.png" alt="Stephen Curry in the 2023-2024 Icon Edition jersey" />
        </div>
        <div class="current-spread-statement" style="background-color:#272e53ee">
          <img class="intro-panel-image" src="./assets/imgs/steph-statement.png" alt="Stephen Curry in the 2023-2024 Statement Edition jersey" />
        </div>
        <div class="current-spread-city" style="background-color:#000000ee">
          <img class="intro-panel-image" src="./assets/imgs/steph-city.png" alt="Stephen Curry in the 2023-2024 City Edition jersey" />
        </div>
      </div>
        <span class="intro-panel-text current-spread-text">Home 2014-2015</span>
    </div>
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
					<div class="intro-video-wrapper" style="margin-bottom: 5vh;">
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/ZpHbZ0qGwQI?si=VbnGWy3APVJxd1H_&amp;start=60"
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
		font-size: 32px;
		line-height: 40px;
		width: 80%;
		max-width: 900px;
		text-align: center;
		margin: 0 auto 50vh;

    @media screen and (min-width: 768px) {
      font-size: 58px;
      line-height: 64px;
    }
	}

	.intro-panel {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		display: block;
		z-index: -1;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    padding-bottom: 3rem;
	}

  .intro-panel-image {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
  }

  .intro-panel-image-2013 {
    width: 75%;
    max-width: 450px;
  }

	.intro-panel-text {
		display: flex;
		justify-content: center;
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

  .current-spread {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    margin-bottom: -3rem;

    & div {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
      padding-bottom: 6rem;
    }
  }

  .current-spread-text {
    position: absolute;
    bottom: 5rem;
    color: #fff;
    height: 0;
    text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0  #000,
    -1px  1px 0  #000,
     1px  1px 0  #000;
  }

	.intro-block {
		font-family: var(--sans);
		width: 75%;
		max-width: 500px;
		margin: 0 auto 75vh;
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
