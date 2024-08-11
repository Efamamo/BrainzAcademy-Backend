import User from "../../domain/user.mjs";
export async function AddUser(username,password){
    const newUser = new User({username, password})
    console.log(newUser)
    try{
        const savedUser = await newUser.save()
        return savedUser
    }
    catch{
        return null
    }
}