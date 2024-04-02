console.log("hello its me");
document.getElementById('submit').addEventListener('click', async () => {

    const formData = new FormData(document.getElementById('index'));
    console.log('formdata', formData);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
        console.log(data)
    }
    console.log("data is:", data)



    try {
        
        const response = await fetch('http://localhost:3000/', {
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
        console.log("Error fetching data:", error);
        // const outputDiv = document.getElementById('output');
        // // outputDiv.style.color="red";
        // // outputDiv.style.fontWeight="bolder";
        // outputDiv.innerHTML = '<p> Error fetching data. please try again.</p>'
        
    }

    
}

);


 function redirectToPage(){
    window.location.href='http://localhost:3000/generate-activation-link'
 }

 
