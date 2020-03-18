const characterInfo = document.querySelector(".characterInfo");
const characterUl = document.querySelector(".characterInfo ul");
const characterli = document.querySelectorAll(".characterInfo ul li");
let liHeight = 0;
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
let idx = 0;
window.addEventListener("resize", function () {
    liHeight = characterli[0].getBoundingClientRect().height;
    characterInfo.style.height = liHeight + "px";
    characterUl.style.height = liHeight + "px";
})


liSort();
nextBtn.addEventListener("click", slideLeft);
prevBtn.addEventListener("click", slideRight);

function liSort() {
    for (var i = 0; i < characterli.length; i++) {
        characterli[i].style.left = i * 100 + "%";
    }
}

function slideLeft() {
    idx++;
    slideAnimate();
}

function slideRight() {
    idx--;
    slideAnimate();
}

function slideAnimate() {
    characterUl.style.left = idx * -100 + "%";
    btnHide();
}

function btnHide() {
    if (idx == 0) {
        prevBtn.style.display = "none";
    } else if (idx == characterli.length - 1) {
        nextBtn.style.display = "none";

    } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    }
}