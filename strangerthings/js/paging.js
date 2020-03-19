window.addEventListener("DOMContentLoaded", function () {
    const slide = document.getElementsByClassName("slide");
    let rightNav = document.getElementsByClassName("rightNav");
    let span = rightNav[0].querySelectorAll("span");
    let pageIndex = 0;
    let clickIndex;
    let selected = span[0];
    let timer = true;
    for (var i = 0; i < span.length; i++) {
        span[i].addEventListener("click", spanClick);
    }
    for (var i = 0; i < slide.length; i++) {
        slide[i].addEventListener("mousewheel", wheelManager);
    }
    //인디게이터 클릭
    function spanClick() {
        clickIndex = index(event.target);
        if (pageIndex < clickIndex) {
            for (pageIndex; pageIndex < clickIndex;) {
                pageUp();
            }
        } else {
            for (pageIndex; pageIndex > clickIndex;) {
                pageDown();
            }
        }
        spanColor();
    }
    //휠 매니저
    function wheelManager() {
        if (timer == true) {
            timer = false;
            //휠 다운
            if (event.deltaY > 0) {
                if (pageIndex < slide.length - 1) {
                    pageUp();
                }
                //휠 업
            } else {
                if (pageIndex != 0) {
                    pageDown();
                }
            }
            spanColor();
            setTimeout(function () {
                timer = true;
            }, 1000);
        }
    }
    //인디게이터 클릭 / 마우스 휠 업,다운
    //페이지 업
    function pageUp() {
        slide[pageIndex].style.transform = "translateY(-100%)";
        pageIndex++;
    }
    //페이지 다운
    function pageDown() {
        slide[pageIndex - 1].style.transform = "translateY(0%)";
        pageIndex--;
    }
    //인디게이터 컬러 변경
    function spanColor() {
        for (var i = 0; i < span.length; i++) {
            if (span[i].classList.contains("backRed") == true) {
                span[i].classList.remove("backRed");
            }
        }
        span[pageIndex].classList.add("backRed");
    }
    //선택된 span의 인덱스 찾기
    function index(target) {
        let hole = 0;
        while ((target = target.previousSibling) != null) {
            if (target.nodeType != 3) {
                hole += 1;
            }
        }
        return hole;
    }
})