window.addEventListener('DOMContentLoaded', function () {
    let wheelCheck = true, mainCheck = '';

    //이벤트 등록
    window.addEventListener('popstate', function () {
        pageChange(history.state.page);
    });
    $('.menuBtn').on('click', menuIn); //메뉴버튼 클릭시 메뉴 슬라이드
    $(window).on('wheel', menuSlide); //메인 스크롤 시 메뉴화면으로 슬라이드
    $('.menuList').on('click', pageChange); //메뉴 클릭시 서브 페이지로 전환
    $('.about').on('scroll', boxSize);


    //페이지 전환 함수
    function pageChange(clickPage) {
        if (event.target != window) { //클릭한 페이지로  전환
            clickPage = $(this).data('page');
            historyManager(clickPage);
            $('.headerInner').removeClass('active');
        }
        mainCheck = clickPage; //메인 페이지 아닐시 메인 스크롤이벤트 작동하지 않음
        pageManager(clickPage); // 뒤로가기,메뉴 클릭시 페이지 전환
        colorManger(clickPage);
    }
    function pageManager(clickPage) {
        $('.page').each(function (i) {
            if (clickPage == $('.page').eq(i).data('contents')) {
                $('.page').eq(i).addClass('contents').siblings().removeClass('contents');
                scrollYAdd(clickPage); //about 또는 work 페이지로 이동시 스크롤 생성
            } else if (clickPage === '') { //main페이지로 이동시 서브페이지 정렬
                $('.page').eq(i).siblings().removeClass('contents');
            }
        });
    }
    function historyManager(clickPage) { //url에 페이지 위치 알림
        history.pushState({ page: clickPage }, 'title', '?' + clickPage);
    }
    function scrollYAdd(clickPage) {
        $('.pageInner').scrollTop(0);
        if (clickPage === 'about') { //about페이지에서 스크롤 생성 (scroll없앴음!!!!!!!!!!!!! -나중수정)
            $('.pageInner').addClass('overflowY');
        } else { //스크롤 없는 페이지로 이동시 스크롤 제거
            $('.pageInner').removeClass('overflowY');
        }
    }
    workAni();

    //컬러박스 변경 함수
    function colorManger(clickPage) {
        switch (clickPage) {
            case 'about':
                aboutAni();
                break;
            case 'work':
                workAni();
                break;
            case 'contact':
                contactAni();
                break;
            case '':
                mainAni();
                break;
        }
    }
    //컬러박스 애니메이션
    function aboutAni() { //about페이지 애니메이션
        $('.main').css({ display: 'none' });
        zIndex(350);
        transition('.pageColor', '0s');
        $('.pageColor').stop().animate({
            width: '100%',
            height: '100%',
            right: 0,
        }, 800, function () {
            $('.pageColor').animate({
                width: '0%',
            }, 1000, function () {
                $('.sub.about .subTit h2').css({
                    transform: 'translateY(0%)'
                });
                $('.pageColor').css({
                    background: '#febf00'
                });
                setTimeout(function () {
                    $('.pageColor').animate({
                        width: '80%',
                        height: '100%',
                    }, 1000, function () {
                        transition('.pageColor', '1s');
                    });
                    $('.sub.about .subCopy').css({
                        opacity: 1
                    });
                }, 800);

            });
        });
    }
    function workAni() { //work페이지 애니메이션
        $('.main').css({ display: 'none' });
        zIndex(350);
        transition('.pageColor', '0s');
        $('.pageColor').stop().animate({
            width: '100%',
            height: '100%',
            right: 0,
        }, 800, function () {
            $('.pageColor').animate({
                height: '0%',
            }, 1000, function () {
                $('.sub.work .subTit h2').css({
                    transform: 'translateY(0%)'
                });
                $('.pageColor').css({
                    background: '#000'
                });
                setTimeout(function () {
                    $('.pageColor').animate({
                        width: '100%',
                        height: '50%',
                    }, 1000, function () {
                        transition('.pageColor', '1s');
                    });
                    $('.sub.about .subCopy').css({
                        opacity: 1
                    });
                }, 800);
                
            });
        });
    }
    function contactAni() { //contact페이지 애니메이션
        $('.main').css({ display: 'none' });
        zIndex(350);
        transition('.pageColor', '0s');
        $('.pageColor').stop().animate({
            width: '100%',
            height: '100%',
            right: 0,
        }, 800, function () {
            $('.pageColor').stop().animate({
                width: 0
            }, 1000, function () {
                zIndex(200);
                transition('.pageColor', '1s');
                setTimeout(function () {
                    $('.sub.contact .subTit h2').css({
                        transform: 'translateY(0%)'
                    });
                });
            });
        });
    }
    function mainAni() { //main페이지 애니메이션
        wheelCheck = true;
        $('.pageInner').removeClass('active');
        $('.main').css({ display: 'block' });
        zIndex(200);
        transition('.pageColor', '1s');
        $('.pageColor').stop().animate({
            width: '100%',
            height: '100%',
            right: 0
        }, 800, function () {
            $('.pageColor').animate({
                width: '0%',
            }, 1000, function () {
                $('.pageColor').css({
                    background: '#080233'
                });
                $('.pageColor').animate({
                    width: '100%',
                    right: '50%'
                });
            });
        });
    }
    function zIndex(idx) {
        $('.pageColor').css({
            zIndex: idx
        });
    }
    function transition($elem, $duration) {
        if ($duration == '0s') {
            $($elem).css({ transition: '0s' });
        } else {
            $($elem).css({ transition: $duration });
        }
    }

    //메뉴 관련 함수
    function menuIn() {
        $('.headerInner').toggleClass('active');
    }
    function menuSlide(e) {
        if (mainCheck == '') {
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
    }

    //about 페이지 박스 사이즈 변경
    function boxSize() {

    }
});