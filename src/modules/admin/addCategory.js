import { postData, getData, deleteData } from '../api';

export const addCategory = () => {
  const nameImp = document.getElementById('category-name');
  const previewImp = document.getElementById('category-image');
  const saveBtn = document.getElementById('category-add-btn');
  const container = document.getElementById('category-container');
  const select = document.getElementById('product-category');

  const categoryData = {
    name: '',
    preview: '',
  };

  const render = (data) => {
    container.innerHTML = '';

    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
             <td class="text-end">
            <button type="button" class="btn btn-outline-danger btn-sm" data-category="${
              item.id
            }">
                удалить
            </button>
            </td>
        </tr>
        `
      );
      select.insertAdjacentHTML(
        'beforeend',
        `
        <option value="${item.id}">${item.name}</option>
      `
      );
    });
  };

  const checkValues = () => {
    if (nameImp.value === '' || previewImp.value === '') {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  };

  const updateTable = () => {
    getData('/categories').then((data) => {
      render(data);
    });
  };

  nameImp.addEventListener('input', () => {
    categoryData.name = nameImp.value;
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
        categoryData.preview = reader.result;
      };

      reader.onerror = () => {
        categoryData.preview = '';
        previewImp.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      previewImp.value = '';
    }
    checkValues();
  });

  saveBtn.addEventListener('click', () => {
    postData('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      nameImp.value = '';
      previewImp.value = '';
      updateTable();
    });
  });

  container.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const id = event.target.dataset.category;
      deleteData(`/categories/${id}`).then((data) => {
        updateTable();
      });
    }
  });

  updateTable();
  checkValues();
};
