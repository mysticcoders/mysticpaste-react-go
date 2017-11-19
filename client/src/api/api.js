export function apiUrl() {
  if(process.env.REACT_APP_ENV === 'production') {
      return 'http://api.mysticpaste.com';
  }
  return 'http://localhost:8000';
}
