function attachEvents() {
   const URL = 'http://localhost:3030/jsonstore/phonebook';

   const ulRef = document.getElementById('phonebook');

   document.getElementById('btnLoad').addEventListener('click',onLoad);
   document.getElementById('btnCreate').addEventListener('click',onCreate);

   async function onLoad(e) {
    const response = await fetch(URL);
    if(response.status !== 200) {
        return;
    }
    const data = await response.json();
    ulRef.innerHTML ='';

    Object.values(data).forEach(rec => createElement(rec));

   }

   
   function createElement (data) {
    const li = document.createElement('li');
    li.textContent = `${data.person}: ${data.phone}`;

    li.dataset.id = data._id;

    const btn = document.createElement('button');
    btn.addEventListener('click',onDelete);
    btn.textContent = 'Delete';
    li.appendChild(btn);

    ulRef.appendChild(li);

   }

   async function onDelete(e) {
    const id = e.target.parentElement.dataset.id;

    await fetch(URL + `/${id}`, {method: 'DELETE'});
    onLoad();
   }

   async function onCreate(e) {
    const personRef = document.getElementById('person');
    const phoneRef = document.getElementById('phone');

    const person = personRef.value;
    const phone = phoneRef.value;

    if (!person || !phone) {
        return;
    }

    personRef.value = '';
    phoneRef.value = '';

    const data = {
        person,
        phone
    }

    const option = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }

    await fetch(URL,option);
    onLoad();

   }

}

attachEvents();