import { getData, putData, patchData } from './api';
import { openModal, closeModal } from './modal';

export const cartFunc = () => {
  const container = document.getElementById('cart-container');
  const cartModal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeBtns = cartModal.querySelectorAll('.close-btn');
  const totlalPrice = document.getElementById('cart-totlal-price');

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
                <h4 class="me-3 d-flex align-itemns-center">${item.price} ₽</h4>
                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                    id="control-dec" data-id="${item.id}" data-count="${item.count}">
                                    -
                </button>
                <h6 class="cart-item-count me-3 ms-3">${item.count}</h6>
                <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                    id="control-inc" data-id="${item.id}" data-count="${item.count}">
                                    +
                </button>
            </div>
        </div>
        `
      );
    });
  };

  const updateCart = () => {
    getData('/cart')
      .then((data) => {
        render(data);
        updateTotalCart(data);
      })
      .catch((error) => {
        console.error('Произоша ошибка');
      });
  };

  const updateTotalCart = (data) => {
    let totlal = 0;

    data.forEach((item) => {
      totlal += Number(item.price) * Number(item.count);
    });

    totlalPrice.textContent = totlal + ' ₽';
  };

  openCartBtn.addEventListener('click', () => {
    updateCart();
    openModal(cartModal);
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(cartModal);
    });
  });

  container.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
      if (e.target.id && e.target.id === 'control-inc') {
        const id = e.target.dataset.id;
        const count = Number(e.target.dataset.count);

        const item = {
          count: count + 1,
        };

        patchData(`/cart/${id}`, item).then(() => {
          updateCart();
        });
      } else if (e.target.id && e.target.id === 'control-dec') {
        const count = Number(e.target.dataset.count);
        const id = e.target.dataset.id;

        if (count > 0) {
          const item = {
            count: count - 1,
          };
          patchData(`/cart/${id}`, item).then(() => {
            updateCart();
          });
        }
      }
    }
  });
};
