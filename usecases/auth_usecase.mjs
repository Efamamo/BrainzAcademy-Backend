import { handleUserErrors } from "../domain/errors.mjs";
import User from "../domain/user.mjs";
import { AddUser } from "../infrastructure/repository/user_repository.mjs";

export async function signUp(username, password) {
  const [savedUser, errors] = await AddUser(username, password);

  if (errors != null) {
    return [null, errors];
  }
  return [savedUser, null];
}

export async function logIn(username, password) {
    if (username == ""){
        return [null, {"username": "username is required"} ]
    }

    
        const [user, err] = await User.login(username, password)
        
        if (err != null){
            return [null, err]
        }
        return [user, null]
    
  }