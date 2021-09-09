import { kyOptions } from '~/constants/ky-constants'

const ky = kyOptions

/**
 * Calling Helium APIs using Ky http
 */
export default class KyService {
  public static getHotspotForName(name: string) {
    return ky(`hotspots/name/${name}`)
      .catch((error) => {
        return error.response
      })
  }

  public static getWitnesses(address: string) {
    return ky(`hotspots/${address}/witnesses`)
      .catch((error) => {
        return error.response
      })
  }

  public static getLast24HrRewards(address: string) {
    return ky(`hotspots/${address}/rewards/sum?min_time=-24 hour&max_time=${new Date().toISOString()}&bucket=hour`)
      .catch((error) => {
        return error.response
      })
  }
}
