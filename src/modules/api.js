const apiPath = 'http://localhost:3001';

export const getData = (path) => {
  return fetch(apiPath + path).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};
