function attachEvents() {

    let getWhether = document.getElementById(`submit`);
    const forecastDiv = document.querySelector('#forecast');
    const currentDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');

    let code = ``;
    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'

    }

    getWhether.addEventListener(`click`, async () => {
        let location = document.getElementById(`location`).value;
        let response = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`);

        let data = await response.json();


        forecastDiv.style.display = `block`;
        try {
            code = data.find(l => l.name === location).code;



            response = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);

            data = await response.json();

        let insideDiv = document.createElement(`div`);
        insideDiv.classList.add(`forecasts`);
        let symbolSpan = document.createElement(`span`);
        symbolSpan.classList.add(`condition`,`symbol`);
        symbolSpan.textContent = symbols[data[`forecast`][`condition`]];
        insideDiv.appendChild(symbolSpan);

        let span = document.createElement(`span`);
        span.classList.add(`condition`);

        let locationSpan = document.createElement(`span`);
        locationSpan.classList.add(`forecast-data`);
        locationSpan.textContent = data[`name`];
        span.appendChild(locationSpan);

        let tempSpan = document.createElement(`span`);
        tempSpan.classList.add(`forecast-data`);
        tempSpan.textContent = `${data[`forecast`][`low`]}${symbols.Degrees}/${data[`forecast`][`high`]}${symbols.Degrees}`;
        span.appendChild(tempSpan);

        let conditionSpan = document.createElement(`span`);
        conditionSpan.classList.add( `forecast-data`);
        conditionSpan.textContent = `${data[`forecast`][`condition`]}`;
        span.appendChild(conditionSpan);


        insideDiv.appendChild(span);
        currentDiv.appendChild(insideDiv);

        response = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);

        data = await response.json();

        insideDiv = document.createElement(`div`);
        insideDiv.classList.add(`forecast-info`);

        for (const key in data[`forecast`]) {
            span = document.createElement(`span`);
            span.classList.add(`upcoming`);

            symbolSpan = document.createElement(`span`);
            symbolSpan.classList.add(`symbol`);
            symbolSpan.textContent = symbols[data[`forecast`][key][`condition`]];
            span.appendChild(symbolSpan);

            tempSpan = document.createElement(`span`);
            tempSpan.classList.add(`forecast-data`);
            tempSpan.textContent = `${data[`forecast`][key][`low`]}${symbols.Degrees}/${data[`forecast`][key][`high`]}${symbols.Degrees}`;
            span.appendChild(tempSpan);

            let conditionSpan = document.createElement(`span`);
            conditionSpan.classList.add(`forecast-data`);
            conditionSpan.textContent = `${data[`forecast`][key][`condition`]}`;
            span.appendChild(conditionSpan);


            insideDiv.appendChild(span);
        }
        upcomingDiv.appendChild(insideDiv);
    }
    catch (err) {
        forecastDiv.innerHTML = ``;
        let errorSpan = document.createElement('span');
        errorSpan.textContent = 'Error';
        forecastDiv.appendChild(errorSpan);
    }
    })

}

attachEvents();