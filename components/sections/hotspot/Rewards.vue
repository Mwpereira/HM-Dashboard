<template>
  <div id="rewards">
    <p class='title mb-6 my-6'>Rewards</p>
    <div class='columns is-centered has-text-centered is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label='Hotspot rewards from the past 24 hours' type='is-dark'>
          <p class='is-size-3 m-4'>{{ rewards.dailyRewards ? `${rewards.dailyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(255, 186, 0);'></i>Daily</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label='Hotspot rewards from this past week' type='is-dark'>
          <p class='is-size-3 m-4'>{{  rewards.weeklyRewards ? `${rewards.weeklyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(223,163,1);'></i>Weekly</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label='Hotspot rewards from this past month' type='is-dark'>
          <p class='is-size-3 m-4'>
            {{
              rewards.monthlyRewards ? `${rewards.monthlyRewards} HNT` : '0.0 HNT'
            }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(201,147,1);'></i>Monthly</p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Makers} from "~/enums/Makers";
import {Miner} from "~/interfaces/Miner";

@Component
export default class Rewards extends Vue {
  @Prop() private minerName!: string

  get miner(): Miner {
    return this.$store.getters.miners[this.minerName]
  }

  get maker(): string {
    return (<any>Makers)[this.miner.payer]
  }

  get minerStatusColor(): string {
    return this.$store.getters.miners[this.minerName].status.online === 'online' && (this.$store.getters.miners[this.minerName].block - this.$store.getters.miners[this.minerName].last_change_block < 500) ? 'rgb(70, 201, 58)' : 'rgb(255, 71, 87)'
  }

  get rewards() {
    return this.miner.rewards
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  #sR {
    margin-top: 1rem;
  }
}
</style>
