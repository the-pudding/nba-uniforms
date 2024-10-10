<!--
  @component
  Generates an HTML Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
  import { getContext } from 'svelte';
  import getTeamCode from '../../utils/getTeamCode';

  const { data, xGet, yGet, zScale, yScale, config } = getContext('LayerCake');

  /** @type {Number} [r=5] - The circle radius. */
  export let r = 5;

  $: midHeight = $yScale.bandwidth() / 2;

  $:console.log($data);
</script>

<div class="flair-explain">
  <span class="left"><span class="caret-left"></span> Less flair</span>
  <span class="right">More flair <span class="caret-right"></span></span>
</div>
<div class="dot-plot">
    {#each $data as row}
      {@const scaledYValue = $yGet(row)}
      {@const scaledXValues = $xGet(row)}
      <div class="dot-row">
        <div
          class="row-team"
          style="
            left: 0;
            top: {scaledYValue + midHeight}%;
            "
        >
          {row.team}
        </div>
        <div
          class="line"
          style="
            left: {Math.min(...scaledXValues)}%;
            top: {scaledYValue + midHeight}%;
            right: {100 - Math.max(...scaledXValues)}%;
          "
        ></div>

        {#each scaledXValues as circleX, i}
          {#if i === 0}
            <div class="year-text"
              style="
                left: {circleX + 3}%;
                top: {scaledYValue + (midHeight)/1.5}%;
              "
            >
              {'2023-24'}
            </div>
            <div
            class="jersey-container"
            style="
              left: {circleX}%;
              top: {scaledYValue + midHeight}%;
              width: 25px;
              height: 33px;
            "
          >
            <img src={`/assets/jerseys/${getTeamCode(row.team)}_icon.png`} alt={(row.team)} class="jersey-illustration" />
          </div>
          {:else}
            <div class="year-text"
              style="
                left: {circleX - 9}%;
                top: {scaledYValue + (midHeight)/1.5}%;
              "
            >
              {'2013-14'}
            </div>
            <div
              class="circle"
              style="
                left: {circleX}%;
                top: {scaledYValue + midHeight}%;
                width: {r * 2}px;
                height: {r * 2}px;
                background: black;
              "
            ></div>
          {/if}
        {/each}
      </div>
    {/each}
</div>

<style>
  .dot-plot {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .row-team{
    position: absolute;
    font-family: var(--sans);
    font-size: 11px;
    text-align: right;
    width: 24%;
    font-weight: bold;
    text-transform: uppercase;
    transform: translate(0, -50%);
  }
  .line {
    position: absolute;
    border-bottom: 2px solid #000;
    transform: translate(0, -50%);
  }
  .circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid #000;
    stroke: #000;
    transform: translate(-50%, -50%);
  }

  .year-text {
    position: absolute;
    font-family: var(--sans);
    font-size: 11px;
  }

  .jersey-container {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .flair-explain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 25%;
    width: 100%;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: bold;
  }

  .left, .right {
    display: flex;
    align-items: center;
  }

  .caret-left {
    margin-right: 5px;
		width: 0;
		height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #333;
  }

  .caret-right {
    margin-left: 5px;
		width: 0;
		height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #333;
  }
</style>