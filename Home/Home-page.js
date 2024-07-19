
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
