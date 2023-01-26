import { getData } from './api';
import { openModal, closeModal } from './modal';

export const cartFunc = () => {
  const container = document.getElementById('cart-container');
  const cartModal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeBtns = cartModal.querySelectorAll('.close-btn');

  const render = (data) => {
    container.innerHTML = '';

    data.forEach((item) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
        <div class="row border-bottom pb-3 pt-3">
            <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4"> 
             ${item.name}
            </div>
            <div 
                class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                <h4 class="me-3 d-flex align-itemns-center">${
                  item.price * item.count
                } ₽</h4>
                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                    id="control-dec">
                                    -
                </button>
                <h6 class="cart-item-count me-3 ms-3">1</h6>
                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                    id="control-inc">
                                    +
                </button>
            </div>
        </div>
        `
      );
    });
  };

  openCartBtn.addEventListener('click', () => {
    getData('/cart')
      .then((data) => {
        render(data);
        openModal(cartModal);
      })
      .catch((error) => {
        console.error('Произоша ошибка');
      });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(cartModal);
    });
  });
};
