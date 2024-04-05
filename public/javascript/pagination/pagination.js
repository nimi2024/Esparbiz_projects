console.log('pagination page')
let total_records = JSON.parse("<%= n %>");
let particular_records = JSON.parse("<%= limit %>");
// let pages = parseInt(total_records / particular_records);
let pages=Math.ceil(total_records / particular_records);
// console.log(pages);
let initial_value = 1;
let value = localStorage.getItem("page-value") ? localStorage.getItem("page-value") : 1;

//buttons
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let double_prev = document.getElementById("double_prev");
let double_next = document.getElementById("double_next");
let count = document.getElementById("count");



//update when page is refresing
count.innerText = value;



//for urls 
const host = `http://localhost:3000/pagination/?`;

//condition for disable button 

if (value === "1") {
    prev.classList.add("disable");
    double_prev.classList.add("disable");
}
if (value === `${pages}`) {
    next.classList.add("disable");
    double_next.classList.add("disable");
}


const addUrlParameter = (name, value) => {
    let searchParams = new URLSearchParams(window.location.search)
    searchParams.set(name, value)
    window.location.search = searchParams.toString();
    // console.log(searchParams);
}

const removeurlParameter = (value) => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(value);
    window.location.search = searchParams.toString();
}


const nextPage = () => {
    console.log("next click");
    if (value > 0 && value < pages) {
        localStorage.setItem("page-value", ++value);
        addUrlParameter("p", value);
        // let newUrl = `${host}p=${value}`;
        // window.location.href = newUrl;
        return value;
    }
}

const prevPage = () => {
    console.log("prev click");
    if (value <= pages && value > 1) {
        localStorage.setItem("page-value", --value);
        addUrlParameter("p", value);
        // let newUrl = `${host}p=${value}`;
        // window.location.href = newUrl;
        return value;
    }
}

const startingPage = () => {
    console.log("starting page");
    if (value <= pages && value > 1) {
        //reset value of page
        value = 1;
        localStorage.setItem("page-value", value);
        addUrlParameter("p", value);
        // let newUrl = `${host}p=${value}`;
        // window.location.href = newUrl;
        return value;
    }
}

const endingPage = () => {
    console.log("ending page");
    if (value > 0 && value < pages) {
        value = pages;
        localStorage.setItem("page-value", value);
        addUrlParameter("p", value);
        // let newUrl = `${host}p=${value}`;
        // window.location.href = newUrl;
        return value;
    }
}

// event handling

prev.addEventListener("click", () => prevPage());
next.addEventListener("click", () => nextPage());
double_prev.addEventListener("click", () => startingPage());
double_next.addEventListener("click", () => endingPage());

