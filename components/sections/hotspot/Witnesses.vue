<template>
  <div id="witnesses">
    <div class="field is-grouped my-6">
      <p class="control">
        <span class='title'>Witnesses</span>
      </p>
      <p class="control">
        <Notice v-if="checkForOutdatedData(witnesses ? witnesses.last_updated : 0)" @loading-comp="loadingComp"/>
      </p>
    </div>
    <div class='columns is-centered has-text-centered is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's witnesses" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
          <p class='is-size-3 m-4'>{{ witnesses !== undefined ? witnesses.count : '0' }}</p>
          <p><i class="fas fa-eye my-4 mr-4"></i>Witnesses</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's witnesses average reward scale" type='is-dark'>
          <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
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
import Notice from "~/components/general/Notice.vue";
import GeneralService from "~/services/general-service";
import MessageConstants from "~/constants/message-constants";
import BuefyService from "~/services/buefy-service";

@Component({
  components: {Notice}
})
export default class Witnesses extends Vue {
  @Prop() private minerName!: string
  @Prop() private miner!: Miner

  private isLoading = false;

  public async loadingComp() {
    this.isLoading = true;

    BuefyService.warningToast(MessageConstants.WARNING_FETCHING_WITNESSES)

    const miner = this.$store.getters.miners[this.minerName];

    await this.$store.dispatch('getWitnesses', {
      minerName: miner.name,
      minerAddress: miner.address,
      time: GeneralService.getTime()
    })

    this.isLoading = false;
  }

  public checkForOutdatedData(time: number) {
    return GeneralService.checkForOutdatedData(time);
  }

  get witnesses() {
    return this.$store.getters.miners[this.minerName].witnesses
  }
}
</script>


<style scoped>
.loading-background, .loading-overlay {
  z-index: 1 !important;
}
</style>
