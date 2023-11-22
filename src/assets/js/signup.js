

let nameoutline = document.getElementById('usersname');
let emailoutline = document.getElementById('email');
let passwordoutlineOne = document.getElementById('password');
let passwordoutline = document.getElementById('confirmpassword');
let loginBox = document.getElementById('loginBox');
var signupBtn = document.getElementById('signupBtn')
signupBtn.addEventListener('click', (e) => {
    e.preventDefault()

    var name = document.getElementById('usersname').value;
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    var confirmpassword = document.getElementById('confirmpassword').value;

    var newreg = {
        name: name,
        email: email,
        password: password
    }

    console.log(newreg)



    if (!name || !email || !password || !confirmpassword) {

        let alertbox = document.getElementById('alertbox');

        alertbox.classList.remove('hide');
        alertbox.classList.add('show');

        alertbox.innerHTML = `<p class="alertsession requiredAlert">The fields can't be empty</p>`;

        nameoutline.classList.remove('removeborder');
        emailoutline.classList.remove('removeborder');
        passwordoutlineOne.classList.remove('removeborder');
        passwordoutline.classList.remove('removeborder');

        nameoutline.classList.add('showborder');
        emailoutline.classList.add('showborder');
        passwordoutlineOne.classList.add('showborder');
        passwordoutline.classList.add('showborder');

        return false;
    }
 
    else if (password != confirmpassword) {
        alertbox.innerHTML = `<p class="alertsession requiredAlert">password doesn't match</p>`;

        passwordoutlineOne.classList.remove('removeborder');
        passwordoutline.classList.remove('removeborder');

        passwordoutlineOne.classList.add('showborder');
        passwordoutline.classList.add('showborder');
    }

    // else if(!validation){

    // }

    else {
        // validation();
        // if (validation) {
            fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newreg)
            })

                .then((res) => {
                    if (res.ok) {
                        console.log('created account')
                        const url = `/signup/otpverification?value=${encodeURIComponent(email)}`;
                        window.location.href = url;


                    } else {
                        return res.json().then((err) => {

                            console.log('user already exists');

                            let alertbox = document.getElementById('alertbox');

                            alertbox.classList.remove('hide');
                            alertbox.classList.add('show');

                            alertbox.innerHTML = `<p class="alertsession requiredAlert">User already exists</p>`;

                            emailoutline.classList.remove('removeborder');
                            emailoutline.classList.add('showborder');
                        });
                    }

                })
        // }


    }

})


function removeborders() {
    let alertbox = document.getElementById('alertbox');

    alertbox.classList.add('hide');
    alertbox.classList.remove('show');

    alertbox.innerHTML = "";

    nameoutline.classList.add('removeborder');
    emailoutline.classList.add('removeborder');
    passwordoutlineOne.classList.add('removeborder');
    passwordoutline.classList.add('removeborder');

    nameoutline.classList.remove('showborder');
    emailoutline.classList.remove('showborder');
    passwordoutlineOne.classList.remove('showborder');
    passwordoutline.classList.remove('showborder');
}

function passwordVisibility() {
    var paswdLock = document.getElementById("confirmpassword");
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


// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
// }

// window.onload = function () {
//     var fiveMinutes = 60 * 5,
//         display = document.querySelector('#time');
//     startTimer(fiveMinutes, display);
// };