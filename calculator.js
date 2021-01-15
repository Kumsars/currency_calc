//Global vars
var baseCurrency = 'EUR'; 
var baseNumber = 1; 
var targetCurrency = 'USD';  

var url;
var currencyValue;
var result;
var objects = [];



displayLocalStorage();

//Swap button
    document.getElementById('change').onclick = function() {

    var tmpCurr = document.getElementById('base').value;
    var tmpNr = document.getElementById('baseNumber').value;

    document.getElementById('base').value = document.getElementById('target').value;
    document.getElementById('baseNumber').value = document.getElementById('targetNumber').value;

    document.getElementById('target').value = tmpCurr;
    document.getElementById('targetNumber').value = tmpNr;
};

    //disable equal currency
    function disableOption(){
        var selections = document.getElementById("target").length;
        var disOption = document.getElementById("target");
        var checkVal = document.getElementById('base').value;
       
        for(var i = 0; i < selections; i++){
            if(disOption[i].value == checkVal) {
                disOption[i].disabled = true;
            }else{
                disOption[i].disabled = false;
            }
        }
    }
 

function getValues(){

    baseCurrency = document.getElementById("base").value;
    targetCurrency = document.getElementById("target").value;
    baseNumber = document.getElementById("baseNumber").value;


    url = "https://api.exchangeratesapi.io/latest?symbols="+targetCurrency+"&base="+baseCurrency;

    calculate();
    
}


async function calculate(){

    var targetNumber = document.getElementById("targetNumber");

    const res = await fetch(url);
    const data = await res.json();

    currencyValue = data.rates;
    
    result = currencyValue[targetCurrency] * baseNumber;
    targetNumber.value = result; 
}

function save(){//Vērtība, laiks, datums, -> dzest, atkārtoti meklēt

    var lclStorageObject = JSON.parse(localStorage.getItem("myArray"));
    objects = [];

    if(lclStorageObject != null){
        lclStorageObject.forEach(function(element){
            objects.push(element);
        });
    }
    console.log(objects);
    
    window.localStorage.removeItem('myArray');
  

    var saveBase = document.getElementById("base").value;
    var saveBaseNr = document.getElementById("baseNumber").value;
    var saveTarget = document.getElementById("target").value;
    var saveTargetNr = document.getElementById("targetNumber").value;

    var dateLong = new Date();
    var date = dateLong.getDate();
    var month = dateLong.getMonth();
    var hours = dateLong.getHours();
    var min = dateLong.getMinutes();
 

    let object = {
        base: saveBase,
        baseNr: saveBaseNr,
        target: saveTarget,
        targetNr: saveTargetNr,
        month: month,
        date: date,
        hours: hours,
        minutes: min
    }
    
    objects.push(object)
    
    localStorage.setItem("myArray", JSON.stringify(objects));
    
    
}

function displayLocalStorage() {

    var lsArray = JSON.parse(localStorage.getItem("myArray"));

    lsArray.forEach(function(element){

        var list = document.getElementById('list');
        //create div
        const storageItem = document.createElement('div');
        storageItem.classList.add("item");
        //inside div
        const lbl = document.createElement('h5');
        lbl.innerText = element['base'] + " to "+element['target'];

        const ratio = document.createElement('h5');
        ratio.innerText = " Ratio: "+element['baseNr']+" : "+element['targetNr'];

        const currencyDate = document.createElement('h5');
        currencyDate.innerText = "Date: "+element['date']+"/"+element['month']+1;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete";

        const checkAgain = document.createElement('button');
        checkAgain.innerText = "Check";

        
        
        storageItem.appendChild(lbl);
        storageItem.appendChild(ratio);
        storageItem.appendChild(currencyDate);
        storageItem.appendChild(deleteBtn);
        storageItem.appendChild(checkAgain);
        
        list.appendChild(storageItem);

    });

}





