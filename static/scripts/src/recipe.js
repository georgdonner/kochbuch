import { showToast } from './modules/toast.mjs';
import calcServings from './modules/calc-servings.mjs';
import addMenuButtons from './modules/nav-menu.mjs';

// eslint-disable-next-line no-undef
const noSleep = new NoSleep();

addMenuButtons([
  {
    icon: 'keep_awake',
    onClick: (button) => {
      if (button.classList.contains('active')) {
        noSleep.disable();
        showToast('Kochmodus deaktiviert - Display kann sich wieder automatisch ausschalten');
      } else {
        noSleep.enable();
        showToast('Kochmodus aktiviert - Display schaltet sich nicht automatisch aus');
      }
    },
    hasActiveState: true,
  },
]);

/* eslint-disable no-use-before-define */
const getCurrentServings = () => Number(document.getElementById('servings').innerText);

const ORIG_SERVINGS = Number(document.getElementById('servings').dataset.original);

const updateServings = (change = 0) => {
  const newServings = getCurrentServings() + change;
  if (newServings > 0) {
    document.getElementById('servings').innerText = newServings;
    const addToPlanLink = document.getElementById('add-to-plan');
    if (addToPlanLink) {
      addToPlanLink.href = addToPlanLink.href.replace(/servings=\d+/, `servings=${newServings}`);
    }
    updateIngredients(newServings);
  }
};

const updateIngredients = (newServings) => {
  const ingrNodes = document.querySelectorAll('#ingredients .name');
  ingrNodes.forEach((node) => {
    const newText = calcServings(node.dataset.name, ORIG_SERVINGS, newServings);
    // eslint-disable-next-line no-param-reassign
    node.innerText = newText;
  });
};

const addToList = (item) => {
  fetch('/api/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  }).then((res) => {
    if (res.ok) {
      showToast(`${item} zur Einkaufsliste hinzugefügt`);
    }
  });
};

const addCartListeners = () => {
  const longClick = 1000; // ms
  const addToCartButtons = document.querySelectorAll('button.cart');
  if (addToCartButtons) {
    const ingredientsLis = document.querySelectorAll('#ingredients .content');
    ingredientsLis.forEach((ingredientLi) => {
      let start;
      ingredientLi.addEventListener('mousedown', () => {
        start = Date.now();
      });
      ingredientLi.addEventListener('mouseup', () => {
        if (Date.now() - start > longClick) {
          const item = ingredientLi.innerText.trim();
          addToList(item);
        }
      });
    });
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.parentNode.innerText.trim();
        addToList(item);
      });
    });
  }
};

const back = () => {
  if (document.referrer === `${window.location.origin}/`) {
    window.history.back();
  } else {
    window.location.assign('/');
  }
};

const init = () => {
  if (getCurrentServings() !== ORIG_SERVINGS) {
    updateServings();
  }
  const backButton = document.getElementById('back');
  backButton.addEventListener('click', back);
  const downButton = document.querySelector('.servings-control .down');
  const upButton = document.querySelector('.servings-control .up');
  downButton.addEventListener('click', () => updateServings(-1));
  upButton.addEventListener('click', () => updateServings(1));
  addCartListeners();
  const cookingModeButton = document.getElementById('cooking-mode');
  if (cookingModeButton) {
    const preventSleep = () => {
      // eslint-disable-next-line no-undef
      new NoSleep().enable();
      cookingModeButton.remove();
      showToast('Kochmodus aktiviert!');
    };
    cookingModeButton.addEventListener('click', preventSleep, false);
  }
};

init();
