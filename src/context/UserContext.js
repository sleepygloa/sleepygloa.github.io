import React from "react";
import axios from 'axios';
import { API_URL } from '../contraints';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };

    case "LOGIN_FAILURE":
      alert('로그인에 실패하였습니다. ');
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
} 

function UserProvider({ children }) {
  // console.log('localStorage.getItem("Authorization") ',localStorage.getItem("Authorization"));
  var [state, dispatch] = React.useReducer(userReducer, {
    // isAuthenticated: !!localStorage.getItem("access_token"),
    // isAuthenticated : (axios.defaults.headers.common['access_token'] ? true : false)
    isAuthenticated: !!sessionStorage.getItem("refresh_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  // var context = axios.defaults.headers.common['Authorization'];
  if (context === undefined) {
    return false;
    // throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  // var context = axios.defaults.headers.common['Authorization'];
  if (context === undefined) {
    return false;
    // throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, values, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!values.userId && !!values.password && !!values.bizCd) {

    //[TTONO]로그인 처리
    var params = {
      userId : values.userId,
      password : values.password,
      bizCd : values.bizCd
    };
    var headers = {
      "Content-type":"application/json"
    }
    axios.post(`${API_URL}/login/login`, params, headers)
      .then(res => {
        // console.log('token check ',res.data);
        //토큰 헤더에 저장
        axios.defaults.headers.common['access_token'] = 'Bearer ' + res.data.accessToken;
        sessionStorage.setItem('access_token', res.data.accessToken);
        sessionStorage.setItem('refresh_token', res.data.refreshToken);


        setIsLoading(false);
        setError(null);
        dispatch({ type: 'LOGIN_SUCCESS' })
      }).catch(error => { 
        console.log('login error = '+error); 
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      })

  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
