/**
 * Get options for the fetch call for JSON objects
 * @param {String} method method for making calls
 * @param {any} data object to send
 */
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

/**
 * Get options for the fetch call for form requests
 * @param {any} data form to send
 */
const postFormDataOptions = (body) => ({
  method: 'POST',
  body,
  mode: 'cors', // no-cors, cors, *same-origin
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
  },
});

/**
 * Main Api call using native fetch
 * @param {{url: string, method: string, data; any, formData: Form-Data}}
 */
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


/**
 * Get call
 * @param {string} url 
 */
export const getData = url => api({url, method: 'GET'});

/**
 * Upload Api using form-data
 * @param {sring} url 
 * @param {file} file to upload
 */
export const uploadFile = (url, file) => {
  let formData = new FormData();
  formData.append('upload', file);
  return api({url, formData})
};

/**
 * Saves dato in sessions at the key savedData
 * saves in json form
 * @param {any} data data to be saved
 */
export const saveApi = data => {
  const jsonData = JSON.stringify(data);
  sessionStorage.setItem('savedData', jsonData);
};

/**
 * Gets data saved in savedData in session Data
 */
export const loadApi = () => {
  const jsonData = sessionStorage.getItem('savedData');
  return JSON.parse(jsonData);
}