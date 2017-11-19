export function apiUrl() {
  if(process.env.NODE_ENV !== 'production') {
    // return 'http://10.0.1.17:8000';
    return 'http://localhost:8000';
  }
  return 'http://api.mysticpaste.com';
}
