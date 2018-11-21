const FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;
const state = {
  pagesFetched: 0,
  fetching: false,
  total: null,
  search: null,
};

const fetchRecipes = () => {
  let url = `./api/recipes?condensed=true&limit=${FETCH_AMOUNT}&page=${state.pagesFetched + 1}`;
  if (state.search) {
    url += `&search=${encodeURIComponent(state.search.replace(/,\s+/, ','))}`;
  }
  return fetch(url)
    .then(res => res.json())
    .then((body) => {
      state.total = body.total;
      return body.recipes;
    });
};

const createRecipeCard = (recipe) => {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  card.id = recipe._id;
  const imgUrl = recipe.heroImage ? recipe.heroImage.replace('w:2000', 'w:600') : 'img/comingsoon.jpg';
  const content = `
    <img src="${imgUrl}" />
    <h2>${recipe.title}</h2>
  `;
  card.innerHTML = content;
  // filter out vegan/vegeterian categories and check if footer is needed
  const categories = recipe.categories.filter(ctg => ctg !== 'Vegetarisch' && ctg !== 'Vegan');
  if (categories.length > 0) {
    const footer = document.createElement('footer');
    footer.innerHTML = categories.map(ctg => `<span>${ctg}</span>`).join('\n');
    card.appendChild(footer);
  }
  return card;
};

const fetchAndRenderRecipes = () => {
  const listNode = document.getElementById('recipe-list');
  state.fetching = true;
  fetchRecipes()
    .then((recipes) => {
      state.pagesFetched += 1;
      state.fetching = false;
      if (recipes.length > 0) {
        recipes.forEach((recipe) => {
          const card = createRecipeCard(recipe);
          listNode.appendChild(card);
        });
      } else {
        listNode.innerText = `Keine Ergebnisse für ${state.search} gefunden.`;
      }
    })
    .catch((error) => {
      console.error(error);
      if (state.pagesFetched === 0) {
        listNode.innerText = 'Konnte Rezepte nicht laden.';
      }
    });
};

const onScroll = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
  const hasNext = state.total > FETCH_AMOUNT * state.pagesFetched;
  if (hasNext && !state.fetching && nearBottom) {
    fetchAndRenderRecipes();
  }
};

const init = () => {
  fetchAndRenderRecipes();
  const searchbar = document.querySelector('#searchbar input');
  searchbar.addEventListener('keypress', ({ key, target }) => {
    if (key === 'Enter') {
      state.pagesFetched = 0;
      state.search = target.value;
      const listNode = document.getElementById('recipe-list');
      listNode.innerHTML = '';
      fetchAndRenderRecipes();
    }
  });
  window.addEventListener('scroll', onScroll);
};

init();
