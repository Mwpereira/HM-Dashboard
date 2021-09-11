import { kyOptions } from '~/constants/ky-constants'

const ky = kyOptions

/**
 * Calling Helium APIs using Ky http
 */
export default class KyService {
  public static getHotspotFromName(name: string) {
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

  public static getRewards(address: string) {
    return ky(`hotspots/${address}/rewards/sum?min_time=-5208 hour&max_time=${new Date().toISOString()}&bucket=hour`)
      .catch((error) => {
        return error.response
      })
  }
}
