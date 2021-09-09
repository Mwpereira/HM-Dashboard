<template>
  <div class='hero is-fullheight'>
    <div class='hero-head section mt-6 pt-6'>
      <div class='hero-section'>
        <h1 class='title is-size-2 has-text-centered'>{{ miner.informal_name }}</h1>
        <div class='is-flex is-justify-content-center'>
          <b-tooltip
            label="Hotspot's Address" type='is-dark' position='is-bottom'>
            <p class='copyText mx-2' @click="copyText(miner.address, 'address')"><i
              class='fas fa-at mx-1'></i>{{ miner.address
              }}</p>
          </b-tooltip>
          <b-tooltip
            label="Owner's address" type='is-dark' position='is-bottom'>
            <p class='copyText mx-2' @click="copyText(miner.owner, 'owner')"><i
              class='fas fa-user mx-1'></i>{{ miner.owner }}
            </p>
          </b-tooltip>
          <b-tooltip
            label='View on Helium Explorer' type='is-dark' position='is-bottom'>
            <a :href='`https://explorer.helium.com/hotspots/${miner.address}`' rel='noopener' target='_blank'
               class='heliumExplorer'
            >
              <i class='fas fa-globe mx-3'></i>
            </a>
          </b-tooltip>
          <b-tooltip
            label='Favourite Hotspot' type='is-dark' position='is-bottom'>
            <p class='favourite mx-3' :style='{ color: favouriteColor}' @click='favouriteHotspot()'><i
              class='fas fa-star'></i></p>
          </b-tooltip>
        </div>
        <p class='title mb-6 my-6'>Summary</p>
        <div class='columns is-centered has-text-centered is-size-5'>
          <div class='column box m-4'>
            <b-tooltip
              label='Hotspot rewards from the past 24 hours' type='is-dark'>
              <p class='is-size-3 m-4'>{{ rewards.dailyRewards ? `${rewards.dailyRewards} HNT` : '0.0 HNT' }}</p>
              <p><i class='fas fa-coins my-4 mr-4' style='color: rgb(255, 186, 0);'></i>Earnings</p>
            </b-tooltip>
          </div>
          <div class='column box m-4'>
            <b-tooltip
              label='Hotspot reward scale' type='is-dark'>
              <p class='is-size-3 m-4'>{{ miner.reward_scale ? miner.reward_scale.toFixed(2) : '0.00' }}</p>
              <p><i class='fas fa-balance-scale-left my-4 mr-4' style='color: rgb(13,79,241)'></i>Reward Scale</p>
            </b-tooltip>
          </div>
          <div class='column box m-4'>
            <b-tooltip
              label='Current status of Hotspot miner' type='is-dark'>
              <p class='is-size-3 m-4'>
                {{ (miner.status.online === 'online' && (miner.block - miner.last_change_block < 500)) ? 'Synced' : 'Not Synced'
                }}</p>
              <p><i class='fas fa-power-off my-4 mr-4' :style='{ color: minerStatusColor }'></i>Sync Status</p>
            </b-tooltip>
          </div>
        </div>
        <div class='columns is-centered has-text-centered is-size-5'>
          <div class='column box m-4'>
            <b-tooltip
              label='Hotspot manufacturer' type='is-dark' position='is-bottom'>
              <p class='is-size-3 m-4'>{{ miner.payer ? maker : 'N/A' }}</p>
              <p><i class='fas fa-industry my-4 mr-4' style='color: rgb(255, 71, 87)'></i>Maker</p>
            </b-tooltip>
          </div>
          <div class='column box m-4'>
            <b-tooltip
              label="Hotspot's antenna gain" type='is-dark' position='is-bottom'>
              <p class='is-size-3 m-4'>{{ miner.gain ? `${miner.gain / 10}dbi` : '0dbi' }}</p>
              <p><i class='fas fa-broadcast-tower my-4 mr-4' style='color: #777'></i>Antenna Gain</p>
            </b-tooltip>
          </div>
          <div class='column box m-4'>
            <b-tooltip
              label="Hotspot's elevation" type='is-dark' position='is-bottom'>
              <p class='is-size-3 m-4'>{{ miner.elevation ? `${miner.elevation}m` : '0m' }}</p>
              <p><i class='fas fa-ruler-vertical my-4 mr-4' style='color: rebeccapurple'></i>Elevation</p>
            </b-tooltip>
          </div>
        </div>
      </div>
      <p class='has-text-left my-6 py-6'>Last Updated: {{ lastUpdated }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { Miner } from '~/interfaces/Miner'
import BuefyService from '~/services/buefy-service'
import { Makers } from '~/enums/Makers'

@Component({
  async asyncData({ params, store, redirect }) {
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

    return { minerName }
  }
})
export default class Hotspot extends Vue {
  private minerName!: string

  get miner(): Miner {
    return this.$store.getters.miners[this.minerName]
  }

  get rewards() {
    return this.$store.getters.rewards
  }

  get lastUpdated() {
    return moment.utc(this.$store.getters.miners[this.minerName].last_updated * 1000).local().toString().split(' GMT')[0]
  }

  get favouriteColor(): string {
    return this.$store.getters.favourites[this.minerName] !== undefined ? 'gold' : '#e6e6e6'
  }

  get favourite(): boolean {
    return this.$store.getters.favourites[this.minerName] !== undefined
  }

  get maker(): string {
    return (<any>Makers)[this.miner.payer]
  }

  get minerStatusColor(): string {
    return this.$store.getters.miners[this.minerName].status.online === 'online' && (this.$store.getters.miners[this.minerName].block - this.$store.getters.miners[this.minerName].last_change_block < 500) ? 'rgb(70, 201, 58)' : 'rgb(255, 71, 87)'
  }

  private copyText(value: string, key: string) {
    navigator.clipboard.writeText(value)
    BuefyService.infoToast(`Copied ${key} to clipboard`)
  }

  private favouriteHotspot() {
    if (this.favourite) {
      this.$store.commit('removeFavourite', this.minerName)
      BuefyService.warningToast(`Removed Hotspot from Favourites`)
    } else {
      this.$store.commit('addFavourite', { minerName: this.minerName, informalName: this.miner.informal_name })
      BuefyService.warningToast(`Added Hotspot to Favourites`)
    }
  }
}
</script>

<style scoped lang='scss'>
.heliumExplorer {
  color: #4a4a4a
}

.is-dark-mode-active .heliumExplorer {
  color: #e5e5e5;
}

.heliumExplorer:hover {
  color: #8b5de9;
}

.copyText {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copyText:hover {
  color: #2c65c2;
  cursor: pointer;
}

.favourite:hover {
  color: orange;
  cursor: pointer;
}

.hero-section {
  padding-top: 60px;
}
</style>
