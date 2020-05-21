window.addEventListener('DOMContentLoaded', function () {
    let wheelCheck = true;

    // $('.menuBtn').on('mouseenter', menuHover);
    // $('.menuBtn').on('mouseleave', menuLeave);
    // window.addEventListener('popstate', function () {
    //     pageMove(history.state.page);
    // })
    $('.menuBtn').on('click', menuIn); //메뉴버튼 클릭시 메뉴 슬라이드
    $(window).on('wheel', menuSlide); //마우스 휠 시 메뉴화면으로 슬라이드

    $('.menuList').on('click', pageMove);
    function pageMove(clickList) {
        // console.log($(this).data('page'));
        // $('.page').each(function(){
        //     if(clickList == $('.page').data('contents')){

        //     }
        // });

    }

    function menuHover() {
        console.log("asdasd");
        $(this).parent().css({
            width: 130
        });
    }
    function menuLeave() {
        $(this).parent().css({
            width: 55
        });
    }
    function menuIn() {
        // $(this).parent().css({
        //     width: '80vw'
        // });
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