import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {successResponse} from '~/utils/response-utils';
import KyService from '~/services/ky-service';
import BuefyService from '~/services/buefy-service';
import MessageConstants from '~/constants/message-constants';
import {Miners} from '~/interfaces/Miners';
import {Miner} from '~/interfaces/Miner';
import {Rewards} from '~/interfaces/Rewards';
import {Favourites} from '~/interfaces/Favourites';
import {RecentlyViewed} from '~/interfaces/RecentlyViewed';
import {State} from '~/interfaces/State';
import {Witnesses} from '~/interfaces/Witnesses';
import {Owner} from '~/interfaces/Owner';
import GeneralService from '~/services/general-service';

Vue.use(Vuex);

export const plugins = [createPersistedState({storage: window.localStorage})];

export const state = () => {
	return {
		favourites: {},
		isDarkModeActive: false,
		isHomePage: true,
		lastVisited: '',
		miners: {},
		recentlyViewed: []
	};
};

export const mutations = {
	addFavourite(state: { favourites: Favourites }, data: { minerName: string, informalName: string }) {
		state.favourites = {...state.favourites, [`${data.minerName}`]: data.informalName};
	},
	async addMiner(state: { miners: Miners }, miner: Miner) {
		return await new Promise((resolve) => {
			resolve(state.miners[miner.name] = miner);
		});
	},
	addRecentlyViewed(state: { favourites: Favourites, recentlyViewed: RecentlyViewed }, minerName: string) {
		let minerExists = false;
		let minerIndex = 0;

		let favourited = false;

		Object.values(state.favourites).forEach(favourite => {
			if (favourite === minerName) {
				favourited = true;
			}
		});

		if (!favourited) {
			state.recentlyViewed.forEach((viewedMiner: string, index: number) => {
				if (minerName === viewedMiner) {
					minerExists = true;
					minerIndex = index;
				}
			});

			if (!minerExists) {
				// Limit array to a length of 3
				if (state.recentlyViewed.length === 3) {
					state.recentlyViewed.pop();
				}
				state.recentlyViewed.push(minerName);
			} else {
				state.recentlyViewed.splice(minerIndex, 1);
				state.recentlyViewed.push(minerName);
			}
		}
	},
	darkModeToggle: (state: { isDarkModeActive: boolean }) => {
		state.isDarkModeActive = !state.isDarkModeActive;

		mutations.updateTheme(state);
	},
	loadTheme(state: { isDarkModeActive: boolean }) {
		mutations.updateTheme(state);
	},
	removeAllData(state: State) {
		state.favourites = {};
		state.isDarkModeActive = false;
		state.miners = {};
		state.recentlyViewed = [];
	},
	removeFavourite(state: { favourites: Favourites }, minerName: string) {
		const favourites = state.favourites;
		delete favourites[minerName];
		state.favourites = {...favourites};
	},
	removeFavourites(state: { favourites: Favourites }) {
		state.favourites = {};
	},
	removeMinerHistory(state: { miners: Miners }) {
		state.miners = {};
	},
	removeRecentlyViewed(state: { recentlyViewed: RecentlyViewed }, minerName: string) {
		const recentlyViewed = state.recentlyViewed;
		for (let i = 0; i < recentlyViewed.length; i++) {
			if (recentlyViewed[i] === minerName) {
				recentlyViewed.splice(i, 1);
			}
		}
		state.recentlyViewed = [...recentlyViewed];
	},
	resetRecentlyViewed(state: { recentlyViewed: RecentlyViewed }) {
		state.recentlyViewed = [];
	},
	setLastVisited(state: { lastVisited: string }, lastVisited: string) {
		state.lastVisited = lastVisited;
	},
	async setOwnerData(state: { miners: Miners }, data: { minerName: string, ownerData: Owner }) {
		state.miners[data.minerName].ownerData = data.ownerData;
		return await new Promise((resolve) => {
			resolve(state.miners = {
				...state.miners,
				[data.minerName]: state.miners[data.minerName]
			});
		});
	},
	setPage(state: { isHomePage: boolean }, isHomePage: boolean) {
		state.isHomePage = isHomePage;
	},
	async setRewards(state: { miners: Miners }, data: { minerName: string, rewards: Rewards }) {
		state.miners[data.minerName].rewards = data.rewards;
		return await new Promise((resolve) => {
			resolve(state.miners = {
				...state.miners,
				[data.minerName]: state.miners[data.minerName]
			});
		});
	},
	async setWitnesses(state: { miners: Miners }, data: { minerName: string, witnesses: Witnesses }) {
		state.miners[data.minerName].witnesses = data.witnesses;
		return await new Promise((resolve) => {
			resolve(state.miners = {
				...state.miners,
				[data.minerName]: state.miners[data.minerName]
			});
		});
	},
	updateTheme: (state: { isDarkModeActive: boolean }) => {
		const htmlClassName = 'is-dark-mode-active';

		if (state.isDarkModeActive) {
			document.documentElement.classList.add(htmlClassName);
		} else {
			document.documentElement.classList.remove(htmlClassName);
		}
	}
};

