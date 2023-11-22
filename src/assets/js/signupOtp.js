// Start the countdown
startCountdown();

const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('value');
document.getElementById('emailmsg').innerHTML = userEmail;

var otpBtn = document.getElementById('otpBtn')
otpBtn.addEventListener('click', (e) => {
    e.preventDefault()

    var email = userEmail;
    var otp = document.getElementById('signupOtp').value;

    var otpconfirm = {
        email: email,
        otp: otp
    }

    console.log(otpconfirm)
    if (!otp || !email) {

        let alertbox = document.getElementById('alertbox');

        alertbox.classList.remove('hide');
        alertbox.classList.add('show');

        alertbox.innerHTML = `<p class="alertsession requiredAlert">The fields can't be empty</p>`;

        // usernameoutline.classList.remove('removeborder');
        // passwordoutlineOne.classList.remove('removeborder');
        // passwordoutline.classList.remove('removeborder');

        // usernameoutline.classList.add('showborder');
        // passwordoutlineOne.classList.add('showborder');
        // passwordoutline.classList.add('showborder');

        return false;
    }
    // else if(password!=confirmPswd){
    //     alertbox.innerHTML = `<p class="alertsession requiredAlert">password doesn't match</p>`;
    //     passwordoutlineOne.classList.remove('removeborder');
    //     passwordoutline.classList.remove('removeborder');

    //     passwordoutlineOne.classList.add('showborder');
    //     passwordoutline.classList.add('showborder');
    // }
    else {
        fetch('http://localhost:3000/email_verification/otpverification', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(otpconfirm)
        })

            .then((res) => {
                if (res.ok) {
                    console.log('created account')
                    // const url = `/signup/otpverification?value=${encodeURIComponent(email)}`;
                    window.location.href = "/login";


                } else {
                    return res.json().then((err) => {

                        console.log('incorrect OTP');

                        let alertbox = document.getElementById('alertbox');

                        alertbox.classList.remove('hide');
                        alertbox.classList.add('show');

                        alertbox.innerHTML = `<p class="alertsession requiredAlert">incorrect OTP</p>`;
                    });
                }

            })


    }

})

// resend otp

function resendOtp() {

    var email = userEmail;

    var otpresend = {
        email: email,
    }
    console.log(otpresend)
    if (!email) {

        let alertbox = document.getElementById('alertbox');

        alertbox.classList.remove('hide');
        alertbox.classList.add('show');

        alertbox.innerHTML = `<p class="alertsession requiredAlert">Enter a valid Email ID</p>`;
        return false;
    }
    else {
        fetch('http://localhost:3000/email_verification', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(otpresend)
            
        })
        // console.log("successful");
    }
}