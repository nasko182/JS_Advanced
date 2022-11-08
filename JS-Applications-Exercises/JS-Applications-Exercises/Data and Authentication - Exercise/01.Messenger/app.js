// <div id="main">
//     <textarea id="messages" cols="80" rows="12" disabled="true"></textarea>
//     <div id="controls">
//         <label for="author">Name: </label><input name="author" type="text"><br>
//         <label for="content">Message: </label><input name="content" type="text">
//         <input id="submit" type="button" value="Send">
//         <input id="refresh" type="button" value="Refresh">
//     </div>
// </div>

let messages = document.getElementById(`messages`);
let submitBtn = document.getElementById(`submit`)
let refreshBtn = document.getElementById(`refresh`)
function attachEvents() {
    
    submitBtn.addEventListener(`click`,async ()=>{
        let author = document.getElementsByName(`author`)[0];
        let content = document.getElementsByName(`content`)[0];
        let response =await fetch(`http://localhost:3030/jsonstore/messenger`, {
            method: `post`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                author: author.value,
                content: content.value })
        });
        author.value=``;
        content.value=``;
    })

    refreshBtn.addEventListener(`click`,async ()=>{
        const response = await fetch(`http://localhost:3030/jsonstore/messenger`);

        let data = await response.json();

    let arr = Object.entries(data);

    messages.textContent=``;
    for (const obj of arr) {
        messages.textContent+=`${obj[1].author}: ${obj[1].content}\n`
    }
    messages.textContent =messages.textContent.slice(0,messages.textContent.length-1)
    })
    
}

attachEvents();