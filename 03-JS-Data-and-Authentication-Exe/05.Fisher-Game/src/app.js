
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

    form.addEventListener("submit", onSubmit);

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

            div.querySelector("button.update").addEventListener("click", onUpdate);
            div.querySelector("button.delete").addEventListener("click", onDelete)

            catchesRef.appendChild(div);
        })
    }

    function createContent(el) {
        return `
            <label>Angler</label>
            <input type="text" class="angler" value="${el.angler}">
            <label>Weight</label>
            <input type="text" class="weight" value="${el.weight}">
            <label>Species</label>
            <input type="text" class="species" value="${el.species}">
            <label>Location</label>
            <input type="text" class="location" value="${el.location}">
            <label>Bait</label>
            <input type="text" class="bait" value="${el.bait}">
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${el.captureTime}">
            <button class="update" data-id=${el._id} ${el._ownerId !== userData?._id ? "disabled" : ""}>Update</button>
            <button class="delete" data-id=${el._id} ${el._ownerId !== userData?._id ? "disabled" : ""}>Delete</button>
        `
    }

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { angler, weight, species, location, bait, captureTime } = Object.fromEntries(formData);

        if (!angler || !weight || !species || !location || !bait || !captureTime) {
            return;
        }
        await saveCatches({ angler, weight, species, location, bait, captureTime });
        e.target.reset();
        onLoadAllCatches();
    }

    function saveCatches(data) {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify(data)
        }
        return fetch(endPoints.catches, option);
    }

    async function onUpdate(e) {
        const id = e.target.dataset.id;

        const inputs = Array.from(e.target.parentElement.querySelectorAll("input"));
        const [anglerRef, weightRef, speciesRef, locationRef, baitRef, captureTimeRef] = inputs;

        const data = {
            angler: anglerRef.value,
            weight: weightRef.value,
            species: speciesRef.value,
            location: locationRef.value,
            bait: baitRef.value,
            captureTime: captureTimeRef.value
        }

        await updateCatches(data, id);
        onLoadAllCatches()


    };

    function updateCatches(data, id) {
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify(data)
        }
        return fetch(endPoints.catches + `/${id}`, option);
    }

    async function onDelete(e) {
        const id = e.target.dataset.id;

        const option = {
            method: "DELETE",
            headers: {
                "X-Authorization": userData.accessToken
            }
        }

        await fetch(endPoints.catches + `/${id}`, option);
        onLoadAllCatches()


    };

}

app()