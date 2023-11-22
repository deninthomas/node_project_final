
let loginAlertbox = document.getElementById('loginAlertbox');
let emailoutline = document.getElementById('userName');
let passwordoutline = document.getElementById('loginPassword');

function passwordVisibility() {
    var paswdLock = document.getElementById("loginPassword");
    let lock = document.getElementById('lock');
    let lockOpen = document.getElementById('lockOpen');
    if (paswdLock.type === "password") {
        lock.style.display = 'none';
        lockOpen.style.display = 'block';
        paswdLock.type = "text";
    } else {
        lockOpen.style.display = 'none';
        lock.style.display = 'block';
        paswdLock.type = "password";
    }
}



var emplog = document.getElementById('loginButton');
emplog.addEventListener('click', (e) => {
    e.preventDefault()

    var email = document.getElementById('userName').value;
    var password = document.getElementById('loginPassword').value;

    var loggedin = {
        email: email,
        password: password
    }

    console.log(loggedin)
    if (!email || !password) {

        console.log("fields cant be empty");

        loginAlertbox.classList.remove('hide');
        loginAlertbox.classList.add('show');

        emailoutline.classList.remove('removeborder');
        passwordoutline.classList.remove('removeborder');

        passwordoutline.classList.add('showborder');
        emailoutline.classList.add('showborder');

        loginAlertbox.style.display = 'flex';
        loginAlertbox.innerHTML = `<p>The fields can't be empty</p>`;


        return false;
    }

    else {
        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(loggedin)
        })

            .then((res) => {
                console.log(res);
                if (res.ok) {
                    console.log('logged in')
                    window.location.href="/";
                } else {
                    return res.json().then((err) => {
                        console.log('invalid request');
                    });
                }

            })

    }

})



function removeborders() {
    let alertbox = document.getElementById('alertbox');

    loginAlertbox.classList.add('hide');
    loginAlertbox.classList.remove('show');

    loginAlertbox.innerHTML = "";

    emailoutline.classList.remove('showborder');
    passwordoutline.classList.remove('showborder');

    emailoutline.classList.add('removeborder');
    passwordoutline.classList.add('removeborder');

}