function getInfo() {
    const base_url = "http://localhost:3030/jsonstore/bus/businfo/";
    const inputRef = document.getElementById('stopId');
    const stopNameRef = document.getElementById('stopName');
    const busInfoRef = document.getElementById('buses');

    const stopId = inputRef.value;
    if (!stopId) {
        return;
    }

    inputRef.value = '';
    busInfoRef.textContent = '';

    const response = fetch(base_url + stopId);

    response.then(res => {
        res.json()
            .then(data => {
                stopNameRef.textContent = data.name;
                Object.entries(data.buses).forEach(bus => {
                    const li = document.createElement('li');
                    li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
                    busInfoRef.appendChild(li);
                })
            }).catch(err => {stopNameRef.textContent = 'Error'})
    }).catch(err => {stopNameRef.textContent = 'Error'})

    
}