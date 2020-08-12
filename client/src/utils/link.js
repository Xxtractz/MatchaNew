// const ServerUrl = "http://192.168.8.104:4000";
const ServerUrl = "http://localhost:4000";

/**
 * All User Related url
 * */

// Register User
export const registerUserUrl = ServerUrl + "/users/register";

// Verify User after Registeration
export const verifyUserAfterRegUrl = ServerUrl + "/users/verify/";
export const loginUserUrl = ServerUrl + "/users/login";
export const logoutUserUrl = ServerUrl + "/users/logout";
export const ReverifyUrl = ServerUrl + "/users/verifyAgain";
export const forgotPasswordUrl = ServerUrl + "/users/reset";
export const UpdateUrl = ServerUrl + "/update";

// User Related Urls
export const updateUserById = ServerUrl + "/users/update";
export const interestsUrl = ServerUrl + "/interests";
export const usersUrl = ServerUrl + "/users";
export const refreshTokenUrl = ServerUrl + "/users/refresh";

// Notifications
export const notificationUrl = ServerUrl + "/notifications";

//Likes
export const like = ServerUrl + "/likes";
export const likeBack = ServerUrl + "/likes/back";
export const match = ServerUrl + "/matched";

// Installation
export const installUrl = ServerUrl + "/installation";
export const uninstallUrl = ServerUrl + "/uninstall";
