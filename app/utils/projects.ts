// Each id maps to projects.<id>.title / .context / .description in i18n/locales.
// Only `featured` projects are shown; swap the flag to change the selection.
export default [
  { id: 'cropYield', tags: ['Google Earth Engine', 'Ridge Regression'], featured: true },
  { id: 'cropTypes', tags: ['Google Earth Engine', 'XGBoost'], featured: true },
  { id: 'phenology', tags: ['Google Earth Engine', 'Python'], featured: true },
  { id: 'emotions', tags: ['Keras', 'CNN', 'Transfer learning'], featured: true },
  { id: 'nlpScraper', tags: ['spaCy', 'NLTK', 'scikit-learn'], featured: true },
  { id: 'codeCourses', tags: [], featured: true },
  { id: 'creditScoring', tags: ['scikit-learn', 'XGBoost'], featured: false },
  { id: 'sp500', tags: ['Pandas', 'scikit-learn'], featured: false },
  { id: 'titanic', tags: ['Pandas', 'scikit-learn'], featured: false },
] as { id: string, tags: string[], featured: boolean, url?: string }[]
