<template>
  <div id="witnesses">
    <p class='title my-6'>Witnesses</p>
    <div class='columns is-centered has-text-centered is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's witnesses" type='is-dark'>
          <p class='is-size-3 m-4'>{{ witnesses !== undefined ? witnesses.count : '0' }}</p>
          <p><i class="fas fa-eye my-4 mr-4"></i>Witnesses</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's witnesses average reward scale" type='is-dark'>
          <p class='is-size-3 m-4'>{{ witnesses !== undefined ? witnesses.avgRewardScale : '0.00' }}</p>
          <p><i class='fas fa-balance-scale-left my-4 mr-4' style='color: rgb(13,79,241)'></i>Average Reward Scale</p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Miner} from "~/interfaces/Miner";

@Component
export default class Witnesses extends Vue {
  @Prop() private minerName!: string
  @Prop() private miner!: Miner

  get witnesses() {
    return this.miner.witnesses
  }
}
</script>
