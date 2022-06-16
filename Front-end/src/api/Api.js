const get = apiUrl => {
  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => {
    return response.json();
  });
};
const post = (apiUrl, data) => {
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  });
};

const put = (apiUrl, data) => {
  return fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  });
};
const del = apiUrl => {
  return fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => {
    return response.json();
  });
};

export default { get, post, put, del };
