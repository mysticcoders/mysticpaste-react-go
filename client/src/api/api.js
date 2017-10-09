export function apiUrl() {
  if(process.env.REACT_APP_ENV === 'production') {
      return 'http://api.mysticpaste.com';
  }
  return 'http://localhost:8000';
}

// export function loginToken() {
//   return localStorage.getItem('loginToken');
// }
//
// export function defaultHeaders() {
//   let headers = {
//     'Content-Type': 'application/json'
//   };
//   if(loginToken()) {
//     headers['Authorization'] = `Token ${loginToken()}`;
//   }
//   return headers;
// }
