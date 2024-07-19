const track = document.getElementById("image-track");
const enlargedView = document.getElementById("enlarged-view");
const enlargedImage = document.getElementById("enlarged-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const closeButton = document.getElementById("close-button");
const fontButton = document.getElementById("font-button");
const themeButton = document.getElementById("theme-button");
const enlargedDescriptionBox = document.getElementById("enlarged-description-box");

let currentIndex = -1;
const imageContainers = Array.from(track.getElementsByClassName("image-container"));

const fonts = [
    "Arial, sans-serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Trebuchet MS, sans-serif",
    "Palatino, serif"
];

const imageFonts = Array(imageContainers.length).fill(0);

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || 0) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
};

track.onmousedown = e => handleOnDown(e);
track.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

const showEnlargedView = (src, index) => {
    enlargedImage.style.opacity = '0';
    enlargedImage.src = src;
    enlargedView.classList.remove('hidden');
    track.style.pointerEvents = 'none';

    const description = imageContainers[index].querySelector('.description-box').textContent;
    enlargedDescriptionBox.textContent = description;
    enlargedDescriptionBox.style.fontFamily = fonts[imageFonts[index]];
    fontButton.textContent = fonts[imageFonts[index]].split(',')[0].replace(/"/g, '');

    enlargedImage.offsetHeight;
    enlargedImage.style.opacity = '1';
};

const hideEnlargedView = () => {
    enlargedImage.style.opacity = '0';
    setTimeout(() => {
        enlargedView.classList.add('hidden');
        track.style.pointerEvents = 'auto';
    }, 300);
};

const handleImageClick = (e) => {
    const clickedContainer = e.target.closest('.image-container');
    currentIndex = imageContainers.indexOf(clickedContainer);
    showEnlargedView(clickedContainer.querySelector('img').src, currentIndex);
};

const showPreviousImage = () => {
    currentIndex = (currentIndex - 1 + imageContainers.length) % imageContainers.length;
    const imgSrc = imageContainers[currentIndex].querySelector('img').src;
    showEnlargedView(imgSrc, currentIndex);
};

const showNextImage = () => {
    currentIndex = (currentIndex + 1) % imageContainers.length;
    const imgSrc = imageContainers[currentIndex].querySelector('img').src;
    showEnlargedView(imgSrc, currentIndex);
};

const changeFontSpacing = () => {
    imageFonts[currentIndex] = (imageFonts[currentIndex] + 1) % fonts.length;
    enlargedDescriptionBox.style.fontFamily = fonts[imageFonts[currentIndex]];
    fontButton.textContent = fonts[imageFonts[currentIndex]].split(',')[0].replace(/"/g, '');
};

const initializeFontButton = () => {
    fontButton.textContent = fonts[0].split(',')[0].replace(/"/g, '');
};

for (const container of imageContainers) {
    container.addEventListener('click', handleImageClick);
}

prevButton.addEventListener('click', showPreviousImage);
nextButton.addEventListener('click', showNextImage);
closeButton.addEventListener('click', hideEnlargedView);
fontButton.addEventListener('click', changeFontSpacing);

const themes = ['default-theme', 'dark-theme', 'blue-theme'];
let currentTheme = 0;

themeButton.addEventListener('click', function() {
    document.body.classList.remove(...themes);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
});

document.body.classList.add(themes[currentTheme]);
initializeFontButton();