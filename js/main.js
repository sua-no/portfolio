window.addEventListener('DOMContentLoaded', function () {
    let jsonData, jsonData2, jsonData3,
        workIdx = 0,
        mainCheck = '',
        wheelCheck = true,
        changeCheck = true,
        popHeight = $(window).innerHeight(),
        boxMax = 80;
    const mediaQuery = window.matchMedia('screen and (max-width:1024px)');



    //work JSON파일 로드
    $.ajax({
        url: 'work.json',
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
            jsonData = data.works;
            jsonData2 = data.lists;
            jsonData3 = data.videos;
            $('.total').text('0' + (jsonData.length));
            workListData(); //workList에 JSON데이터 넣고 data-work값 변경
        }
    });


    //이벤트 등록
    window.addEventListener('popstate', function () { //뒤로가기시 이전 페이지로 이동
        pageChange(history.state.page);
        $('.popup').removeClass('on');
    });
    $('.menuBtn').on('click', menuIn); //메뉴버튼 클릭시 메뉴 슬라이드
    $('.menuList').on('click', pageChange); //메뉴 클릭시 서브 페이지로 전환
    $('.pageInner').on('wheel', menuSlide); //메인 스크롤 시 메뉴화면으로 슬라이드
    $('.controlBtn button').on('click', workChange); // work페이지에서 버튼 클릭시 다음 컨텐츠 내용으로 변경
    $('.work').on('wheel', workChange); // work페이지에서 스크롤시 다음 컨텐츠 내용으로 변경
    $('.controlList').on('click', listShow); //work 페이지에서 list 버튼 클릭시 리스트 display: block
    $('.viewBtn').on('click', popupOn); //자세히 보기 클릭시 해당 팝업창 보이기
    $('.closer').on('click', popupOff);
    $('.popup').on('scroll', scrollAni);
    $('.top').on('click', goTop);


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
        if (clickPage === 'about') { //about페이지에서 스크롤 생성
            $('.pageInner').addClass('overflowY');
            $('.pageInner').scrollTop(0);
            $('.pageInner').on('scroll', boxSize);
        } else { //스크롤 없는 페이지로 이동시 스크롤 제거
            $('.pageInner').removeClass('overflowY');
        }
    }

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
            right: 0
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
                        height: 'calc(100vh - 110px)'
                    }, 1000, function () {
                        transition('.pageColor', '1s');
                    });
                    $('.sub.about .subCopy').css({
                        opacity: 1
                    });
                    $('.down').addClass('set');
                    $('.down').css({ opacity: 1 });
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
            right: 0
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
                        height: '50%'
                    }, 1000, function () {
                        transition('.pageColor', '1s');
                        $('.control').css({
                            opacity: 1
                        });
                        $('.workBox').addClass('active');
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
            right: 0
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
                    setTimeout(function () {
                        $('.info').css({
                            opacity: 1
                        });
                    }, 1000);
                }, 100);
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
                width: '0%'
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
        let aboutScroll = $(this).scrollTop(),
            boxWidth = boxMax - (aboutScroll * 0.2);
        aboutScroll != 0 ? $('.down').css({ opacity: 0 }) : $('.down').css({ opacity: 1 });
        if (boxWidth <= 0) {
            boxWidth = 0;
        }
        $('.pageColor').css({
            width: boxWidth + '%'
        }, 1);
    }

    // work 페이지 관련 함수
    function workChange(e) { //work 페이지 데이터 변경
        if (changeCheck) {
            changeCheck = false;
            if (e.type == 'click') { //클릭 이벤트 발생 시 인덱스 변경
                e.target.className == 'prev' ? workIdx-- : workIdx++;
            } else { //마우스 휠 이벤트 발생 시 인덱스 변경
                let wheelDeltaY = e.originalEvent.deltaY;
                wheelDeltaY < 0 ? workIdx-- : workIdx++;
            }
            if (workIdx == jsonData.length) {
                workIdx = 0;
            } else if (workIdx < 0) {
                workIdx = jsonData.length - 1;
            }
            dataChange();
            setTimeout(function () {
                changeCheck = true;
            }, 1000);
        }
    }
    function dataChange() { //데이터 변경함수
        $('.workBox').removeClass('active');
        setTimeout(function () {
            $('.workTit').html(jsonData[workIdx].title);
            $('.workImg img').attr('src', jsonData[workIdx].img);
            $('.workSkill').text(jsonData[workIdx].skill);
            $('.workText').html(jsonData[workIdx].text);
            $('.listNum').text('0' + (workIdx + 1));
            $('.viewBtn').attr('data-work', jsonData2[workIdx].work);
            $('.workBox').addClass('active');
        }, 350);
    }
    function listShow() {
        $('.workList').toggleClass('listBlock');
    }
    function workListData() {
        for (var i = 0; i < jsonData2.length; i++) {
            $('.workList ul').append(
                '<li><figure><p><img src=""></p><figcaption><span class="listTit"></span><span class="hashtag"></span></figcaption></figure></li>'
            );
            $('.workList ul li').eq(i).append(
                '<button class="listBtn" data-work="">자세히보기</button>'
            );
            $('.workList ul li').eq(i).find('p img').attr('src', jsonData2[i].img);
            $('.workList ul li').eq(i).find('figcaption .listTit').html(jsonData2[i].title);
            $('.workList ul li').eq(i).find('figcaption .hashtag').html(jsonData2[i].hash);
            $('.workList ul li').eq(i).find('.listBtn').attr('data-work', jsonData2[i].work);
            $('.listBtn').on('click', popupOn);
        }
    }

    //work popup페이지 관련 함수
    function popupOn() {
        let workName = $(this).attr('data-work');

        resetAni(); //애니메이션 초기화
        $('.scrollDown').addClass('scrollPop');
        if (mediaQuery.matches) {
            $('.scrollDown').show().css({ bottom: '24vh' });
        }
        if (workName == 'new') {
            alert("페이지 준비중입니다.");
        } else {
            $('.popup').each(function () {
                if ($(this).hasClass(workName)) {
                    $(this).addClass('on');
                    let popNum = $(this).index() - 2;
                    $(this).find('.video video').each(function (i) {
                        let srcNum = "src" + String(i);
                        $(this).attr('src', jsonData3[popNum][srcNum]);
                        $(this).trigger('pause');
                    });
                }
            });
        }
    }
    function popupOff() {
        if (mediaQuery.matches) {
            $('.scrollDown').hide();
        }
        $('.scrollDown').removeClass('scrollPop');
        $('.popup').each(function () {
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
            }
        });
    }
    function resetAni() {
        $('.in').each(function () {
            $(this).removeClass('in');
        });
    }
    function scrollAni(e) { //스크롤 시 컨텐츠 내용 보이는 애니메이션
        videoBoxAni();
        contentsAni();
        visitBtnAni(e);
        videoStart();
    }
    function videoBoxAni() {
        try{
            if (!$('.on').hasClass('portfolio')) {
                if ($('.on').find('.videoBox').offset().top <= popHeight) {
                    $('.on').find('.videoBox').addClass('in');
                }
            }
        }catch{}
    }
    function contentsAni() {
        $('.on').find('.inlineB').each(function () {
            if ($(this).offset().top <= popHeight) {
                $(this).addClass('in');
                $(this).parent().find('.contentText').addClass('in');
                if ($(this)[0].className == 'codepen inlineB scrollHidden in') {
                    $('.codepen').on('mouseenter', function (e) { //stranger codepen에서 스크롤 제거
                        e.preventDefault();
                        e.stopPropagation();
                        $('.popup.stranger').css({
                            overflow: 'hidden', width: '99.1%'
                        });
                        $('.popup.stranger').find('.popMain').css({
                            visibility: 'hidden'
                        })
                    });
                
                    $('.codepen').on('mouseleave', function (e) {
                        $('.popup.stranger').css({
                            overflow: 'auto', width: '100%'
                        });
                        $('.popup.stranger').find('.popMain').css({
                            visibility: 'visible'
                        });
                    });
                }
            }
        });
    }
    function visitBtnAni(e) {
        let scrTop = e.target.scrollTop;
        let scrollH = e.target.scrollHeight - popHeight;
        if (1300 <= scrTop) {
            $('.viewSite').show(500);
            if (scrTop == scrollH) {
                $('.visit').addClass('active');
            } else {
                $('.visit').removeClass('active');
            }
        } else {
            $('.viewSite').hide(300);
        }
        $('.viewSite').css({
            top: scrTop + 200
        });
        if (scrTop != 0) {
            $('.scrollPop').addClass('opacity');
        } else {
            $('.scrollPop').removeClass('opacity');
        }
    }
    function videoStart() {
        $('video').each(function () {
            if ($(this).parent().parent().hasClass('in')) {
                $(this).trigger('play');
            }
        });

    }
    function goTop() {
        $('.popup').animate({
            scrollTop: 0
        });
    }
});

