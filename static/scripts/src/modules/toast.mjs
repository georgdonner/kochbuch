export const showToast = (msg, { duration = 3000, button } = {}) => {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<span>${msg}</span>`;
  toast.classList.add('visible');
  if (button) {
    const buttonEl = document.createElement('button');
    buttonEl.innerText = button.text;
    buttonEl.addEventListener('click', (event) => {
      button.onClick(event, toast);
    });
    toast.appendChild(buttonEl);
  }
  const added = Date.now();
  toast.dataset.added = added;
  setTimeout(() => {
    if (+toast.dataset.added === added) {
      toast.classList.remove('visible');
    }
  }, duration);
};
