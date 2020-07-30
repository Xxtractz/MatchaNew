import * as jwt from 'jsonwebtoken';

const Token = localStorage.getItem("User_Token");
const data = jwt.decode(Token, "matchSecrets");


// console.log(data);
export const getUserId = () => {
    return data.userid;
};

export const getUsername = () => {
    return data.username;
};

export const getUserFirstName = () => {
    return data.firstname;
};

export const getUserLastName = () => {
    return data.lastname;
};

export const getUserGender = () => {
    return data.gender;
};

export const getUserEmail = () => {
    return data.email;
};

export const getUserGenderPreference = () => {
    return data.genderPreference;
};

export const getUserBio = () => {
    return data.bio;
};

export const getUserAge = () => {
    return data.age;
};

export const getUserImages = () => {
    return data.images;
};

export const getUserStatus = () => {
    return data.status;
};

export const getUserInterest = () => {
    return data.interest;
};

export const getProfilePicture = () => {
    return data.profileImage;
}

export const getImageOne = () => {
    return data.image_1;
}

export const getImageTwo = () => {
    return data.image_2;
}

export const getImageThree = () => {
    return data.image_3;
}

export const getImageFour = () => {
    return data.image_4;
}

export const getActive = () =>{
    return data.active;
}

export const getNotify = ()=>{
    return (data.notify === 1);
}

export const getUserLatitude = ()=>{
    return data.latitude ;
}

export const getUserLongitude = ()=>{
    return data.longitude ;
}