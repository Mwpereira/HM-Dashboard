<template>
  <div id="home" class="hero">
    <div class="hero-head section mt-6 pt-6">
      <div class="hero-section">
        <h1 class="title has-text-centered mb-6">
          <span id="hm">HM</span> Dashboard
        </h1>
        <div class="columns is-centered">
          <form class="form column" @submit.prevent="addMiner()">
            <b-field>
              <b-autocomplete
                v-model="userInput"
                :data="filteredDataArray"
                size="is-large"
                icon="search"
                icon-pack="fas"
                placeholder="Hotspot Name"
                group-field="type"
                group-options="items"
                :open-on-focus="true"
                @submit="addMiner"
                @keydown.native.enter='addMiner'
                @select="(option) => addMiner(option)"
              >
                <template></template>
                <template #empty>No hotspots found</template>
              </b-autocomplete>
            </b-field>
          </form>
        </div>
        <div class="mt-6 has-text-centered">
          <p>
            Minimalistic and modern user interface to display your HNT miner's
            data.
          </p>
          <p class="mt-5 mb-6">
            Developed & published for the HNT mining community by
            <a
              class="has-text-weight-bold"
              href="https://mwpereira.ca/"
              rel="noopener"
              target="_blank"
              >Michael Pereira</a
            >.
          </p>
          <p class="my-6 is-size-3">
            <a
              href="https://github.com/mwpereira/HM-Dashboard"
              rel="noopener"
              target="_blank"
            >
              <i class="fab fa-github-alt m-2"></i>
            </a>
            <a
              href="https://explorer.helium.com/"
              rel="noopener"
              target="_blank"
            >
              <i class="fas fa-globe m-2"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import hotspots from '@/assets/json/hotspots.json';
import BuefyService from '~/services/buefy-service';
import MessageConstants from '~/constants/message-constants';

@Component
export default class Home extends Vue {
  private userInput = ''

  mounted(): void {
  	this.$store.dispatch('startup', true);
  	document.title = 'HM Dashboard';
  }

  get filteredDataArray(): (
    | { type: string; items: string[] }[]
    | { type: string; items: any }
  )[] {
  	if (
  		this.userInput === '' &&
      this.$store.getters.recentlyViewed.length === 0 &&
      this.$store.getters.favourites.length === 0
  	) {
  		return [
  			{
  				items: hotspots.miners.sort(),
  				type: 'Suggested Hotspots',
  			},
  		];
  	}
  	if (this.userInput === '') {
  		const results = [];
  		if (Object.keys(this.$store.getters.favourites).length > 0) {
  			results.push({
  				items: Object.values(this.$store.getters.favourites)
  					.filter((option: any) => {
  						return (
  							option
  								.toString()
  								.toLowerCase()
  								.includes(this.userInput.toLowerCase()) >= 0
  						);
  					})
  					.sort(),
  				type: 'Favourites',
  			});
  		}

  		if (this.$store.getters.recentlyViewed.length > 0) {
  			results.push({
  				items: this.$store.getters.recentlyViewed
  					.slice()
  					.reverse()
  					.filter((option: any) => {
  						return option
  							.toString()
  							.toLowerCase()
  							.includes(this.userInput.toLowerCase());
  					})
  					.sort(),
  				type: 'Search Results',
  			});
  		}
  		if (
  			this.$store.getters.recentlyViewed.length === 0 ||
        Object.keys(this.$store.getters.favourites).length === 0
  		) {
  			results.push({
  				items: hotspots.miners.sort(),
  				type: 'Suggested Hotspots',
  			});
  		}
  		return results.sort();
  	} else {
  		return [
  			{
  				items: this.$store.getters.recentlyViewed
  					.filter((option: any) => {
  						return option
  							.toString()
  							.toLowerCase()
  							.includes(this.userInput.toLowerCase());
  					}).sort(),
  				type: 'Search Results',
  			},
  		];
  	}
  }

  private async addMiner(selected?: string): Promise<void> {
  	this.userInput =
      typeof selected === 'object' ? this.userInput : selected || '';
  	if (this.userInput !== '') {
  		const matches = (this.userInput.match(/(\s|-)/g) || []).length;
  		if (matches === 2 || matches === 3) {
  			const miner = await this.$store.dispatch(
  				'addMiner',
  				this.userInput.trim()
  			);
  			if (miner !== null) {
  				await this.$router.push(`/${miner}`);
  			}
  		} else {
  			BuefyService.dangerToast(MessageConstants.ERROR_INCORRECT_SYNTAX);
  		}
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
