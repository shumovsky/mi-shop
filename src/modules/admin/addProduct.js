import { postData, getData, deleteData } from '../api';

export const addProduct = () => {
  const nameImp = document.getElementById('product-name');
  const previewImp = document.getElementById('product-image');
  const titleImp = document.getElementById('product-title');
  const priceImp = document.getElementById('product-price');
  const saveBtn = document.getElementById('product-add-btn');
  const container = document.getElementById('product-table');
  const select = document.getElementById('product-category');

  const productData = {
    title: '',
    price: 0,
    name: '',
    preview: '',
    category: 0,
  };

  const render = (data) => {
    container.innerHTML = '';
    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        ` <tr>
              <th scope="row">${index + 1}</th>
              <td>${item.title}</td>
              <td>${item.name}</td>
              <td>${item.price} ₽</td>
              <td class="text-end">
              <button type="button" class="btn btn-outline-danger btn-sm" data-product="${
                item.id
              }">
                удалить
              </button>
              </td>
          </tr>`
      );
    });
  };

  const checkValues = () => {
    if (
      nameImp.value === '' ||
      previewImp.value === '' ||
      titleImp.value === '' ||
      Number(priceImp.value) === 0 ||
      select.value === 'default'
    ) {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  };

  const updateTable = () => {
    getData('/products').then((data) => {
      render(data);
    });
  };

  select.addEventListener('change', () => {
    productData.category = select.value;

    const url =
      select.value !== 'default'
        ? `/products?category=${select.value}`
        : '/products';

    getData(url).then((data) => {
      render(data);
    });
    checkValues();
  });

  nameImp.addEventListener('input', () => {
    productData.name = nameImp.value;
    checkValues();
  });

  titleImp.addEventListener('input', () => {
    productData.title = titleImp.value;
    checkValues();
  });

  priceImp.addEventListener('input', () => {
    productData.price = Number(priceImp.value);
    checkValues();
  });

  previewImp.addEventListener('input', () => {
    const file = previewImp.files[0];

    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg'
    ) {
      const reader = new FileReader();

      reader.onload = () => {
        productData.preview = reader.result;
      };

      reader.onerror = () => {
        productData.preview = '';
        previewImp.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      previewImp.value = '';
    }
    checkValues();
  });

  saveBtn.addEventListener('click', () => {
    postData('/products', productData).then(() => {
      nameImp.value = '';
      previewImp.value = '';
      priceImp.value = '';
      titleImp.value = '';
      updateTable();
    });
  });

  container.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const id = event.target.dataset.product;

      deleteData(`/products/${id}`).then((data) => {
        updateTable();
      });
    }
  });

  updateTable();

  checkValues();
};
