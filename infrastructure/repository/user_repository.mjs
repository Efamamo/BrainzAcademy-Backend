import { handleUserErrors } from "../../domain/errors.mjs";
import User from "../../domain/user.mjs";
import { comparePassword } from "../password_service.mjs";
export async function AddUser(username, password) {
  const newUser = new User({ username, password });
  console.log(newUser);

  try {
    const savedUser = await newUser.save();
    return [savedUser, null];
  } catch (e) {
    const handledErrors = handleUserErrors(e);
    return [null, handledErrors];
  }
}

export async function FindUser(username, password) {
  try {
    const user = await User.findOne({ username });
    return [user, null];
  } catch (e) {
    return [null, e];
  }
}
