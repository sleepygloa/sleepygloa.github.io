import React, {useEffect, useState} from "react";

//component

import {
    TextField,
} from "@mui/material";
import axios from 'axios';
import { 
    formatRequired, 
    formatBizNumber,
    formatPhoneNumber, 
    formatTelNumber } from '../../components/validation/validation';
import * as Icons from "@mui/icons-material";
import {API_URL} from '../../contraints';
import {SelectDefault} from "../../components/SearchBar/Components/SelectDefault"
import {TextFieldDefault} from "../../components/SearchBar/Components/TextFieldDefault"

//Modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ModalSearchAddress from "../../components/api/searchAddrDaum/_ModalSearchAddress";

//


const useStyles = makeStyles((theme) => ({
    textField: {
      marginBottom: 0,
      marginTop: 0,
    },
    icon : {
        margin: '0 auto',
        height: '50px',
        paddingTop: '0px',
        paddingBottom: '0px'
    }
  }));

export default function LoginRegPop({isOpenLoginReg, setIsOpenLoginReg}){
    const {isOpen} = isOpenLoginReg; 

    //주소검색팝업 상태
    const theme = useTheme();
    const classes = useStyles(); 
    //반응형
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //Data
    const [values, setValues] = useState({
        bizCd : "",
        userId : "",
        password : ""
    })


    //닫기
    const handleClose = () => {
        setIsOpenLoginReg(false);
    };

    //onchange 이벤트
    const onChagneHandle = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    //저장
    
    const fnSave = () => {
        //메뉴리스트 조회
       axios.post(`${API_URL}/login/saveUser`, values, {'Content-Type' : 'application/json',})
       .then(res => {
           alert('회원가입 되었습니다.')
           handleClose();
       }).catch(error => { 
           console.log('error = '+error); 
           alert('회원가입 실패하였습니다.')
       })
   }

    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open responsive dialog
        </Button> */}
        <Dialog
            fullScreen={fullScreen}
            open={isOpenLoginReg}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
            {"회원가입"}
            </DialogTitle>
            <DialogContent>
                {/* 아이디 */}
                <TextFieldDefault
                    required
                    div="fullwidth"
                    id="bizCd"
                    onChagneHandle={onChagneHandle}
                    placeholder="회사명를 입력해주세요"
                    label="회사명"
                    value={values.bizCd||''}
                    // error={(bizHelperText === "" ? false : true)}
                    // helperText={bizHelperText}
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
                        // error={(bizHelperText === "" ? false : true)}
                        // helperText={bizHelperText}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>닫기</Button>
                <Button onClick={fnSave}>저장</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}