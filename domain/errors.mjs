export function handleUserErrors(e){
    let errors = {username: "", password: ""}

    
    if (e.code === 11000){
        errors.username = "username already exists"
        return errors
    }

    if (e.message.includes("User validation failed")){
        Object.values(e.errors).forEach(({properties} )=> {
            errors[properties.path] = properties.message
        })
    }
    return errors
   
}