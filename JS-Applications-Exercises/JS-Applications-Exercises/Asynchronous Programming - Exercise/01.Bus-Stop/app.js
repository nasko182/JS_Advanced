async function getInfo() {
   
        let id = document.getElementById(`stopId`).value;
        let stopName = document.getElementById(`stopName`);
        let busesUl = document.getElementById(`buses`);

        stopName.textContent= ``;
        busesUl.innerHTML=``;

        try{
        let response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${id}`);

        document.getElementById(`stopId`).value = ``;

            if(!response.ok){
                throw new Error;
            }
                let data =await response.json();
    
            let name = data.name;
            let buses = data.buses;
    
            stopName.textContent= name;
    
            for (const key in buses) {
                let li = document.createElement(`li`);
    
                li.textContent = `Bus ${key} arrives in ${buses[key]} minutes`;
    
                busesUl.appendChild(li);
            }
            
        }
        catch(err){
          stopName.textContent=`Error`;
        }

    
    
}