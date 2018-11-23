const uploadedImgSrc = null;

const getRecipe = () => {
  const title = document.getElementById('title').value;
  const servings = +document.getElementById('servings').value;
  const duration = +document.getElementById('duration').value;
  const difficulty = +document.querySelector('#difficulty input:checked').value;
  const ingredients = Array.from(document.querySelectorAll('.ingredient'))
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
