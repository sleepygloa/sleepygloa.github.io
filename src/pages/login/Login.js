import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

//API
import axios from 'axios';
import {API_URL} from '../../contraints';

//mui component
import {Grid,CircularProgress,Typography,Button,Tabs,} from "@mui/material";
//common component

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

// styles
import useStyles from "./styles";

import LoginRegPop from './LoginRegPop'
import {TextFieldDefault, SelectDefault} from "../../components/SearchBar/Components/TextFieldDefault"

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);

  //로그인팝업
  const [isOpenLoginReg, setIsOpenLoginReg] = useState(false);

  //데이터
  const [values, setValues] = useState({
    userId : "admin",
    password : "admin",
    bizCd : ""
  }); 
  //콥보박스(회사명)
  const [biz, setBiz] = useState([
    {
      CODE : "",
      NAME: ""
    }
  ]);

  //초기로딩시 불러오는 데이터
  useEffect(()=>{
    //메뉴리스트 조회
    axios.get(`${API_URL}/login/selectBizCmb`, {},{'Content-Type' : 'application/json',})
      .then(res => {
        setBiz([{
          CODE : "",
          NAME: ""
        }]);
        const arr = res.data;
        setBiz(biz => biz.concat(arr));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }, [])

  //onchange 이벤트
  const onChagneHandle = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Grid container className={classes.container}>
      {/* 큰 로고
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div> */}
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {/* 로그인 탭<Tab label="Login" classes={{ root: classes.tab }} /> */}
            {/* 신규가입 탭<Tab label="New User" classes={{ root: classes.tab }} /> */}
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <h2  className={classes.greeting}>
                안녕하세요. <br />또노의 프로젝트
              </h2>
              <SelectDefault
                  required
                  div="fullwidth"
                  id="bizCd"
                  value={values.bizCd}
                  label="회사명"
                  data={biz}
                  onChagneHandle={onChagneHandle}
                  labeling={true}
              />
              {/* 아이디 */}
              <TextFieldDefault
                    required
                    div="fullwidth"
                    id="userId"
                    onChagneHandle={onChagneHandle}
                    placeholder="아이디를 입력해주세요"
                    label="아이디"
                    value={values.userId||''}
                    labeling={true}
                    // error={(bizHelperText === "" ? false : true)}
                    // helperText={bizHelperText}
                />
              {/* 비밀번호 */}
              <TextFieldDefault
                    required
                    div="fullwidth"
                    id="password"
                    onChagneHandle={onChagneHandle}
                    placeholder="비밀번호를 입력해주세요"
                    label="비밀번호"
                    value={values.password||''}
                    labeling={true}
                    // error={(bizHelperText === "" ? false : true)}
                    // helperText={bizHelperText}
                />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      values.userId.length === 0 || values.password.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        values,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    로그인
                  </Button>
                )}
                <Button
                variant="contained"
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                  onClick={()=>{
                    setIsOpenLoginReg(true)
                  }}
                >
                  회원가입
                </Button>
                
                {/* 비밀번호 찾기
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button> */}
              </div>
            </React.Fragment>
          )}
          
          {/* 신규가입 탭 내용
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <alpha in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </alpha>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )} */}
        </div>
        
        <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="http://github.com/sleepygloa" rel="noopener noreferrer" target="_blank">sleepygloa</a>, LLC. All rights reserved.
        </Typography>
        <LoginRegPop isOpenLoginReg={isOpenLoginReg} setIsOpenLoginReg={setIsOpenLoginReg} />
      </div>
    </Grid>
  );
}

export default withRouter(Login);



