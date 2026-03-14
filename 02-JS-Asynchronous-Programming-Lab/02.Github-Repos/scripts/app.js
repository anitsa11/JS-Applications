function loadRepos() {
	const list = document.getElementById('repos');
	const userName = document.getElementById('username').value;
	const url = `https://api.github.com/users/${userName}/repos`;

	fetch(url)
	    .then(handleResponse)
		.then(handleData)
		.catch(handleError);

	function handleResponse(response) {
		if (response.ok) {
			return response.json();
		} else {
			throw response.json();
		}
	}

	function handleData(data) {
		list.replaceChildren();

		for (const repo of data) {
			list.innerHTML += 
			`<li>
            <a href="${repo.html_url}">
                ${repo.full_name}
            </a>
        </li>`
		}
	}

	function handleError(errorPromise) {
		errorPromise.then(error => {list.innerHTML = error.message})
	}
}