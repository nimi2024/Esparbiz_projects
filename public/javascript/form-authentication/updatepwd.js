// console.log("it's a update password page");
document.getElementById('submit').addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById('updatepwd'));
    console.log('formdata', formData);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
        console.log(data)
    }
    console.log("data is:", data)
    // console.log('data fetching', data)
    let errorMessage = document.getElementById('errorMessage');
    // console.log(errorMessage)

    // console.log((data.newpassword !== data.repeatpassword));
    // console.log((data.newpassword == '') && (data.repeatpassword == ''));
    if (!data.email) {
        errorMessage.innerHTML = '<h5> <i> Please Enter Email</h5></i>'
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bolder";

    }
    
    else if ((!data.newpassword) && (!data.repeatpassword)) {
        errorMessage.innerHTML = '<h5> <i> Please Enter Password</h5></i>'
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bolder";

    }
    else if (data.newpassword !== data.repeatpassword) {
        console.log('pasword is not same as new password');
        errorMessage.innerHTML = '<h5><i>  Your repeated password is not same as new password.<i></h5>'
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bolder";

    }
    else {
        console.log('pasword is  same as new password');
        errorMessage.innerHTML = '<h5> <i>Your Password is updated successfully!!...</i></h5>'
        errorMessage.style.color = "green";
        errorMessage.style.fontWeight = "bolder";

    }
    // console.log("in out of try");
    try {

        const response = await fetch('http://localhost:3000/updatepswd', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = `<p> server response: ${result.message}</p>`;
    } catch (error) {
        return error;
    }

    finally {


    }
}
);