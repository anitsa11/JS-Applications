function app() {
    const endPoints = {
        logout: "http://localhost:3030/users/logout",
        catches: "http://localhost:3030/data/catches"
    }

    document.getElementById("logout").addEventListener("click", onLogout);
    let userData = JSON.parse(sessionStorage.getItem("userData"));

    const userNavSec = document.getElementById('user');
    const guestNavSec = document.getElementById('guest');

    const userNameRef = document.querySelector("nav span");

    updateNav();

    async function onLogout () {

        const option = {
            method: "GET",
            headers: {
                "X-Authorization": userData.accessToken
            }
        }

        await fetch(endPoints.logout, option);
        sessionStorage.clear();

        userData = null;

        updateNav();
    }

    function updateNav() {
        if (userData) {
            userNavSec.style.display = "inline-block";
            guestNavSec.style.display = "none";
            userNameRef.textContent = userData.email;
        } else {
            userNavSec.style.display = "none";
            guestNavSec.style.display = "inline-block";
            userNameRef.textContent = "guest";

        }

    }
}

app()