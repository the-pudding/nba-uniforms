<script>
	import wordmark from "$svg/wordmark.svg";
	import locate from "$utils/locate";
	import findClosestPoint from "$utils/findClosestPoint";

	import teamLocations from "$data/nba2324/teamLocations.json";

	locate(true).then(data => {
		const [lat, lon] = data.loc.split(',').map(Number);
		const closestTeam = findClosestPoint({ lat: lat, lon: lon }, teamLocations);
	}).catch(err => {
		console.error(err);
	});
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>
</header>

<style>
	.wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}
</style>
