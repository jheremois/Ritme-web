import { createContext, useEffect, useReducer, useState } from "react";
import { getCurrentUser } from "../../services/User.services";
import AuthReducer, {initialUser} from "./AuthReducer";

const AuthContext = createContext({});

const init = ()=>{
    return {userToken: "", isAuthed: false}
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(AuthReducer, {}, init);

    useEffect(()=>{
        //authState && localStorage.setItem('ritme-user', JSON.stringify(authState))
    }, [authState])

    return (
        <AuthContext.Provider value={[authState, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;