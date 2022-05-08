import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer, {initialUser} from "./AuthReducer";

const AuthContext = createContext({});

const init = ()=>{
    return JSON.parse(localStorage.getItem('ritme-user')) || {userToken: "", logged: false}
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, {}, init);

    useEffect(()=>{
        authState &&
            localStorage.setItem('ritme-user', JSON.stringify(authState))
    }, [authState])

    return (
        <AuthContext.Provider value={[authState, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;