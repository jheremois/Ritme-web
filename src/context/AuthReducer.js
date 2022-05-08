import { useReducer } from "react";

//const [state, dispatch] = useReducer(reducer, initialArg, init);


const types ={
    authLoged: 'auth_loged',
    authLogout: 'auth_logout'
}

const initialUser = {
    userToken: "",
    logged: true
}

const AuthReducer = (state, action)=> {
    switch (action.type) {
        case types.authLogout:
            return {
                userToken: "",
                logged: false
            }
        case types.authLoged:
            return {
                userToken: action.token,
                logged: true
            }
        default:
            return state
    }
}

export {initialUser, types}
export default AuthReducer
  