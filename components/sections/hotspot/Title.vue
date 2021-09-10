<template>
  <div>
    <h1 class='title has-text-centered mb-4'>{{ miner.informal_name }}</h1>
    <div class='is-flex is-justify-content-center is-align-items-center has-text-centered'>
      <div>
        <b-tooltip
          label="Hotspot's Address" type='is-dark' position='is-bottom'>
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
          label='Favourite Hotspot' type='is-dark' position='is-bottom' class='groupA'>
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

  get miner(): Miner {
    return this.$store.getters.miners[this.minerName]
  }


  get favouriteColor(): string {
    return this.$store.getters.favourites[this.minerName] !== undefined ? 'gold' : '#e6e6e6'
  }

  get favourite(): boolean {
    return this.$store.getters.favourites[this.minerName] !== undefined
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

@media screen and (max-width: 768px) {
  .hero-section {
    padding-top: 50px;
  }

  .is-flex {
    flex-direction: column;
    justify-items: center;
    justify-self: center;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
}
</style>
