const FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;
let pagesFetched = 0;

const fetchRecipes = () => {
  const url = `./api/recipes?condensed=true&limit=${FETCH_AMOUNT}&page=${pagesFetched + 1}`;
  return fetch(url)
    .then(res => res.json());
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


const init = () => {
  const listNode = document.getElementById('recipe-list');
  fetchRecipes()
    .then((recipes) => {
      pagesFetched += 1;
      recipes.forEach((recipe) => {
        const card = createRecipeCard(recipe);
        listNode.appendChild(card);
      });
    })
    .catch((error) => {
      console.error(error);
      pagesFetched = 0;
      listNode.innerText = 'Konnte Rezepte nicht laden.';
    });
};

init();
