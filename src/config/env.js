const envLocal = {
    authServicePort: "http://192.168.1.31:4000",
    userServicePort: "http://192.168.1.31:4100",
    postsServicePort: "http://192.168.1.31:4200"
}

const envDev = {
    authServicePort: "https://ritme-auth-service-ub3mx35oqq-uc.a.run.app",
    userServicePort: "https://ritme-users-service-ub3mx35oqq-nn.a.run.app",
    postsServicePort: "https://ritme-posts-service-ub3mx35oqq-uc.a.run.app"
}

const env = envDev

export default env