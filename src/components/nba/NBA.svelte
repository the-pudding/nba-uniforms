<script>
	import DemoWaffle from "$components/nba/Demo.Waffle.svelte";
</script>

<div id="nba">
	<h1>NBA</h1>
	<DemoWaffle />
</div>

<style>
	#nba {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#nba section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#nba h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
</style>
