export const postDataToServer = (url, body) => {
  fetch(`http://localhost:3000/${url}/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const patchDataToServer = (url, body) => {
  fetch(`http://localhost:3000/${url}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
