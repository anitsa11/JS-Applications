function attachEvents() {
   const URL ='http://localhost:3030/jsonstore/messenger';

   const textAreaRef = document.getElementById('messages');

   document.getElementById('submit').addEventListener('click', onSubmit);
   document.getElementById('refresh').addEventListener('click', onLoad);

   async function onLoad(params) {
    const response = await fetch(URL);
    if(response.status !== 200) {
        return;
    }

    const data = await response.json();

    let buff = "";

    Object.values(data).forEach( rec => {
        buff += `${rec.author}: ${rec.content}\n`;
    })

    buff.trim();
    textAreaRef.value = buff;
    
   }

   async function onSubmit(e) {
    const authorRef = document.querySelector("input[name='author']");
    const contentRef = document.querySelector("input[name='content']");



    const author = authorRef.value;
    const content = contentRef.value;

    if (!author || !content) {
        return;
    }

    const data = {
        author,
        content
    };

    const option = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }

    await fetch(URL, option);

    authorRef.value ='';
    contentRef.value ='';

    onLoad();
   }
}


attachEvents();