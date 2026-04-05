
function storeUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export const userUtil = {
    storeUserData
}