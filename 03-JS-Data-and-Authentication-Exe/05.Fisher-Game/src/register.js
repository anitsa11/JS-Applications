function register() {
    document.querySelector('form').addEventListener('submit',onSubmit);

    const URL = 'http://localhost:3030/users/register';

    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        if(!email || !password || password !== rePass) {
            alert('OOooPPPpSsss');
            return;
        }
        createUser({email, password});

    }

    async function createUser(userData) {

        const option = {
            method: "POST",
            headers: {
                "content-Type": "application.json"
            },
            body: JSON.stringify(userData)
        }

        const response = await fetch(URL,option);
        if(response.status !== 200) {
            return;
        }
        const data = await response.json();

        sessionStorage.setItem("userData", JSON.stringify(data));

        window.location = 'index.html';
    }

}
register();