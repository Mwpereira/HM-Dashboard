import {Miner} from "~/interfaces/Miner";

export interface Witnesses {
  count: Number,
  avgRewardScale: string
  data: Array<Miner>
}
