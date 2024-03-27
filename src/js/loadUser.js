import { httpGet } from './http';

export default function loadUser(id) {
  // bad practice
  const data = httpGet(`http://server:8080/users/${id}`);

  return JSON.parse(data);
}
