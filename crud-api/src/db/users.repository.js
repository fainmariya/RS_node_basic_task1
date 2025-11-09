import { randomUUID } from 'node:crypto';

const users = [];

export function getAllUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((u) => u.id === id) ?? null;
}

export function createUser({ username, age, hobbies }) {
  const newUser = {
    id: randomUUID(),
    username,
    age,
    hobbies
  };

  users.push(newUser);
  return newUser;
}

export function updateUser(id, { username, age, hobbies }) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return null;
  }

  const updatedUser = {
    id,
    username,
    age,
    hobbies
  };

  users[index] = updatedUser;
  return updatedUser;
}

export function deleteUser(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
}