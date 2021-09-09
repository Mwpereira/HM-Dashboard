import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { successResponse } from '~/utils/response-utils'
import KyService from '~/services/ky-service'
import BuefyService from '~/services/buefy-service'
import MessageConstants from '~/constants/message-constants'
import { Miners } from '~/interfaces/Miners'
import { Miner } from '~/interfaces/Miner'
import { Rewards } from '~/interfaces/Rewards'
import { Favourites } from '~/interfaces/Favourites'
import { RecentlyViewed } from '~/interfaces/RecentlyViewed'

Vue.use(Vuex)

export const plugins = [createPersistedState({ storage: window.localStorage })]

export const state = () => {
  return {
    favourites: {},
    isDarkModeActive: false,
    isHomePage: true,
    miners: {},
    rewards: {
      dailyRewards: 0,
      data: {}
    },
    recentlyViewed: []
  }
}

export const mutations = {
  addFavourite(state: { favourites: Favourites }, data: { minerName: string, informalName: string }) {
    state.favourites = { ...state.favourites, [`${data.minerName}`]: data.informalName }
  },
  addRecentlyViewed(state: { recentlyViewed: RecentlyViewed }, minerName: string) {
    let minerExists = false
    let minerIndex = 0

    state.recentlyViewed.forEach((viewedMiner: string, index: number) => {
      if (minerName === viewedMiner) {
        minerExists = true
        minerIndex = index
      }
    })

    if (!minerExists) {
      // Limit array to a length of 3
      if (state.recentlyViewed.length === 3) {
        state.recentlyViewed.pop()
      }
      state.recentlyViewed.push(minerName)
    } else {
      state.recentlyViewed.splice(minerIndex, 1)
      state.recentlyViewed.push(minerName)
    }
  },
  async addMiner(state: { miners: Miners }, miner: Miner) {
    return await new Promise((resolve) => {
      resolve(state.miners[miner.name] = miner)
    })
  },
  darkModeToggle: (state: { isDarkModeActive: boolean }) => {
    state.isDarkModeActive = !state.isDarkModeActive

    mutations.updateTheme(state)
  },
  loadTheme(state: { isDarkModeActive: boolean }) {
    mutations.updateTheme(state)
  },
  removeFavourite(state: { favourites: Favourites }, minerName: string) {
    const favourites = state.favourites
    delete favourites[minerName]
    state.favourites = { ...favourites }
  },
  async setDailyRewards(state: { rewards: Rewards }, dailyRewards: number) {
    return await new Promise((resolve) => {
      resolve(state.rewards.dailyRewards = dailyRewards)
    })
  },
  setPage(state: { isHomePage: boolean }, isHomePage: boolean) {
    state.isHomePage = isHomePage
  },
  updateTheme: (state: { isDarkModeActive: boolean }) => {
    const htmlClassName = 'is-dark-mode-active'

    if (state.isDarkModeActive) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }
  }
}

export const actions = {
  async addMiner(ctx: any, userInput: string): Promise<string | null> {
    userInput = userInput.replaceAll(' ', '-').toLowerCase()

    if (await ctx.dispatch('checkForMiner', userInput)) {
      if (await ctx.dispatch('checkForOutdatedData', userInput)) {
        return await ctx.dispatch('getMinerData', userInput)
      } else {
        BuefyService.warningToast(MessageConstants.WARNING_LOADING_MINER)

        return userInput
      }
    } else {
      return await ctx.dispatch('getMinerData', userInput)
    }
  },
  checkForMiner(ctx: any, minerName: string): boolean {
    return ctx.getters.miners[minerName] !== undefined
  },
  checkForOutdatedData(ctx: any, minerName: string): boolean {
    // Data will refresh after one minute
    return Math.round(new Date().getTime() / 1000) - (ctx.state.miners[minerName].last_updated || 0) > 60
  },
  async getMinerData(ctx: any, userInput: string) {
    try {
      BuefyService.startLoading()

      let response = await KyService.getHotspotForName(userInput)

      BuefyService.stopLoading()

      if (successResponse(response)) {
        response = await response.json()
        const miner: Miner = response.data[0]
        if (miner) {
          const informalName = miner.name.replaceAll('-', ' ').split(' ')
          for (let i = 0; i < 3; i++) {
            informalName[i] = informalName[i].charAt(0).toUpperCase() + informalName[i].slice(1)
          }
          miner.informal_name = informalName.join(' ')
          miner.last_updated = Math.round(new Date().getTime() / 1000)

          // Displays correct toast
          ctx.dispatch('checkForMiner', userInput) ? BuefyService.successToast(MessageConstants.WARNING_FETCHING_MINER) : BuefyService.successToast(MessageConstants.SUCCESS_ADDING_MINER)

          // Add Miner to state
          await ctx.commit('addMiner', miner)
          await ctx.commit('addRecentlyViewed', miner.informal_name)
          await ctx.dispatch('getDailyRewards', { minerName: miner.name, minerAddress: miner.address })

          return miner.name
        } else {
          BuefyService.dangerToast(MessageConstants.ERROR_ADDING_MINER)
          return null
        }
      } else {
        BuefyService.dangerToast(MessageConstants.ERROR_ADDING_MINER)
        return null
      }
    } catch (error) {
      console.warn(`Stack Trace: ${error}`)
      BuefyService.stopLoading()
      BuefyService.dangerToast(MessageConstants.ERROR_ADDING_MINER)
      return null
    }
  },
  async getDailyRewards(ctx: any, data: { minerName: string, minerAddress: string }) {
    let response = await KyService.getLast24HrRewards(data.minerAddress)

    if (successResponse(response)) {
      response = await response.json()

      let rewards = 0
      for (const value of Object.values(response.data)) {
        // @ts-ignore
        rewards += value.total
      }

      await ctx.commit('setDailyRewards', rewards.toFixed(2))
    } else {
      BuefyService.dangerToast(MessageConstants.ERROR_GETTING_REWARDS)
    }
  },
  async loadMiner(ctx: any, minerName: string): Promise<Miner> {
    return await new Promise((resolve) => {
      resolve(ctx.getters.miners[minerName])
    })
  },
  async fetchMiner(ctx: any, minerName: string): Promise<Miner> {
    await ctx.dispatch('addMiner', minerName)
    return await new Promise((resolve) => {
      resolve(ctx.getters.miners[minerName])
    })
  },
  startup(ctx: any, isHomePage: boolean): void {
    ctx.commit('setPage', isHomePage)
    ctx.commit('loadTheme')
  }
}

export const getters = {
  favourites: (state: { favourites: Favourites; }) => state.favourites,
  isDarkModeActive: (state: { isDarkModeActive: boolean; }) => state.isDarkModeActive,
  isHomePage: (state: { isHomePage: boolean; }) => state.isHomePage,
  miners: (state: { miners: Miners; }) => state.miners,
  recentlyViewed: (state: { recentlyViewed: RecentlyViewed }) => state.recentlyViewed,
  rewards: (state: { rewards: Rewards; }) => state.rewards
}
