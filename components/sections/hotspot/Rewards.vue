<template>
  <div id="rewards">
    <div class="field is-grouped my-6">
      <p class="control">
        <span class='title'>Rewards</span>
      </p>
      <p class="control">
        <Notice v-if="checkForOutdatedData(rewards ? rewards.last_updated : 0)" @loading-comp="loadingComp"/>
      </p>
    </div>
    <p class='title is-size-4 mt-5 mb-6'>Miner</p>
    <div class='columns is-centered has-text-centered is-multiline is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's rewards from the past 24 hours" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>{{ rewards ? `${rewards.dailyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(255, 186, 0);'></i>Daily</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's rewards from this past week" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>{{ rewards ? `${rewards.weeklyRewards} HNT` : '0.0 HNT' }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(223,163,1);'></i>Weekly</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's rewards from this past month" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>
            {{
              rewards ? `${rewards.monthlyRewards} HNT` : '0.0 HNT'
            }}</p>
          <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(201,147,1);'></i>Monthly</p>
        </b-tooltip>
      </div>
    </div>
    <p class='title is-size-4 mt-6 mb-6'>Owner</p>
    <div class='columns is-centered has-text-centered is-multiline is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Owner's wallet balance" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>{{
              ownerData ? `${(ownerData.balance / 100000000).toFixed(2)} HNT` : '0.0 HNT'
            }}</p>
          <p><i class='fas fa-wallet my-4 mr-4' style='color: rgb(112,4,245);'></i>Balance</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Owner's staked balance" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>{{
              ownerData ? `${(ownerData.staked_balance / 100000000).toFixed(2)} HNT` : '0.0 HNT'
            }}</p>
          <p><i class='fas fa-chart-pie my-4 mr-4' style='color: rgb(200,0,255);'></i>Staked Balance</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Block level for owner's wallet" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>
            {{
              ownerData ? (ownerData.block !== null ? ownerData.block : '0') : 'N/A'
            }}</p>
          <p><i class='fab fa-connectdevelop my-4 mr-4' style='color: rgb(255,91,0);'></i>Block Level</p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import {Rewards} from '~/interfaces/Rewards';
import {Owner} from '~/interfaces/Owner';
import Notice from '~/components/general/Notice.vue';
import GeneralService from '~/services/general-service';
import BuefyService from '~/services/buefy-service';
import MessageConstants from '~/constants/message-constants';

@Component({
	components: {Notice}
})
export default class RewardsSection extends Vue {
  @Prop() private minerName!: string

  private isLoading = false;

  public async loadingComp() {
  	this.isLoading = true;

  	BuefyService.warningToast(MessageConstants.WARNING_FETCHING_REWARDS);

  	const miner = this.$store.getters.miners[this.minerName];

  	await this.$store.dispatch('getRewards', {
  		minerAddress: miner.address,
  		minerName: miner.name,
  		minerOwnerAddress: miner.owner,
  		time: GeneralService.getTime()
  	});

  	this.isLoading = false;
  }

  public checkForOutdatedData(time: number) {
  	return GeneralService.checkForOutdatedData(time);
  }

  get ownerData(): Owner | undefined {
  	return this.$store.getters.miners[this.minerName].ownerData;
  }

  get rewards(): Rewards | undefined {
  	return this.$store.getters.miners[this.minerName].rewards;
  }
}
</script>

<style scoped>
.loading-background, .loading-overlay {
  z-index: 1 !important;
}
</style>
