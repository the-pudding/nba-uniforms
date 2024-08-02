<!--
Usage:
	<Figure>
		<svg></svg>
	</Figure>

Pass style prop directives to set dimensions (defaults are all "auto")
--aspect-ratio
--width
--height

example: <Figure --aspect-ratio="1"></Figure> 

Props: 
	debounce: number (default 250) - debounce resize event time in ms
	exclude: string (default "height") - exclude width or height from triggering resize event
	custom: object (default {}) - custom data store to pass to children components
-->
<script>
	export let fill;
</script>

<figure>
	<svg
		width="38"
		height="60"
		viewBox="0 0 38 60"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10 2C10 6.25 12.5 11.5 19 11.5C25.5 11.5 28 6.25 28 2C30.4 2.8 32.9167 3.83333 33.875 4.25C32.7917 10.375 31.9 22.9 37 24V54.5C34.9583 55.75 28.5 58.25 19 58.25C9.5 58.25 3.04167 55.75 1 54.5V24C6.1 22.9 5.20833 10.375 4.125 4.25C5.08333 3.83333 7.6 2.8 10 2Z"
			fill={fill}
			stroke="black"
			stroke-width="2"
		/>
	</svg>
</figure>

<style>
	figure {
		display: inline;
		margin-right: 5px;
	}
</style>
