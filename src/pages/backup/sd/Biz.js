import React, {useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBar from "../../components/SearchBar/SearchBar";
import {SchTextField} from "../../components/SearchBar/Components/TextFieldDefault"
import axios from 'axios';
import {API_URL} from '../../contraints';
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

//page
import BizDetailPop from  './BizDetailPop'


const columns = [
  { field: "id",    headerName: "ID",                       options: { filter: true, sort: true } },
  { field: "bizCd", headerName: "사업자코드",                 options: { filter: true, sort: true,  } },
  { field: "bizNo", headerName: "사업자번호",                 options: { filter: true, sort: false, } },
  { field: "bizNm", headerName: "사업자명",                   options: { filter: true, sort: false, } },
  { field: "bizSnm", headerName: "사업자약어",                 options: { filter: true, sort: false, } },
  { field: "ceo",   headerName: "대표자",                     options: { filter: true, sort: false } },
  { field: "addr",  headerName: "주소",                      options: { filter: true, sort: false, } },
  { field: "detailAddr",  headerName: "상세주소",                      options: { filter: true, sort: false, } },
  { field: "tel",   headerName: "전화번호",                   options: { filter: true, sort: false, } },
  { field: "fax",   headerName: "팩스",                      options: { filter: true, sort: false, } },
  { field: "zip",   headerName: "우편번호",                   options: { filter: true, sort: false, } },
  // { name: "induty", label: "State",options: { filter: true, sort: false, } },
  { field: "useYn", headerName: "사용유무",                   options: { filter: true, sort: false, } },
  { field: "etcNo1", headerName: "기타번호1",                 options: { filter: true, sort: false, } },
  { field: "etcNo2", headerName: "기타번호2",                 options: { filter: true, sort: false, } },
  { field: "etcTp1", headerName: "기타유형1",                 options: { filter: true, sort: false, } },
  { field: "etcTp2", headerName: "기타유형2",                 options: { filter: true, sort: false, } },
];
 
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  div3 : {
    display:'flex',
    width:'33.3%',
    heigth:'25px',
    marginBottom:'5px'
  },
  div4 : {
    display:'flex',
    width:'25%',
    heigth:'25px',
    marginBottom:'5px'
  },
  button: {
    margin: theme.spacing(1),
  },
}))

export default function Biz(props) {
  const {menuNm} = props;
  const classes = useStyles();
  // const [loading, setLoading] = React.useState(true);
  // function handleClick() {
  //   setLoading(true);
  // }

  //메뉴 데이터 변수
  const [dataBiz, setDataBiz] = useState([]); //메뉴리스트
  const [id, setId] = useState(-1);
  const [modalStatusFlag, setModalStatusFlag] = useState(false)

  //Modal
  const [isOpen, setIsOpen] = React.useState(false);

  //조회조건
  const [schBizNm, setSchBizNm] = useState('');

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  
  const fnSearch = () => {
    //메뉴리스트 조회
    axios.post(
      `${API_URL}/api/sd/biz`,
      {
        bizNm : schBizNm
      },{
        'Content-Type' : 'application/json',
        // 'Authorization' : authToken
      }
      )
      .then(res => {
        setDataBiz(res.data);
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  //신규클릭
  function onClickAdd(){
    setId(-1)
    setModalStatusFlag(false); //신규
    setIsOpen(true);
  }
  
  //그리드 더블클릭
  function fnGridDbClick(e){
    setId(e.id)
    setModalStatusFlag(true);//수정
    setIsOpen(true);
  }

  //키보드 입력 이벤트
  function fnOnChange(e){
    var id = e.target.id;
    if(id === "bizNm"){
      setSchBizNm(e.target.value);
    }
  }

  return (
    <>
      <PageTitle title={menuNm} 
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        // onClickSave={onClickSave}
        // onClickDel={onClickDel}
      />
      <SearchBar>
        <div className={classes.div4}>
          <SchTextField id="bizNm" label='사업자' onChange={fnOnChange}  />    
        </div>
      </SearchBar>
      
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ height: 500, width: '100%' }}>
          <DataGrid
            title={"Employee List"}
            rows={dataBiz}
            columns={columns}
            headerHeight={40}
            rowHeight={56}
            onCellDoubleClick={fnGridDbClick}
          />
        </Grid>
      </Grid>
      <BizDetailPop isOpen={isOpen} setIsOpen={setIsOpen} id={id} flag={modalStatusFlag} />
    </>
    
  );
}
