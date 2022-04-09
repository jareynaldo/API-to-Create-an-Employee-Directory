 let employeeDiv = document.getElementById(`employees`);
 const searchBar = document.getElementById('searchBar');

 //fetch call


function fetchData(url) {
     fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .then(url => filterThrough(url))
             .then(data => postData(data))
             .catch(error => console.log('Looks like there was a problem!', error));   
    setTheTime();
}

// helper functions 
function checkStatus(response) {
if (response.ok) {
    return Promise.resolve(response);
} else {
    return Promise.reject(new Error(response.statusText));
}
}

function filterThrough(url){
     return url.results;
}
// submit abreviation;

function image (data){ return data.picture.large;}
function fullName (data){ return data.name.first + ' ' + data.name.last;}
function email (data){ return data.email;}
function city (data){return data.location.city;}
function phone (data){
    let first3 = data.cell.slice(0,3);
    let lastOnes = data.cell.slice(5,14); 
    return `(` + first3 + ')' + lastOnes;
}

function adress (data){return data.location.street.number + ' ' + data.location.street.name + ', ' + data.location.state + ' ' + data.location.postcode;}
function birthday (data){ return data.dob.date.slice(2,10)}
function actualBday(birthday){
     let bday = birthday.split("").reverse();
     return bday.join("");
}

// submit data to html 
function postData (data){
    let posted = data.reduce((total, element)  => {
         total += `
        <div class="employee">
        <img src='${image(element)}'data-caption="${fullName(element)}" alt="one of our loveley employess">
        <div class="employee-text">
        <h3 class="name" >${fullName(element)}</h3>
        <p>${email(element)}</p>
        <p>${city(element)}</p>
        </div>
        </div>
        <div id="myModal" class="modal">
        <div id="myclass">
            <img src='${image(element)}' alt="one of our loveley employess">
            <div class="m">
                <h3>${fullName(element)}</h3>
                <p>${email(element)}</p>
                <p>${city(element)}</p>
            </div>
            <div class="s">
                <span class="close">&times;</span>
                <p>${phone(element)}</p>
                <p>${adress(element)}</p>
                <p>Birthday: ${actualBday(birthday(element))}</p>
            </div>
        </div>
        </div>
        `;
        return total;
    },[]);  

    employees.innerHTML = posted;    
}


// calling function
let users = fetchData('https://randomuser.me/api/?results=12');

//event listeners

function setTheTime(){
    setTimeout(atLast, 150);
}   
function atLast(){
    const employee = document.getElementsByClassName('employee');
    const button = document.getElementsByClassName(`close`);
    const name = document.getElementsByClassName(`name`);
    [...employee].forEach(emplo => {
        emplo.addEventListener('click', () =>{
            emplo.nextElementSibling.style.display ="block";
        });
    });
    [...button].forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.parentElement.style.display = "none";
        })
    } );
    searchBar.addEventListener(`keyup`, (e) =>{
        const searchString = e.target.value.toLowerCase();
        [...name].filter(emplo =>{
           if (emplo.outerText.toLowerCase().includes(searchString)){
           } else{
              emplo.parentElement.parentElement.style.display ="none";
           }
        //    if(searchString ="") {
        //         emplo.parentElement.parentElement.style.display ="block";
        //    }
        });
        
    } );
  

}
