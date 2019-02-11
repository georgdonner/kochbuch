import addMenuButtons from './modules/nav-menu.mjs';
import { showToast } from './modules/toast.mjs';

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

// item that is currently edited
let currentlyEditing = null;

const getList = () => (
  Array.from(document.querySelectorAll('.item'))
    .map(node => node.innerText.trim())
);

const updateList = list => (
  fetch('/api/list', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list }),
  })
);

const onEditButtonClick = (button) => {
  currentlyEditing = button.parentNode.querySelector('span');
  const input = document.querySelector('#new-item input');
  input.value = currentlyEditing.innerText;
  input.focus();
};

const addItem = (item) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'item-wrapper';
  wrapper.innerHTML = `
    <label class="input-container">
      <input type="checkbox" />
      <span class="checkmark box"></span>
      <span class="item">
        <span>${item}</span>
        <button><svg class="icon"><use xlink:href="#icon-pencil"></use></svg></button>
      </span>
    </label>
  `;
  const list = document.querySelector('.list');
  list.appendChild(wrapper);
  // eslint-disable-next-line no-use-before-define
  wrapper.querySelector('.checkmark').addEventListener('click', removeItem);
  const editButton = wrapper.querySelector('.item button');
  editButton.addEventListener('click', () => onEditButtonClick(editButton));
};

function removeItem({ target }) {
  target.parentNode.parentNode.remove();
  updateList(getList());
  const item = target.parentNode.innerText;
  showToast(`${item} entfernt.`, {
    duration: 10000,
    button: {
      text: 'Rückgängig',
      onClick: (e, toast) => {
        const list = getList().concat([item]);
        updateList(list).then(() => {
          addItem(item);
          toast.classList.remove('visible');
        });
      },
    },
  });
}

const init = () => {
  const listEl = document.querySelector('.list');
  if (listEl) {
    // eslint-disable-next-line no-undef
    Sortable.create(listEl, {
      delay: 250,
      draggable: '.item-wrapper',
      filter: 'button, .checkmark',
      chosenClass: 'chosen',
      onUpdate: () => {
        updateList(getList());
      },
    });
  }
  const input = document.querySelector('#new-item input');
  if (input) {
    input.addEventListener('keypress', ({ key, target }) => {
      if (key === 'Enter') {
        if (currentlyEditing) {
          currentlyEditing.innerText = target.value;
        }
        const list = currentlyEditing
          ? getList()
          : getList().concat([target.value]);
        updateList(list).then(() => {
          if (!currentlyEditing) {
            addItem(target.value);
          }
          input.value = '';
          if (currentlyEditing) {
            input.blur();
            currentlyEditing = null;
          }
        });
      }
    });
  }
  document.querySelectorAll('.checkmark')
    .forEach((checkbox) => {
      checkbox.addEventListener('click', removeItem);
    });
  document.querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = false;
    });
  document.querySelectorAll('.item button')
    .forEach((editButton) => {
      editButton.addEventListener('click', () => onEditButtonClick(editButton));
    });
};

init();
