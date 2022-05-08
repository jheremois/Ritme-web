import { auth } from "./services";

export const RegisterUser = (data)=>{
    return auth.post("/register", data)
}

export const loginUser = (data)=>{
    return auth.post("/login", data)
}