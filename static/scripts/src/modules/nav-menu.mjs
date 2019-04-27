const addButton = ({
  icon, onClick, link, hasActiveState = false,
}) => {
  const buttonContainers = document.getElementsByClassName('right-buttons');
  Array.from(buttonContainers).forEach((buttonContainer) => {
    const button = link ? document.createElement('a') : document.createElement('button');
    button.className = 'nav-button';
    button.innerHTML = `
    <svg class="icon icon-${icon}">
      <use xlink:href="#icon-${icon}"></use>
    </svg>
    `;
    if (link) {
      button.href = link;
    } else {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        onClick(button);
        if (hasActiveState) {
          button.classList.toggle('active');
        }
      });
    }
    buttonContainer.appendChild(button);
  });
};

export default (buttons) => {
  buttons.forEach((button) => {
    addButton(button);
  });
};
