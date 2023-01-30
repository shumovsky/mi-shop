const apiPath = 'http://localhost:3001';

export const getData = (path) => {
  return fetch(apiPath + path).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const postData = (path, data) => {
  return fetch(apiPath + path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const putData = (path, data) => {
  return fetch(apiPath + path, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const patchData = (path, data) => {
  return fetch(apiPath + path, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const deleteData = (path) => {
  return fetch(apiPath + path, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};
