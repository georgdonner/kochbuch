const FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;
const stateStr = window.sessionStorage.getItem('state');
const oldState = stateStr ? JSON.parse(stateStr) : {};
const defaultState = {
  pagesFetched: 0,
  fetching: false,
  total: null,
  search: null,
};
let state = Object.assign(defaultState, oldState);

const setState = (obj) => {
  state = Object.assign(state, obj);
  window.sessionStorage.setItem('state', JSON.stringify(state));
};

const fetchRecipes = () => {
  let url = `./api/recipes?condensed=true&limit=${FETCH_AMOUNT}&page=${state.pagesFetched + 1}`;
  if (state.search) {
    url += `&search=${encodeURIComponent(state.search.replace(/,\s+/, ','))}`;
  }
  return fetch(url)
    .then(res => res.json())
    .then((body) => {
      if (body.authenticated) {
        document.querySelector('#searchbar input').value = '';
        setState(defaultState);
        window.sessionStorage.clear();
        throw new Error('auth-only');
      } else {
        setState({ total: body.total });
        return body.recipes;
      }
    });
};

const createRecipeCard = (recipe) => {
  const card = document.createElement('a');
  card.className = 'recipe-card';
  card.id = recipe._id;
  card.href = `/recipe/${recipe._id}`;
  const imgUrl = recipe.heroImage ? recipe.heroImage.replace('w:2000', 'w:600') : 'img/comingsoon.jpg';
  let title = `<h2>${recipe.title}</h2>`;
  const vegetarian = recipe.categories.includes('Vegetarisch');
  const vegan = recipe.categories.includes('Vegan');
  if (vegetarian || vegan) {
    title = `<h2><span class="${vegan ? 'vegan' : 'vegetarian'}">${recipe.title}</span></h2>`;
  }
  const content = `
    <img src="${imgUrl}" />
    ${title}
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

const updateSessionStorage = (recipes) => {
  let saved = [];
  const savedStr = window.sessionStorage.getItem('recipes');
  if (savedStr) {
    saved = JSON.parse(savedStr);
  }
  window.sessionStorage.setItem('recipes', JSON.stringify(saved.concat(recipes)));
};

const renderRecipes = (recipes) => {
  const listNode = document.getElementById('recipe-list');
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    listNode.appendChild(card);
  });
};

const fetchAndRenderRecipes = () => {
  const listNode = document.getElementById('recipe-list');
  setState({ fetching: true });
  fetchRecipes()
    .then((recipes) => {
      setState({ pagesFetched: state.pagesFetched + 1, fetching: false });
      if (recipes.length > 0) {
        updateSessionStorage(recipes);
        renderRecipes(recipes);
      } else {
        listNode.innerText = `Keine Ergebnisse für ${state.search} gefunden.`;
      }
    })
    .catch((error) => {
      if (error.message === 'auth-only') {
        window.location.reload(true);
      } else {
        console.error(error);
        if (state.pagesFetched === 0) {
          listNode.innerText = 'Konnte Rezepte nicht laden.';
        }
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
  const recipesStr = window.sessionStorage.getItem('recipes');
  if (recipesStr) {
    renderRecipes(JSON.parse(recipesStr));
  } else {
    fetchAndRenderRecipes();
  }
  const searchbar = document.querySelector('#searchbar input');
  searchbar.addEventListener('keypress', ({ key, target }) => {
    if (key === 'Enter') {
      setState({ pagesFetched: 0, search: target.value });
      window.sessionStorage.removeItem('recipes');
      const listNode = document.getElementById('recipe-list');
      listNode.innerHTML = '';
      fetchAndRenderRecipes();
    }
  });
  window.addEventListener('scroll', onScroll);
};

init();
