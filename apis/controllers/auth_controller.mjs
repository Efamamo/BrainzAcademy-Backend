import { logIn, signUp } from "../../usecases/auth_usecase.mjs";
export async function signup(req, res) {
    const {username, password} = req.body;
    const [savedUser, errors] = await signUp(username, password)
    if (errors != null){
        return res.status(400).json(errors)
    }
    return res.status(201).json(savedUser)

}
export async function login(req, res) {
    
    const {username, password} = req.body;
    const [token, errors] = await logIn(username, password)
    if (errors != null){
        return res.status(400).json(errors)
    }
    return res.status(201).json({accessToken: token})

}
