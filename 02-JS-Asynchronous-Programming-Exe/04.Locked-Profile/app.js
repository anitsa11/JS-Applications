async function lockedProfile() {

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(profile => {
        createProfile(profile);
    });

    function createProfile(user) {

        const main = document.getElementById('main');

        const profileDiv = document.createElement('div');
        profileDiv.className = 'profile';

        profileDiv.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon">

            <label>Lock</label>
            <input type="radio" name="user${user._id}Locked" value="lock" checked>

            <label>Unlock</label>
            <input type="radio" name="user${user._id}Locked" value="unlock">

            <br>
            <hr>

            <label>Username</label>
            <input type="text" value="${user.username}" disabled readonly>

            <div class="hiddenInfo" style="display:none">
                <hr>

                <label>Email:</label>
                <input type="email" value="${user.email}" disabled readonly>

                <label>Age:</label>
                <input type="text" value="${user.age}" disabled readonly>
            </div>

            <button>Show more</button>
        `;

        const button = profileDiv.querySelector('button');
        button.addEventListener('click', toggleInfo);

        main.appendChild(profileDiv);
    }

    function toggleInfo(e) {

        const profile = e.target.parentElement;

        const unlockRadio = profile.querySelector('input[value="unlock"]');
        const hiddenDiv = profile.querySelector('.hiddenInfo');
        const button = profile.querySelector('button');

        if (!unlockRadio.checked) {
            return;
        }

        if (button.textContent === 'Show more') {
            hiddenDiv.style.display = 'block';
            button.textContent = 'Hide it';
        } else {
            hiddenDiv.style.display = 'none';
            button.textContent = 'Show more';
        }
    }
}