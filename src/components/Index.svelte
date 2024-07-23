<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import NBA from "$components/nba/NBA.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<WIP />
<!-- <svelte:window bind:innerWidth={w} bind:innerHeight={h} bind:scrollY/> -->
<Header />
<NBA />
<Footer />
