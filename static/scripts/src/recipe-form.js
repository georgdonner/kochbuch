let uploadedImgSrc = null;
// eslint-disable-next-line no-undef
const widget = uploadcare.SingleWidget('[role=uploadcare-uploader]');

const updateImg = (newSrc) => {
  uploadedImgSrc = newSrc;
  const currentImg = document.querySelector('.recipe-img');
  if (currentImg) {
    currentImg.remove();
  }
  const imgWidth = document.querySelector('.container').clientWidth;
  const newImg = document.createElement('img');
  newImg.className = 'recipe-img';
  newImg.src = `${newSrc}-/resize/${imgWidth}x/`;
  document.querySelector('.container').prepend(newImg);
};

const addIngredient = () => {
  const name = document.querySelector('#new-ingredient .name').value;
  const hint = document.querySelector('#new-ingredient .hint').value;
  if (name.length > 0) {
    const list = document.getElementById('ingredients');
    const ingredient = document.createElement('div');
    ingredient.className = 'ingredient';
    ingredient.innerHTML = `
      <input type="text" name="name" value="${name}" placeholder="Zutat">
      <input type="text" name="hint" value="${hint}" placeholder="Hinweis">
      <button class="remove">x</button>
    `;
    list.appendChild(ingredient);
  }
  document.querySelector('#new-ingredient .name').value = '';
  document.querySelector('#new-ingredient .hint').value = '';
};

const addCategory = (category) => {
  const disallowed = ['vegetarisch', 'vegan'];
  if (category.length > 0 && !disallowed.includes(category.toLowerCase())) {
    const categories = document.getElementById('categories');
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
      <span class="ctg">${category}</span>
      <button class="remove">x</button>
    `;
    categories.appendChild(categoryDiv);
    categoryDiv.querySelector('.remove').addEventListener('click', () => {
      categoryDiv.remove();
    });
    document.querySelector('#categories-container input').value = '';
    document.getElementById('autocomplete-items').innerHTML = '';
  }
};

const getRecipe = () => {
  const title = document.getElementById('title').value;
  const servings = +document.getElementById('servings').value;
  const duration = +document.getElementById('duration').value;
  const difficulty = +document.querySelector('#difficulty input:checked').value;
  const ingredients = Array.from(document.querySelectorAll('#ingredients .ingredient'))
    .map(node => ({
      name: node.children.name.value,
      hint: node.children.hint.value,
    }));
  const description = document.getElementById('description').value;
  const categories = Array.from(document.querySelectorAll('#categories .ctg'))
    .map(node => node.innerText);
  document.querySelectorAll('#veggie-options input')
    .forEach((node) => {
      if (node.checked) {
        categories.push(node.name);
      }
    });
  const recipe = {
    title,
    servings,
    duration,
    difficulty,
    ingredients,
    description,
    categories,
  };
  if (uploadedImgSrc) {
    recipe.image = uploadedImgSrc;
  }
  return recipe;
};

const promptLeave = (e) => {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = '';
};

const saveRecipe = () => {
  const recipe = getRecipe();
  let url = '/api/recipe';
  const { pathname } = window.location;
  const recipeId = pathname.includes('edit') ? pathname.split('/')[2] : null;
  if (recipeId) {
    url += `/${recipeId}`;
  }
  fetch(url, {
    method: recipeId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(recipe),
  })
    .then(res => res.json())
    .then((saved) => {
      window.removeEventListener('beforeunload', promptLeave);
      window.sessionStorage.removeItem('recipes');
      window.sessionStorage.removeItem('state');
      window.location.replace(`/recipe/${saved._id}`);
    });
};

const fetchCategories = () => (
  fetch('/api/recipes/categories')
    .then(res => res.json())
);

const renderAutocomplete = (searchValue, categories) => {
  const autocompleteItems = document.getElementById('autocomplete-items');
  autocompleteItems.innerHTML = '';
  if (searchValue) {
    const filtered = categories.filter(
      ctg => ctg.toLowerCase().startsWith(searchValue.toLowerCase()),
    );
    filtered.forEach((ctg) => {
      const item = document.createElement('div');
      item.innerText = ctg;
      item.addEventListener('click', () => addCategory(ctg));
      autocompleteItems.appendChild(item);
    });
  }
};

const init = () => {
  // update image on widget change
  widget.onChange((file) => {
    file.done((info) => {
      updateImg(info.originalUrl);
    });
  });
  const imgInput = document.getElementsByName('recipe_image')[0];
  imgInput.addEventListener('change', updateImg);
  // add new ingredient on enter
  document.querySelectorAll('#new-ingredient input')
    .forEach((input) => {
      input.addEventListener('keydown', ({ key }) => {
        if (key === 'Enter') {
          addIngredient();
        }
      });
    });
  // remove ingredient on button click
  document.querySelectorAll('.ingredient .remove')
    .forEach((button) => {
      button.addEventListener('click', ({ target }) => {
        target.parentNode.remove();
      });
    });
  // auto-scale textarea
  const textarea = document.getElementById('description');
  textarea.setAttribute('style', `height:${textarea.scrollHeight}px;overflow-y:hidden;`);
  textarea.addEventListener('input', function onInput() {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
  }, false);
  // add category on enter
  const ctgInput = document.querySelector('#categories-container input');
  ctgInput.addEventListener('keydown', ({ key, target }) => {
    if (key === 'Enter') {
      addCategory(target.value);
    }
  });
  // remove category on button click
  document.querySelectorAll('#categories .remove')
    .forEach((button) => {
      button.addEventListener('click', ({ target }) => {
        target.parentNode.remove();
      });
    });
  // add category autocomplete
  fetchCategories().then((categories) => {
    ctgInput.addEventListener('input', ({ target }) => renderAutocomplete(target.value, categories));
  });
  // save recipe on button click
  document.getElementById('save').addEventListener('click', saveRecipe);
  // prompt the user before leaving the site
  window.addEventListener('beforeunload', promptLeave);
};

init();
