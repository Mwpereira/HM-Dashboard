<template>
  <div class='hero is-fullheight'>
    <div class='hero-head section mt-6 pt-6'>
      <div class='hero-section'>
        <h1 class='title has-text-centered mb-4'>My Watchlist</h1>
      </div>
      <div class="my-6">
        <b-table
          :data="favourites"
          :paginated="true"
          :per-page="5"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page">

          <b-table-column v-slot="props" field="status" label="Status" sortable>
            <i v-if="props.row.status.online === 'online'" class="fas fa-circle" style="color: limegreen"></i>
            <i v-else class="fas fa-circle" style="color: red"></i>
          </b-table-column>

<!--          <b-table-column field="miner.name" label="Hotspot Name" v-slot="props" sortable>{{ props.row.informal_name }}-->
<!--          </b-table-column>-->

<!--          <b-table-column field="miner.reward_scale" label="Reward Scale" sortable v-slot="props">-->
<!--            {{ props.row.reward_scale.toFixed(2) }}-->
<!--          </b-table-column>-->

          <b-table-column field="rewards.dailyRewards" label="1d" sortable>
<!--            {{ props.row.rewards.dailyRewards }}-->
          </b-table-column>

<!--          <b-table-column field="miner.rewards.weeklyRewards" label="7d" sortable v-slot="props">-->
<!--            {{ props.row.rewards.weeklyRewards }}-->
<!--          </b-table-column>-->

<!--          <b-table-column field="miner.rewards.monthlyRewards" label="30d" sortable v-slot="props">-->
<!--            {{ props.row.rewards.monthlyRewards }}-->
<!--          </b-table-column>-->

<!--          <b-table-column field="miner.witnesses.count" label="Witnesses" sortable v-slot="props">-->
<!--            {{ props.row.witnesses !== undefined ? props.row.witnesses.count : 0 }}-->
<!--          </b-table-column>-->

          <b-table-column v-slot="props">
            <div class="is-flex">
              <a :href='`https://explorer.helium.com/hotspots/${props.row.address}`' rel='noopener' target='_blank'
                 class='heliumExplorer'
              >
                <i class='fas fa-globe mx-2'></i>
              </a>
              <p class='link mx-2' @click="copyText(`https://hmdashboard.mwpereira.ca${$nuxt.$route.fullPath}`, 'url')">
                <i
                  class='fas fa-link'></i></p>
            </div>
          </b-table-column>
        </b-table>
      </div>
      <p class='has-text-left my-6 py-6'>Last Updated: {{ lastUpdated }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import moment from 'moment';
import {Component, Vue} from 'nuxt-property-decorator'
import {Miners} from "~/interfaces/Miners";
import {Miner} from "~/interfaces/Miner";
import BuefyService from "~/services/buefy-service";

@Component({
  async asyncData({store}) {
    await store.dispatch('startup', false)
  }
})
export default class MyWatchlist extends Vue {
  private columns = [
    {
      field: "name",
      label: "Name",
    },
    {
      field: "rewards.dailyRewards",
      label: "Rewards",
    }
  ];

  get miners(): Miners {
    return this.$store.getters.miners;
  }

  get favourites(): Miner[] {
    const miners: Miner[] = [];

    const cache = {...this.$store.getters.miners}
    const favourites = {...this.$store.getters.favourites}

    Object.keys(favourites).forEach((name) => {
      miners.push(cache[name.toString()])
    })

    console.log(miners)

    return miners;
  }

  private copyText(value: string, key: string): void {
    navigator.clipboard.writeText(value)
    BuefyService.infoToast(`Copied ${key} to clipboard`)
  }

  get lastUpdated(): string {
    return moment().format('MMM. Do YYYY, h:mm a');
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.35rem;
}

.hero-section {
  padding-top: 60px;
}

@media screen and (max-width: 768px) {
  .hero-section {
    padding-top: 55px;
  }
}
</style>
