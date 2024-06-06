import { API_URL } from "../constants";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();
  return users;
}
