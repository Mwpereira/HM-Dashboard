export default class GeneralService {
  public static checkForOutdatedData(time: number): boolean {
    return this.getTime() - time > 60
  }

  public static getTime(): number {
    return Math.round(new Date().getTime() / 1000)
  }
}
