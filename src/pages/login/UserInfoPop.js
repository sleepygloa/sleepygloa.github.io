import React, { Component, useState, useEffect } from "react";
import axios from 'axios';
import useStyles from "./styles.js";
import { useUserLoginPopAction, useSignupPop, useSignupPopAction, useUserDispatch, useSetUserInfo } from "../../context/UserContext.js";
import { API_URL, client } from "../../contraints.js";
import SingupPop from "./SignupPop.js";
import { Cookie } from "@mui/icons-material";


export default function UserInfoPop({isOpen, setIsOpen}) {
  var classes = useStyles();

  const isDispatch = useUserDispatch();
  const loginPopAction = useUserLoginPopAction();
  //회원가입 
  const isSignupPopAction = useSignupPopAction();
  const isSignupPop = useSignupPop();

  // const [userInfo, setUserInfo] = useSetUserInfo();

  //회원가입 팝업 열기
  const SingupPopupHandler = (e) => {
    isSignupPopAction.openPop();
  }

  //Form Data
  const [isUser, setIsUser] = useState({
    userId: "",
    password: "",
  })
  //LoginData KeyIn
  const loginUserHandler = (e)=>{
    setIsUser({ ...isUser, [e.target.name]: e.target.value });
  }
  
  //User Login
  const loginClickHandler = (e) => {
    if (!isUser.userId && !isUser.password) {
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }
  
    var headers = {
      "Content-type":"application/json"
    }
    axios.post(`${API_URL}/login/login`, isUser)
    .then(res => {
      console.log(res);
      // 만료일까지의 시간을 계산합니다.
      var accessTokenDt = new Date();
      accessTokenDt.setTime(accessTokenDt.getTime() + (res.data.accessTokenDt*1000));
      var refreshTokenDt = new Date();
      refreshTokenDt.setTime(refreshTokenDt.getTime() + (res.data.refreshTokenDt*1000));
      console.log(accessTokenDt, refreshTokenDt)

      document.cookie = 'accessToken='+res.data.accessToken+'; expires='+accessTokenDt.toUTCString()+' path=/';
      document.cookie = 'refreshToken='+res.data.refreshToken+'; expires='+refreshTokenDt.toUTCString()+' path=/';
      isDispatch({ type: 'LOGIN_SUCCESS' })
      window.location.href = '/';
    }).catch(error => { 
      console.log('err',error)
      alert('로그인 실패했습니다.');
    })
  }; 

  //Kakao Login
  function loginKakaoClickHandler(){
    // console.log(`${API_URL}/oauth2/authorization/google`);
    window.location.assign(`${API_URL}/oauth2/authorization/kakao`);
    return null;
  }; 

  //Naver Login
  function loginNaverClickHandler(){
    // console.log(`${API_URL}/oauth2/authorization/google`);
    window.location.assign(`${API_URL}/oauth2/authorization/naver`);
    return null;
  }; 

  //Google Login 2
  function loginGoogleClickHandler2(){
    // console.log(`${API_URL}/oauth2/authorization/google`);
    window.location.assign(`${API_URL}/oauth2/authorization/google`);
    return null;
  }; 
    return (
      <>
        {isOpen ? (  

         ////만약 isopen(this.state.isModalOpen)이 true일때 코드를 실행 false면  null
        /// <div onClick={close}> 로그인창 말고 회색 바탕을 누를시 모달이 꺼지게 만듬
	      ///<span className="close" onClick={close}>&times;</span> x버튼 누를시 꺼짐
        ////<div className="modalContents" onClick={isOpen}> 로그인 화면은 버튼 클릭해서 들어오면
         /// true인 상태로 있어서 화면이 안꺼진다.new URL(document.referrer).searchParams.get("redirect_uri")
      
          <div className={classes.modal}>
            <div>
              <div className={classes.loginModal}>
                <span className={classes.close} onClick={loginPopAction.closePop}
                >
                  &times;
                </span>
                <div className={classes.modalContents} >
                  Comfunny Developers
                  {/* <img
                    className="signinIcon"
                    src="banner.png"
                  /> */}
                  <input
                    name="userId"
                    className={classes.loginId}
                    type="text"
                    placeholder="아이디"
                    onChange={loginUserHandler}
                  />
                  <input
                    name="password"
                    className={classes.loginPw}
                    type="password"
                    placeholder="비밀번호"
                    onChange={loginUserHandler}
                  />
                  <div className={classes.loginMid}>
                    <label className={classes.autoLogin} for="hint">
                      {" "}
                      <input type="checkbox" id="hint" /> 로그인 유지하기
                    </label>
                    <div className={classes.autoLogin}>아이디/비밀번호 찾기</div>
                  </div>
                  <button className={classes.loginBtn} onClick={()=>{loginClickHandler()}}
                  >
                    {" "}
                    로그인{" "}
                  </button>
                  <div className={classes.socialBox}>
                    <div className={classes.kakao}>
                      {/* <img
                        className={classes.kakaoLogo}
                        src="/Images/SignIn/kakao.png"
                      /> */}
                      <div className={classes.kakaoText} onClick={()=>{loginKakaoClickHandler()}}
                      >카카오 계정으로 신규가입</div>
                    </div>
                    <div className={classes.google}>
                      {/* <img
                        className={classes.googleLogo}
                        src="/Images/SignIn/kakao.png"
                      /> */}
                      <div className={classes.googleText} onClick={()=>{loginGoogleClickHandler2()}}
                      >구글 계정으로 신규가입</div>
                    </div>
                    <div className={classes.facebook}>
                      {/* <img
                        className={classes.facebookLogo}
                        src="/Images/SignIn/facebook.png"
                      /> */}
                      <div className={classes.facebookText}
                      onClick={()=>{loginNaverClickHandler()}}
                      >
                        네이버 계정으로 신규가입
                      </div>
                    </div>
                  </div>
                  <div className={classes.loginEnd}>
                    <div className={classes.loginLine} onClick={SingupPopupHandler}>
                      회원이 아니신가요? <span className={classes.loginLineA}>회원가입</span>
                    </div>
                    {/* <div className={classes.noUser}>비회원 로그인</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {isSignupPop ? (
          <SingupPop isOpen={isSignupPop}/>
        ) : null
        }
      </>
    );
  }