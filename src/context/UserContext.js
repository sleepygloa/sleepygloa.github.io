import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { API_URL } from '../contraints';
import { Cookie } from "@mui/icons-material";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
//로그인 정보 
var UserInfoContext = React.createContext();
var SetUserInfoContext = React.createContext();
//로그인팝업 
var IsLoginPopContext = React.createContext(false);
var IsLoginPopActionContext = React.createContext(false);
//회원가입팝업
var IsSignupPopContext = React.createContext(false);
var IsSignupPopActionContext = React.createContext(false);

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      alert('로그인에 성공하였습니다. ');
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      alert('로그인에 실패하였습니다. ');
      break;
    case "SIGNUP_FAILURE":
      alert('회원가입에 실패하였습니다. ');
      break;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
} 

function UserProvider({ children }) {
  // console.log('localStorage.getItem("Authorization") ',localStorage.getItem("Authorization"));
  var [state, dispatch] = React.useReducer(userReducer, {
    // isAuthenticated: !!Cookie.getItem("access_token"),
    // isAuthenticated : (axios.defaults.headers.common['access_token'] ? true : false)
    // isAuthenticated: !!sessionStorage.getItem("refresh_token"),
  });
  
  

  //로그인 팝업 
  const [isLoginPop, setIsLoginPop] = useState(false);
  const isLoginPopAction = useMemo(() => ({
    openPop(){
      setIsLoginPop(true);
    },
    closePop(){
      setIsLoginPop(false);
    }
  }), [isLoginPop]
  )
  //회원가입 팝업 
  const [isSignupPop, setIsSignupPop] = useState(false);
  const isSignupPopAction = useMemo(() => ({
    openPop(){
      setIsSignupPop(true);
    },
    closePop(){
      console.log('closePop');
      setIsSignupPop(false);
    }
  }), [isSignupPop]);

  return (
      <IsLoginPopActionContext.Provider value={isLoginPopAction}>
        <IsLoginPopContext.Provider value={isLoginPop}>
          <IsSignupPopActionContext.Provider value={isSignupPopAction}>
            <IsSignupPopContext.Provider value={isSignupPop}>
              <UserStateContext.Provider value={state}>
                <UserDispatchContext.Provider value={dispatch}>
                  {children}
                </UserDispatchContext.Provider>
              </UserStateContext.Provider>
            </IsSignupPopContext.Provider>
          </IsSignupPopActionContext.Provider>
        </IsLoginPopContext.Provider>
      </IsLoginPopActionContext.Provider>
  );
}

function useUserInfo(){
  var context = React.useContext(UserInfoContext);
  if (context === undefined) {
    return false;
  }
  return context;
}
function useSetUserInfo(){
  var context = React.useContext(SetUserInfoContext);
  if (context === undefined) {
    return false;
  }
  return context;
}
function useUserLoginPop() {
  var context = React.useContext(IsLoginPopContext);
  // var ontext = axios.defaults.headers.common['Authorization'];
  if (context === undefined) {
    return false;
    // throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
function useUserLoginPopAction() {
  var context = React.useContext(IsLoginPopActionContext);
  if (context === undefined) {
    return false;
    // throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
function useSignupPop() {
  var context = React.useContext(IsSignupPopContext);
  if (context === undefined) {
    return false;
  }
  return context;
}

function useSignupPopAction() {
  var context = React.useContext(IsSignupPopActionContext);
  if (context === undefined) {
    return false;
  }
  return context;
}
function useUserState() {
  var context = React.useContext(UserStateContext);
  // var context = axios.defaults.headers.common['Authorization'];
  if (context === undefined) {
    return false;
    // throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context.isAuthenticated;
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

export { UserProvider, useUserState, useUserDispatch, useUserInfo, useSetUserInfo, useUserLoginPop, useUserLoginPopAction, useSignupPop, useSignupPopAction, signOut};

// ###########################################################



//로그아웃 
function signOut(dispatch, history) {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
