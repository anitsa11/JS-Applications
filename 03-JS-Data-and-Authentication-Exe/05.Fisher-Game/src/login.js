function login() {

    const URL = 'http://localhost:3030/users/login';
    document.querySelector("form").addEventListener('submit', onSubmit);

    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if(!email || !password) {
            alert("OOoopPPpSSss");
            return;
        }

        onLogin({email,password});

    }

    async function onLogin(userData) {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        }
        const response = await fetch(URL, option)
        const data = await response.json();
        sessionStorage.setItem("usedData", JSON.stringify(data));

        window.location = "index.html";
    }
}

login()