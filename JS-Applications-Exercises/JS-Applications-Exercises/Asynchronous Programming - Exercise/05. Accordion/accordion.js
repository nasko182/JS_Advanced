async function solution() {

    let responseForm = await fetch(`http://localhost:3030/jsonstore/advanced/articles/list`);

    let dataForm = await responseForm.json();

    let main = document.getElementById(`main`);

    for (const key in dataForm) {
        let element = dataForm[key];
        let title = element.title;
        let id = element._id;

        let parent = document.createElement(`div`);
        parent.classList.add(`accordion`);

        let head = document.createElement(`div`);
        head.classList.add(`head`);
        let span = document.createElement(`span`);
        span.textContent = title;
        head.appendChild(span);
        let btn = document.createElement(`button`);
        btn.classList.add(`button`);
        btn.setAttribute(`id`, id);
        btn.textContent = `More`;
        head.appendChild(btn);

        parent.appendChild(head);

        let responseExtra = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/ee9823ab-c3e8-4a14-b998-8c22ec246bd3`);

        let dataExtra = await responseExtra.json();

        let extra = document.createElement(`div`);
        extra.classList.add(`extra`);
        let p = document.createElement(`p`);
        p.textContent = dataExtra.content;
        extra.appendChild(p);
        
        
        parent.appendChild(extra);

        main.appendChild(parent);
    }

    main.addEventListener(`click`,(event)=>{
        let parent = event.target.parentElement.parentElement;
        let extra = parent.getElementsByTagName(`div`)[1];
        if(event.target.textContent===`More`){
            
            event.target.textContent=`Less`;
            extra.classList.remove(`extra`);
        }
        else if(event.target.textContent===`Less`){
            
            event.target.textContent=`More`;
            extra.classList.add(`extra`);
        }
    })
}

solution();