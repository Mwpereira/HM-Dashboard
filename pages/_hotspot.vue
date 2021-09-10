<template>
  <div class='hero is-fullheight'>
    <div class='hero-head section mt-6 pt-6'>
      <div class='hero-section'>
        <Title :miner-name='minerName'/>
        <Summary :miner-name='minerName'/>
      </div>
      <p class='has-text-left my-6 py-6'>Last Updated: {{ lastUpdated }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import moment from "moment";
import {Miner} from '~/interfaces/Miner'
import Summary from "~/components/sections/hotspot/Summary.vue";
import Title from "~/components/sections/hotspot/Title.vue";

@Component({
  async asyncData({params, store, redirect}) {
    await store.dispatch('startup', false)

    const minerName = params.hotspot

    let miner: Miner = await store.dispatch('loadMiner', minerName)

    if (!miner) {
      miner = await store.dispatch('fetchMiner', minerName)
    } else if (await store.dispatch('checkForOutdatedData', minerName)) {
      miner = await store.dispatch('fetchMiner', minerName)
    }

    if (!miner) {
      await redirect('/')
    }

    return {minerName}
  },
  components: {
    Summary,
    Title
  }
})
export default class Hotspot extends Vue {
  private minerName!: string

  get miner(): Miner {
    return this.$store.getters.miners[this.minerName]
  }

  get lastUpdated() {
    return moment.utc(this.$store.getters.miners[this.minerName].last_updated * 1000).local().toString().split(' GMT')[0]
  }
}
</script>

<style scoped>
.hero-section {
  padding-top: 60px;
}

@media screen and (max-width: 768px) {
  .hero-section {
    padding-top: 55px;
  }
}
</style>
