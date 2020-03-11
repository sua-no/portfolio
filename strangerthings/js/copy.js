const mainCopy = document.querySelector(".mainCopy");
let mainSpan = mainCopy.querySelectorAll(".mainCopy span");
function index(target) {
    var hole = 0;

    console.log(target.nextSibling);
    while ((target = target.nextSibling) != null) {
        if (target.nodeType != 3) {
            console.log("if");
            console.log(target.nextSibling);
            hole = 1;
            return hole;
        } else {
            console.log("else");
            console.log(target.nextSibling);
        }
    }
    console.log("333333333");
    console.log(hole);
    return hole;
}
function copyStop() {
    clearInterval(copyUp);
}
function copyUp() {
    for (var i = 0; i < mainSpan.length; i++) {
        console.log("11111111");
        console.log(i);
        console.log(mainSpan[i]);
        var a = index(mainSpan[i]);
        if (a == 0) {
            copyStop();
            console.log("clearInterval");
        } else {
            console.log("setInterval");
            //mainSpan[i].style.transitionDelay = mainSPan[i] + "s";
            mainSpan[i].style.opacity = "0.5";
        }
    }
}
//let repeat = setInterval(function(){console.log("repeat")}, 1000);

let repeat = setInterval(copyUp, 3000);
