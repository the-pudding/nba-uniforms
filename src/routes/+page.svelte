<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import data from "$data/all-games.json";
	import teams from "$data/nba2324/teamNames.json";
	import version from "$utils/version.js";
	import { csv } from 'd3-fetch';

	version();

	const preloadFont = [
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
	];

	const { title, description, url, keywords } = copy;
	setContext("copy", copy);
	setContext("data", data);
	setContext("teams", teams);
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<Index />
