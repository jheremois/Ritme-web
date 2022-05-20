import React, {useState, createContext} from "react"

const LoadContext = createContext({
    globalLoad: true
})

export const LoadProvider = ({children}) =>{
    return(
        <LoadContext.Provider>
            {children}
        </LoadContext.Provider>
    )
}


export default LoadContext