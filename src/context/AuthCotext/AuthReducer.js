
const types ={
    authLoged: 'auth_loged',
    authLogout: 'auth_logout'
}

const initialUser = {
    userToken: "",
    isAuthed: false,
    user: {}
}

const AuthReducer = (state, action)=> {
    switch (action.type) {
        case types.authLogout:
            return {
                userToken: "",
                isAuthed: false,
                user: {}
            }
        case types.authLoged:
            return {
                userToken: action.token,
                isAuthed: action.isAuthed,
                user: action.user
            }
        default:
            return state
    }
}

export {initialUser, types}
export default AuthReducer
  