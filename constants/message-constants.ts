/**
 * Message constants for toast notifications after API requests
 */
export default class MessageConstants {
  /**
   * SUCCESS MESSAGES
   */
  public static readonly SUCCESS_ADDING_MINER = 'Hotspot found'
  public static readonly SUCCESS_DELETING_CACHE = 'Successfully Deleted'
  /**
   * WARNING MESSAGES
   */
  public static readonly WARNING_LOADING_MINER = 'Loading hotspot data'
  public static readonly WARNING_FETCHING_MINER = 'Fetching hotspot data'
  /**
   * ERROR MESSAGES
   */
  public static readonly ERROR_ADDING_MINER = 'Hotspot not found :('
  public static readonly ERROR_GETTING_REWARDS = 'Error getting rewards'
  public static readonly ERROR_GETTING_WITNESSES = 'Error getting witnesses'
  public static readonly ERROR_DELETING_CACHE = 'Error deleting cache'
  public static readonly ERROR_INCORRECT_SYNTAX = 'Incorrect Syntax'
  public static readonly ERROR_HELIUM = 'Helium API error'
}
