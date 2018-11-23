let uploadedImgSrc = null;

const updateImg = () => {
  const currentImg = document.querySelector('.recipe-img');
  if (currentImg) {
    currentImg.remove();
  }
  const newImg = document.createElement('img');
  newImg.className = 'recipe-img';
  newImg.src = uploadedImgSrc;
  document.querySelector('.container').prepend(newImg);
};

const showImgPicker = () => {
  // eslint-disable-next-line no-undef
  const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
  client.picker({
    accept: ['image/*'],
    maxFiles: 1,
    maxSize: 10485760,
    onUploadDone: (res) => {
      if (res.filesUploaded.length > 0) {
        const { handle } = res.filesUploaded[0];
        uploadedImgSrc = `https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/${handle}`;
        updateImg();
      }
    },
  }).open();
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
    recipe.heroImage = uploadedImgSrc;
  }
  return recipe;
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
      window.sessionStorage.removeItem('recipes');
      window.sessionStorage.removeItem('state');
      window.location = `/recipe/${saved._id}`;
    });
};

const init = () => {
  // show image picker on button click
  const newImgButton = document.getElementById('new-image');
  newImgButton.addEventListener('click', showImgPicker);
  // add new ingredient on enter
  document.querySelectorAll('#new-ingredient input')
    .forEach((input) => {
      input.addEventListener('keypress', ({ key }) => {
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
  ctgInput.addEventListener('keypress', ({ key, target }) => {
    if (key === 'Enter') {
      addCategory(target.value);
      // eslint-disable-next-line no-param-reassign
      target.value = '';
    }
  });
  // remove category on button click
  document.querySelectorAll('#categories .remove')
    .forEach((button) => {
      button.addEventListener('click', ({ target }) => {
        target.parentNode.remove();
      });
    });
  // save recipe on button click
  document.getElementById('save').addEventListener('click', saveRecipe);
};

init();
