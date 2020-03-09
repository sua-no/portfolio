let slide = document.getElementsByClassName("slide");
let rightNav = document.getElementsByClassName("rightNav");
let span = rightNav[0].querySelectorAll("span");
let pageIndex = 0;
let clickIndex;
let selected = span[0]; //이전 페이지로 변수값 변경해주기
//선택된 span의 인덱스
function index(target) {
    let hole = 0;
    while ((target = target.previousSibling) != null) {
        //previousSibling 특정자식 찾기
        if (target.nodeType != 3) {
            //nodeType 3은 텍스트
            hole += 1;
        }
    }
    return hole;
}
function spanColor() {
    let backRed = rightNav[0].getElementsByClassName("backRed");
    //전에 backRed클래스 가지고 있던 span에 클래스 제거
    for (var i = 0; i < span.length; i++) {
        if (span[i].classList.contains("backRed") == true) {
            span[i].classList.remove("backRed");
        }
    }
    span[pageIndex].classList.add("backRed");
}
function spanClick() {
    clickIndex = index(event.target);
    if (clickIndex == pageIndex) {
    } else {
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
}

//클릭 이벤트 등록
for (var i = 0; i < span.length; i++) {
    span[i].addEventListener("click", spanClick);
}
