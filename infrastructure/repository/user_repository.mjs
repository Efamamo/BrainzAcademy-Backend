import { handleUserErrors } from "../../domain/errors.mjs";
import User from "../../domain/user.mjs";
export async function AddUser(username, password) {
  const newUser = new User({ username, password });

  try {
    const savedUser = await newUser.save();
    return [savedUser, null];
  } catch (e) {
    const handledErrors = handleUserErrors(e);
    return [null, handledErrors];
  }
}

export async function FindUser(username) {
  try {
    const user = await User.findOne({ username });
    return [user, null];
  } catch (e) {
    return [null, e];
  }
}
