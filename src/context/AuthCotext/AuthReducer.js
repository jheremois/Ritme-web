
const types ={
    authLoged: 'auth_loged',
    authLogout: 'auth_logout'
}

const initialUser = {
    userToken: "",
}

const AuthReducer = (state, action)=> {
    switch (action.type) {
        case types.authLogout:
            return {
                userToken: "",
            }
        case types.authLoged:
            return {
                userToken: action.token,
            }
        default:
            return state
    }
}

export {initialUser, types}
export default AuthReducer
  