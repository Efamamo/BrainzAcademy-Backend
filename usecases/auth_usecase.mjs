import { handleUserErrors } from "../domain/errors.mjs";
import User from "../domain/user.mjs";
import { generateToken } from "../infrastructure/jwt_service.mjs";
import { comparePassword } from "../infrastructure/password_service.mjs";
import {
  AddUser,
  FindUser,
} from "../infrastructure/repository/user_repository.mjs";

export async function signUp(username, password) {
  const [savedUser, errors] = await AddUser(username, password);

  if (errors != null) {
    return [null, errors];
  }
  return [savedUser, null];
}

export async function logIn(username, password) {
  if (username == ""|| !username) {
    return [null, { username: "username is required" }];
  }
  

  const [user, err] = await FindUser(username, password);
  if (err != null){
    return [null, err]
  }
  
  if (user) {
    
    const auth = await comparePassword(password, user.password);
    if (auth) {
      const token = generateToken(username)
      return [token, null];
    }
    return [null, { password: "Incorrect Password" }];
  }
  return [null, { username: "User Not Found" }];
}
