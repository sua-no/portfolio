window.addEventListener("DOMContentLoaded", function () {
    const menuToggleBtn = document.getElementsByClassName("menuToggleBtn");
    const gnb = document.getElementById("gnb");
    const gnbClick = document.getElementsByClassName("gnbClick");
    const menuSpan = menuToggleBtn[0].querySelectorAll("span");
    menuToggleBtn[0].addEventListener("click", function () {
        if (gnb.classList.contains("gnbClick") == true) {
            gnb.classList.remove("gnbClick");
            for (var i = 0; i < menuSpan.length; i++) {
                menuSpan[i].classList.remove("trans");
            }
        } else {
            gnb.classList.add("gnbClick");
            for (var i = 0; i < menuSpan.length; i++) {
                menuSpan[i].classList.add("trans");
            }
        }
    });
})