// `id` is also the i18n key of the description (tech.<id>).
// Techs without a `logo` are rendered as text.
export default [
  // AI / Machine learning
  { id: 'python', name: 'python', logo: 'python.png', color: 'yellow' },
  { id: 'pytorch', name: 'pytorch', logo: 'pytorch.svg', color: '#EE4C2C' },
  { id: 'tensorflow', name: 'tensorflow', logo: 'tensorflow.svg', color: '#FF6F00' },
  { id: 'scikitlearn', name: 'scikit-learn', logo: 'scikitlearn.svg', color: '#F7931E' },
  { id: 'xgboost', name: 'xgboost', color: '#1A9FDB' },
  { id: 'pandas', name: 'pandas', logo: 'pandas.svg', color: '#E70488' },
  { id: 'numpy', name: 'numpy', logo: 'numpy.svg', color: '#4DABCF' },
  { id: 'jupyter', name: 'jupyter', logo: 'jupyter.svg', color: '#F37626' },
  { id: 'colab', name: 'colab', logo: 'googlecolab.svg', color: '#F9AB00' },
  { id: 'spacy', name: 'spacy', logo: 'spacy.svg', color: '#09A3D5' },

  // Remote sensing / GIS
  { id: 'gee', name: 'earth engine', logo: 'googleearthengine.svg', color: '#4285F4' },
  { id: 'qgis', name: 'qgis', logo: 'qgis.svg', color: '#589632' },
  { id: 'postgis', name: 'postgis', logo: 'postgresql.svg', color: '#4169E1' },
  { id: 'leaflet', name: 'leaflet', logo: 'leaflet.svg', color: '#199900' },
  { id: 'mapbox', name: 'mapbox', logo: 'mapbox.svg', color: '#4264FB' },

  // Software engineering
  { id: 'typescript', name: 'typescript', logo: 'typescript.svg', color: 'blue' },
  { id: 'nodejs', name: 'nodejs', logo: 'nodejs.svg', color: 'green' },
  { id: 'nestjs', name: 'nestjs', logo: 'nestjs.svg', color: '#E0234E' },
  { id: 'expressjs', name: 'expressjs', logo: 'expressjs.png', color: 'gray' },
  { id: 'go', name: 'go', logo: 'go.png', color: 'royalblue' },
  { id: 'django', name: 'django', logo: 'django.svg', color: '#44B78B' },
  { id: 'springboot', name: 'springboot', logo: 'springboot.svg', color: 'green' },
  { id: 'php', name: 'php', logo: 'php.png', color: '#ad7df7' },
  { id: 'dotnet', name: 'dotnet', logo: 'dotnet.png', color: '#9900F0' },
  { id: 'vuejs', name: 'vuejs', logo: 'vuejs.svg', color: 'teal' },
  { id: 'nuxtjs', name: 'nuxtjs', logo: 'nuxtjs.svg', color: 'teal' },
  { id: 'reactjs', name: 'reactjs', logo: 'reactjs.svg', color: 'royalblue' },
  { id: 'flutter', name: 'flutter', logo: 'flutter.svg', color: 'royalblue' },
  { id: 'docker', name: 'docker', logo: 'docker.svg', color: 'royalblue' },
  { id: 'git', name: 'git', logo: 'git.png', color: 'orange' },
] as { id: string, name: string, logo?: string, color: string }[]
