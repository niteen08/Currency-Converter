
const base_url =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

 for(let select of dropdowns){
    for(let currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        select.append(newOptions);
        if(select.name === "from" && currCode === "USD"){
            newOptions.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOptions.selected = "selected";
        }
    }

    select.addEventListener("change", (evt) =>{
         flagUpdate(evt.target);

    });
 }


 const flagUpdate = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img  = element.parentElement.querySelector("img");
    img.src = newSrc; 

 }


btn.addEventListener("click",  async (evnt) =>{
       evnt.preventDefault();
       
       let amount  = document.querySelector(".amount input");
       let amountVal = amount.value;
       if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
        
       }
       console.log(amountVal);
       console.log(fromCurr.value, toCurr.value);

       let from = fromCurr.value.toLowerCase();
       let to = toCurr.value.toLowerCase();
       console.log(from, to );
       let fromUrl = `${base_url}/${from}.json`;
       console.log(fromUrl);     
       let response = await fetch(fromUrl);
       let data = await response.json();
       let toCurrRate = data[from][to];

       let finalAmount = amountVal * toCurrRate;

       console.log(finalAmount);

       let msg = document.querySelector(".msg");
       msg.innerText = `${amountVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
});   

 
