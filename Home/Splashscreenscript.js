// Set a flag in localStorage to indicate the splash screen has been shown
localStorage.setItem('splash-screen', 'true');
        


document.addEventListener('DOMContentLoaded', () => {               
    let percentage = 0;
    const percentageElement = document.getElementById('percentage');
    const maskRect = document.getElementById('mask-rect');


    const interval = setInterval(() => {
        if (percentage < 100) {
            percentage += 1;
            percentageElement.innerText = `${percentage}%`;
            maskRect.setAttribute('height', `${150 - (percentage * 1.5)}px`);
        } else {
            clearInterval(interval);

            setTimeout(() => {
            window.location.href = 'Home.html';
            },1000);
        }
    },25);
});
