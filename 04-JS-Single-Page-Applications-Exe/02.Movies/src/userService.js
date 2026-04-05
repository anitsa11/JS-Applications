import { get, post} from "./requester.js"
const endPoints = {
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    logout: "http://localhost:3030/users/logout"
}

function register(data){
    return post(endPoints.register,data);
}

function login(data){
    return post(endPoints.login,data);
}

function logout(){
    return get(endPoints.logout);
}

export {
    register,
    login,
    logout
}