<template>
  <b-navbar class='box' :class="{ 'is-hidden': isHomePage }">
    <template #brand>
      <b-navbar-item id='logo' tag='router-link' :to="{ path: '/' }">
        <svg data-v-fde0c5aa='' xmlns='http://www.w3.org/2000/svg' width='300' height='50' viewBox='100 50 200 200'
             class='iconAbove'>
          <defs data-v-fde0c5aa=''></defs>
          <rect data-v-fde0c5aa='' fill='transparent' x='0' y='0'
                class='logo-background-square'></rect>
          <defs data-v-fde0c5aa=''></defs>
          <g id='31dd9bcf-914e-452b-bbe2-c2313b0f78e3' data-v-fde0c5aa='' :fill="isDarkModeActive ? '#fff' : '#000000'"
             transform='matrix(5.212187288209586,0,0,5.212187288209586,99.25935884941275,164.57703880775094)'>
            <path
              d='M8.19 4.26L6.27 4.26L6.27 8.58L2.87 8.58L2.87 4.26L0.92 4.26L0.92 14.92L2.87 14.92L2.87 10.35L6.27 10.35L6.27 14.92L8.19 14.92ZM14.36 9.49L12.29 4.26L10.04 4.26L10.04 14.92L11.89 14.92L11.89 7.77L13.54 11.79L15.04 11.79L16.70 7.76L16.70 14.92L18.55 14.92L18.55 4.26L16.44 4.26Z'></path>
          </g>
          <defs data-v-fde0c5aa=''>
            <linearGradient id='b27fdb5d-0459-46c1-a949-6123a5969d4a' data-v-fde0c5aa='' gradientTransform='rotate(25)'
                            x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop data-v-fde0c5aa='' offset='0%' stop-color='#1a5cff' stop-opacity='1'></stop>
              <stop data-v-fde0c5aa='' offset='100%' stop-color='#AABDEB' stop-opacity='1'></stop>
            </linearGradient>
          </defs>
          <g id='d9c1f6cd-18b3-4320-9102-c05f3a1226c8' data-v-fde0c5aa='' stroke='none'
             fill='url(#b27fdb5d-0459-46c1-a949-6123a5969d4a)'
             transform='matrix(3.261537572208972,0,0,3.261537572208972,-13.078514704315872,-49.859460111036185)'>
            <path clip-rule='evenodd'
                  d='M49.998 32.965l14.755 8.517v7.502h8.082l3.813-6.613h8.809l4.402 7.628-4.402 7.627h-8.809l-3.813-6.61h-8.082v7.5l-14.755 8.52-14.752-8.52v-7.5h-8.08l-3.815 6.61h-8.809L10.142 50l4.4-7.628h8.809l3.814 6.613h8.081v-7.502z'></path>
          </g>
        </svg>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item v-show="!isWatchlistPage" class='mr-4 navOptions' href="#summary">
        Summary
      </b-navbar-item>
      <b-navbar-item v-show="!isWatchlistPage" class='mr-4 navOptions' href="#rewards">
        Rewards
      </b-navbar-item>
      <b-navbar-item v-show="!isWatchlistPage" class='mr-4 navOptions' href="#witnesses">
        Witnesses
      </b-navbar-item>
      <b-navbar-item v-show="!isWatchlistPage" class='mr-4 navOptions' href="#location">
        Location
      </b-navbar-item>
      <b-navbar-item v-show="isWatchlistPage" class='mr-4 navOptions' @click="goToLastVisited">
        <i class="fas fa-chevron-left"></i>
      </b-navbar-item>
      <b-dropdown
        position="is-bottom-left"
        append-to-body
        aria-role="menu"
        scrollable
        max-height="200"
        trap-focus
      >
        <template #trigger>
          <a
            class="navbar-item"
            role="button">
            <i class="fas fa-layer-group mr-1"></i>
            <b-icon icon="menu-down"></b-icon>
          </a>
        </template>
        <b-dropdown-item class="has-text-weight-bold" custom>
          Favourite Hotspots
        </b-dropdown-item>
        <b-dropdown-item separator custom></b-dropdown-item>
        <b-dropdown-item v-for="favourite of favourites" :key="favourite" aria-role="listitem"
                         @click="addMiner(favourite)">
          {{ favourite }}
        </b-dropdown-item>
      </b-dropdown>
      <b-navbar-item class='mr-4 navOptions' @click="settingsModal">
        <i class='fas fa-cog'></i>
      </b-navbar-item>
      <a id='darkModeToggle' class='navbar-item has-divider is-desktop-icon-only is-size-6 navOptions' title='Dark Mode'
         @click='darkModeToggle'>
        <div v-if='!isDarkModeActive'>
          <i class='far fa-moon'></i>
        </div>
        <div v-else>
          <i class='fas fa-sun'></i>
        </div>
      </a>
    </template>
  </b-navbar>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import Settings from '~/components/general/Settings.vue'
import {Miners} from "~/interfaces/Miners";

@Component
export default class NavBar extends Vue {
  get isHomePage(): boolean {
    return this.$store.getters.isHomePage
  }

  get isWatchlistPage(): boolean {
    return this.$nuxt.$route.fullPath.includes('/watchlist')
  }

  async goToLastVisited(): Promise<void> {
    await this.$router.push(`/${this.$store.getters.lastVisited}`)
  }

  get miners(): Miners {
    return this.$store.getters.miners
  }

  get isDarkModeActive(): boolean {
    return this.$store.getters.isDarkModeActive
  }

  get favourites(): any[] {
    return Object.values(this.$store.getters.favourites).sort();
  }

  private darkModeToggle(): void {
    this.$store.commit('darkModeToggle')
  }

  private settingsModal(): void {
    this.$buefy.modal.open({
      parent: this,
      component: Settings,
      hasModalCard: true,
      customClass: 'custom-class custom-class-2',
      trapFocus: true
    })
  }

  private async addMiner(selected?: string): Promise<void> {
    const miner = await this.$store.dispatch('addMiner', selected)
    if (miner !== null) {
      await this.$router.push(`/${miner}`)
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem 2rem 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.navbar-item {
  padding-bottom: 5px;
  margin-left: 2px;
  margin-right: 2px;
  color: #323232;
}

.navbar-item:focus {
  color: #323232;
  background-color: transparent;
}

.navbar-item:hover {
  color: #323232;
  background-color: transparent;
}

.navbar-menu.is-active .navbar-item:hover {
  color: #323232;
  background-color: transparent;
}

#logo:hover, #logo:focus {
  border-bottom: none;
}

.navOptions:hover {
  border-bottom: none;
  color: #7499F2 !important;
}

@media screen and (max-width: 768px) {
  svg {
    width: 150px;
  }
}
</style>
