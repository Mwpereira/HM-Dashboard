<template>
  <div class='hero is-fullheight'>
    <div class='hero-head section mt-6 pt-6'>
      <div class='hero-section'>
        <Title :miner-name='minerName'/>
        <Summary :miner-name='minerName'/>
        <Rewards :miner-name='minerName'/>
        <Witnesses :miner-name='minerName'/>
        <Location :miner-name='minerName'/>
      </div>
      <p class='has-text-left my-6 py-6'>Last Updated: {{ lastUpdated }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator';
import moment from 'moment';
import {Miner} from '~/interfaces/Miner';
import Summary from '~/components/sections/hotspot/Summary.vue';
import Title from '~/components/sections/hotspot/Title.vue';
import Witnesses from '~/components/sections/hotspot/Witnesses.vue';
import RewardsSection from '~/components/sections/hotspot/Rewards.vue';
import Location from '~/components/sections/hotspot/Location.vue';

@Component({
	async asyncData({params, store, redirect}) {
		await store.dispatch('startup', false);

		const minerName = params.hotspot;

		let miner: Miner = await store.dispatch('loadMiner', minerName);

		if (!miner) {
			miner = await store.dispatch('fetchMiner', minerName);
		} else if (await store.dispatch('checkForOutdatedData', minerName)) {
			miner = await store.dispatch('fetchMiner', minerName);
		}

		if (!miner) {
			await redirect('/');
		}

		document.title = `${miner.informal_name} - HM Dashboard`;

		return {minerName};
	},
	components: {
		Location,
		Rewards: RewardsSection,
		Summary,
		Title,
		Witnesses
	}
})
export default class Hotspot extends Vue {
  private minerName!: string
  private polling!: NodeJS.Timer

  get miner(): Miner {
  	return this.$store.getters.miners[this.minerName];
  }

  get lastUpdated(): string {
  	if (this.$store.getters.miners[this.minerName]) {
  		return moment(this.$store.getters.miners[this.minerName].last_updated * 1000).format('MMM. Do YYYY, h:mm a');
  	} else {
  		return 'N/A';
  	}
  }

  pollData() {
  	this.polling = setInterval(() => {
  		this.$store.dispatch('getMinerData', {showLoading: false, userInput: this.minerName});
  	}, 300000);
  }

  beforeDestroy() {
  	clearInterval(this.polling);
  }

  created() {
  	this.pollData();
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

<style>
.box p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (min-width: 769px) {
  .hero-section {
    padding-top: 55px;
  }

  .column.box {
    min-width: 300px;
  }
}

@media screen and (max-width: 768px) {
  #summary, #rewards, #witnesses, #location {
    padding-top: 9vh;
  }
}
</style>
