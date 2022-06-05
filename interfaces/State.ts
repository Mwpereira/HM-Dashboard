import {Miner} from '~/interfaces/Miner';
import {Miners} from '~/interfaces/Miners';
import {Favourites} from '~/interfaces/Favourites';
import {RecentlyViewed} from '~/interfaces/RecentlyViewed';

export interface State {
  favourites: Favourites,
  isDarkModeActive: boolean;
  isHomePage: boolean;
  lastVisited: string;
  miner: Miner,
  miners: Miners,
  recentlyViewed: RecentlyViewed,
}
