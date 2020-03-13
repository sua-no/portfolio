const slide = document.getElementsByClassName("slide");
let rightNav = document.getElementsByClassName("rightNav");
let span = rightNav[0].querySelectorAll("span");
let pageIndex = 0;
let clickIndex;
let selected = span[0];
//선택된 span의 인덱스
function index(target) {
    let hole = 0;
    while ((target = target.previousSibling) != null) {
        if (target.nodeType != 3) {
            hole += 1;
        }
    }
    return hole;
}
function spanColor() {
    let backRed = rightNav[0].getElementsByClassName("backRed");
    for (var i = 0; i < span.length; i++) {
        if (span[i].classList.contains("backRed") == true) {
            span[i].classList.remove("backRed");
        }
    }
    span[pageIndex].classList.add("backRed");
}
function spanClick() {
    clickIndex = index(event.target);
    if (pageIndex < clickIndex) {
        for (pageIndex; pageIndex < clickIndex; pageIndex++) {
            slide[pageIndex].style.transform = "translateY(-100%)";
        }
    } else {
        for (pageIndex; pageIndex > clickIndex; pageIndex--) {
            slide[pageIndex - 1].style.transform = "translateY(0%)";
        }
    }
    spanColor();
}
for (var i = 0; i < span.length; i++) {
    span[i].addEventListener("click", spanClick);
}
