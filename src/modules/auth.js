import { openModal, closeModal } from './modal';
import { getData } from './api';

export const authFunc = () => {
  const authBtn = document.querySelector('#open-auth-btn');
  const openCartBtn = document.querySelector('#open-cart-btn');
  const logoutBtn = document.querySelector('#logout-btn');
  const loginBtn = document.querySelector('.login-btn');
  const modal = document.querySelector('#auth-modal');
  const closeBtn = document.querySelectorAll('.close-btn');

  const login = () => {
    authBtn.classList.add('d-none');
    openCartBtn.classList.remove('d-none');
    logoutBtn.classList.remove('d-none');
    closeModal(modal);
  };

  const logout = () => {
    authBtn.classList.remove('d-none');
    openCartBtn.classList.add('d-none');
    logoutBtn.classList.add('d-none');
  };

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('auth'));

    if (user) {
      getData('/profile').then((data) => {
        if (
          data.login &&
          data.login === user.login &&
          data.password &&
          data.password === user.password
        ) {
          login();
        }
      });
    }
  };

  authBtn.addEventListener('click', () => openModal(modal));

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(modal);
    });
  });

  loginBtn.addEventListener('click', () => {
    const loginInput = modal.querySelector('#login-control');
    const passwordInput = modal.querySelector('#password-control');

    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    };

    getData('/profile').then((data) => {
      if (
        data.login &&
        data.login === user.login &&
        data.password &&
        data.password === user.password
      ) {
        localStorage.setItem('auth', JSON.stringify(data));
        login();
      }
    });
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('auth');

    logout();
  });

  checkAuth();
};
