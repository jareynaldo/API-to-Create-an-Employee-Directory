 let employeeDiv = document.getElementById(`employees`);

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
function phone (data){return data.cell;}
function adress (data){return data.location.street + ' ' + data.location.name + ', ' + data.location.state + ' ' + data.location.postalcode;}
function birthday (data){ return data.dob.date.indexOf(10)}

// submit data to html 
function postData (data){
    const posted = data.reduce((total, element)  => {
        const adding = `
        <div class="employee">
        <img src='${image(element)}' alt="one of our loveley employess">
        <div class="employee-text">
        <h3>${fullName(element)}</h3>
        <p>${email(element)}</p>
        <p>${city(element)}</p>
        </div>
        </div>
      `;
        total += adding;
        // total += settingPopup(adding, element);

      return total;
    },[]);
    employees.innerHTML = posted;
    
}
function popupFunc(set) {
    console.log(set);
    let popText = `
    <div id="myModal" class="modal">
    <img src='${image(set)}' alt="one of our loveley employess">
    <div class="m">
        <h3>${fullName(set)}</h3>
        <p>${email(set)}</p>
        <p>${city(set)}</p>
    </div>
    <div class="s">
    <span class="close">&times;</span>
    <p>${phone(set)}</p>
    <p>${adress(set)}</p>
    <p>Birthday: ${birthday(set)}</p>
    </div>
    </div>
    `; 
    
}

// calling function
let users = fetchData('https://randomuser.me/api/?results=12');



//event listeners
let pop = document.getElementsByClassName(`employee`);

function settingPopup (adding, set) {
     adding.addEventListener( `click`, popupFunc(set));
};



//fetch call
 


function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .then(url => filterThrough(url))
             .then(data => postData(data))
             .catch(error => console.log('Looks like there was a problem!', error))      
}