window.addEventListener("DOMContentLoaded", function() {
    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");
    const characterUl = document.querySelector(".characterInfo ul ");
    prevBtn.addEventListener("click", function() {
        prevMove();
    });
    nextBtn.addEventListener("click", function() {
        nextMove();
    });
    function prevMove() {
        characterUl.style.transform = "translateX(100%)";
    }
    function nextMove() {
        characterUl.style.transform = "translateX(-100%)";
    }
});
