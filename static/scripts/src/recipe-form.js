let uploadedImgSrc = null;

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
      }
    },
  }).open();
};

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

const init = () => {
  const newImgButton = document.getElementById('new-image');
  newImgButton.addEventListener('click', showImgPicker);
};

init();
