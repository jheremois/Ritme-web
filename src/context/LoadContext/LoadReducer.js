const typesLoad ={
    loading: 'loading',
    notLoading: 'not_loading'
}

const initialState = {
    isLoading: true
}

const LoadReducer = (state, action)=> {
    switch (action.type) {
        case typesLoad.loading:
            return {
                isLoading: true
            }
        case typesLoad.notLoading:
            return {
                isLoading: false
            }
        default:
            return state
    }
}

export {initialState, typesLoad}
export default LoadReducer
  