<script>
    import { onMount } from "svelte";
    import { annotationVisible } from "$stores/misc.js";
    import { fade, fly } from 'svelte/transition';
	import { reducedMotion } from "$stores/reducedMotion.js";
    import viewport from "$stores/viewport.js";

	let fadeDuration = 500;
    let annoPos;

    let imageIDs = ["lebron-sleeves", "butler-vice", "wemby"];

    function imgMatch(annoID) {
		const img = imageIDs[annoID];
        return img
    }

    function setAnnoPos($annotationVisible, width) {
        if ($annotationVisible[0] == true) {
            const proseDiv = document.querySelector(".prose")
            const boundingBox = proseDiv.getBoundingClientRect();
            annoPos = boundingBox.right;
        }
    }

    $: setAnnoPos($annotationVisible, $viewport.width)
</script>

<div id="annotation-block" style="left: {$viewport.width >= 800 ? annoPos : annoPos-190}px">
    <div class="img-wrapper" in:fly={!$reducedMotion ? { delay: 0, duration: 300, y: 100} : undefined} out:fade={!$reducedMotion ? {duration: fadeDuration} : undefined}>
        <img src="./assets/imgs/{imgMatch($annotationVisible[1])}.png" alt="character" />
    </div>
</div>

<style>
    #annotation-block {
		position: fixed;
		top: 50%;
		/* right: 2rem; */
		display: flex;
        width: 250px;
        min-width: 250px;
		flex-direction: column;
		align-items: end;
		z-index: 1000;
        transform: translate(-20%, -50%) rotate(5deg);
		pointer-events: none;
        animation: rocking 2.5s infinite ease-in-out;
	}
	#annotation-block .img-wrapper, #annotation-block img {
		width: 250px;
	}

    @keyframes rocking {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(-5deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg);
        }
        }

	@media(max-width: 800px) {
		#annotation-block, #annotation-block .img-wrapper, #annotation-block img {
			width: 200px;
		}
	}
</style>