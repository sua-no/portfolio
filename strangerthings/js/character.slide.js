window.addEventListener("DOMContentLoaded", function () {
    const characterInfo = document.querySelector(".characterInfo");
    const characterUl = document.querySelector(".characterInfo ul");
    const characterli = document.querySelectorAll(".characterInfo ul li");
    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");
    let liHeight;
    let idx = 0;

    inIt();

    //반응형 스크립트
    window.addEventListener("resize", function () {
        ulSize();
        inIt();
    });
    nextBtn.addEventListener("click", slideLeft);
    prevBtn.addEventListener("click", slideRight);
    //즉시실행 - 미디어쿼리
    function inIt() {
        const mediaQuery = window.matchMedia("screen and (min-width: 320px)");
        const mediaQueryPc = window.matchMedia("screen and (min-width: 1024px)");
        if (mediaQueryPc.matches) {
            ulSizePc();
        } else if (mediaQuery.matches) {
            liSort();
            ulSize();
        }
    }
    //ul 높이 값 li 높이로 변경
    function ulSize() {
        liHeight = characterli[0].getBoundingClientRect().height;
        characterInfo.style.height = liHeight + "px";
        characterUl.style.height = liHeight + "px";
    }
    //pc ver
    function ulSizePc() {
        liHeight = characterli[0].getBoundingClientRect().height;
        characterInfo.style.height = liHeight + 100 + "px";
        characterUl.style.height = liHeight + 100 + "px";
    }
    //li 가로 정렬
    function liSort() {
        for (var i = 0; i < characterli.length; i++) {
            characterli[i].style.left = i * 100 + "%";
        }
    }
    //next버튼 클릭시 슬라이드 왼쪽으로 이동
    function slideLeft() {
        idx++;
        slideAnimate();
    }
    //prev버튼 클릭시 슬라이드 오른쪽으로 이동
    function slideRight() {
        idx--;
        slideAnimate();
    }
    //슬라이드 이동 + 버튼 숨김
    function slideAnimate() {
        characterUl.style.left = idx * -100 + "%";
        btnHide();
    }
    //버튼 숨김
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
})