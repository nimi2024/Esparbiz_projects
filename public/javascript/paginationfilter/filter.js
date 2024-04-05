let month_selector = document.getElementById("month");
let year_selector = document.getElementById("year");
let month = localStorage.getItem("month") ? localStorage.getItem("month") : month_selector.value;
let year = localStorage.getItem("year") ? localStorage.getItem("year") : year_selector.value;
let filter_button = document.getElementById("filter_button");

month_selector.value = month;
year_selector.value = year;



const getfilterValue = () => {
    localStorage.setItem("page-value", 1);
    localStorage.setItem("month", month_selector.value);
    localStorage.setItem("year", year_selector.value);
    window.location.href = `/pagination/?month_year=${month_selector.value}_${year_selector.value}`
   
}

filter_button.addEventListener("click", () => getfilterValue());