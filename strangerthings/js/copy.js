const mainCopy = document.querySelector(".mainCopy");
let mainSpan = mainCopy.querySelectorAll(".mainCopy span");
function index(target) {
    let hole = 0;
    while ((target = target.nextsibling) != null) {
        //error
        hole = 1;
    }
    return hole;
}
function copyUp() {
    let span = index(mainCopy.target); //error
    for (var i = 0; i > span[i].length; i++) {
        if (span == 0) {
            clearInterval(copyUp);
        } else {
            span[i].style.paddingTop = "100%";
            span[i].style.opacity = "1";
        }
    }
}
setInterval(copyUp, 500);
