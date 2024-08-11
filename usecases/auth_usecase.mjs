import User from "../domain/user.mjs";
import hashPassword from "../infrastructure/password_service.mjs";
import { AddUser } from "../infrastructure/repository/user_repository.mjs";

export async function signUp(username, password){
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword)
    if (hashedPassword == null){
        return null
    }
    const savedUser = await AddUser(username, hashedPassword);
    console.log(savedUser)
    if (savedUser == null){
        return null
    }
    return savedUser
}