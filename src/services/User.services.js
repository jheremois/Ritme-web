import { users } from "./services";

const storedJwt = JSON.parse(localStorage.getItem('ritme-user'));

export const getCurrentUser = async ()=>{
    try {
        //const jsonValue = await AsyncStorage.getItem('User_auth_token')
        if(storedJwt != null){
            return users.get("/user", {
                headers: {
                    "user_token": storedJwt.userToken
                }
            })
        }else{
            return null
        }
    } catch(e) {
        return null
    }
}

export const updateMe = async (data)=>{
    try {
      if(storedJwt != null){
        return users.patch("/user", data, {
          headers: {
            "user_token": storedJwt
          }
        })
      }else{
        return null
      }
    } catch(e) {
      return e
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