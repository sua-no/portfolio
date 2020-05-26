window.addEventListener('DOMContentLoaded', function () {
    let wheelCheck = true;


    window.addEventListener('popstate', function () {
        pageChange(history.state.page);
    });
    $('.menuBtn').on('click', menuIn); //메뉴버튼 클릭시 메뉴 슬라이드
    $(window).on('wheel', menuSlide); //메인 스크롤 시 메뉴화면으로 슬라이드

    $('.menuList').on('click', pageChange); //메뉴 클릭시 서브 페이지로 전환


    function pageChange(clickPage) {
        if (event.target != window) { // 뒤로가기 클릭시 이전 페이지로 전환
            clickPage = $(this).data('page');
            historyManager(clickPage);
            $('.headerInner').removeClass('active');
        }
        pageManager(clickPage); //클릭한 페이지로  전환
        // colorAni();
        colorManger(clickPage);
    }
    function pageManager(clickPage) {
        $('.page').each(function (i) {
            if (clickPage == $('.page').eq(i).data('contents')) {
                $('.page').eq(i).addClass('contents').siblings().removeClass('contents');
                $('.pageColor').addClass('colorZindex');
                scrollYAdd(clickPage); //about 또는 work 페이지로 이동시 스크롤 생성
            } else if (clickPage === '') { //main페이지로 이동시 서브페이지 정렬
                $('.page').eq(i).siblings().removeClass('contents');
                $('.pageColor').removeClass('colorZindex');
            }
        });
    }
    function colorManger(clickPage) {


        switch (clickPage) {
            case 'about':
                $('.pageColor').animate({
                    width: '0%'
                }, 3000, function () {
                    console.log('dd');
                    $('.pageColor').animate({
                        width: '80%',
                        height: '100%',
                        right: '0%',
                        background: '#febf00'
                    }, 1000);
                });
                break;
            case 'work':
                break;
            case 'contact':
                break;
            default: break;
        }
    }
    function colorAni() {
        $('.pageColor').animate({
            width: 0
            // height: 0
        }, 600);
    }
    function historyManager(clickPage) { //url에 페이지 위치 알림
        history.pushState({ page: clickPage }, 'title', '?' + clickPage);
    }
    function scrollYAdd(clickPage) {
        $('.pageInner').scrollTop(0);
        if (clickPage === 'about' || clickPage === 'work') {
            $('.pageInner').addClass('overflowY');
        } else { //스크롤 없는 페이지로 이동시 스크롤 제거
            $('.pageInner').removeClass('overflowY');
        }
    }
    function menuIn() {
        $('.headerInner').toggleClass('active');
    }
    function menuSlide(e) {
        let wheelDelta = e.originalEvent.deltaY;
        if (wheelDelta > 0 && wheelCheck) { // wheelCheck : boolean값으로 스크롤 시 이벤트 1번 실행하게함
            wheelCheck = false;
            $('.pageInner').addClass('active');
            $('.scrollDown').addClass('active');
        } else if (wheelDelta < 0 && !wheelCheck) {
            wheelCheck = true; //wheel 방향 변경시 wheelCheck값 변경
            $('.pageInner').removeClass('active');
            $('.scrollDown').removeClass('active');
        }
    }
});