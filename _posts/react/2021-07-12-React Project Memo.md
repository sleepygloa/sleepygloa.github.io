---
title: React & firebase 를 이용해 메모장 만들기
categories: 
  - react
tags:
  - react, firebase
  
toc: true
---


# 😀 React & Firebase 를 이용해 메모장 만들기

# 📝요구조건(기능)
1. 페이지 로딩시 리스트와 메모 작성 버튼이 있다.
2. 메모 작성 버튼 클릭시 메모 작성을 위한 form 페이지로 이동.
3. 메모 작성 후 제출 버튼 클릭시 메모가 저장.
4. 메모 리스트는 제목, 내용, 저장일시 표시
5. 메모 삭제 버튼 클릭시 메모 삭제
6. 메모 클릭시 메모 상세 페이지로 이동
7. 상세 페이지에서 앱 로고 클릭시 리스트 화면으로 이동

게시판이다.

# 🚗 시작하기

## 프로젝트 설치

```
create-react-app my-app
cd my-app
npm start
```

## 모듈 설치

```
"dependencies": {
"@fortawesome/fontawesome-svg-core": "^1.2.22",
"@fortawesome/free-regular-svg-icons": "^5.10.2",
"@fortawesome/react-fontawesome": "^0.1.4",
"date-fns": "^2.0.1",
"firebase": "^6.2.4",
"lodash": "^4.17.15",
"path-to-regexp": "^3.0.0",
"react": "^16.9.0",
"react-dom": "^16.9.0",
"react-redux": "^7.1.0",
"react-router": "^5.0.1",
"react-router-dom": "^5.0.1",
"react-scripts": "3.1.1",
"redux": "^4.0.4",
"redux-form": "^8.2.6",
"redux-logger": "^3.0.6"
}
```

- font-awesome : 글꼴, 폰트 등
- firebase : 데이터 저장
- date-fns : 날짜 형식 포매팅
- lodash : Array, Obj 등 iterate 하여 원하는 형태로 변경 ***
- react-router : 페이지 전환, 렌더링
- redux : 리액트 상태관리


## 페이지 세팅

### index.js 변경

기존

```react
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

변경 후

```react
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { HashRouter as Router } from 'react-router-dom';
import rootReducer from './reducers/reducers';
import App from './containers/App';
import './index.css';
const store = createStore(rootReducer, applyMiddleware(logger));
ReactDOM.render(
<Provider store={store}>
<Router>
<App />
</Router>
</Provider>,
document.getElementById('root')
);
```

- redux, router 관련 import 를 해준다.
- 기존 app.js 를 component 폴더로 옮기고, 새로 ./containers/app.js 에 만든다.

아직까진 에러가 난다. app.js, reducer.js 까지 세팅하고 페이지를 보자.

### app.js 세팅

```react
import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
    return{

    };
}

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
```

- 위치 : containers/App.js
- 기존 index 에 redux 세팅을하고, 기존 App.js 는 ./components/App.js 로 옮겼다. 
- 새로운 ./containers/App.js 를 만들어 ```mapStateToProps```, ```mapDispatchToProps``` 를 ./compenents/App.js 로 connect 시켰다.
  
정리하면
- ./components/App.js : props를 받아 화면을 출력해 줌
- ./containers/App.js : 상태를 관리함.

### reducer 세팅

```react
import { combineReducers } from "redux";
import loadReducer from './loadReducer';

export default combineReducers({
    loadReducer
});
```

- 위치 : reducers/reducer.js
- 여러 reducer 함수를 사용하기 위해 reducer 함수는 따로 빼고, 함수들을 export 해주는 reducer.js 를 만들었다.

정리
- 액션 발생시 dispatch되어 reducer 함수 실행
- 실행 결과로 state 가 변경되어 container/App.js 에서 components/App.js 로 전달.

아직 화면은 에러가 난다.

## 데이터 연결 준비

### actionTypes 세팅

액션에 대한 결과 코드를 작성한다.

```react
export const GET_MEMO_LIST_SUCCESS = 'GET_MEMO_LIST_SUCCESS';
export const GET_MEMO_LIST_FAILURE= 'GET_MEMO_LIST_FAILURE';
```

- 위치 : constants/actionTypes.js

### action/index.js 세팅 

```react
import * as types from '../constants/actionTypes';

