var dtab = document.getElementById('dtab');
    var rowC = 2;
    var col = 2;

    var rowadd = document.getElementById('rowadd');


    rowadd.addEventListener('click', function () {
        var rowCount = dtab.rows.length;
        var columnsCount = dtab.rows[0].cells.length;
        var tr = dtab.insertRow(rowCount);
        var flagBgColor = 1;

        for (var cellMaker = 0; cellMaker < columnsCount; cellMaker++) {
            var td = document.createElement("td")
            td = tr.insertCell(cellMaker);
            td.style.padding = "40px";

            if (flagBgColor == 0) {
                //td.style.backgroundColor="red";
                td.setAttribute('class', 'dark');
                flagBgColor = 1;
                // td.setAttribute('class','dark');
            }
            td.setAttribute('class', 'light');
            flagBgColor = 0; function deleteRows() {
                var tbl = document.getElementById('dtab'); // table reference
                lastRow = tbl.rows.length - 1;           // set the last row index
                i = 1;
                // delete rows with index greater then 0
                for (i = lastRow; i > 0; i--) {
                    tbl.deleteRow(i);
                }
            }
        }
        rowC++;
    });

    function ColSub() {

        var tble = document.getElementById('dtab');
        var row = tble.rows; // Getting the rows 

        for (var i = 0; i < row[0].cells.length; i++) {

            // Getting the text of columnName 
            var str = row[0].cells[i].innerHTML;

            // If 'Geek_id' matches with the columnName  
            if (str.search("Geek_id") != -1) {
                for (var j = 0; j < row.length; j++) {

                    // Deleting the ith cell of each row 
                    row[j].deleteCell(i);
                }
            }
        }

    }
    function ColAdd() {
        var table = document.getElementById("dtab");
        var row = document.getElementById("row")
        var row2 = document.getElementById("row2")
        var row3 = document.getElementById("row3")
        var x = row.insertCell(-1);
        var y = row2.insertCell(1);
        var z = row3.insertCell(2);

    }



    function ColSub() {
        var table = document.getElementById("dtab");
        var row = document.getElementById("row")
        var row2 = document.getElementById("row2")
        var row3 = document.getElementById("row3")
        row.deleteCell(0);
        row2.deleteCell(1);
        row3.deleteCell(2);
    }


    function rowSub() {
        var table = document.getElementById("dtab");
        var row = document.getElementById("row")
        var row2 = document.getElementById("row2")
        var row3 = document.getElementById("row3")
        //  row = table.insertRow(0);
        row.deleteCell(0);
        row2.deleteCell(1);
        row3.deleteCell(2);
    }

    function rowADD() {
        var table = document.getElementById("dtab");
        var row = table.insertRow(0);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell2 = row.insertCell(2);
    }