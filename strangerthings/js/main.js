let slide = document.getElementsByClassName("slide");
let rightNav = document.getElementsByClassName("rightNav");
let span = rightNav[0].querySelectorAll("span");
let pageIndex = 0;
let clickIndex;
function spanColor(){
    span[pageIndex].style.background = "#c00000";
    //if()
}
spanColor();
//선택된 span의 인덱스
function index(target){
    let hole = 0;
    while((target = target.previousSibling) != null){ //previousSibling 특정자식 찾기
        if(target.nodeType != 3){ //nodeType 3은 텍스트 
            hole += 1;
        }
    }
    return hole; 
}
function spanClick(){
    clickIndex = index(event.target);
    if(clickIndex == pageIndex){
        console.log(pageIndex + " page 현재페이지 click " + clickIndex);
    }else{
        console.log(index(event.target) + "다른페이지입니다" + pageIndex);
        if(pageIndex < clickIndex){
            console.log("if문 작동함");
            console.log("if의 page " + pageIndex + " clck : " + clickIndex);
            for(pageIndex; pageIndex < clickIndex; pageIndex++){
                slide[pageIndex].style.transform = "translateY(-100%)";
                console.log("if의 for page " + pageIndex + "click : " + clickIndex);
            }
        }else{
            console.log("else의 page : " + pageIndex);

            for(pageIndex; pageIndex > clickIndex; pageIndex--){
                slide[pageIndex-1].style.transform = "translateY(0%)";
                console.log("else의 for page : " + pageIndex + "click : " + clickIndex);

            }   
        }
        console.log(" for이 끝난후 page : " + pageIndex + " click : " + clickIndex);
        spanColor();
    }
}

//클릭 이벤트 등록
for(var i = 0; i <span.length; i++){

    span[i].addEventListener("click", spanClick);
}

