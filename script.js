function calculateTimeRemaining() {
    const today = new Date();
    let remainingDays = 0;
    let remainingHours = 0;
    let remainingMinutes = 0;
    let remainingSeconds = 0;
    let remainingMilliseconds = 0;
  
    // Calculate time difference excluding weekends and specified dates
    const targetDate = new Date(today.getFullYear(), 5, 7); // June is 5 because January is 0
    const excludedDates = [
      new Date(today.getFullYear(), 2, 31), // Marzo 31
      new Date(today.getFullYear(), 3, 1),  // Aprile 1
      new Date(today.getFullYear(), 3, 25), // Aprile 25
      new Date(today.getFullYear(), 4, 1),  // Maggio 1
      new Date(today.getFullYear(), 5, 2)   // Giugno 2
    ];
  
    let currentDate = new Date(today);
    while (currentDate < targetDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Exclude weekends
        let isExcluded = false;
        excludedDates.forEach(date => {
          if (currentDate.getTime() === date.getTime()) {
            isExcluded = true;
          }
        });
        if (!isExcluded) {
          remainingDays++;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // Calculate remaining time
    const timeDifference = targetDate - today;
    remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    remainingMilliseconds = timeDifference % 1000;
  
    return {
      days: remainingDays,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
      milliseconds: remainingMilliseconds
    };
  }
  
  // Function to update the countdown in real-time
  function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const { days, hours, minutes, seconds, milliseconds } = calculateTimeRemaining();
    countdownElement.innerHTML = `${days} giorni : ${hours} ore : ${minutes} minuti : ${seconds} secondi : ${milliseconds} millisecondi`;
  }
  
  // Update the countdown on page load
  window.onload = function() {
    updateCountdown();
    // Update the countdown every 100 milliseconds
    setInterval(updateCountdown, 100);
  };
  