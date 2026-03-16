function solve() {

    const infoBoxRef = document.getElementsByClassName('info')[0];
    const departBtnRef = document.getElementById('depart');
    const arriveBtnRef = document.getElementById('arrive');

    const stop = {
        currentStop: '',
        nextStop: "depot"
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop}`

        try {
            const response = await fetch(url);
            const data = await response.json();

            stop.nextStop = data.next;
            stop.currentStop = data.name;

            infoBoxRef.textContent = `Next stop ${data.name}`;
            console.log(data);
            departBtnRef.disabled = true;
            arriveBtnRef.disabled = false;

        } catch (error) {
            infoBoxRef.textContent = 'Error';
            departBtnRef.disabled = true;
            arriveBtnRef.disabled = true;
        }

    }

    function arrive() {
        infoBoxRef.textContent = `Arriving at ${stop.currentStop}`;
        departBtnRef.disabled = false;
        arriveBtnRef.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();