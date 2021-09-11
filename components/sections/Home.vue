<template>
  <div id='home' class='hero'>
    <div class='hero-head section mt-6 pt-6'>
      <div class='hero-section'>
        <h1 class='title has-text-centered mb-6'><span id='hm'>HM</span> Dashboard</h1>
        <div class='columns is-centered'>
          <form class='form column' @submit.prevent='addMiner()'>
            <b-field>
              <b-autocomplete
                v-model='userInput'
                :data='filteredDataArray'
                size='is-large'
                icon='search'
                icon-pack='fas'
                placeholder='Hotspot Name'
                group-field='type'
                group-options='items'
                :open-on-focus='true'
                @keydown.native.enter='addMiner'
              >
                <template #empty>No hotspots found</template>
              </b-autocomplete>
            </b-field>
          </form>
        </div>
        <div class='mt-6 has-text-centered'>
          <p>Minimalistic and modern user interface to display your HNT miner's data.</p>
          <p class='mt-5 mb-6'>Developed & published for the HNT mining community by <a class='has-text-weight-bold'
                                                                                        href='https://mwpereira.ca/'
                                                                                        rel='noopener'
                                                                                        target='_blank'>Michael
            Pereira</a>.</p>
          <p class='my-6 is-size-3'>
            <a href='https://github.com/mwpereira/HM-Dashboard' rel='noopener' target='_blank'>
              <i class='fab fa-github-alt m-2'></i>
            </a>
            <a href='https://explorer.helium.com/' rel='noopener' target='_blank'>
              <i class='fas fa-globe m-2'></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'

@Component
export default class Home extends Vue {
  private userInput = ''

  mounted() {
    this.$store.dispatch('startup', true)
    document.title = `HM Dashboard`
  }

  get filteredDataArray(): Array<{ type: string; items: any; }> {
    if (this.userInput === '') {
      const results = []

      if (Object.keys(this.$store.getters.favourites).length > 0) {
        results.push({
          type: 'Favourites', items: Object.values(this.$store.getters.favourites).filter((option: any) => {
            return (
              option.toString().toLowerCase().includes(this.userInput.toLowerCase()) >= 0
            )
          })
        })
      }

      if (this.$store.getters.recentlyViewed.length > 0) {
        results.push({
          type: 'Search Results', items: this.$store.getters.recentlyViewed.filter((option: any) => {
            return (
              option.toString().toLowerCase().includes(this.userInput.toLowerCase())
            )
          })
        })
      }
      return results
    } else {
      return [{
        type: 'Search Results', items: this.$store.getters.recentlyViewed.filter((option: any) => {
          return (
            option.toString().toLowerCase().includes(this.userInput.toLowerCase())
          )
        })
      }]
    }
  }

  private async addMiner(): Promise<void> {
    const miner = await this.$store.dispatch('addMiner', this.userInput)
    if (miner !== null) {
      await this.$router.push(`/${miner}`)
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 80vh;
}

.form {
  max-width: 615px;
}

.title {
  font-size: 96px;
}

@media screen and (max-width: 1024px) {
  .title {
    font-size: 72px;
  }

  .form {
    max-width: 465px;
  }
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 3rem;
  }

  .form {
    max-width: unset;
  }
}
</style>
