---
title: 카드 슬라이드 기능
categories: 
  - interactive_page
tags:
  - interactive_page
  
toc: true
---



CD Player 페이지의 점4와 별이 쏟아지는 카드사 페이지의 응용으로 카드가 날라다니는 기능을 공부해보자

## 1. 초안 작성

html 파일과, reset.scss, scss, js 파일을 만들자.

```html
<!DOCTYPE html>
<html>
<head>
    <title>카드 모션</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel="stylesheet" type="text/css" href="./css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./css/card.css" />

    <script type="text/javascript" src=" https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <script type="text/javascript" src="./js/card.js"></script>
</head>
<body>
  <h1>카드 슬라이드</h1>
  <section>
    <div class="cardItem">CARD</div>
    <div class="cardItem">CARD</div>
    <div class="cardItem">CARD</div>
    <div class="cardItem">CARD</div>
    <div class="cardItem">CARD</div>
  </section>
  <div class="buttonWrap">
    <button type="button">NO 1</button>
    <button type="button">NO 2</button>
    <button type="button">NO 3</button>
    <button type="button">NO 4</button>
  </div>
</body>
</html>
```


폰트와 기본적인 카드 형태와 점4 형태를 한번에 구현하여 가져오자.

```css
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

body {
    overflow: hidden;
    font-family: 'Do Hyeon', sans-serif;
    background : #cec4ce;
}

h1 {
    position: fixed;
    text-align: center;
    width: 100%;
    font-weight: 100;
}

section {
    position: relative;
    height: 100vh;
    width:100vw;

    .cardItem {
        position : absolute;
        width : 200px;
        height : 110px;
        padding : 15px;
        border-radius : 10px;
        box-shadow : 5px 5px 12px rgba(0,0,0,.3);

        font-size: 1rem;
        text-align : right;
        color: rgba(255,255,255, .5);
        // transform-origin:center 0;
        
        &:nth-child(1){
            background: linear-gradient(62deg, #FBAB7E, #F7CE68);
        }
        &:nth-child(2){
            background: linear-gradient(20deg, #FF5E7E, #FF99AC);
        }
        &:nth-child(3){
            background: linear-gradient(160deg, #0093E9, #80D0C7);
        }
        &:nth-child(4){
            background : linear-gradient(40deg, #fd1d1d, #833ab4);
        }
        &:nth-child(5){
            background: linear-gradient(20deg, black 0%, #FC00FF 100%);
        }
    }
}

.buttonWrap {
    position: absolute;
    bottom : 20px;
    left: 50%;
    transform : translateX(-50%);
    button {
        position : relative;
        z-index : 100;
        margin : 0 5px;
        background:black;
        color: #fff;
        padding : 8px 20px;
        transition: all .3s ease-out;

        &:hover, &.active {
            background-color: #970000;
        }
    }
}
```

이렇게 까지하면 아래와 같은 상태의 화면으로 보인다.

[![초안](/assets/imgs/interactive-cardslide/1.init.png)](/assets/imgs/interactive-cardslide/1.init.png)

여기까진 똑같다. 중요한건 스크립트

## 스크립트 추가하기1

- 점4 클릭시 페이지번호 저장
- 점4 클릭시 .active 효과

```javascript
window.onload = function(){

    var _cards = document.querySelectorAll(".cardItem");
    var _buttonAll = document.querySelectorAll("button");
    var pageNum = 0;


    for( var i = 0; i < _buttonAll.length; i++ ){
        (function(idx) {
            _buttonAll[idx].onclick = function() {
                //alert(idx);
                pageNum = idx;
                cardSetting();
            }
        })(i);
    }

    function cardSetting(){

        for(var i=0; i<_buttonAll.length; i++){
             //전체 버튼 비활성
            _buttonAll[i].classList.remove("active");
        }
         //버튼 활성
        _buttonAll[pageNum].classList.add("active");

    }
}

```

[![js 기본 추가](/assets/imgs/interactive-cardslide/2.jsinit.gif)](/assets/imgs/interactive-cardslide/2.jsinit.gif)


## 스크립트 추가하기2 - 제목 h2

제목에 TweenMax 이벤트를 추가하자
- 화면 갱신시 위에서 슬며시 내려오는 텍스트

h1 태그를 1초동안 top -50 에서 autoalpha : 0 으로 안보이다가 보이게 지정한다.


```javascript
    TweenMax.from("h1", 1, {
        top : -50,
        autoAlpha : 0,
        ease : Power3.easeOut
    })
```

[![js 제목 애니메이션 추가](/assets/imgs/interactive-cardslide/3.title.gif)](/assets/imgs/interactive-cardslide/3.title.gif)

## 스크립트 추가하기3 - 점4

제목 부분이 완료된다음 계산해서
1초 이후에 순서대로 쫘라락 나오는 느낌의 점4만들어보자

- for문 돌면서 순서대로 0.1 초 씩 더하여 애니메이션 효과 추가

```javascript
    _buttonAll.forEach(function(item, i){
        TweenMax.from(item, .4, {
            top : 100,
            autoAlpha : 0,
            ease : Power3.easeInOut, 
            delay : i * .1 + 1,
        })
    })
```

