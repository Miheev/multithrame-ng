import * as countries from './countries.json';

export const AppConfig = {
  youtubeApiKey: 'AIzaSyA7hLSvwIpd6eaHCdQHQyf42hYwVlgjUQQ',
  commonParts: 'snippet, statistics',
  baseParts: 'snippet',
  chart: 'mostPopular',
  defaultRegion: 'US',
  defaultCategoryId: '10',
  defaultVideosPerPage: 24,
  maxVideosToLoad: 50,

  defaultCategory: { name: 'All', id: '' },
  countryList: (countries['default'] as typeof countries),
};
