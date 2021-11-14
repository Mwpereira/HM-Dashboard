<template>
  <div id="rewards">
    <p class='title my-6'>Rewards</p>
    <p class='title is-size-4 mt-5 mb-6'>Miner</p>
    <div class='columns is-centered has-text-centered is-multiline is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label='Hotspot rewards from the past 24 hours' type='is-dark'>
          <p class='is-size-3 m-4'>{{ rewards ? `${rewards.dailyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(255, 186, 0);'></i>Daily</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label='Hotspot rewards from this past week' type='is-dark'>
          <p class='is-size-3 m-4'>{{ rewards ? `${rewards.weeklyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(223,163,1);'></i>Weekly</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label='Hotspot rewards from this past month' type='is-dark'>
          <p class='is-size-3 m-4'>
            {{
              rewards ? `${rewards.monthlyRewards} HNT` : '0.0 HNT'
            }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(201,147,1);'></i>Monthly</p>
        </b-tooltip>
      </div>
    </div>
    <p class='title is-size-4 mt-5 mb-6'>Owner</p>
    <div class='columns is-centered has-text-centered is-multiline is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Owner's wallet balance" type='is-dark'>
          <p class='is-size-3 m-4'>{{ ownerData ? `${(ownerData.balance/100000000).toFixed(2)} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-wallet my-4 mr-4' style='color: rgb(112,4,245);'></i>Balance</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Owner's staked balance" type='is-dark'>
          <p class='is-size-3 m-4'>{{ ownerData ? `${(ownerData.staked_balance/100000000).toFixed(2)} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-chart-pie my-4 mr-4' style='color: rgb(200,0,255);'></i>Staked Balance</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Block level for owner's wallet" type='is-dark'>
          <p class='is-size-3 m-4'>
            {{
              ownerData ? ownerData.block : 'N/A'
            }}</p>
          <p><i class='fab fa-connectdevelop my-4 mr-4' style='color: rgb(255,91,0);'></i>Block Level</p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Miner} from "~/interfaces/Miner";
import {Rewards} from "~/interfaces/Rewards";
import { Owner } from '~/interfaces/Owner'

@Component
export default class RewardsSection extends Vue {
  @Prop() private minerName!: string
  @Prop() private miner!: Miner

  get ownerData(): Owner | undefined {
    console.log(this.miner.ownerData)
    return this.miner.ownerData;
  }

  get rewards(): Rewards | undefined {
    return this.miner.rewards
  }
}
</script>
