import { handleUserErrors } from "../../domain/errors.mjs";
import User from "../../domain/user.mjs";
export async function AddUser(username, password) {
  const newUser = new User({ username, password });
  console.log(newUser)

  try {
    const savedUser = await newUser.save();
    return [savedUser, null];
  } catch (e) {
    const errors = {};
    
    const handledErrors = handleUserErrors(e);
    for (let val in handledErrors) {
      if (handledErrors[val] != "") {
        errors[val] = handledErrors[val];
      }
    }
    console.log(handledErrors)

    return [null, errors];
  }
}

export async function FindUser(username){
    
}
