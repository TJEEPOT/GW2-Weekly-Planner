/**
 * js/api.js — GW2 API calls
 */

const API_BASE = "https://api.guildwars2.com/v2/account/wizardsvault";

/**
 * Fetch a single Wizard's Vault endpoint.
 * @param {"daily"|"weekly"} endpoint
 * @param {string} apiKey
 * @returns {Promise<object>}
 */
async function fetchEndpoint(endpoint, apiKey) {
  // The GW2 API backend does not support CORS preflight (OPTIONS) requests.
  // Sending an Authorization header triggers a preflight, which fails.
  // Using the access_token query parameter keeps the request "simple" and
  // skips the preflight entirely — this is the approach recommended by ArenaNet
  // for all browser-based applications.
  const url      = `${API_BASE}/${endpoint}?access_token=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.text || `HTTP ${response.status} from GW2 API`);
  }

  return response.json();
}

/**
 * Fetch both daily and weekly objectives in parallel.
 * @param {string} apiKey
 * @returns {Promise<{ daily: object, weekly: object }>}
 */
export async function fetchAllObjectives(apiKey) {
  const [daily, weekly] = await Promise.all([
    fetchEndpoint("daily",  apiKey),
    fetchEndpoint("weekly", apiKey),
  ]);
  return { daily, weekly };
}
