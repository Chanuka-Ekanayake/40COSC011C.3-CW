
document.addEventListener('DOMContentLoaded', () => {               
    let percentage = 0;
    const percentageElement = document.getElementById('percentage');
    const maskRect = document.getElementById('mask-rect');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    const interval = setInterval(() => {
        if (percentage < 100) {
            percentage += 1;
            percentageElement.innerText = `${percentage}%`;
            maskRect.setAttribute('height', `${150 - (percentage * 1.5)}px`);
        } else {
            clearInterval(interval);
            setTimeout(() => {
                splashScreen.style.transition = 'opacity 1s ease';
                splashScreen.style.opacity = 0;
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                }, 1000);
            },1000);
        }
    },10);
});