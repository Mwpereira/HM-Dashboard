import ky from 'ky';

/**
 * Defining ky options
 */
export const kyOptions = ky.extend({
  prefixUrl: process.env.heliumAPI,
});
