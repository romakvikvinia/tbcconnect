const handleResponse = (response: any) => {
  if (response.status === 401) {
    console.log('unauthorized');
    // unauthorized
  }

  return new Promise((resolve, reject) => {
    if (response.ok) {
      if (response.status === 200) {
        var contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json: any) => {
            resolve(json);
          });
        } else {
          resolve(response);
        }
      } else if (response.status === 204) {
        resolve(null);
      }
    } else {
      response.text().then((error: any) => {
        try {
          error = JSON.parse(error);
        } catch (err) {
          if (response.status === 403)
            error = {
              code: 'UNAUTHORIZED_ERROR',
              errors: ['Common.UnauthorizedError'],
            };
          else error = { code: 'UNHANDLED_ERROR', errors: ['Unhandled Error'] };
        }
        reject(error);
      });
    }
  });
};

const handleError = (error: any, url: string) => {
  let err = error;
  console.log(error);
  try {
    err = JSON.parse(err);
  } catch (e) {
    err = { code: 'UNHANDLED_ERROR', errors: ['Unhandled Error'] };
  }

  return Promise.reject(err);
};

export const jsonRequest = (url: string, isPrivate = true, body: any, method = 'GET') => {
  const headers = new Headers();

  headers.append('Accept', 'application/json');
  /**
   * set lang param
   */
  //   headers.append('Accept-Language', i18n.language);

  if (isPrivate === true) {
    let token = localStorage.getItem('tbc_connect_token');
    if (token) headers.append('Authorization', `Bearer ${token}`);
  }
  var options: any = { headers, mode: 'cors', method: method };

  if (body) {
    options.method = method;
    options.body = JSON.stringify(body);
    headers.append('Content-Type', 'application/json');
  }

  return fetch(url, options).then(
    (response: Response) => {
      return handleResponse(response);
    },
    (error: Response) => {
      return handleError(error, url);
    }
  );
};
