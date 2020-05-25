window.addEventListener('DOMContentLoaded', function () {
    let wheelCheck = true;

    window.addEventListener('popstate', function () {
        pageMove(history.state.page);
    });
    $('.menuBtn').on('click', menuIn); //메뉴버튼 클릭시 메뉴 슬라이드
    $(window).on('wheel', menuSlide); //마우스 휠 시 메뉴화면으로 슬라이드

    $('.menuList').on('click', pageMove); //메뉴 클릭시 서브 페이지로 이동

    function pageMove(clickPage) {
        if (event.target != window) { // 탭 클릭시 history.push, 내용변경
            clickPage = $(this).data('page');
            historyManager(clickPage);
        }
        console.log(history.state);
        changePage(clickPage);
    }
    function changePage(clickPage) {
        $('.page').each(function (i) {
            if (clickPage == $('.page').eq(i).data('contents')) {
                $('.page').eq(i).addClass('contents').siblings().removeClass('contents');
            }
        });
    }
    function historyManager(idx) {
        history.pushState({ page: idx }, 'title', '?' + idx);
    }
    function menuIn() {
        $('.headerInner').toggleClass('active');
    }
    //메인 스크롤 시 메뉴화면으로 슬라이드
    function menuSlide(e) {
        let wheelDelta = e.originalEvent.deltaY;
        if (wheelDelta > 0 && wheelCheck) { //스크롤 시 이벤트 1번 실행
            wheelCheck = false;
            $('.pageInner').addClass('active');
            $('.scrollDown').addClass('active');
        } else if (wheelDelta < 0 && !wheelCheck) {
            wheelCheck = true;
            $('.pageInner').removeClass('active');
            $('.scrollDown').removeClass('active');
        }
    }

});