let section = document.getElementById(`details`);

export function showDetails(){
    let data =JSON.parse(sessionStorage.getItem(`data`));
    section.innerHTML=``;
    let mainDiv = document.createElement(`div`);
    mainDiv.classList.add(`container`);
    mainDiv.innerHTML=
    `<!-- theme content  -->
    <div class="theme-content">
    <!-- theme-title  -->
    <div class="theme-title">
    <div class="theme-name-wrapper">
    <div class="theme-name">
    <h2>${data.topicName}</h2>
    
    </div>
    
    
        </div>
        <!-- comment  -->
        
        <div class="comment">
        <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${data.username}</span> posted on <time>${data.date}</time></p>
        
        <p class="post-content">${data.postText}</p>
        </div>
        
        <div id="user-comment">
        </div>
        </div>
        
        <div class="answer-comment">
        <p><span>currentUser</span> comment:</p>
        <div class="answer">
        <form>
        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
        <div>
        <label for="username">Username <span class="red">*</span></label>
        <input type="text" name="username" id="username">
        </div>
        <button>Post</button>
        </form>
        </div>
        </div>
        
        </div>`
        section.appendChild(mainDiv);
        let form = section.querySelector(`form`);
        form.addEventListener(`submit`,onFormHandler);
        
        async function onFormHandler(event){
            event.preventDefault();
            if (event.submitter.innerHTML===`Post`){
        
            let { postText,username } = getData(event);
        
            createRequest(postText,username);
            showComments();
            form.reset();
            }
        }
        showComments();
}


async function createRequest(postText,username ){
    let data =JSON.parse(sessionStorage.getItem(`data`));

    let header=getHeader(`post`,{ postText,username,date: new Date(),postId: data._id })
    await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`,header);

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

function getData(event){
    event.preventDefault();
    let { postText, username} = Object.fromEntries(new FormData(event.target));

    return { postText, username}
}

function createComment(data) {
    let div = document.createElement(`div`);
    div.classList.add(`topic-name-wrapper`)
    div.innerHTML = ` <div class="topic-name">
    <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
    <div class="post-content">
        <p>${data.postText}</p>
    </div>
</div>`;

    return div;
}

async function showComments(){
    let commentContent = document.getElementById(`user-comment`);
    
    commentContent.innerHTML=``;
    
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);
        let data =JSON.parse(sessionStorage.getItem(`data`));


        let comments = await response.json();
        
        for (const key in comments) {
            let comment = comments[key];
    
            if(comment.postId===data._id){
                let div = createComment(comment);
            commentContent.appendChild(div);
            }
        }
    };