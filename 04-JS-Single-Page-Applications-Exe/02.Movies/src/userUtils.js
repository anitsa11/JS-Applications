
function storeUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

function clearUserData() {
    sessionStorage.removeItem("userData");
}

function getUserData() {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function hasUser() {
    return !!getUserData
}

function getAccessToken() {
    const userData = getUserData();
    return userData.getAccessToken
}
export const userUtil = {
    storeUserData,
    clearUserData
}