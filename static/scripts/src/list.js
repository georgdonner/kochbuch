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
      <span class="item">${item}</span>
      <input type="checkbox" />
      <span class="checkmark box"></span>
    </label>
  `;
  const list = document.querySelector('.list');
  list.appendChild(wrapper);
  wrapper.querySelector('.checkmark').addEventListener('click', removeItem);
};

const init = () => {
  const input = document.querySelector('#new-item input');
  if (input) {
    input.addEventListener('keypress', ({ key, target }) => {
      if (key === 'Enter') {
        const list = getList().concat([target.value]);
        updateList(list).then(() => {
          addItem(target.value);
          input.value = '';
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
};

init();
