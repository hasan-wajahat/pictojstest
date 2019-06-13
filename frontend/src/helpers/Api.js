const getOptions = (method, data = null) => ({
  method, // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
  },
  body: data ? JSON.stringify(data) : undefined, // only send json data in body if data passed
});

const postFormDataOptions = (body) => ({
  method: 'POST',
  body,
  mode: 'cors', // no-cors, cors, *same-origin
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
  },
});

const api = ({
  url, method, data, formData
}) =>
  fetch(url,
    formData ? postFormDataOptions(formData) : getOptions(method, data)
  )
  .then(response => response.json())
  .catch(error => {
    throw new Error(error)
  });


export const getData = url => api({url, method: 'GET'});

export const uploadFile = (url, file) => {
  let formData = new FormData();
  formData.append('upload', file);
  return api({url, formData})
};