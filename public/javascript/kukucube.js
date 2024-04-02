
var score = 0;
var timeleft= 7 ;
var elem = document.getElementById('Timer');
var scrprint = document.getElementById('scoreCount');
var timerId = setInterval(countdown, 1000);

document.addEventListener("click", function (e) {
    const target = e.target.closest("#target");

    if (target) {
        countdown(); 
        add_row();
        add_coloumn();
        add_color();
        opacity1();
         
        score += 1;
        scrprint.innerHTML = "Score:" + score + "";
        target.removeAttribute("id");
        //addRowColumn();
    }
});

function add_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgcolor = "rgb(" + x + "," + y + "," + z + ")";
    document.getElementById("t1").style.background = bgcolor;

    // document.getElementById("t1").style.opacity = 1.0;

    var x = document.getElementById('t1').getElementsByTagName("td");
    for (var i=0; i<x.length; i++){
        x[i].style.opacity= 1.0;
    }
}

function opacity1() {
    var x = document.getElementById('t1').getElementsByTagName("td")
    var randomNum = Math.floor(Math.random() * (parseInt(x.length)));
  
    x[parseInt(randomNum)].style.opacity -= 0.9;
    x[parseInt(randomNum)].setAttribute('id', 'target');
}



function countdown() {
    if (timeleft == -1) {
        elem.innerHTML = 'Timeout';
        clearTimeout(timerId);
        document.getElementById("t1").style.pointerEvents = "none";
        alert( "reload ");
        location.reload();       

    } else {
        elem.innerHTML = timeleft + 'second remainning';
        timeleft--;
        //alert( "reload ")
        //location.reload();       
    }
}


var counter = 5;
function add_row() {
    var tbl = document.getElementById("t1");
    var row_count = tbl.rows.length;
    var cols_count = tbl.rows[0].cells.length;
    var emptyRow = tbl.insertRow(row_count.length);
    var cell;
    for (var i = 0; i < cols_count; i++) {
        cell = emptyRow.insertCell(i);
        cell.id = counter.toString();
        counter++;
    }
}

function add_coloumn() {
    var tbl = document.getElementById("t1");
    var row_count = tbl.rows.length;
    var col_count = tbl.rows[0].cells.length;
    var rows = tbl.rows;
    for (var i = 0; i < row_count; i++) {
        cell = rows[i].insertCell(col_count);
        cell.id = counter.toString();
        counter++;
    }
}




 