const FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;
const stateStr = window.sessionStorage.getItem('state');
const oldState = stateStr ? JSON.parse(stateStr) : {};
const defaultState = {
  pagesFetched: 0,
  fetching: false,
  total: null,
  search: '',
};
let state = Object.assign(defaultState, oldState);

const setState = (obj) => {
  state = Object.assign(state, obj);
  window.sessionStorage.setItem('state', JSON.stringify(state));
};

const fetchRecipes = () => {
  let url = `/api/recipes?condensed=true&limit=${FETCH_AMOUNT}&page=${state.pagesFetched + 1}`;
  if (state.search) {
    url += `&search=${encodeURIComponent(state.search.replace(/,\s+/, ','))}`;
  }
  return fetch(url)
    .then(res => res.json())
    .then((body) => {
      if (
        window.navigator.serviceWorker
        && window.navigator.serviceWorker.controller
        && body.lastUpdated
      ) {
        const lastUpdated = window.localStorage.getItem('lastUpdated');
        // update if no recipes were stored yet or have the same "age"
        const shouldUpdate = !lastUpdated || (body.lastUpdated > +lastUpdated);
        if (shouldUpdate) {
          window.localStorage.setItem('lastUpdated', body.lastUpdated);
        }
        window.navigator.serviceWorker.controller.postMessage({ ...body, shouldUpdate });
      }
      setState({ total: body.total });
      return body.recipes;
    });
};

const createRecipeCard = (recipe) => {
  const card = document.createElement('a');
  card.className = 'recipe-card';
  card.id = recipe._id;
  card.href = `/recipe/${recipe._id}`;
  const imgUrl = (width, doubleRes = false) => (
    recipe.image.concat(`-/resize/${width}x/`, `-/quality/${doubleRes ? 'lightest' : 'lighter'}/`, '-/progressive/yes/')
  );
  const responsiveImg = () => `
    <img
      srcset="${imgUrl(1200, true)} 1200w,
        ${imgUrl(800, true)} 800w,
        ${imgUrl(600)} 600w,
        ${imgUrl(400)} 400w"
      sizes="(min-width: 1200px) 400px,
        (min-width: 600px) 33.3vw,
        100vw"
      src="${imgUrl(600)}"
      alt="${recipe.title}"
      crossorigin="anonymous" />
  `;
  const fallbackImg = () => '<img src="img/comingsoon.jpg" alt="Bild kommt bald" />';
  let title = `<h2>${recipe.title}</h2>`;
  const vegetarian = recipe.categories.includes('Vegetarisch');
  const vegan = recipe.categories.includes('Vegan');
  if (vegetarian || vegan) {
    title = `<h2><span class="${vegan ? 'vegan' : 'vegetarian'}">${recipe.title}</span></h2>`;
  }
  const content = `
    ${recipe.image ? responsiveImg() : fallbackImg()}
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
      console.error(error);
      if (state.pagesFetched === 0) {
        listNode.innerText = `Konnte Rezepte nicht laden: ${error.message}`;
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
  searchbar.value = state.search;
  searchbar.addEventListener('keypress', ({ key, target }) => {
    if (key === 'Enter') {
      if (target.value.toLowerCase() === 'login') {
        window.location.assign('/login');
      } else {
        setState({ pagesFetched: 0, search: target.value });
        window.sessionStorage.removeItem('recipes');
        const listNode = document.getElementById('recipe-list');
        listNode.innerHTML = '';
        fetchAndRenderRecipes();
        target.blur();
      }
    }
  });
  window.addEventListener('scroll', onScroll);
};

init();
