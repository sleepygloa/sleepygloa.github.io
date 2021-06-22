---
title: 별이 쏟아지는 카드사 페이지 만들기
categories: 
  - interactive_page
tags:
  - interactive_page
  
toc: true
---




기존에 공부한
1. 페이지 전환 기능
2. TweenMax 기능 

을 이용해서 새로운 인터렉티브 페이지인 별이 쏟아지는 카드사 페이지를 만들어보자.

## 1. 초안 작성

```html
<!DOCTYPE html>
<html>
<head>
    <title>별이 쏟아지는</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

</head>
<body>

</body>
</html>
```

이번에 진행할 페이지는 
화면 상단 
- TweenMax 를 이용한 텍스트 애니메이션
- 스크롤 을 이용한 애니메이션 

화면 하단
- 카드 4개 애니메이션

### 관련 CSS, JS 미리 만들기
기존에 보유한 ```reset.css``` 를 넣고 이번에 사용할
- ```star.css```, ```star.js``` 추가
- 라이브러리 ```gasp.js```  : 
- 라이브러리 ```ScrollToPlugin.js``` : 

```html
<head>
    <link rel="stylesheet" type="text/css" href="./css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./css/star.css" />

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/gsap@3/dist/ScrollToPlugin.min.js"></script>
    <script type="text/javascript" src="./js/star.js"></script>

</head>
```

### 카드 만들기
점4 와 비슷하다.
- section 에 div.contWrap 으로 묶고 ul, li, p 로 카드를 구현하자.
- 특별한 건 아니지만 화면하단에 내려 왔을때 최상단으로 보내는 버튼 하나 만들자


HTML 추가

```html
<body>
  <section class="bottom">
    <div class="contWrap">
      <ul>
        <li><p>card</p></li>
        <li><p>card</p></li>
        <li><p>card</p></li>
        <li><p>card</p></li>
      </ul>
      <h2>별이 쏟아지는, 인터랙티브</h2>
    </div>
    <button button="type" class="topBtn">TOP</button>
  </section>
</body>
```

[![초안](/assets/imgs/interactive-downthestar/1.init.png)](/assets/imgs/interactive-downthestar/1.init.png)

CSS 추가
- section.bottom
  - 미리준비한 이미지 배경으로. 정중앙 바닥에 위치. 반복 금지. 나중에 추가할 section.top 과 상호작용을 위한 최소 높이 60vh
- div.contWrap
  - 카드영역을 가로로 정렬하기 위해 가로영역 지정, ```width:100%```, ```max-width:700px```, TOP 버튼(```position:absolute```)(고정위치)과 위치 배치를 위해 ```position:relative```
- ui.li 
  - 가로 영역 배치를 위한 ```display:inline-block```, 영역 지정 margin...width...height...
  - 카드모양을 내기 위한 ```border-radius: 6px 6px 6px 6px```, ```box-sizing:border-box```, ```padding:10px```
  - 그이외 추가
- h2 
  - 별이 쏟아지는 배경에 추가되기 때문에 적절한 위치 ```text-align:center``` 와 색 ```color:#fff``` 지정
  - 배경 추가하기 전에는 주석처리하여 보이게 하자.
- button.topBtn 
  - 최상단으로 올라가는 버튼. TOP 으로 텍스트입력
  - 그 위외 버튼 모양과 색을 지정.

```css
section {
    position: relative;
    width:100vw;

    &.bottom {
        background: url(../image/bottom.png) center bottom / 100% no-repeat;
        min-height: 60vh;
        
        .contWrap {
            position: relative;
            margin: 0 auto;
            width:100%;
            max-width: 700px;
            ul{
                li {
                    display: inline-block;
                    margin : 0 2%;
                    width: 130px;
                    height: 200px;
                    border-radius: 6px 6px 6px 6px;
                    box-sizing: border-box ;
                    padding: 10px;
                    cursor: pointer;

                }
            }
            h2 {
                text-align: center;
                color: #fff;
                margin-top:30px;
                font-weight: 100;
            }
        }

        .topBtn {
            position: absolute;
            bottom: 10%;
            right: 70px;
            padding : 10px;
            border-radius: 6px 6px 6px 6px;
            background-color: #eee;
            border: 2px solid #eee;
            transition: all .3s ease-out;
        }
    }
}

```

[![CSS 추가](/assets/imgs/interactive-downthestar/2.css.png)](/assets/imgs/interactive-downthestar/2.css.png)



카드 모양 만들기
- ul.li 자식 4개 순서대로 이쁘게 색상(그라데이션) 추가
- 기존의 card 글자를 흰색 으로 수정.

```css
        .contWrap {
...
            ul{
                li {
...
                    p {
                        font-size: 20px;
                        color: #fff;
                        border-bottom: 2px dashed #fff;
                    }
                    &:nth-child(1){
                        background: linear-gradient(45deg, #f7b733, #fc4a1a); 
                    }
                    &:nth-child(2){
                        background: linear-gradient(45deg, #FC00FF 0%, #401241 100%);
                    }
                    &:nth-child(3){
                        background-image: linear-gradient(45deg, #ce713b 0%, #F7CE68 100%);
                    }
                    &:nth-child(4){
                        background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
                    }
...
                }
            }

        }

```

[![카드 만들기](/assets/imgs/interactive-downthestar/3.card.png)](/assets/imgs/interactive-downthestar/3.card.png)

### 폰트 추가하기

scss 파일에 아래와 같은 형식으로 코드를 추가하면 폰트가 적용된다.
- css : 폰트 URL 링크 추가

```css
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

body {
    font-family: 'Do Hyeon', sans-serif;
}
```

### 별이 쏟아지는 부분 만들기

배경영역을 추가하면서 기존에 추가했던 bottom 의 h2 css 주석을 제거하자.

```css
body {
    overflow-x: hidden;
    background: url(../image/bg.jpg);
    font-family: 'Do Hyeon', sans-serif;
}
```

[![배경 만들기](/assets/imgs/interactive-downthestar/4.background.png)](/assets/imgs/interactive-downthestar/4.background.png)