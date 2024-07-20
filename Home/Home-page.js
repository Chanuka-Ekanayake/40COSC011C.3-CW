
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdownMenu");

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
};

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("stickey", window.scrollY > 0);
})

// Check if the splash screen has been shown
if (!localStorage.getItem('splash-screen')) {
    // If not, redirect to the splash screen
    window.location.href = 'splashscreen.html';
} else {
    // If it has been shown, remove the flag (optional, depending on your needs)
    localStorage.removeItem('splash-screen');
}