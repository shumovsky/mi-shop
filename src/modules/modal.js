export const openModal = (modal) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class='modal-backdrop fade'></div>`
  );

  modal.classList.add('d-block');

  setTimeout(() => {
    const layout = document.querySelector('.modal-backdrop');
    modal.classList.add('show');
    layout.classList.add('show');
  }, 100);
};

export const closeModal = (modal) => {
  const layout = document.querySelector('.modal-backdrop');

  modal.classList.remove('show');
  layout && layout.classList.remove('show');

  setTimeout(() => {
    modal.classList.remove('d-block');
    layout && layout.remove();
  }, 500);
};