export const getMemoListSuccess = (memoList) => ({
    type: types.GET_MEMO_LIST_SUCCESS,
    memoList: memoList
})

export const getMemoListfailure = (error) => ({
    type: types.GET_MEMO_LIST_FAILURE,
    error
})
```

- 위치 : action/index.js
- 위에서 작성한 actionsTypes 를 import 를 받아 각각 타입에 맞는 액션을 작성

### reducers/loadReducer.js 세팅

이제 reducer 함수를 작성하자

```react
import * as types from '../constants/actionTypes';

const initState = {
    isLoading:true,
    isError:false,
    memoList:null
}

const loadReducer = (state = initState, action) => {
    switch(action.type){
        case types.GET_MEMO_LIST_SUCCESS:
            return {
                isLoading:false,
                isError:false,
                memoList:action.memoList
            };
        case types.GET_MEMO_LIST_FAILURE:
            return {
                isLoading:false,
                isError:true,
                memoList:action.memoList
            };
        default:
            return state;
    }
};

export default loadReducer;
```

- 위치 : reducers/loadReducer.js
- state 를 저장하여 각 액션 처리 결과에 따라 state 를 입력하여 반환한다.

여기까지 하면 react 메인 화면이 보인다.


## Firebase 연결

### Firebase Database 생성

1. firebase URL : https://firebase.google.com/?gclid=Cj0KCQjwraqHBhDsARIsAKuGZeFu9jcqFFJ2dSdREZSV3GL3Vj_Fv8CfOJ-LXZdNWxj_e3WotnpE4q8aAqKPEALw_wcB&gclsrc=aw.ds
2. 시작하기 - 프로젝트추가
3. 생성된 앱 클릭
4. 앱추가 (WEB)
5. Readtime Database 추가
6. 관련 키 및 url 가져와 아래 코드에 입력

### api/api.js 세팅

```react
import firebase from 'firebase/app';
import "firebase/database";
import {getMemoListSuccess, getMemoListfailure } from "../actions/index";

const firebaseConfig = {
  ...
}

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
```

- 위치 : api/api.js
- firebase 연결을 위한 기본코드를 작성한다.

위 코드 연결


```react
export const getMemoListApi = (dispatch) => {
    database.ref('memos/').on('value', snapshot => {
        const memoList = snapshot.val();
        const convertedList = memoList ? Object.keys(memoList).map(id => ({id, ...memolist[id]})).sort((l, r) => Number(r.id)-Number(l.id)) : [];

        dispatch(getMemoListSuccess(convertedList));
    }, error => {
        dispatch(getMemoListfailure(error));
    })
}
```

- firebase 관련 키 등 정보를 입력했다면 위의 코드도 넣자.
- memos/ 의 정보를 불러오는 코드이고, 시간순으로 정렬한다음 성공시 convertedList 반환, 실패시 error 반환이다.


### redux 연결, containers/App.js

```react
import { connect } from 'react-redux';
import { database, getMemoListApi } from '../api/api';
// import * as action from '../actions/index';
// import { camelizeKeys } from '../utils/utils';
import { camelizeKeys } from 'humps';
import App from '../components/App';
import { getMemoListfailure } from '../actions';

const mapStateToProps = state => {
    const {
        memoList
    } = state.loadReducer;

    if(!memoList){
        return {
            ...state.loadReducer
        };
    }

    return{
        ...state.loadReducer,
        memoList:camelizeKeys(memoList)
    };
}

const mapDispatchToProps = dispatch => ({
    onMemoListLoad:()=>{
        getMemoListApi(dispatch);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
```

- npm install humps : camelizeKey 이용
- mapStateToProps : [TODO]
- mapDispatchToProps : onMemoListLoad 함수에 api 연결

### components/App.js


