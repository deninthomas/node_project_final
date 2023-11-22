


function startCountdown() {
    console.log("timer is running");
    let timeLeft = 5 * 60; // 5 minutes in seconds
    const countdown = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
  
      // Adding leading zero if seconds < 10 for better display (optional)
      seconds = seconds < 10 ? `0${seconds}` : seconds;
  
      // Display the countdown in the console or update a HTML element
    //   console.log(`Time Left: ${minutes}:${seconds}`);
      // Update HTML: 
      document.getElementById('timer').innerText = `${minutes}:${seconds}`;
  
      if (timeLeft <= 0) {
        clearInterval(countdown);
        console.log('Countdown is over!');
        // Execute any action when the countdown finishes
      } else {
        timeLeft--; // Decrement time by 1 second
      }
    }, 1000); // Update every second (1000 milliseconds)
  }
 

  console.log("set timeeeer");

