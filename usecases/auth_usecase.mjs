import User from "../domain/user.mjs";
import hashPassword from "../infrastructure/password_service.mjs";
import { AddUser } from "../infrastructure/repository/user_repository.mjs";

export async function signUp(username, password) {
  const [savedUser, errors] = await AddUser(username, password);

  if (errors != null) {
    return [null, errors];
  }
  return [savedUser, null];
}
