export const API_CONFIG = {
  BASE_URL: 'https://newsapi.org/v2',
  API_KEY: 'c9eb879edcf2411ba583c6a829ac0550',
  ENDPOINTS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
  },
  DEFAULT_PARAMS: {
    country: 'us',
    pageSize: 10,
  },
  CATEGORIES: [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ] as const,
};

export type NewsCategory = typeof API_CONFIG.CATEGORIES[number];
