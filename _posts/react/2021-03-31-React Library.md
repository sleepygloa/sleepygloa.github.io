---
title: React 라이브러리
categories: 
  - react
tags:
  - react
  
toc: true
---


# REACT 라이브러리 및 API 

### ```React-router-dom```
- 화면이동을 돕는 라이브러리
- 관련 URL : https://reactrouter.com/web/guides/quick-start
- 설치

```
npm install react-router-dom
```

- 예제
```
// product/index.js
function ProductPage(){
    return <h1>상품 상세 페이지</h1>
}

export default ProductPage;
```
```
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; //임포트

ReactDOM.render(
    <React.StrictMode>
        <Router> //태그 사용
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```


```
//App.js
import "./App.css";
import ProductPage from "./upload/index";
import {Route, Switch } from "react-router-dom";

function App() {
  return <ProductPage />;
}


export default App;
```

- ```Link``` 컴포넌트 사용
  - 클릭할 대상을 ```Link``` 태그로 감싸서 사용

```
<Link to="/register">
    <button>아티클 추가하기</button>
</Link>
```

### ```Antd```
- 디자인을 손쉽게 도와주는 라이브러리
- GITHUB : https://github.com/ant-design/ant-design
- URL : https://ant.design/components/overview/
- 설치
```
npm install antd
```
- 사용

```
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```
- 사용예 : 홈페이지 사용방법 확인