export const actions = {
	async addMiner(ctx: any, userInput: string): Promise<string | null> {
		userInput = userInput.replaceAll(' ', '-').toLowerCase();

		if (await ctx.dispatch('checkForMiner', userInput)) {
			if (await ctx.dispatch('checkForOutdatedData', userInput)) {
				return await ctx.dispatch('getMinerData', {showLoading: true, userInput});
			} else {
				BuefyService.warningToast(MessageConstants.WARNING_LOADING_MINER);

				return userInput;
			}
		} else {
			return await ctx.dispatch('getMinerData', {showLoading: true, userInput});
		}
	},
	checkForMiner(ctx: any, minerName: string): boolean {
		return ctx.getters.miners[minerName] !== undefined;
	},
	checkForOutdatedData(ctx: any, minerName: string): boolean {
		// Data will refresh after 1 minute on page reload
		return GeneralService.checkForOutdatedData(ctx.state.miners[minerName].last_updated || 0);
	},
	async fetchMiner(ctx: any, minerName: string): Promise<Miner> {
		await ctx.dispatch('addMiner', minerName);
		ctx.commit('setLastVisited', minerName);
		return await new Promise((resolve) => {
			resolve(ctx.getters.miners[minerName]);
		});
	},
	async getMinerData(ctx: any, data: { userInput: string, showLoading?: boolean }) {
		try {
			if (data.showLoading) {
				BuefyService.startLoading();
			}

			let response = await KyService.getHotspotFromName(data.userInput);

			if (successResponse(response)) {
				response = await response.json();
				const miner: Miner = response.data[0];
				if (miner) {
					// Displays correct toast
					if (data.showLoading) {
						ctx.dispatch('checkForMiner', data.userInput) ? BuefyService.successToast(MessageConstants.WARNING_FETCHING_MINER) : BuefyService.successToast(MessageConstants.SUCCESS_ADDING_MINER);
					}

					const informalName = miner.name.replaceAll('-', ' ').split(' ');
					for (let i = 0; i < 3; i++) {
						informalName[i] = informalName[i].charAt(0).toUpperCase() + informalName[i].slice(1);
					}
					miner.informal_name = informalName.join(' ');
					const time = GeneralService.getTime();
					miner.last_updated = time;

					// Add Miner to state
					await ctx.commit('addMiner', miner);
					await ctx.commit('addRecentlyViewed', miner.informal_name);

					await ctx.dispatch('getRewards', {
						minerAddress: miner.address,
						minerName: miner.name,
						minerOwnerAddress: miner.owner,
						time
					});
					await ctx.dispatch('getWitnesses', {minerAddress: miner.address, minerName: miner.name, time});

					BuefyService.stopLoading();

					return miner.name;
				} else {
					BuefyService.stopLoading();
					BuefyService.dangerToast(MessageConstants.ERROR_ADDING_MINER);
					return null;
				}
			} else {
				BuefyService.stopLoading();
				BuefyService.dangerToast(MessageConstants.ERROR_ADDING_MINER);
				return null;
			}
		} catch (error) {
			console.warn(`Stack Trace: ${error}`);
			BuefyService.stopLoading();
			BuefyService.dangerToast(MessageConstants.ERROR_ADDING_MINER);
			return null;
		}
	},
	async getOwnerData(ctx: any, data: { minerName: string, minerOwnerAddress: string, time: number }) {
		try {
			// BuefyService.warningToast(MessageConstants.WARNING_FETCHING_OWNER)

			let response = await KyService.getHotspotOwner(data.minerOwnerAddress);

			if (successResponse(response)) {
				response = await response.json();

				const owner: Owner = {
					...response.data,
					last_updated: data.time
				};

				await ctx.commit('setOwnerData', {minerName: data.minerName, ownerData: owner});
			} else {
				BuefyService.dangerToast(MessageConstants.ERROR_GETTING_OWNER);
			}
		} catch {
			BuefyService.dangerToast(MessageConstants.ERROR_GETTING_OWNER);
		}
	},
	async getRewards(ctx: any, data: { minerName: string, minerAddress: string, minerOwnerAddress: string, time: number }) {
		try {
			// BuefyService.warningToast(MessageConstants.WARNING_FETCHING_REWARDS)

			let response = await KyService.getRewards(data.minerAddress);

			if (successResponse(response)) {
				response = await response.json();

				let sum = 0;
				let counter = 0;
				let dailyRewards = 0;
				let weeklyRewards = 0;
				let monthlyRewards = 0;

				for (const value of Object.values(response.data)) {
					// @ts-ignore
					sum += value.total;
					counter++;

					// 24 === 1 day
					if (counter <= 24) {
						dailyRewards = sum;
					}
					// 168 === 1 week
					if (counter <= 168) {
						weeklyRewards = sum;
					}
					// 732 === 1 month (average between 30-31 days)
					if (counter <= 732) {
						monthlyRewards = sum;
					}
				}

				const rewards: Rewards = {
					dailyRewards: dailyRewards.toFixed(2),
					data: response.data,
					last_updated: data.time,
					monthlyRewards: monthlyRewards.toFixed(2),
					weeklyRewards: weeklyRewards.toFixed(2),
				};

				await ctx.commit('setRewards', {minerName: data.minerName, rewards});

				await ctx.dispatch('getOwnerData', {
					minerName: data.minerName,
					minerOwnerAddress: data.minerOwnerAddress,
					time: data.time
				});
			} else {
				BuefyService.dangerToast(MessageConstants.ERROR_GETTING_REWARDS);
			}
		} catch {
			BuefyService.dangerToast(MessageConstants.ERROR_HELIUM);
		}
	},
	async getWitnesses(ctx: any, data: { minerName: string, minerAddress: string, time: number }) {
		try {
			// BuefyService.warningToast(MessageConstants.WARNING_FETCHING_WITNESSES)

			let response = await KyService.getWitnesses(data.minerAddress);

			if (successResponse(response)) {
				response = await response.json();

				let sum = 0;
				const dataArr = Object.values(response.data);
				for (const value of dataArr) {
					// @ts-ignore
					sum += value.reward_scale;
				}
				sum /= dataArr.length;

				const witnesses = {
					avgRewardScale: sum.toFixed(2),
					count: dataArr.length,
					data: response.data,
					last_updated: data.time
				};

				await ctx.commit('setWitnesses', {minerName: data.minerName, witnesses});
			} else {
				BuefyService.dangerToast(MessageConstants.ERROR_GETTING_WITNESSES);
			}
		} catch {
			BuefyService.dangerToast(MessageConstants.ERROR_HELIUM);
		}
	},
	async loadMiner(ctx: any, minerName: string): Promise<Miner> {
		return await new Promise((resolve) => {
			resolve(ctx.getters.miners[minerName]);
		});
	},
	startup(ctx: any, isHomePage: boolean): void {
		ctx.commit('setPage', isHomePage);
		ctx.commit('loadTheme');
	}
};

export const getters = {
	favourites: (state: { favourites: Favourites; }) => state.favourites,
	isDarkModeActive: (state: { isDarkModeActive: boolean; }) => state.isDarkModeActive,
	isHomePage: (state: { isHomePage: boolean; }) => state.isHomePage,
	lastVisited: (state: { lastVisited: string; }) => state.lastVisited,
	miners: (state: { miners: Miners; }) => state.miners,
	recentlyViewed: (state: { recentlyViewed: RecentlyViewed }) => state.recentlyViewed
};
