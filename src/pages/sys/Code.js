import React, {useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBar from "../../components/SearchBar/SearchBar";
import {SchTextField} from "../../components/SearchBar/Components/TextFieldDefault"
import {client} from '../../contraints';
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { CenterFocusStrong, RowingRounded } from "@mui/icons-material";
import { gvGridDropdownDisLabel, gvGetRowData, gvSeData } from "../../components/Common";

//Modal
import MyModal from "../../components/Modal/MyModal.js";
import useModal from "../../components/Modal/useModal";

//page
// import BizDetailPop from  './BizDetailPop'
const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
const delYnCmb = [{value:"Y", label:"삭제"},{value:"N", label:"미삭제"}];


// const roleFormater = ({id : rowId, value, field, api }) =>{
//     roleOption.find((opt)=> opt.value === value).label
// }
//tyles :'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
const columns = [
  { field: "id",          headerName: "ID",                        align:"center", width:20},
  { field: "codeGrpCd",   headerName: "그룹코드",     editable: true, align:"center", width:200},
  { field: "codeGrpNm",   headerName: "그룹코드명",   editable: true, align:"left", width:300},
  { field: "codeGrpDesc", headerName: "그룹코드설명", editable: true, align:"left", width:300},
  { field: "codeGrpTp",   headerName: "그룹코드유형", editable: true, align:"center", width:150},
  { field: "useYn",       headerName: "사용여부",    editable: true, 
      align:"center",
      type: "singleSelect",
      valueOptions: useYnCmb,
      valueFormatter: gvGridDropdownDisLabel,
  },
  // { field: "delYn",     headerName: "삭제여부",    editable: true, 
  //     align:"center",
  //     type: "singleSelect",
  //     valueOptions: delYnCmb,
  //     valueFormatter: gvGridDropdownDisLabel,},
  { field: "inUserId",  headerName: "등록자",},
  { field: "inDt",      headerName: "등록일시",},
  { field: "upUserId",  headerName: "수정자",},
  { field: "upDt",      headerName: "수정일시",},
];
const columnsDtl = [
  { field: "id",          headerName: "ID",                        align:"center", width:20},
  { field: "bizCd",   headerName: "회사코드",    hide:true, editable: true, align:"center", width:120},
  { field: "codeGrpCd",   headerName: "그룹코드",hide:true, editable: true, align:"center", width:150},
  { field: "codeSeq",   headerName: "순번",     editable: true, align:"center", width:100},
  { field: "codeCd",   headerName: "코드",     editable: true, align:"center", width:200},
  { field: "codeNm",   headerName: "코드명",   editable: true, align:"left", width:300},
  { field: "codeDesc", headerName: "코드설명", editable: true, align:"left", width:300},
  { field: "codeOrdr",   headerName: "순서", editable: true, align:"center", width:100},
  { field: "codeOther1",   headerName: "코드기타1", editable: true, align:"center", width:100},
  { field: "codeOther2",   headerName: "코드기타2", editable: true, align:"center", width:100},
  { field: "codeOther3",   headerName: "코드기타3", editable: true, align:"center", width:100},
  { field: "codeOther4",   headerName: "코드기타4", editable: true, align:"center", width:100},
  { field: "codeOther5",   headerName: "코드기타5", editable: true, align:"center", width:100},
  { field: "useYn",       headerName: "사용여부",    editable: true, 
      align:"center",
      type: "singleSelect",
      valueOptions: useYnCmb,
      valueFormatter: gvGridDropdownDisLabel,
  },
  { field: "delYn",     headerName: "삭제여부",    editable: true, 
      align:"center",
      type: "singleSelect",
      valueOptions: delYnCmb,
      valueFormatter: gvGridDropdownDisLabel,},
  { field: "inUserId",  headerName: "등록자",},
  { field: "inDt",      headerName: "등록일시",},
  { field: "upUserId",  headerName: "수정자",},
  { field: "upDt",      headerName: "수정일시",},
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

export default function Code(props) {
  const {menuTitle} = '코드그룹 리스트';
  const {menuDtlTitle} = '코드 리스트';
  const classes = useStyles();
  const {openModal} = useModal();

  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  const [selDtlRowId, setSelDtlRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  const [dataDtlList, setDataDtlList] = useState([]); //

  //Modal
  // const [isOpen, setIsOpen] = React.useState(false);

  //조회조건
  const [schValues, setSchValues] = useState({ 
    codeCd: "", 
  });
  //조회조건
  const onChangeSearch = (event) => {
    setSchValues({ ...values, [event.target.id]: event.target.value });
  };
  const onKeyDown = (e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        fnSearch();
        return;
    }
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState({ 
    id : 0,
    codeGrpCd: "",
    codeGrpNm: "",
    codeGrpDesc: "",
    codeGrpTp: "",
    useYn: "Y",
  });
  // const onChagneHandle = (event) => {setValues({ ...values, [event.target.id]: event.target.value });}; //form 용
  const [valuesDtl, setValuesDtl] = useState();
  // const onChagneHandleDtl = (event) => {setValuesDtl({ ...valuesDtl, [event.target.id]: event.target.value });};  //form 용

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  
  const fnSearch = () => {
    console.log('gvSeData',gvSeData);
    //메뉴리스트 조회
    client.post(
      `/api/sys/code/selectCodeGrpList`,
      {
        codeCd : schValues.codeCd
      },{
      }
      )
      .then(res => {
        var dataList = res.data.content;
        setDataList(dataList);
        if(dataList.length > -1){
          setSelRowId(1);
          fnSearchDtl(dataList[0]);
        }else{

        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  const fnSearchDtl = (rowData) => {
    setSelRowId(rowData.id);

    console.log('상세조회', rowData)
    //메뉴리스트 조회
    client.post(
      `/api/sys/code/selectCodeList`,
      rowData,{}
      )
      .then(res => {
        var dataList = res.data.content;
        setDataDtlList(dataList);

        if(dataList.length > -1){
          setSelDtlRowId(1);
        }else{

        }
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
    //선택된 행 다음에 추가
    setDataList(dataList => dataList.concat({
      id:dataList.length+1,
      bizCd: gvSeData.bizCd,
      codeGrpCd: "",
      codeGrpNm: "",
      codeGrpDesc: "",
      codeGrpTp: "",
      useYn: "",
    }));
  }

  //저장클릭
  function onClickSave(){
    var rowData = gvGetRowData(dataList, selRowId);
    console.log('저장',rowData)
    openModal(MyModal, {
      title:"",
      content:"저장 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/code/saveCodeGrp`,
          rowData
          )
          .then(res => {
            alert('저장되었습니다.');
            fnSearchDtl(values);
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  //삭제클릭
  function onClickDel(){
    var rowData = gvGetRowData(dataList, selRowId);
    console.log('삭제', rowData)
    openModal(MyModal, {
      title:"",
      content:"삭제 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/code/deleteCodeGrp`,
          rowData,
          {
          }
          )
          .then(res => {
            alert('삭제되었습니다.')
            fnSearchDtl(values);
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }
  //조회 클릭(상세)
  function onClickDtlSelect(){
    fnSearchDtl(values);
  }
  //신규클릭
  function onClickDtlAdd(){
    //선택된 행 다음에 추가
    setDataDtlList(dataDtlList => dataDtlList.concat({
      id:dataDtlList.length+1,
      bizCd: "COMFUNNY_DEVELOPERS", 
      codeGrpCd : values.codeGrpCd,
      useYn: "Y",
    }));
  }

  //저장클릭
  function onClickDtlSave(){
    var rowData = gvGetRowData(dataDtlList, selDtlRowId);
    console.log('저장',rowData)
    openModal(MyModal, {
      title:"",
      content:"저장 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/code/saveCode`,
          rowData
          )
          .then(res => {
            alert('저장되었습니다.');
            fnSearchDtl(values);
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  //삭제클릭
  function onClickDtlDel(){
    var rowData = gvGetRowData(dataDtlList, selDtlRowId);
    console.log('삭제 클릭',rowData)
    openModal(MyModal, {
      title:"",
      content:"삭제 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(`/api/sys/code/deleteCode`,rowData,{})
          .then(res => {
            alert('삭제되었습니다.')
            fnSearchDtl(values);
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }
  return (
    <>
      <PageTitle title={'코드그룹 리스트'} />
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}>
          <SchTextField id="codeGrpCd" label='코드/명' 
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ height: 250, width: '100%' }}>
          <DataGrid
            title={"Employee List"} //제목
            rows={dataList} //dataList
            columns={columns} //컬럼 정의
            headerHeight={30} //헤더 높이
            rowHeight={28} //행 높이
            onRowClick={(e)=>{setValues(e.row); fnSearchDtl(e.row)} }
            paginationMode={'client'} //page 처리 위치
            // hideFooter={true}
            footerHeight={30}
            selectionModel={selRowId} //쎌선택 변수지정
            onCellEditCommit={React.useCallback((params) => {dataList[params.id-1][params.field] = params.value;},[dataList] //쎌변경시 데이터변경
          )}
          />
        </Grid>
      </Grid>
      <PageTitle title={'코드 리스트'} 
      />
      <SearchBar
        onClickSelect={onClickDtlSelect}
        onClickAdd={onClickDtlAdd}
        onClickSave={onClickDtlSave}
        onClickDel={onClickDtlDel}>
          <SchTextField id="codeGrpCd" label='코드/명' 
            onChange={onChangeSearch}
            onKeyDown={onKeyDown} />
      </SearchBar>
      
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ height: 250, width: '100%' }}>
          <DataGrid
            title={"Employee List"}
            rows={dataDtlList}
            columns={columnsDtl}
            headerHeight={30}
            rowHeight={28}
            // onCellDoubleClick={fnGridDbClick}
            onRowClick={(e)=>{setValuesDtl(e.row); setSelDtlRowId(e.row.id)} }
            paginationMode={'client'}
            hideFooter={true}
            selectionModel={selDtlRowId} //쎌선택
            onCellEditCommit={React.useCallback((params) => {dataDtlList[params.id-1][params.field] = params.value;},[dataDtlList] //쎌변경시 데이터변경
            )}
          />
        </Grid>
      </Grid>
      {/* <BizDetailPop isOpen={isOpen} setIsOpen={setIsOpen} id={id} flag={modalStatusFlag} /> */}
    </>
    
  );
}