[![js 점4 애니메이션 추가](/assets/imgs/interactive-cardslide/4.jum4.gif)](/assets/imgs/interactive-cardslide/4.jum4.gif)

## 스크립트 추가하기4 - 영역잡기

카드를 흩뿌리는 애니메이션을 추가할 것인데 그전에
카드가 뿌려질 영역을 만들어줘야한다.

윷놀이판에서 윷가락이 낙되지 않기 하는 것과 비슷하다.

창이 조절되는 경우에도 영역을 잡아주기 위해 resize 이벤트를 추가하자

```javascript
var windowWidth, windowHeight;
...
window.onload = function(){
...//최하단
    window.addEventListener('resize', function(){
        resize();
    });

    function resize(){
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        cardSetting();
    }

    resize();
}
```

## 스크립트 추가하기5 - 카드 애니메이션 1

첫번째 애니메이션을 추가해보자.

- 현재 왼쪽,상단에 붙어 있는 카드가 화면 로딩 및 NO 1 버튼 클릭시 순서대로 화면 중앙에서 부터 사선의 위치로 이동함. ```top : windowHeight / 2 - i * 50```, ```left : windowWidth / 2 + i * 60 - 200```
- resize 기능을 확인. 창 크기조절시 ```windowHeight```, ```windowWidth``` 가 조절되기 때문에 애니메이션을 볼 수 있다.


```javascript
...
window.onload = function(){
    ...
    function cardSetting(){
        ...
        if(pageNum == 0){
            //가운데 정렬
            _cards.forEach(function(item, i){
                TweenMax.to(item, 1, {
                    top : windowHeight / 2 - i * 50,
                    left : windowWidth / 2 + i * 60 - 200,
                    rotationX : 0, 
                    rotationY : 0, 
                    rotationZ : 0,
                    ease : Power4.easeInOut, 
                    delay : i * .15
                })
            })
        }
        ...
    }
}
```

[![js 카드1 애니메이션 추가](/assets/imgs/interactive-cardslide/5.cardslide1.gif)](/assets/imgs/interactive-cardslide/5.cardslide1.gif)


## 스크립트 추가하기5 - 카드 애니메이션 2

두번째 애니메이션을 추가해보자.

- 카드를 흩뿌려보자.

```javascript
...
window.onload = function(){
    ...
    function cardSetting(){
        ...
        else if(pageNum == 1){
            //랜덤
            _cards.forEach(function(item, i){
                TweenMax.to(item, 1, {
                    top : Math.random() * (windowHeight - 300) + 100,
                    left : Math.random() * (windowWidth - 300) + 100, 
                    rotationX : "random(-60,60)", //Math.random()*30 
                    rotationY : "random(-60,60)", 
                    rotationZ : "random(-90,90)",
                    //scale : Math.random() * .6 + .6,
                    ease : Power4.easeInOut, 
                    delay : "random(0,.5)"
                })
            })
        }
    }
}
```

[![js 카드2 애니메이션 추가](/assets/imgs/interactive-cardslide/6.cardslide2.gif)](/assets/imgs/interactive-cardslide/6.cardslide2.gif)



## 스크립트 추가하기5 - 카드 애니메이션 3

세번째 애니메이션을 추가해보자.

- 카드를 다른방식으로 나열하자

```javascript
...
window.onload = function(){
    ...
    function cardSetting(){
        ...
        else if(pageNum == 2){
            _cards.forEach(function(item, i){
                TweenMax.to(item, 1, {
                    top : windowHeight / 2 + i * 30 - 100,
                    left : windowWidth / 2 - i * 80 ,
                    rotationX : 0,
                    rotationY : -10 * i,
                    rotationZ : 20 * i,
                    ease : Power4.easeInOut, 
                    delay : i * .15
                })
            })
        }
    }
}
```

[![js 카드3 애니메이션 추가](/assets/imgs/interactive-cardslide/7.cardslide3.gif)](/assets/imgs/interactive-cardslide/7.cardslide3.gif)


## 스크립트 추가하기6 - 카드 애니메이션 4

네번째 애니메이션을 추가해보자.

- 카드를 제자리로 돌려보내자

```javascript
...
window.onload = function(){
    ...
    function cardSetting(){
        ...
        else if(pageNum == 3){
            //여러분이 해보세요
            _cards.forEach(function(item, i){
                TweenMax.to(item, 1, {
                    top : 0,
                    left : 0 ,
                    rotationX : 0,
                    rotationY : 0,
                    rotationZ : 0,
                    ease : Power4.easeInOut, 
                    delay : i * .15
                })
            })
        }
    }
}
```

[![js 카드3 애니메이션 추가](/assets/imgs/interactive-cardslide/8.cardslide4.gif)](/assets/imgs/interactive-cardslide/8.cardslide4.gif)


## 끝

이렇게 하면 카드 슬라이드 기능 애니메이션 효과를 여러가지로 줘보면서
TweenMax의 간단한 기능을 확인했다.
