 let employeeDiv = document.getElementById(`employees`);


//fetch call
 



function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .thesn(url => filterThrough(url))
             .then(data => postData(data))
             .catch(error => console.log('Looks like there was a problem!', error))      
}

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

function postData (data){
    const posted = data.reduce((total, element)  => {
        total += `
        <div class="employe">
        <img src='${element.picture.large}' alt="one of our loveley employess">
        <h3>${element.name.first} ${element.name.last}</h3>
        <p>${element.email}</p>
        <p>${element.location.city}</p>
        </div>
      `;
      return total;
    });
    employees.innerHTML = posted;
}

let users = fetchData('https://randomuser.me/api/?results=12');
