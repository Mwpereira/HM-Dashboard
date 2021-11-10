<template>
  <div>
    <h1 class='title has-text-centered mb-4'>{{ miner.informal_name }}</h1>
    <div class='is-flex is-justify-content-center is-align-items-center has-text-centered'>
      <div>
        <b-tooltip
          label="Hotspot's address" type='is-dark' position='is-bottom'>
          <p class='copyText m-2' @click="copyText(miner.address, 'address')"><i
            class='fas fa-at m-1'></i>{{
              miner.address
            }}</p>
        </b-tooltip>
        <b-tooltip
          label="Owner's address" type='is-dark' position='is-bottom'>
          <p class='copyText m-2' @click="copyText(miner.owner, 'owner')"><i
            class='fas fa-user m-1'></i>{{ miner.owner }}
          </p>
        </b-tooltip>
      </div>
      <div>
        <b-tooltip
          label='View on Helium Explorer' type='is-dark' position='is-bottom'>
          <a :href='`https://explorer.helium.com/hotspots/${miner.address}`' rel='noopener' target='_blank'
             class='heliumExplorer'
          >
            <i class='fas fa-globe m-3'></i>
          </a>
        </b-tooltip>
        <b-tooltip
          label='Get hotspot Link' type='is-dark' position='is-bottom'>
          <p class='link m-3' @click="copyText(`https://hmdashboard.mwpereira.ca${$nuxt.$route.fullPath}`, 'url')"><i
            class='fas fa-link'></i></p>
        </b-tooltip>
        <b-tooltip
          label='Favourite hotspot' type='is-dark' position='is-bottom'>
          <p class='favourite m-3' :style='{ color: favouriteColor}' @click='favouriteHotspot()'><i
            class='fas fa-star'></i></p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {Miner} from "~/interfaces/Miner";
import BuefyService from "~/services/buefy-service";

@Component
export default class Title extends Vue {
  @Prop() private minerName!: string
  @Prop() private miner!: Miner

  get favouriteColor(): string {
    return this.$store.getters.favourites[this.minerName] !== undefined ? 'gold' : '#e6e6e6'
  }

  get favourite(): boolean {
    return this.$store.getters.favourites[this.minerName] !== undefined
  }

  private copyText(value: string, key: string): void {
    navigator.clipboard.writeText(value)
    BuefyService.infoToast(`Copied ${key} to clipboard`)
  }

  private favouriteHotspot(): void {
    if (this.favourite) {
      this.$store.commit('removeFavourite', this.minerName)
      BuefyService.warningToast(`Removed Hotspot from Favourites`)
    } else {
      this.$store.commit('addFavourite', {minerName: this.minerName, informalName: this.miner.informal_name})
      BuefyService.warningToast(`Added Hotspot to Favourites`)
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.35rem;
}

.heliumExplorer, .link {
  color: #4a4a4a;
}

.is-dark-mode-active .heliumExplorer, .is-dark-mode-active .link {
  color: #e5e5e5;
}

.heliumExplorer:hover {
  color: #b569ce;
}

.copyText {
  max-width: 115px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copyText:hover {
  color: #2c65c2;
  cursor: pointer;
}

.favourite:hover {
  color: gold !important;
  cursor: pointer;
}

.link:hover {
  color: #7ac6d9 !important;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .is-flex {
    flex-direction: column;
  }
}
</style>
