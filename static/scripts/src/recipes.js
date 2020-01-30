import addMenuButtons from './modules/nav-menu.mjs';
import { syncDatabase, getRecipes } from './modules/recipes-db.mjs';
import { showToast } from './modules/toast.mjs';

addMenuButtons([
  {
    icon: 'settings',
    link: '/settings',
  },
]);

const FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;

const stateStr = window.sessionStorage.getItem('state');
const oldState = stateStr ? JSON.parse(stateStr) : {};
const defaultState = {
  page: 1,
  search: '',
};
let state = Object.assign(defaultState, oldState);
window.sessionStorage.setItem('state', JSON.stringify(state));
let currentRecipes;

const setState = (obj) => {
  state = Object.assign(state, obj);
  window.sessionStorage.setItem('state', JSON.stringify(state));
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
  const categories = recipe.categories.filter((ctg) => ctg !== 'Vegetarisch' && ctg !== 'Vegan');
  if (categories.length > 0) {
    const footer = document.createElement('footer');
    footer.innerHTML = categories.map((ctg) => `<span>${ctg}</span>`).join('\n');
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

const getPage = (page) => {
  const start = (page - 1) * FETCH_AMOUNT;
  return currentRecipes.slice(start, start + FETCH_AMOUNT);
};

const renderRecipes = (recipes) => {
  const listNode = document.getElementById('recipe-list');
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    listNode.appendChild(card);
  });
};

const onScroll = () => {
  if (currentRecipes) {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
    const hasNext = currentRecipes.length > FETCH_AMOUNT * state.page;
    if (hasNext && nearBottom) {
      setState({ page: state.page + 1 });
      renderRecipes(getPage(state.page));
      updateSessionStorage(getPage(state.page));
    }
  }
};

const submitSearch = async (input) => {
  if (input.value.toLowerCase() === 'login') {
    window.location.assign('/login');
  } else {
    setState({ page: 1, search: input.value });
    window.sessionStorage.removeItem('recipes');
    const listNode = document.getElementById('recipe-list');
    listNode.innerHTML = '';
    currentRecipes = await getRecipes(state.search);
    window.sessionStorage.removeItem('recipes');
    updateSessionStorage(getPage(state.page));

    input.blur();
    if (currentRecipes.length > 0) {
      renderRecipes(getPage(state.page));
    } else {
      listNode.innerText = `Keine Ergebnisse für ${state.search} gefunden.`;
    }
  }
};

const init = async () => {
  const searchbar = document.querySelector('#searchbar input');
  searchbar.value = state.search;

  const recipesStr = window.sessionStorage.getItem('recipes');
  let rendered = false;
  if (recipesStr) {
    renderRecipes(JSON.parse(recipesStr));
    rendered = true;
  }

  const staleData = (Date.now() - window.localStorage.getItem('lastUpdated')) > 1000 * 60 * 30; // 30 min
  if (staleData) {
    const loader = document.getElementById('loader');
    try {
      if (!rendered) loader.classList.add('active');
      const synced = await syncDatabase(5000);
      if (!synced) {
        showToast('Konnte Rezepte nicht aktualisieren.', { isError: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (!rendered) loader.classList.remove('active');
    }
  }
  currentRecipes = await getRecipes(state.search);
  if (!rendered) {
    updateSessionStorage(getPage(state.page));
    renderRecipes(currentRecipes.slice(0, FETCH_AMOUNT * state.page));
  }

  let timeoutId = null;
  searchbar.addEventListener('keydown', ({ key, target }) => {
    clearTimeout(timeoutId);
    if (key === 'Enter') {
      submitSearch(target);
    } else {
      timeoutId = setTimeout(() => {
        submitSearch(target);
      }, 5000);
    }
  });
  searchbar.addEventListener('blur', ({ target }) => {
    clearTimeout(timeoutId);
    if (target.value !== state.search) {
      submitSearch(target);
    }
  });
  window.addEventListener('scroll', onScroll);
};

init();
