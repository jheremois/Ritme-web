
const types ={
    authLoged: 'auth_loged',
    authLogout: 'auth_logout'
}

const initialUser = {
    userToken: "",
    isAuthed: false
}

const AuthReducer = (state, action)=> {
    switch (action.type) {
        case types.authLogout:
            return {
                userToken: "",
                isAuthed: false
            }
        case types.authLoged:
            return {
                userToken: action.token,
                isAuthed: action.isAuthed
            }
        default:
            return state
    }
}

export {initialUser, types}
export default AuthReducer
  