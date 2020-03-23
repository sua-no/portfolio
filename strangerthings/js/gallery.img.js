window.addEventListener("DOMContentLoaded", function () {
    const selectImg = document.querySelector(".selectImg img");
    const galleryImg = document.querySelectorAll(".galleryInner ul li");
    let prevSelect = null;

    mediaQuery();
    window.addEventListener("resize", mediaQuery);
    //즉시실행 -미디어쿼리
    function mediaQuery() {
        const mediaQuery = window.matchMedia("screen and (max-width: 1023px)");
        if (mediaQuery.matches) {
            galleryClick();
        } else {
            removeEvent();
        }
    }

    function galleryClick() {
        for (var i = 0; i < galleryImg.length; i++) {
            galleryImg[i].addEventListener("click", select);
            galleryImg[i].children[0].style.filter = "grayscale(100%)";
        }
    }

    function removeEvent() {
        for (var i = 0; i < galleryImg.length; i++) {
            galleryImg[i].removeEventListener("click", select);
            galleryImg[i].children[0].style.filter = "grayscale(0%)";
        }
    }
    //img 클릭이벤트
    function select() {
        let gallerySrc = this.children[0].getAttribute("src");
        selectImg.setAttribute("src", gallerySrc);
        //grayscale 변경
        this.children[0].style.filter = "grayscale(0%)";
        if (prevSelect != null) {
            prevSelect.children[0].style.filter = "grayscale(100%)";
        }
        prevSelect = this;
    }

});