/* eslint-disable quote-props, object-property-newline */
const SEARCH_MAP = {
  'nudeln': 'pasta',
  'möhre': 'karotte', 'möhren': 'karotten',
  'lauchzwiebel': 'frühlingszwiebel', 'lauchzwiebeln': 'frühlingszwiebeln',
  'stangensellerie': 'staudensellerie',
};
/* eslint-enable quote-props, object-property-newline  */

const searchScore = (recipe, terms, regexTerms) => {
  const getScore = (str, term, regex) => {
    const matches = regex.exec(str);
    return matches ? (1 / (Math.abs(matches[0].length - term.length) + 1)) : 0;
  };
  const toSearch = [
    recipe.title,
    recipe.ingredients.map(({ name }) => name).join(' '),
    recipe.categories.join(' '),
  ];
  let totalScore = 0;
  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i];
    const regex = regexTerms[i];
    const scores = toSearch.map((str) => getScore(str, term, regex));
    const bestScore = scores.reduce((a, b) => Math.max(a, b));
    if (bestScore <= 0) {
      return 0;
    }
    totalScore += bestScore;
  }
  return totalScore;
};

export default (recipes, query) => {
  recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let searchQuery = query;
  const diet = window.localStorage.getItem('diet');
  const ignoreDiet = query.endsWith('!');
  if (ignoreDiet) query.replace(/!$/, '');
  if (diet && !ignoreDiet) {
    searchQuery = query ? `${query}, ${diet}` : diet;
  }
  if (!searchQuery) {
    return recipes;
  }
  const terms = searchQuery.split(/,\s*/)
    .map((term) => term.toLowerCase().trim())
    .map((term) => SEARCH_MAP[term] || term);
  const regexTerms = terms.map((term) => new RegExp(`\\S*${term}\\S*`, 'i'));
  const regexTermsShort = terms.map((term) => new RegExp(`\\S*${term.slice(0, -1)}\\S*`, 'i'));
  const matches = recipes
    .map((recipe) => ({ recipe, score: searchScore(recipe, terms, regexTerms) }))
    .filter(({ score }) => score > 0);
  matches.sort((a, b) => b.score - a.score);
  const matchesShort = recipes
    .map((recipe) => ({ recipe, score: searchScore(recipe, terms, regexTermsShort) }))
    .filter(({ score }) => score > 0);
  matchesShort.sort((a, b) => b.score - a.score);
  const allMatches = matches.concat(
    matchesShort.filter(({ recipe }) => !matches.find((match) => recipe._id === match.recipe._id)),
  );
  return allMatches.map(({ recipe }) => recipe);
};
