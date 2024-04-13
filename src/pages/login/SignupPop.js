import React, { Component, useState, useEffect } from "react";
import axios from 'axios';
import { API_URL } from '../../contraints.js';
import useStyles from "./styles.js";
import qs from 'qs';
import { saveUser, useUserDispatch, useSignupPop, useSignupPopAction } from "../../context/UserContext.js";


export default function SingupPop({isOpen}) {
  var classes = useStyles();
  const signupPopAction = useSignupPopAction();

  //Form Data
  const [isData, setIsData] = useState({ 
    userId: "", 
    password: "", 
    nickname: "", 
  });
  
  //Set Form Data
  const onChangeHandler = (event) => {
    setIsData({ ...isData, [event.target.id]: event.target.value });
  };

  const loginClickHandler = (e) => {
    if (!isData.userId && !isData.password && !isData.nickname) {
      alert('회원가입에 실패했습니다. ')
      return;
    }

    //로그인 처리
    var headers = {
      "Content-type":"application/json"
    }
    axios.post(`${API_URL}/login/saveUser`, isData, headers)
    .then(res => {
      closePop();
      alert('회원가입에 성공하였습니다. ')
    }).catch(error => { 
      console.log(error)
      alert('회원가입에 실패했습니다. ')
    })
  }; 

  const closePop = () => {
    signupPopAction.closePop();
  }

    return (
      <>
        {isOpen ? (  
          <div className={classes.modal}>
            <div>
              <div className={classes.loginModal}>
                <span className={classes.close} onClick={closePop}>
                  &times;
                </span>
                <div className={classes.modalContents} >
                  회원가입
                  {/* <img
                    className="signinIcon"
                    src="banner.png"
                  /> */}
                  <input
                    name="userId"
                    id="userId"
                    className={classes.loginId}
                    type="text"
                    placeholder="아이디"
                    onChange={onChangeHandler}
                  />
                  <input
                    name="password"
                    id="password"
                    className={classes.loginPw}
                    type="password"
                    placeholder="비밀번호"
                    onChange={onChangeHandler}
                  />
                  <input
                    name="nickname"
                    id="nickname"
                    className={classes.loginId}
                    type="text"
                    placeholder="닉네임"
                    onChange={onChangeHandler}
                  />
                  <button className={classes.loginBtn} onClick={()=>{loginClickHandler()}}>
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }