import { goToDetail } from "./redirect.js";

let form = document.querySelector(`form`);
form.addEventListener(`submit`,onFormHandler);

async function onFormHandler(event){
    event.preventDefault();
    if (event.submitter.innerHTML===`Post`){

    let { topicName, username, postText } = getData(event);

    createRequest(topicName,username,postText);
    showTopics();
    clearForm();
    }
    else{
        clearForm();
    }
}

function clearForm(){
    form.reset();
}

export async function showTopics(){
let topicContent =  document.querySelector(`div.topic-container`);

topicContent.innerHTML=``;

    let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`);
    let topics = await response.json();
    
    for (const key in topics) {
        let topic = topics[key];

        let div = createTopic(topic);
        topicContent.appendChild(div);
    }
}

function createTopic(data) {
    let mainDiv = document.createElement(`div`);
    mainDiv.classList.add(`topic-name-wrapper`);
    mainDiv.id = data.id;
    mainDiv.innerHTML = `<div class="topic-name">
    <a href="javascript:void(0)" class="normal">
        <h2>${data.topicName}</h2>
    </a>
    <div class="columns">
        <div>
            <p>Date: <time>${data.date}</time></p>
            <div class="nick-name">
                <p>Username: <span>${data.username}</span></p>
            </div>
        </div>
    </div>
    </div>`
    mainDiv.querySelector(`a`).addEventListener(`click`,()=>{
        sessionStorage.clear();
    sessionStorage.setItem(`data`, JSON.stringify(data));
    goToDetail();
    });

    return mainDiv;
}



function getData(event) {
    let { topicName, username, postText } = Object.fromEntries(new FormData(event.target));

    return { topicName, username, postText }
}

async function createRequest(topicName, username,postText ){
    let header=getHeader(`post`,{ topicName, username, postText,date: new Date() })
    await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`,header);
}

function getHeader(method, body) {

    let obj = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (body) {
        obj.body = JSON.stringify(body);
    }
    return obj;
}