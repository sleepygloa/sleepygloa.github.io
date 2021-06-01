---
title: React 시작하기
categories: 
  - react
tags:
  - react
toc: true
---



# REACT 기본 



### 역사
- 페이스북에서 만든 라이브러리
- javascript 를 사용하면서 발생하는 **```코드수```**, **```의존성```** 문제가 발생하는데 이를 쉽게 해결할 수 있다.


### Node, Npm
- ```Node``` : 브라우저 외 프로그램으로 만들어서 사용가능한 스크립트
- ```Npm``` : Node 환경 또는 외부 자바스크립트 라이브러리를 관리하여 쉽게 다운로드가 가능.

### VSCode
- 스크립트 개발에 유용한 툴.
- URL : https://code.visualstudio.com/
- Plugin : 
  1. Meterial Theme : vscode 배경 메타 변경
  2. Meterial Icon Theme : 파일, 폴더 등의 확장자 성격에 맞게 변경, 보기 쉬워짐
  3. Pritter : 코드를 자동으로 직관적으로 변경.
   
### 프로젝트 만들기
- CMD, Bash 등의 창에서 프로젝트를 생성할 폴더로 이동함.
```
npm install create-react-app
creat-react-app .
```

### 시작
```
npm start
```

### React 의 특징
- 컴포넌트
    1. 각 컨텐츠 영역마다 컴포넌트화 하여 사용
    2. 필요시 적절한 컴포넌트를 불러와 재사용 용이
    3. 컴포넌트 : 헤더바, 배너, 리스트 등등
    4. 조건
       - 함수로 구성
       - UI 요소 return
            ```
            ...
            return (
                <div></div>
            )
            ```
- 가상 DOM
    1. DOM :  브라우저에서 최종적으로 화면에 그려주는 HTML 결과물을 의미.
    2. 가상 DOM? DOM 이 실제로 브라우저에서 화면을 그려주는 동안 계산을 한다면, 가상 DOM 은 가상으로? 빠르게 계산하여 결과만 DOM 에 전달, 연산의 양을 줄여주는 역할.
    3. 관련 URL : https://velopert.com/3236

### React 시작하기
- ```create-react-app .```  명령어로 프로젝트를 생성했다면 ```index.js``` 의 아래 코드를 볼 수 있다.
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```
- ```App.js``` 의 코드내용 중 export 을 사용함으로 컴포넌트화 되고, 다른 파일에서 사용할 수 있게 된다.
```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
- ```index.js``` 의 ```<App / >``` 으로 사용(import)하게 된다.



- ```렌더링``` : 컴포넌트가 화면에 보여지는 작업.
- ```부모컴포넌트```, ```자식컴포넌트``` : 컴포넌트 안에 컴포넌트가 있을때, 부모, 자식 컴포넌트라 부른다.

- ```JSX``` 문법
  1. React 에서 컴포넌트 만들때 사용하는 문법
  2.  ```JS``` 파일에서 ```HTML``` 태그를 사용하게 해줌.
  3.  ```{}``` 을 사용하여 사용.
  4.  관련 URL : https://velopert.com/867
  5.  사용예시
        ```
        //사용 예시 1
        function SayHelloComponent(){
                const text = "안녕 다마고치야";
                return (
                    <div>
                        <h3>그랩이 이야기 합니다 : {text}</h3>	
                    </div>
                )
        }

        //사용 예시 2
        function SayHelloComponent(){
                const getHelloElement = function(){
                    return (
                        <h3>그랩이 이야기 합니다 !</h3>	
                    )
                }
                return (
                    <div>
                        {getHelloElement()}
                    </div>
                )
        }

        //사용 예시 3
        function SayHelloComponent(){
                const sayHello = function(){
                    alert('안녕 나는 그랩이야');
                }
                return (
                //위에서 배웠던 Callback 함수. 클릭했을 때 sayHello 함수가 실행됩니다. 
                    <div onClick={sayHello}>
                        <h3>클릭해보세요</h3>
                    </div>
                )
        }


        export default SayHelloComponent;
        ```

- ```Props```
  1. 부모컴포넌트와 자식컴포넌트 사이에 값을 전달
  2. 화면이동시 각화면의 컴포넌트로 값을 전달
  3. 부모컴포넌트
```
import ChildComponent from './ChildComponent';
//부모 컴포넌트 (ParentComponent.js)
function ParentComponent(){
	return (
		<div>
			<h3>나는 부모입니다.</h3>
			<div>
				<h1>내 자식을 소개합니다 </h1>
				//HTML 태그의 Attribute를 넣듯이 Prop을 정해주면 됩니다.
				<ChildComponent name="선호" age={27}/> 
				<ChildComponent name="시우" age={28}/>
			</div>
		</div>
	)
}

export default ParentComponent
```

  4. 자식컴포넌트
```
//자식 컴포넌트 (ChildComponent.js)
//부모 컴포넌트에서 전달해주는 Prop 값은 컴포넌트 함수의 첫 번째 인자에 전부 들어갑니다.
function ChildComponent(props){ 
	const name = props.name;
	const age = props.age;
	return <h3>나는 {name}입니다. {age}살입니다.</h3>
}

export default ChildComponent;
```

- ```State```
    1. 화면 UI, DOM 을 업데이트해야할 상황에서 사용
        -   시간을 보여주는 화면
        -   데이터통신을 통한 새로운 값을 보여주는 화면
        -   추천검색어를 보여주는 화면 
        -   등

```
import React from 'react';


function TimerComponet(){
	//1. time에는 기본 값으로 0이 들어갑니다. 신기해 보이는 문법은 ES6의 destructuring입니다 (위에서 언급함)
	const [time, setTime] = React.useState(0)
	console.log('Component 업데이트!'); // time이 업데이트될 때마다 계속 호출됩니다.
	function updateTime(){
		setTime(time+1);
  }
  return  (
		<div>
			<h3>{time}초</h3>
	        {/* 클릭할 때마다 setTime으로 state를 업데이트해줍니다. */}
			<button onClick={updateTime}>1씩 올려주세요</button> 
    </div>
	)
}

export default TimerComponet;
```

- ```useEffect```
    1. 렌더링 제어를 위해 사용
    2. 두번째 인자가 변경될 때마다 함수가 재실행
```
//useEffect의 두 번째 인자(배열)에 값이 없으면 딱 한 번만 로딩되고 실행되지 않습니다.
function ComponentOnlyOnce(){
	const [time, setTime] = React.useState(0);
  React.useEffect(() => {
		setTime(time+1); //state를 바꿔서 또 렌더링이 되더라도 setTime은 호출되지 않습니다.
    console.log('컴포넌트가 화면에 처음 렌더링될 때 딱 한 번 실행됩니다.');
  }, []);
}

//아래와 같이 하면 안됩니다.
function DontDoThisComponent(){
	const [time, setTime] = React.useState(0);
  React.useEffect(() => {
		setTime(time+1); //state인 time을 업데이트하면 useEffect안의 함수가 또 실행됩니다.
    console.log('time이 바뀔 때마다 계속 업데이트됩니다.');
  }, [time]); //time이 업데이트 될때마다 함수가 실행됩니다.
}
```
- ```useState```, ```useEffect``` 와 같은 메소드를 hook 이라고 한다.
