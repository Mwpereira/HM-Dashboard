export default class GeneralService {
  public static checkForOutdatedData(time: number): boolean {
    return Math.round(new Date().getTime() / 1000) - time >  60
  }
}
