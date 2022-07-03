import { users } from "./services";

const storedJwt = JSON.parse(localStorage.getItem('ritme-user'));

export const getCurrentUser = async ()=>{
    try {
        if(storedJwt != null){
            return users.get("/user", {
                headers: {
                    "user_token": JSON.parse(localStorage.getItem('ritme-user')).userToken
                }
            })
        }else{
            return null
        }
    } catch(e) {
        return null
    }
}

export const updateMe = async (data, userToken)=>{
    try {
      if(storedJwt != null){
        return users.patch("/user", data, {
          headers: {
            "user_token": userToken
          }
        })
      }else{
        return null
      }
    } catch(e) {
      return e
    }
  
}

export const getUsers = async (userToken, user_id)=>{
    try {
        if(userToken){
            return users.get(`/user/${user_id}`, {
                headers: {
                    "user_token": userToken
                }
            })
        }else{
            return null
        }
    } catch(e) {
        
        return null
    }
  }

/*
export const getUsers = async ()=>{
  try {
      const jsonValue = await AsyncStorage.getItem('user_data')
      if(jsonValue != null){
          return users.get(`/users`, {
              headers: {
                  "user_token": JSON.parse(jsonValue).user_token
              }
          })
      }else{
          return null
      }
  } catch(e) {
      
      return null
  }
}

export const getUser = async (user_id)=>{
  try {
      const jsonValue = await AsyncStorage.getItem('user_data')
      if(jsonValue != null){
          return users.get(`/user/${user_id}`, {
              headers: {
                  "user_token": JSON.parse(jsonValue).user_token
              }
          })
      }else{
          return null
      }
  } catch(e) {
      
      return null
  }
}

*/