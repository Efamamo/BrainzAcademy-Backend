import { signUp } from "../../usecases/auth_usecase.mjs";
export function signup(req, res) {
    const {username, password} = req.body;
    if (signUp(username, password) != null){
        return res.status(201).send()
    }
    return res.send(500)

}

