import React, {createContext, useReducer} from "react"
import LoadReducer from "./LoadReducer";

const LoadContext = createContext({
    globalLoad: true
})

export const LoadProvider = ({children}) =>{
    const [loadState, LoadDispatch] = useReducer(LoadReducer, {isLoading: true});

    return(
        <LoadContext.Provider value={[loadState, LoadDispatch]}>
            {children}
        </LoadContext.Provider>
    )
}

export default LoadContext