console.log("hello its js page");
let message;
let arr = [document.getElementById("basicDetails"), document.getElementById("educational"), document.getElementById("workexp"), document.getElementById("language"), document.getElementById("technology"), document.getElementById("reference"), document.getElementById("preference")];
console.log(arr.length)
let currIndex = 0;
console.log(currIndex);
function next() {
    if (currIndex < arr.length - 1) {
        if (validationEvent(arr[currIndex].id)) {
            arr[currIndex].style.display = "none";
            currIndex++;
            arr[currIndex].style.display = "flex";
        }
    }
    if (currIndex == arr.length - 1) {
        document.getElementById("nex").style.display = "none";
        document.getElementById("submit").style.display = "block";
    }
}
function validate() {
    validationEvent(arr[arr.length - 1].id)
}
const sub = document.getElementById("submit");
submit.addEventListener("click", validate);
function previous() {
    if (currIndex > 0) {
        arr[currIndex].style.display = "none";
        // validationEvent(arr[currIndex].id); 
        currIndex--;

        arr[currIndex].style.display = "flex";


    }
    if (currIndex == arr.length - 2) {
        document.getElementById("nex").style.display = "block";
    }
}
const form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
    const formData = new FormData(form);
    const url = new URLSearchParams(window.location.href)
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        return error;
    }
});
function addrow() {
    let row = document.getElementById("work_exp");
    let table = document.getElementById("modify");
    let clone = row.cloneNode(true);
    table.appendChild(clone);
}
function add_row1() {
    let row = document.getElementById("edu");
    let table = document.getElementById("tbl");
    let clone = row.cloneNode(true);
    table.appendChild(clone);
}
function subcol() {
    document.getElementById("modify").deleteRow(0);

}
function sub_col1() {
    document.getElementById("tbl").deleteRow(0);

}
// basic details validation
function validateFname(firstname) {
    if (!firstname == null || firstname.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please Enter FirstName';
        message.style.color = 'red';
        return false
    }
    else if (!/^[a-zA-Z]{2,30}$/.test(firstname)) {

        message = document.getElementById('message');
        message.innerHTML = 'FirstName should have only characters';
        message.style.color = 'red';
        return false;
    }
    else {
        return true
    }
}
function validateLname(lastname) {
    if (!lastname == null || lastname.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please Enter LastName';
        message.style.color = 'red';
        return false
    }
    else if (!/^[a-zA-Z]{2,30}$/.test(lastname)) {

        message = document.getElementById('message');
        message.innerHTML = 'Lastname should have only characters';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function vaildateDesig(designation) {
    if (!designation == null || designation.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please Enter Designation';
        message.style.color = 'red';
        return false
    }
    else {
        return true;
    }
}
function validateAddress1(address1) {
    if (!address1 == null || address1.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please Enter Address1';
        message.style.color = 'red';
        return false
    }
    else {
        return true;
    }
}

function validateAddress2(address2) {
    if (!address2 == null || address2.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please Enter Address2';
        message.style.color = 'red';
        return false
    }
    else {
        return true;
    }
}

function validateEmail(email) {
    if (!email == null || email.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Email Address is required';
        message.style.color = 'red';
        return false;
    }
    else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)) {

        message = document.getElementById('message');
        message.innerHTML = 'Email should be in proper pattern like abc.def@gmail.com';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function validatePhoneNo(phoneno) {
    if (!phoneno == null || phoneno.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Phone number is required';
        message.style.color = 'red';
        return false;
    }
    else if (!/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/.test(phoneno)) {

        message = document.getElementById('message');
        message.innerHTML = 'Phono number should be in proper format with country code';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }

}
function validateEmail(email) {
    if (!email == null || email.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Email Address is required';
        message.style.color = 'red';
        return false;
    }
    else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)) {

        message = document.getElementById('message');
        message.innerHTML = 'Email should be in proper pattern like abc.def@gmail.com';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function validateCity(city) {
    if (!city == null || city.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'City is required';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function validateState(state) {
    if (!state == null || state.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please select a state';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function validateMaleFemale(male, female) {
    if (male.checked == false || female.checked == false) {

        message = document.getElementById('message');
        message.innerHTML = 'Please enter gender';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function validateZipcode(zipcode) {
    if (!zipcode == null || zipcode.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Zipcode is required';
        message.style.color = 'red';
        return false;
    }
    else if (!/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(zipcode)) {

        message = document.getElementById('message');
        message.innerHTML = 'zipcode should be 6 digits';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }

}
function validateRelStatus(rel_status) {
    if (!rel_status == null || rel_status.trim() == '') {

        message = document.getElementById('message');
        message.innerHTML = 'Please select a relationship_status';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function validateDOB(dob) {
    if (!dob == null || dob.trim() == '') {
        message = document.getElementById('message');
        message.innerHTML = 'Date of birth is required';
        message.style.color = 'red';
        return false;
    }
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        message = document.getElementById('message');
        message.innerHTML = 'Date of birth should be in yyyy-mm-dd';
        message.style.color = 'red';
        return false;
    }
    else {
        return true;
    }
}
function ValidateBasicDetails() {
    let firstname = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let designation = document.getElementById("designation").value;
    let address1 = document.getElementById("address1").value;
    let address2 = document.getElementById("address2").value;
    let email = document.getElementById("email").value;
    let phoneno = document.getElementById("phoneno").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let male = document.getElementById("male").value;
    let female = document.getElementById("female").value;
    let zipcode = document.getElementById("zipcode").value;
    let rel_status = document.getElementById("status").value;
    let dob = document.getElementById("date").value;
    let val = validateFname(firstname) && validateLname(lastname) && vaildateDesig(designation) && validateAddress1(address1) && validateAddress2(address2) && validateEmail(email) && validatePhoneNo(phoneno) && validateCity(city) && validateState(state) && validateMaleFemale(male, female) && validateZipcode(zipcode) && validateRelStatus(rel_status) && validateDOB(dob);
    return val;
}
function validateEducation() {
    console.log("its a education page........")
    let education = document.getElementById("education").value;
    let board_course = document.getElementById("board_course").value;
    let passingyear = document.getElementById("passingyear").value;
    let percentage = document.getElementById("percentage").value;
    // console.log(education, board_course, passingyear, percentage);

    if (!(education && board_course && passingyear && percentage)) {
        message = document.getElementById('message1');
        message.innerHTML = 'please enter all the fields';
        message.style.color = 'red';
    } else {
        return true;
    }
}


function vaildateWorkExperience() {
    let company = document.getElementById("company").value;
    let designation = document.getElementById("designation").value;
    let date_from = document.getElementById("from").value;
    let date_to = document.getElementById("to").value;

    if (!(company && designation && date_from && date_to)) {
        message = document.getElementById('message3');
        message.innerHTML = 'please enter all the fields';
        message.style.color = 'red';
    } else {
        return true;
    }
}
function validateLanguage() {
    let lang = document.querySelectorAll(".lang");
    for (let i = 0; i < lang.length; i++) {
        let language = document.getElementsByName(`lang[${i}][language]`)[0];
        let read = document.getElementsByName(`lang[${i}][is_read]`)[0];
        let write = document.getElementsByName(`lang[${i}][is_write]`)[0];
        let speak = document.getElementsByName(`lang[${i}][is_speak]`)[0];
        console.log("lang", language);
        if (!(language.checked)) {
            message = document.getElementById('message4');
            alert('please checked the fields')
            message.innerHTML = 'please checked the fields';
            message.style.color = 'red';
            return false;
        }
        else if (!read.checked && !write.checked && !speak.checked) {
            message = document.getElementById('message4');
            alert(`please check all the details of language ${language.value}`)
            message.innerHTML = `please check all the details of language ${language.value}`;
            message.style.color = 'red';
            return false;
        }
        else {
            return true;
        }
    }
}

function validateTechnology() {
    let php = document.getElementById("php");
    let mysql = document.getElementById("mysql");
    let laravel = document.getElementById("laravel");
    let oracle = document.getElementById("oracle");

    if (!(php.checked)) {
        message = document.getElementById('message5');
        message.innerHTML = 'please check any option of php';
        message.style.color = 'red';
        return false;
    } else if (!document.getElementById("beginer").checked && !document.getElementById("mideator").checked && !document.getElementById("expert").checked) {
        message = document.getElementById('message5');
        message.innerHTML = 'please check any option of php';
        message.style.color = 'red';
        return false;
    }

    else if (mysql.checked) {
        if (!document.getElementById("beginer1").checked && !document.getElementById("mideator1").checked && !document.getElementById("expert1").checked) {
            message = document.getElementById('message5');
            message.innerHTML = `Please select technology level of ${mysql.value}`;
            message.style.color = 'red';
            return false;

        }
        return true
    }
    else if (laravel.checked) {

        if (!document.getElementById("beginer2").checked && !document.getElementById("mideator2").checked && !document.getElementById("expert2").checked) {
            message = document.getElementById('message5');
            message.innerHTML = `Please select technology level of ${laravel.value}`;
            message.style.color = 'red';
            return false;
        }
        return true
    }
    else if (oracle.checked) {
        if (!document.getElementById("beginer3").checked && !document.getElementById("mideator3").checked && !document.getElementById("expert3").checked) {
            message = document.getElementById('message5');
            message.innerHTML = `Please select technology level of ${oracle.value}`;
            message.style.color = 'red';
            return false;
        }
    }
    return true;
}
function validateReference() {
    let refere = document.querySelectorAll(".refer");
    for (let i = 0; i < refere.length; i++) {
        let name = document.getElementsByName(`ref[${i}][name]`)[0].value;
        let contact = document.getElementsByName(`ref[${i}][contactNo]`)[0].value;
        let relation = document.getElementsByName(`ref[${i}][relation]`)[0].value;
        console.log(name, contact, relation);
        if (!(name)) {
            alert("Please fill all fields");
            return false;
        }
        else if (!(contact && relation)) {

            alert(`Please fill all the details of reference contact`);
            return false;

        }
    }
    return true;
}
function validatePreference() {
    let location = document.getElementById("location").value;
    let notice_period = document.getElementById("period").value;
    let dept = document.getElementById("depart").value;
    let exctc = document.getElementById("exctc").value;
    let curctc = document.getElementById("curctc").value;
    if (!(location)) {
        alert('please choice your prefered location');
        return false;
    }
    else if (!(notice_period && dept && exctc && curctc)) {
        alert("Please fill the all fields of preferances");
        return false;
    }
    else {
        return true;
    }
}
function validationEvent(id) {
    if (id == "basicDetails") {
        // console.log(ValidateBasicDetails())
        return ValidateBasicDetails();
    } else if (id == "educational") {
        // console.log(validateEducation())
        return validateEducation();
    } else if (id == "workexp") {
        return vaildateWorkExperience();
    } else if (id == "language") {
        return validateLanguage();
    } else if (id == "technology") {
        return validateTechnology();
    } else if (id == "reference") {
        return validateReference();
    } else if (id == "preference") {
        return validatePreference();
    }
}
function fillData(result) {
    employeeData(result);
    educationData(result);
    workExperience(result);
    languageData(result);
    technologydata(result);
    referenceData(result);
    preferenceData(result);
}
function employeeData(result) {
    document.getElementById("fname").value = result[0][0]["firstname"];
    document.getElementById("lname").value = result[0][0]["lastname"];
    document.getElementById("designation").value = result[0][0]["designation"];
    document.getElementById("email").value = result[0][0]["email"];
    document.getElementById("phoneno").value = result[0][0]["phoneno"];
    document.getElementById("address1").value = result[0][0]["address1"];
    document.getElementById("address2").value = result[0][0]["address2"];
    // document.getElementById("city").value = result[0][0]["city"];
    document.getElementById("zipcode").value = result[0][0]["zipcode"];
    document.getElementById("date").value = result[0][0]["dateofbirth"].split("T")[0];
    let radio = document.getElementsByName("gender");
    if (radio[0].value === result[0][0]["gender"]) {
        radio[0].checked = true;
    }
    else {
        radio[1].checked = true;
    }
    let state = document.getElementById("state");
    let options = state.options;
    for (let key in options) {
        if (options[key].value === result[0][0]["state"]) {
            options[key].setAttribute("selected", "");
        }

    }
    let city = document.getElementById("city");
    let options1 = city.options;
    for (let key in options) {
        if (options1[key].value === result[0][0]["city"]) {
            options1[key].setAttribute("selected", "");
        }

    }
    let rel_stat = document.getElementById("status");
    let opt = rel_stat.options;
    for (let key in opt) {
        if (opt[key].value === result[0][0]["relationship_status"]) {
            opt[key].setAttribute("selected", "");
        }

    }
}
function referenceData(result) {
    document.getElementById("name").value = result[5][0]["name"];
    document.getElementById("contact").value = result[5][0]["contactNo"];
    document.getElementById("relation").value = result[5][0]["relation"];
    document.getElementById("name1").value = result[5][1]["name"];
    document.getElementById("contact1").value = result[5][1]["contactNo"];
    document.getElementById("relation1").value = result[5][1]["relation"];
}
function preferenceData(result) {
    let loc = document.getElementById("location");
    let options = loc.options;
    let val = result[6][0]["location"].split(",");
    // console.log(val);
    for (let key in options) {
        // console.log(options[key])
        for (let value in val) {
            // console.log(options[key].value === val[value]);
            if (options[key].value === val[value]) {
                options[key].setAttribute("selected", "");
            }
        }
    }
    document.getElementById("period").value = result[6][0]["notice_period"];
    document.getElementById("exctc").value = result[6][0]["expected_ctc"];
    document.getElementById("curctc").value = result[6][0]["current_ctc"];
    let dept = document.getElementById("depart");
    let opt = dept.opt;
    for (let key in opt) {
        if (opt[key].value === result[6][0]["department"]) {
            opt[key].setAttribute("selected", "");
        }
    }
}
function technologydata(result) {
    for (i in result[4]) {
        // console.log(result[4][i].tech_level)
        if ((result[4][i].technology == "PHP")) {
            let id = result[4][i];

            document.getElementById("php").checked = true;
            if (id.tech_level == "Beginer") {
                document.getElementsByName("php_tech_level")[0].checked = true;
            }
            else if (id.tech_level == "Mideator") {
                document.getElementsByName("php_tech_level")[1].checked = true;
            }
            else {
                document.getElementsByName("php_tech_level")[2].checked = true;
            }


        }
        if ((result[4][i].technology == "MySQL")) {
            document.getElementById("mysql").checked = true;
            let id = result[4][i];
            // console.log(id.tech_level);
            if (id.tech_level == "Beginer") {
                document.getElementsByName("mysql_tech_level")[0].checked = true;
            } else if (id.tech_level == "Mideator") {
                document.getElementsByName("mysql_tech_level")[1].checked = true;
            }
            else {
                document.getElementsByName("mysql_tech_level")[2].checked = true;
            }


        }
        if ((result[4][i].technology == "Laravel")) {
            document.getElementById("laravel").checked = true;
            let id = result[4][i];
            // console.log(id.tech_level);
            if (id.tech_level == "Beginer") {
                document.getElementsByName("laravel_tech_level")[0].checked = true;
            } else if (id.tech_level == "Mideator") {
                document.getElementsByName("laravel_tech_level")[1].checked = true;
            }
            else {
                document.getElementsByName("laravel_tech_level")[2].checked = true;
            }

        }
        if ((result[4][i].technology == "Oracle")) {
            document.getElementById("oracle").checked = true;
            let id = result[4][i];
            // console.log(id.tech_level);
            if (id.tech_level == "Beginer") {
                document.getElementsByName("oracle_tech_level")[0].checked = true;
            } else if (id.tech_level == "Mideator") {
                document.getElementsByName("oracle_tech_level")[1].checked = true;
            }
            else {
                document.getElementsByName("oracle_tech_level")[2].checked = true;
            }

        }
    }
}
function languageData(result) {
    let lang = document.querySelectorAll(".lang");
    let arr = {};

    result[3].forEach(item => {
        let values = Object.values(item);
        arr[values[2]] = values.slice(3, values.length);
    })

    for (let i = 0; i < lang.length; i++) {
        let language = document.getElementsByName(`lang[${i}][language]`)[0].value;
        let languageroot = document.getElementsByName(`lang[${i}][language]`)[0];
        let read = document.getElementsByName(`lang[${i}][is_read]`)[0];
        let write = document.getElementsByName(`lang[${i}][is_write]`)[0];
        let speak = document.getElementsByName(`lang[${i}][is_speak]`)[0];


        if (arr[language]) {
            console.log(arr[language], language, read, write, speak);
            languageroot.checked = true;

            if (arr[language].includes("Read")) {
                read.checked = true;
            }
            if (arr[language].includes("Write")) {
                write.checked = true;
            }
            if (arr[language].includes("Speak")) {
                speak.checked = true;
            }
        }
    }
}
function educationData(result) {
    // console.log(result[1])
    for (let i = 0; i < result[1].length; i++) {
        console.log(result[1][i])
        if (i == 0) {
            document.getElementsByName("education[]")[0].value = result[1][i]["education"];
            document.getElementsByName("nameOfboard_course[]")[0].value = result[1][i]["nameofboard_course"];
            document.getElementsByName("passingyear[]")[0].value = result[1][i]["passingyear"];
            document.getElementsByName("percentage[]")[0].value = result[1][i]["percentage"];
        }
        else {
            let td = document.createElement("tr");
            td.setAttribute("id", "edu");
            document.getElementById("tbl").appendChild(td);

            let labelname = ["Education", "Board/Course", "Passingyear", "Percentage"];
            let inputname = ["education[]", "nameOfboard_course[]", "passingyear[]", "percentage[]"]

            let value = [result[1][i]["education"], result[1][i]["nameofboard_course"], result[1][i]["passingyear"], result[1][i]["percentage"]]

            for (let j = 0; j < 4; j++) {
                let z = document.createElement("td");
                let label = document.createElement("label");
                let labelText = document.createTextNode(labelname[j]);
                label.appendChild(labelText);
                z.appendChild(label);

                let input = document.createElement("input");
                input.type = "text";
                input.name = inputname[j];
                input.value = value[j];
                z.appendChild(input);
                z.appendChild(input);
                td.appendChild(z);
            }
            // let button = document.createElement("input");
            // button.
        }
    }
}
function workExperience(result) {
    for (let i = 0; i < result[2].length; i++) {
        console.log(result[2][i])
        if (i == 0) {
            document.getElementsByName("company_name[]")[0].value = result[2][i]["company_name"];
            document.getElementsByName("desig[]")[0].value = result[2][i]["designation"];
            document.getElementsByName("date_from[]")[0].value = result[2][i]["date_from"].split("T")[0];
            document.getElementsByName("date_to[]")[0].value = result[2][i]["date_to"].split("T")[0];
        }
        else {
            let td = document.createElement("tr");
            td.setAttribute("id", "work_exp");
            document.getElementById("modify").appendChild(td);

            let labelname = ["Company Name", "Designation", "From", "To"];
            let inputname = ["company_name[]", "desig[]", "date_from[]", "date_to[]"]

            let value = [result[2][i]["company_name"], result[2][i]["designation"], result[2][i]["date_from"].split("T")[0], result[2][i]["date_to"].split("T")[0]]

            for (let j = 0; j < 4; j++) {
                let z = document.createElement("td");
                let label = document.createElement("label");
                let labelText = document.createTextNode(labelname[j]);
                label.appendChild(labelText);
                z.appendChild(label);

                let input = document.createElement("input");
                input.type = "text";
                input.name = inputname[j];
                input.value = value[j];
                z.appendChild(input);
                z.appendChild(input);
                td.appendChild(z);
            }
        }
    }
}
