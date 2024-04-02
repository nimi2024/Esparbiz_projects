console.log("hello its forgot js");
document.getElementById('submit').addEventListener('click', async () => {

    const formData = new FormData(document.getElementById('forgotForm'));
    console.log('formdata', formData);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
        console.log(data)
    }
    console.log("data is:", data)



    try {

        const response = await fetch('http://localhost:3000/forgot-password', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)

        })
        console.log('data fetching')
        const result = await response.json();
        console.log( "result is:",result);
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `<p> server response: ${result.message}</p>`;

    } catch(error){

       return error

    }
    function displaySucess(message) {
        const errorMessage = document.getElementById('output');
        errorMessage.style.color = 'red';
        errorMessage.textContent = message;

    }

    displaySucess('');
}

);

forgotForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == '') {
        displayError('please Enter Your Email');
        return;
    }

    if (!emailpattern.test(email)) {
        displayError('please Enter Valid email address');
        return;
    }



    function displayError(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.color = "red";
        errorMessage.textContent = message;
    }

    function displaysucess(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.color = 'green';
        errorMessage.textContent = message;

    }
    displaysucess('Login sucessfully!.');

});
