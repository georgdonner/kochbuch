// item that is currently edited
let currentlyEditing = null;

const getListCode = () => {
  const list = document.querySelector('.list');
  return list.dataset.code;
};

const getList = () => (
  Array.from(document.querySelectorAll('.item'))
    .map(node => node.innerText)
);

const updateList = list => (
  fetch(`/api/list/${getListCode()}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list }),
  })
);

const removeItem = ({ target }) => {
  target.parentNode.parentNode.remove();
  updateList(getList());
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
  wrapper.querySelector('.checkmark').addEventListener('click', removeItem);
  const editButton = wrapper.querySelector('.item button');
  editButton.addEventListener('click', () => {
    currentlyEditing = editButton.parentNode.querySelector('span');
    document.querySelector('#new-item input').value = currentlyEditing.innerText;
  });
};

const init = () => {
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
          currentlyEditing = null;
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
      editButton.addEventListener('click', () => {
        currentlyEditing = editButton.parentNode.querySelector('span');
        input.value = currentlyEditing.innerText;
      });
    });
};

init();
