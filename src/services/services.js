import env from "../config/env"
import axios from "axios";

export const auth =  axios.create({
    baseURL: `${env.authServicePort}/api/`
})

export const users =  axios.create({
    baseURL: `${env.userServicePort}/api/`
})

export const posts =  axios.create({
    baseURL: `${env.postsServicePort}/api/`
})