async function lockedProfile() {
    
    let main = document.getElementById(`main`);
    main.innerHTML=``;
    let counter =0;

    let response = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);
    let data = await response.json();

    for (const key in data) {
        counter++;
        let profile = document.createElement(`div`);
        profile.classList.add(`profile`);

        let img =  document.createElement(`img`);
        img.setAttribute(`src`,`./iconProfile2.png`);
        img.setAttribute(`class`,`userIcon`);
        profile.appendChild(img);

        let lock = document.createElement(`label`);
        lock.textContent = `Lock`;
        profile.appendChild(lock);

        let radioLock = document.createElement(`input`);
        radioLock.setAttribute(`type`,`radio`);
        radioLock.setAttribute(`name`,`user${counter}Locked`);
        radioLock.setAttribute(`value`,`lock`);
        radioLock.checked = true;
        profile.appendChild(radioLock);

        let unlock = document.createElement(`label`);
        unlock.textContent = `Unlock`;
        profile.appendChild(unlock);

        let radioUnlocked = document.createElement(`input`);
        radioUnlocked.setAttribute(`type`,`radio`);
        radioUnlocked.setAttribute(`name`,`user${counter}Locked`);
        radioUnlocked.setAttribute(`value`,`unlock`);
        profile.appendChild(radioUnlocked);

        let br = document.createElement(`br`);
        profile.appendChild(br);
        let hr = document.createElement(`hr`);
        profile.appendChild(hr);


        let username = document.createElement(`label`);
        username.textContent = `Username`;
        profile.appendChild(username);

        let usernameInput = document.createElement(`input`);
        usernameInput.setAttribute(`type`,`text`);
        usernameInput.setAttribute(`name`,`user${counter}Username`);
        usernameInput.setAttribute(`value`,data[key][`username`]);
        usernameInput.disabled= true;
        usernameInput.readOnly= true;
        profile.appendChild(usernameInput);

        let div = document.createElement(`div`);
        div.setAttribute(`id`,`user${counter}HiddenFields`);
        div.style.display=`none`;

        let hr2 = document.createElement(`hr`);
        div.appendChild(hr2);

        let email = document.createElement(`label`);
        email.textContent = `Email`;
        div.appendChild(email);

        let emailInput = document.createElement(`input`);
        emailInput.setAttribute(`type`,`email`);
        emailInput.setAttribute(`name`,`user${counter}Email`);
        emailInput.setAttribute(`value`,data[key][`email`]);
        emailInput.disabled= true;
        emailInput.readOnly= true;
        div.appendChild(emailInput);

        let age = document.createElement(`label`);
        age.textContent = `Age`;
        div.appendChild(age);

        let ageInput = document.createElement(`input`);
        ageInput.setAttribute(`type`,`email`);
        ageInput.setAttribute(`name`,`user${counter}Age`);
        ageInput.setAttribute(`value`,data[key][`age`]);
        ageInput.disabled= true;
        ageInput.readOnly= true;
        div.appendChild(ageInput);

        let btn = document.createElement(`button`);
        btn.textContent=`Show more`;

        profile.appendChild(div);
        profile.appendChild(btn);
        main.appendChild(profile);
    }

    let buttonElements = document.querySelectorAll('div button');
    for (let i = 0; i < buttonElements.length; i++) {
        let button = buttonElements[i];
        let profileElement = button.parentElement;
        let lockedElement = profileElement.querySelector('input[value="lock"]');
        let hiddenInfoElement = profileElement.querySelector(`div`);

        button.addEventListener('click', () => {

            if (!lockedElement.checked && button.textContent == 'Show more') {
                hiddenInfoElement.style.display = 'block';
                button.textContent = 'Hide it';
            } else if (!lockedElement.checked && button.textContent == 'Hide it') {
                hiddenInfoElement.style.display = 'none';
                button.textContent = 'Show more';
            }
        });
    }
}