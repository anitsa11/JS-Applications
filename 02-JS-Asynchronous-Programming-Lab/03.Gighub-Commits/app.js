async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw await res.json();
        }

        const data = await res.json();

        list.replaceChildren();
        for (const commit of data) {
            list.innerHTML += `<li>${commit.commit.author.name}: ${commit.commit.message}</li>`;
        }

    } catch (error) {
        list.innerHTML = error.message;
    }
}