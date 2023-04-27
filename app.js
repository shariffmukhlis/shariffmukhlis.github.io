// select
const toggle = document.querySelector(".toggle");
const menudown = document.querySelector(".menudown");
const logo = document.querySelector(".logo");

toggle.addEventListener('click', navdown)

function navdown(){
    toggle.classList.toggle("navdown")
    menudown.classList.toggle("down")
    document.querySelector(".background").classList.toggle("down2")

}
