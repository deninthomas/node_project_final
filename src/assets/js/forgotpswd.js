let alertbox = document.getElementById('alertbox');
let Alertbox = document.getElementById('Alertbox');

var forgotOtp = document.getElementById('forgotOtp');
forgotOtp.addEventListener('click', (e) => {
    e.preventDefault()

    var email = document.getElementById('email').value;

    var reset = {
        email: email,
    }

    console.log(reset)
    if (!email) {
        alertbox.innerHTML = `<p>Fields cant be empty</p>`;
        console.log("fields cant be empty");
        return false;
    }

    else {
        fetch('http://localhost:3000/forgot_password', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(reset)
        })

            .then((res) => {
                console.log(res);
                if (res.ok) {
                    console.log('otp send to mail')

                    const forgotPswd = document.getElementById('forgotPswd');
                    const otpvalidation = document.getElementById('otpvalidation');

                    forgotPswd.style.display = "none";
                    otpvalidation.style.display = "flex";

                    resetpswd(email);

                } else {
               
                    return res.json().then((err) => {
                        console.log(err);
                        // throw new Error('Invalid request');
                    }).catch((err) => {
                        console.log(err);
                        alertbox.innerHTML = `<p>Invalid email address</p>`;
                        console.log("invalid email");
                    });
                }
            });
    }

})

function resetpswd(email) {
    var verify = document.getElementById('verify');
    verify.addEventListener('click', (e) => {
        e.preventDefault()

        // var email = document.getElementById("email").value;
        var otp = document.getElementById('otp').value;
        var password = document.getElementById('password').value;
        var confirmpassword = document.getElementById('confirmpassword').value;

        var resetUser = {
            email: email,
            otp : otp,
            newPassword: password
        }

        console.log(resetUser);



        if (!confirmpassword || !password || !otp) {


            // alertbox.classList.remove('hide');
            // alertbox.classList.add('show');

            Alertbox.innerHTML = `<p>The fields can't be empty</p>`;

            // nameoutline.classList.remove('removeborder');
            // emailoutline.classList.remove('removeborder');
            // passwordoutlineOne.classList.remove('removeborder');
            // passwordoutline.classList.remove('removeborder');

            // nameoutline.classList.add('showborder');
            // emailoutline.classList.add('showborder');
            // passwordoutlineOne.classList.add('showborder');
            // passwordoutline.classList.add('showborder');

            return false;
        }
        else if (password != confirmpassword) {
            Alertbox.innerHTML = `<p>password doesn't match</p>`;

            // passwordoutlineOne.classList.remove('removeborder');
            // passwordoutline.classList.remove('removeborder');

            // passwordoutlineOne.classList.add('showborder');
            // passwordoutline.classList.add('showborder');
        }



        else {

            fetch('http://localhost:3000/forgot_password/reset', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(resetUser)
            })

                .then((res) => {
                    if (res.ok) {
                        console.log('account reseted')
                        // const url = `/signup/otpverification?value=${encodeURIComponent(email)}`;
                        window.location.href = "/login";


                    } else {
                        return res.json()
                        .then((err) => {
                            console.log('invalid details');
                        });
                    }

                })



        }

    })
}
function clearAlretbox(){
    Alertbox.innerHTML = "";
}
function clearalretbox(){
    alertbox.innerHTML = "";
}