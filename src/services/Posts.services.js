import { posts } from "./services";

export const getMyFeed = async (userToken) => {

    return posts.get("/profile", {
        headers: {
          "user_token": userToken
        }
    })
}

export const getFeed = async (userToken) => {

    return posts.get(`/feed`, {
        headers: {
            "user_token": userToken
        }
    })
}

// Api v2:
/*
export const getFeed = async () => {
    const jsonValue = await AsyncStorage.getItem('user_data')

    return posts.get(`/feed`, {
        headers: {
          "user_token": JSON.parse(jsonValue).user_token
        }
    })
}



export const getUserFeed = async (id) => {
    const jsonValue = await AsyncStorage.getItem('user_data')

    return posts.get(`/profile/${id}`, {
        headers: {
          "user_token": JSON.parse(jsonValue).user_token
        }
    })
}

export const getPostsByTag = async (tag) => {
    const jsonValue = await AsyncStorage.getItem('user_data')

    return posts.get(`/feed/${tag}`, {
        headers: {
          "user_token": JSON.parse(jsonValue).user_token
        }
    })
}

export const getTags = async () => {
    const jsonValue = await AsyncStorage.getItem('user_data')

    return posts.get(`/tags`, {
        headers: {
          "user_token": JSON.parse(jsonValue).user_token
        }
    })
}

export const createNewPost = async (data)=>{
    const jsonValue = await AsyncStorage.getItem('user_data')
    if(jsonValue != null){
        return posts.post("/post", data,{
            headers: {
                "user_token": JSON.parse(jsonValue).user_token
            }
        })
    }
}

export const Getvotes = async (post_id) => {
    const jsonValue = await AsyncStorage.getItem('user_data')

    return posts.get(`/votes/${post_id}`, {
        headers: {
          "user_token": JSON.parse(jsonValue).user_token
        }
    })
}

export const sendVote = async (post_id, vote_type) => {
    const jsonValue = await AsyncStorage.getItem('user_data')

    return posts.post(`/vote/${post_id}/${vote_type}`, {}, {
        headers: {
          "user_token": JSON.parse(jsonValue).user_token
        }
    })
}
*/