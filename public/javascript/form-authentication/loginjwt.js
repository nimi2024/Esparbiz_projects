console.log("login Page")
document.getElementById('submit').addEventListener('click', async () => {

    const formData = new FormData(document.getElementById('loginFormJwt'));
    console.log('formdata', formData);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
        console.log(data)
    }
    console.log("data is:", data)
    try {
        
        const response = await fetch('http://localhost:3000/jwt_login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)

        })
        console.log('data fetching')
        const result = await response.json();
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `<p> server response: ${result.message}</p>`;

    } catch (error) {
       return error;
    //  const outputDiv = document.getElementById('output');
    //  outputDiv.style.color="red";
    //  outputDiv.style.fontWeight="bolder";
    //  outputDiv.innerHTML = '<p> Error fetching data. please try again.</p>'
        
    }
}

);
