
function addcol(){
    var row = document.getElementById("demo");
    var table = document.getElementById("modify");
    var clone = row.cloneNode(true);
    table.appendChild(clone);

}
function subcol(){
    document.getElementById("modify").deleteRow(0);

}

function addrow(){
    let tbl = document.getElementById('dtab');

    for(let i=0; i<tbl.rows.length; i++)
    {
        let r = tbl.rows[i];
        r.insertCell(0);
    }
}
function subrow(){
    let tbl = document.getElementById('dtab');

    for(let i=0;i<tbl.rows.length; i++){
        let r = tbl.rows[i];
        r.deleteCell(0);
    }
}