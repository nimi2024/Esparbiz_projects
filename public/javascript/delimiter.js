let total_rec = 50000;
let limit = JSON.parse('<%= limit %>');
let pages = total_rec / limit;
let value = '<%= page %>';
let prev = document.getElementById("previouspage");
let next = document.getElementById("nextpage");
let first = document.getElementById("firstpage");
let last = document.getElementById("lastpage");
let curpage = document.getElementById("curpage");
curpage.innerText = value;
if(value == 1){
    prev.style.opacity = "0.5";
    prev.disabled = true;
    first.style.opacity = "0.5";
    first.disabled = true;
}
if(value == pages){
    next.style.opacity = "0.5";
    next.disabled = true;
    last.style.opacity = "0.5";
    last.disabled = true;
}
const pre = () =>{
    if(value > 1  && value <= pages){
        console.log("Previous page");
        localStorage.setItem("page", --value);
        let url = value;
        // loadUrl(url);
        append_parameter("page",url);
        return value;
    }
}
const nex = () =>{
    if(value>=1 && value < pages){
        console.log("Next Page");
        localStorage.setItem("page", ++value);
        let url = value;
        // loadUrl(url);
        append_parameter("page",url);
        return value;
    }
}
const firstpg = ()=> {
    console.log("starting page");
    value = 1;
    localStorage.setItem("page" ,value);
    let url = value;
    // loadUrl(url);
    append_parameter("page",url);
    return value;
}
const lastpg = ()=> {
    console.log("last page");
    value = pages;
    localStorage.setItem("page" ,value);
    let url = value;
    // loadUrl(url);
    append_parameter("page",url);
    return value;

}

function asc(value){
    window.location.href=`/student_list?obf=${value}&ord=asc`;
    // append_parameter("obf",value);
    // append_parameter("ord","asc");
}

function desc(value){
    window.location.href=`/student_list?obf=${value}&order=desc`;
    // append_parameter("obf",value);
    // append_parameter("ord","desc");
}

const append_parameter = (name,value) =>{
    let params = new URLSearchParams(window.location.search);   
    params.set(name,value);
    window.location.search = params.toString();
    console.log(params);
}

const remove_parameter = (name,value) =>{
    let params = new URLSearchParams(window.location.search);   
    params.delete(name);

}
prev.addEventListener("click",pre);
next.addEventListener("click",nex);
first.addEventListener("click",firstpg);
last.addEventListener("click", lastpg);
