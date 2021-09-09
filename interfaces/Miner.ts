export interface Miner {
  'address': string
  'block': number,
  'block_added': number,
  'elevation': number,
  'gain': number,
  'geocode': {
    'long_city': string,
    'long_country': string,
    'long_state': string,
    'long_street': string,
    'short_city': string,
    'short_country': string,
    'short_state': string,
    'short_street': string,
    'city_id': string
  },
  'informal_name'?: string,
  'lat': number,
  'lng': number,
  'last_change_block': string,
  'last_poc_challenge': string,
  'last_updated': number,
  'location': string,
  'location_hex': string,
  'name': string,
  'nonce': number,
  'owner': string,
  'payer': string,
  'status': {
    'height': number,
    'online': string
  },
  'timestamp_added': string
}
