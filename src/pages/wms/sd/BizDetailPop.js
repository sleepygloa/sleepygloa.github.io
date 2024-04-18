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

//Modal


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

export default function BizDetailPop({isOpen, setIsOpen, id, flag}){

    //주소검색팝업 상태
    const [isOpenAddr, setIsOpenAddr] = React.useState(false);
    const theme = useTheme();
    const classes = useStyles(); 
    //반응형
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //값
    //사업자코드
    const [biz, setBiz] = useState('');
    const [bizHelperText, setBizHelperText] = useState('');
    //사업자번호
    const [bizNo, setBizNo] = useState(''); 
    const [bizNoDis, setBizNoDis] = useState(''); 
    const [bizNoHelperText, setBizNoHelperText] = useState(''); 
    //사업자명
    const [bizNm, setBizNm] = useState(''); 
    const [bizNmHelperText, setBizNmHelperText] = useState(''); 

    const [bizSnm, setBizSnm] = useState(''); 
    const [ceo, setCeo] = useState(''); 
    const [addr, setAddr] = useState(''); 
    const [detailAddr, setDetailAddr] = useState(''); 
    const [tel, setTel] = useState(''); 
    const [telDis, setTelDis] = useState(''); 
    const [fax, setFax] = useState(''); 
    const [faxDis, setFaxDis] = useState(''); 
    const [zip, setZip] = useState(''); 
    const [useYn, setUseYn] = useState(''); 
    const [etcNo1, setEtcNo1] = useState(''); 
    const [etcNo2, setEtcNo2] = useState(''); 
    const [etcTp1, setEtcTp1] = useState(''); 
    const [etcTp2, setEtcTp2] = useState(''); 

    //열기
    // const handleClickOpen = () => {
    //     setIsOpen(true);
    // };
    //닫기
    const handleClose = () => {
        setIsOpen(false);
    };

    //열기(주소팝업)
    const fnOpenAddr = () => {
        setIsOpenAddr(true)
    }


    //데이터 불러오기
    useEffect(()=>{
        if(id === -1){
            onChanged("bizCd", '');
            onChanged("bizNo", '');
            onChanged("bizNm", '');
            onChanged("bizSnm", '');
            onChanged("ceo", '');
            onChanged("addr", '');
            onChanged("detailAddr", '');
            onChanged("tel", '');
            onChanged("fax", '');
            onChanged("zip", '');
            onChanged("useYn", '');
            onChanged("etcNo1", '');
            onChanged("etcNo2", '');
            onChanged("etcTp1", '');
            onChanged("etcTp2", '');
        }else{

            //조회
            axios.get(`${API_URL}/api/sd/biz/${id}`)
            .then(res => {
                var data = res.data;
                onChanged("biz", data.biz);
                onChanged("bizNo", data.bizNo);
                onChanged("bizNm", data.bizNm);
                onChanged("bizSnm", data.bizSnm);
                onChanged("ceo", data.ceo);
                onChanged("addr", data.addr);
                onChanged("detailAddr", data.detailAddr);
                onChanged("tel", data.tel);
                onChanged("fax", data.fax);
                onChanged("zip", data.zip);
                onChanged("useYn", data.useYn);
                onChanged("etcNo1", data.etcNo1);
                onChanged("etcNo2", data.etcNo2);
                onChanged("etcTp1", data.etcTp1);
                onChanged("etcTp2", data.etcTp2);
            }).catch(error => { 
                console.log('error = '+error); 
            })
        }
    })

    //저장
    const fnSave = () => {
         //메뉴리스트 조회
        axios.put(`${API_URL}/api/sd/biz`, {
            biz:biz, 
            bizNo:bizNo, 
            bizNm:bizNm, 
            bizSnm:bizSnm, 
            ceo:ceo, 
            addr:addr, 
            detailAddr:detailAddr, 
            tel:tel, 
            fax:fax, 
            zip:zip, 
            useYn:useYn, 
            etcNo1:etcNo1, 
            etcNo2:etcNo2, 
            etcTp1:etcTp1, 
            etcTp2:etcTp2
        },{
            'Content-Type' : 'application/json',
            // 'Authorization' : authToken
        })
        .then(res => {
            alert('저장되었습니다.')
            handleClose();
        }).catch(error => { 
            console.log('error = '+error); 
        })
    }

    //삭제
    const fnDel = () => {
        //메뉴리스트 조회
        axios.delete(`${API_URL}/api/sd/biz/${id}`)
       .then(res => {
           alert('삭제되었습니다.')
           handleClose();
       }).catch(error => { 
           console.log('error = '+error); 
       })
   }

    //값 수정
    const onChanged = (id, value)=> {
        if(id === "biz"){
            const { val1, helperText } = formatRequired(value);
            setBiz(val1);
            setBizHelperText(helperText);
        }
        if(id === "bizNo") {
            const { val1, helperText } = formatRequired(value);
            const { val11, val2 } = formatBizNumber(val1);
            setBizNo(val11);
            setBizNoDis(val2);
            setBizNoHelperText(helperText);
        }
        if(id === "bizNm") {
            const { val1, helperText } = formatRequired(value);
            setBizNm(val1);
            setBizNmHelperText(helperText);
        }
        if(id === "bizSnm") setBizSnm(value);
        if(id === "ceo") setCeo(value);
        if(id === "addr") setAddr(value);
        if(id === "deatailAddr") setDetailAddr(value);
        if(id === "tel") {
            const {val1, val2} = formatPhoneNumber(value);
            setTel(val1); //데이터용
            setTelDis(val2); //디스플레이용
        }
        if(id === "fax") {
            const {val1, val2} = formatTelNumber(value);
            setFax(val1);
            setFaxDis(val2);
        }
        if(id === "zip") setZip(value);
        if(id === "useYn") setUseYn(value);
        if(id === "etcNo1") setEtcNo1(value);
        if(id === "etcNo2") setEtcNo2(value);
        if(id === "etcTp1") setEtcTp1(value);
        if(id === "etcTp2") setEtcTp2(value);
    }

    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open responsive dialog
        </Button> */}
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
            {"사업자정보"}
            </DialogTitle>
            <DialogContent>
                {/* 사업자코드 */}
                <TextField
                    required
                    margin="normal"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    id="biz" 
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="사업자코드"
                    InputLabelProps={{ shrink: true }}
                    value={biz||''}
                    error={(bizHelperText === "" ? false : true)}
                    helperText={bizHelperText}
                />
                {/* 사업자번호 */}
                <TextField
                    required
                    margin="normal"
                    type="text"
                    fullWidth
                    className={classes.textField}
                    id="bizNo" 
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="사업자번호"
                    InputLabelProps={{ shrink: true }}
                    value={bizNoDis||''}
                    error={(bizNoHelperText === "" ? false : true)}
                    helperText={bizNoHelperText}
                />
                {/* 사업자명 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="bizNm" 
                    className={classes.textField}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="사업자명"
                    InputLabelProps={{ shrink: true }}
                    value={bizNm||''}
                    error={(bizNmHelperText === "" ? false : true)}
                    helperText={bizNmHelperText}
                />
                {/* 사업자약어 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="bizSnm" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={bizSnm||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="사업자약어"
                />  
                {/* 대표자 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="ceo" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={ceo||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="대표자"
                />  
                {/* 전화번호 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="tel" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={telDis||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="전화번호"
                />  
                {/* 팩스 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="fax" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={faxDis||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="팩스"
                />  
                <div>
                    {/* 우편번호 */}
                    <TextField
                        margin="normal"
                        type="text"
                        disabled
                        id="zip" 
                        className={classes.textField}
                        InputLabelProps={{ shrink: true }}
                        value={zip||''}
                        onChange={e => onChanged(e.target.id, e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        placeholder=""
                        label="우편번호"
                    />  
                    <Button className={classes.icon}
                        onClick={fnOpenAddr}
                    >
                        <Icons.Search />
                    </Button>
                </div>
                {/* 주소 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    disabled
                    id="addr"
                    className={classes.textField} 
                    InputLabelProps={{ shrink: true }}
                    value={addr||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="주소"
                />  
                {/* 상세주소 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="detailAddr"
                    className={classes.textField} 
                    InputLabelProps={{ shrink: true }}
                    value={detailAddr||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="상세주소"
                />  
                {/* 사용유무 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="useYn" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={useYn||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="사용유무"
                />  
                {/* 기타번호1 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="etcNo1" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={etcNo1||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="기타번호1"
                />  
                {/* 기타번호2 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="etcNo2" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={etcNo2||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="기타번호2"
                />  
                {/* 기타유형1 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="etcTp1" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={etcTp1||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="기타유형1"
                />  
                {/* 기타유형2 */}
                <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    id="etcTp2" 
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={etcTp2||''}
                    onChange={e => onChanged(e.target.id, e.target.value)}
                    placeholder=""
                    label="기타유형2"
                />  
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>닫기</Button>
                <Button onClick={fnSave}>저장</Button>
                { flag && <Button onClick={fnDel}>삭제</Button> }
            </DialogActions>

            

        </Dialog>
        <ModalSearchAddress 
            isOpen={isOpenAddr} 
            setIsOpen={setIsOpenAddr} 
            setZip={setZip}
            setAddr={setAddr}
        />
        </div>
    )
}