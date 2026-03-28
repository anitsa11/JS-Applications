
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

    const catchesRef = document.getElementById("catches");
    const form = document.querySelector("form");
    const addBtn = form.querySelector("button");

    onLoadAllCatches();

    updateNav();

    async function onLogout() {

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

            addBtn.disabled = false;
        } else {
            userNavSec.style.display = "none";
            guestNavSec.style.display = "inline-block";
            userNameRef.textContent = "guest";

            addBtn.disabled = true;

        }

    }

    async function onLoadAllCatches() {
        const response = await fetch(endPoints.catches);
        const data = await response.json();

        catchesRef.innerHTML = "";

        showAllCatches(data);

    }

    function showAllCatches(data) {
        data.forEach(el => {
            const div = document.createElement("div")
            div.classList.add("catch")
            const content = createContent(el);
            div.innerHTML = content;
            catchesRef.appendChild(div);
        })
    }

    function createContent(el) {
        return `
         <label>Angler</label>
          input type="text" class="angler" value=${el.angler}>
            <label>Weight</label>
            <input type="text" class="weight" value=${el.weight}>
            <label>Species</label>
             <input type="text" class="species" value=${el.species}>
            <label>Location</label>
            <input type="text" class="location" value=${el.location}>
             <label>Bait</label>
            <input type="text" class="bait" value=${el.bait}>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value=${el.captureTime}>
            <button class="update" data-id=${el._ownerId} ${el._ownerId !== userData?._id ? "disabled": ""}>Update</button>
            <button class="delete" data-id=${el._ownerId} ${el._ownerId !== userData?._id ? "disabled": ""}>Delete</button>
        `
    }
}

app()