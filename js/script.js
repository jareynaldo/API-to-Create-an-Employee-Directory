 let employeeDiv = document.getElementById(`employees`);
 const searchBar = document.getElementById('searchBar');



 function lastSibling(node) {
    return node === node.parentNode.querySelector(node.nodeName + ':last-of-type');
}
 //fetch call


function fetchData(url) {
     fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .then(url => url.results)
             .then(data => postData(data))
             .then(atLast)
             .catch(error => console.log('Looks like there was a problem!', error));
}

// helper functions 
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// submit abreviation;

function fullName (data){ return data.name.first + ' ' + data.name.last;}
function adress (data){return data.location.street.number + ' ' + data.location.street.name + ', ' + data.location.state + ' ' + data.location.postcode;}
function birthday (data){
    let original = data.dob.date.slice(2,10)
    let splitDate = original.split("-").reverse();
    return splitDate.join("-");
}

// submit data to html 
function postData (data){
    let posted = data.map( (employee) => ( `
        <div class="employee">
            <img src='${employee.picture.large}'data-caption="${fullName(employee)}" alt="one of our loveley employess">
            <div class="employee-text">
                <h3 class="name" >${fullName(employee)}</h3>
                <p>${employee.email}</p>
                <p>${employee.location.city}</p>
            </div>
        </div>
        <div id="myModal" class="modal">
            <div id="myclass">
                <div class="back">&#x2190</div>
                <span class="close">&times;</span>
                <img class="popupImg" src='${employee.picture.large}' alt="one of our loveley employess">
                <div class="m">
                    <h3>${fullName(employee)}</h3>
                    <p>${employee.email}</p>
                    <p>${employee.location.city}</p>
                </div>
                <div class="border"></div>
                <div class="s">
                    <p>${employee.cell}</p>
                    <p>${adress(employee)}</p>
                    <p>Birthday: ${birthday(employee)}</p>
                </div>
                <div class="next">&#x2192;</div>
            </div>
        </div>
        `
    ));  
    employees.innerHTML = posted.join("");    
}



//event listeners


function atLast(){
    const employee = document.querySelectorAll('.employee');
    const button = document.getElementsByClassName(`close`);
    const name = document.getElementsByClassName(`name`);
    const next = document.getElementsByClassName(`next`);
    const back = document.getElementsByClassName(`back`);
    // listeners to open and close elements
    for( let i = 0; i < employee.length; i++){
        employee[i].addEventListener('click', () =>{
            employee[i].nextElementSibling.style.display ="block";
        });
    }
    [...button].forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.style.display = "none";
        })
    } );
    // listeners for the search function
    searchBar.addEventListener(`keyup`, (e) =>{
        let searchString = e.target.value.toLowerCase();
            [...name].filter(emplo =>{ 
           if (!emplo.outerText.toLowerCase().includes(searchString)){
                emplo.parentElement.parentElement.style.display ="none";
           }
           if (searchString.length === 0) {
                let checkStatus = emplo.parentElement.parentElement;
                checkStatus.style.display ="flex";
            }
           });
    });
    //to delete the first and last toggle switches 
    if(next.length != 0 & back.length != 0){
        next[next.length - 1].previousElementSibling.style.padding = "1rem";
        next[next.length - 1].style.display = "none";
        back[0].nextElementSibling.nextElementSibling.style.padding = "1rem";
        back[0].style.display = "none";
    }
  // listener to toggle back and forth
    [...next].forEach(nexty => {
        nexty.addEventListener("click", () =>{
            nexty
                .parentElement
                .parentElement
                .style.display = "none";

            nexty
                .parentElement
                .parentElement
                .nextElementSibling
                .nextElementSibling
                .style.display ="block";
        });
    });
    [...back].forEach(backy => {
        backy.addEventListener("click", () =>{
            backy
                .parentElement
                .parentElement
                .style.display = "none";
                
            let lastElement = backy.parentElement.parentElement;
            lastElement.previousElementSibling.previousElementSibling.style.display ="block";
        });
    });
}

// calling function
$( document ).ready( function () {
    fetchData('https://randomuser.me/api/?results=12');
});
