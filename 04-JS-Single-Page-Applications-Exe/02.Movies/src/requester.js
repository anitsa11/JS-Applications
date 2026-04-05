
async function requester(method, url, data) {
    const option = {
        method
    }

    const headers = {
        "Content-Type": "application/json"
    }

    option["headers"] = headers;

    if (data) {
        option["body"] = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);

        if (response.status !== 200) {
            alert(response.status);
            return response
        }

        const data = await fetch(url, option);
        return data;

    } catch (error) {
        alert(error);
    }
}

const get = (url) => requester("GET",url);
const post = (url,data) => requester("POST",url,data);
const update = (url,data) => requester("PUT",url,data);
const del = (url) => requester("DELETE", url);

export {
    get,
    post,
    update,
    del
}
