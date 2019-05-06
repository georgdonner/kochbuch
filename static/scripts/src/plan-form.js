const recipeSearch = document.getElementById('recipe');
let selectedRecipe = null;

const createChangeButton = () => {
  const change = document.createElement('button');
  change.innerText = 'Rezept ändern';
  change.className = 'inverted';
  change.style.marginTop = '1rem';
  change.addEventListener('click', (e) => {
    selectedRecipe = null;
    e.target.remove();
    recipeSearch.value = '';
    recipeSearch.disabled = false;
    recipeSearch.focus();
  });
  return change;
};

const selectRecipe = (recipe) => {
  const results = document.getElementById('search-results');
  if (results) results.remove();
  selectedRecipe = recipe;
  recipeSearch.value = recipe.title;
  recipeSearch.disabled = true;
  recipeSearch.parentNode.appendChild(createChangeButton());
};

const renderResult = (recipe) => {
  const result = document.createElement('div');
  result.innerText = recipe.title;
  result.addEventListener('click', () => selectRecipe(recipe));
  return result;
};

const displaySearchResults = (recipes) => {
  const results = document.createElement('div');
  results.id = 'search-results';
  recipes.forEach((recipe) => {
    results.appendChild(renderResult(recipe));
  });
  document.getElementById('recipe-search').appendChild(results);
};

const getEntry = () => {
  const date = new Date(document.getElementById('date').value);
  date.setHours(12);
  const entry = {
    date,
    time: document.getElementById('time').value,
    servings: +document.getElementById('servings').value,
    custom: document.getElementById('custom').value,
  };
  if (selectedRecipe) {
    entry.recipe = {
      id: selectedRecipe._id,
      title: selectedRecipe.title,
    };
  }
  const id = (new URL(document.location)).searchParams.get('id');
  if (id) {
    entry._id = id;
  }
  return entry;
};

const saveEntry = () => {
  const entry = getEntry();
  let url = '/api/plan';
  const isNew = window.location.pathname.split('/')[2] === 'new';
  if (!isNew) {
    url += `/${entry._id}`;
  }
  fetch(url, {
    method: isNew ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  }).then(() => {
    window.location.replace(document.referrer);
  });
};

const deleteEntry = () => {
  const entry = getEntry();
  const url = `/api/plan/${entry._id}`;
  fetch(url, { method: 'DELETE' }).then(() => {
    window.location.replace(document.referrer);
  });
};

const init = () => {
  if (recipeSearch.value) {
    selectedRecipe = {
      _id: recipeSearch.dataset.recipe,
      title: recipeSearch.value,
    };
    recipeSearch.parentNode.appendChild(createChangeButton());
  }
  recipeSearch.addEventListener('keydown', ({ key, target }) => {
    if (key === 'Enter') {
      const results = document.getElementById('search-results');
      if (results) results.remove();
      fetch(`/api/recipes/?condensed=true&limit=15&search=${target.value}`)
        .then(res => res.json())
        .then((body) => {
          displaySearchResults(body.recipes);
        });
    }
  });
  document.getElementById('save').addEventListener('click', saveEntry);
  const deleteButton = document.getElementById('delete');
  if (deleteButton) {
    deleteButton.addEventListener('click', deleteEntry);
  }
};

init();
