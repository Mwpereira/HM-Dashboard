<template>
  <div id="summary">
    <p class='title my-6'>Summary</p>
    <div class='columns is-centered has-text-centered is-multiline is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's rewards from the past 24 hours" type='is-dark'>
          <p class='is-size-3 m-4'>{{ rewards ? `${rewards.dailyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(255, 186, 0);'></i>Earnings</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's reward scale" type='is-dark'>
          <p class='is-size-3 m-4'>{{ miner ? miner.reward_scale.toFixed(2) : '0.00' }}</p>
          <p><i class='fas fa-balance-scale-left my-4 mr-4' style='color: rgb(13,79,241)'></i>Reward Scale</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label='Current status of miner' type='is-dark'>
          <p class='is-size-3 m-4'>
            {{
              (miner.status.online === 'online' && (miner.block - miner.last_change_block < 500)) ? 'Synced' : 'Not Synced'
            }}</p>
          <p><i class='fas fa-power-off my-4 mr-4' :style='{ color: minerStatusColor }'></i>Sync Status</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's manufacturer" type='is-dark' position='is-bottom'>
          <p class='is-size-3 m-4'>{{ miner ? maker : 'N/A' }}</p>
          <p><i class='fas fa-industry my-4 mr-4' style='color: rgb(255, 71, 87)'></i>Maker</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's antenna gain" type='is-dark' position='is-bottom'>
          <p class='is-size-3 m-4'>{{ miner ? `${miner.gain / 10}dbi` : '0dbi' }}</p>
          <p><i class='fas fa-broadcast-tower my-4 mr-4' style='color: #777'></i>Antenna Gain</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's elevation" type='is-dark' position='is-bottom'>
          <p class='is-size-3 m-4'>{{ miner ? `${miner.elevation}m` : '0m' }}</p>
          <p><i class='fas fa-ruler-vertical my-4 mr-4' style='color: rebeccapurple'></i>Elevation</p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import {Makers} from '~/enums/Makers';
import {Miner} from '~/interfaces/Miner';
import {Rewards} from '~/interfaces/Rewards';

@Component
export default class Summary extends Vue {
  @Prop() private minerName!: string

  get miner(): Miner {
  	return this.$store.getters.miners[this.minerName];
  }

  get maker(): string {
  	return (<any>Makers)[this.$store.getters.miners[this.minerName].payer];
  }

  get minerStatusColor(): string {
  	return this.$store.getters.miners[this.minerName].status.online === 'online' && (this.$store.getters.miners[this.minerName].block - this.$store.getters.miners[this.minerName].last_change_block < 500) ? 'rgb(70, 201, 58)' : 'rgb(255, 71, 87)';
  }

  get rewards(): Rewards | undefined {
  	return this.$store.getters.miners[this.minerName].rewards;
  }
}
</script>
