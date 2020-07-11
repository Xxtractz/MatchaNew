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

// update a user by their id _PUT Method
export const updateUserById = ServerUrl + "/users/update";

export const deleteUserById = ServerUrl + "/users";

// You can get and delete on these URLs
export const interestsUrl = ServerUrl + "/interests";

// You can get and delete on these URLs
export const usersUrl = ServerUrl + "/users";
export const refreshTokenUrl = ServerUrl + "/users/refresh";

export const installUrl = ServerUrl + "/installation",
