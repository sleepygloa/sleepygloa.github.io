import React, {useEffect, useState, useCallback } from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"
import {client} from '../../../contraints.js';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Typography } from "@mui/material";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { gvGridDropdownDisLabel, gvGetRowData, gvSeData } from "../../../components/Common.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";

// styles
import useStyles from "../styles.js";

// DataGrid Css
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { height } from "@mui/system";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  clientCd: '고객사',
  itemCd: '상품코드',
  stdUomCd: '기준단위코드',
  convUomCd: '변환단위코드',
  convUomQty: '변환단위코드',
  remark: '비고',
  useYn: '사용여부',
};

export default function ItemUom(props) {
  const {menuTitle} = '상품단위 관리';
  const PRO_URL = '/wms/sd/itemUom';
  const classes = useStyles();
  const {openModal} = useModal();
  const { getCmbOfGlobalData } = useCommonData();


  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  const [clientCdCmb, setClientCdCmb] = useState([]); //고객사
  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부
  const [uomCdCmb, setUomCdCmb] = useState([]); //단위코드
  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "clientCd",          headerName: "고객사",               editable: false, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",              editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",               editable: false, align:"left", width:300},
    { field: "stdUomCd",          headerName: "기준단위",           editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: uomCdCmb,
    },
    { field: "convUomCd",         headerName: "변환단위",           editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: uomCdCmb,
    },
    { field: "convUomQty",        headerName: "변환단위수량",           editable: true, align:"right", width:100 },
    { field: "useYn",              headerName: "사용여부",             editable: true, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    { field: "remark",            headerName: "비고",               editable: true, align:"left", width:300},
  ];
   

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
  const initData = {
    id: dataList.length + 1,
    clientCd: '',
    itemCd: '',
    stdUomCd: '',
    convUomCd: '',
    convUomQty: '',
    useYn: 'Y',
    remark: '',
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);

  //화면 로드시 1번만 실행
  useEffect(() => {
    if(selRowId !== -1){

    }else{
      if(clientCdCmb.length > 0) return;

      //콤보박스 데이터 조회
      setClientCdCmb(getCmbOfGlobalData("CLIENT_CD", ''))
  
      //콤보박스 데이터 조회
      setUseYnCmb(getCmbOfGlobalData('CMMN_CD', 'USE_YN'));
      setUomCdCmb(getCmbOfGlobalData('CMMN_CD', 'UOM_CD'));
    }
  }, [selRowId, clientCdCmb]);
  
  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectItemUomList`, data, {})
      .then(res => {
        var dataList = res.data;
        setDataList(dataList);
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
    setDataList(dataList => dataList.concat(initData));
  }

  //저장클릭
  function onClickSave(){
    var rowData = gvGetRowData(dataList, selRowId);
    openModal('', '',  '저장 하시겠습니까?', 
      () => {
        //메뉴리스트 저장
        client.post(`${PRO_URL}/saveItemUom`,rowData, {})
          .then(res => {
            alert('저장되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //삭제클릭
  function onClickDel(){
    var rowData = gvGetRowData(dataList, selRowId);
    openModal('', '',  '삭제 하시겠습니까?', 
      () => {
        //메뉴리스트 저장
        client.post(`${PRO_URL}/deleteItemUom`,rowData, {})
          .then(res => {
            alert('삭제되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }

  //쎌클릭 핸들링
  const handleGridCellClick = (e) => {
    setValues(e.row); 
    setSelRowId(e.row.id); 
  }  

  return (
    <>
      <PageTitle title={'상품단위 관리'}  />
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}>
          <SchTextField id="codeCd" label='코드/명'
            div={"3"}
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid item xs={12} style={{ height: 750, width: '100%' }}>
        <DataGrid
          title={menuTitle} //제목
          rows={dataList} //dataList
          columns={columns} //컬럼 정의
          headerHeight={30} //헤더 높이
          rowHeight={28} //행 높이
          onCellClick={handleGridCellClick}
          footerHeight={30}
          selectionModel={selRowId} //쎌선택 변수지정
          onCellEditCommit={React.useCallback((params) => {dataList[params.id-1][params.field] = params.value;},[dataList] //쎌변경시 데이터변경
        )}
        />
      </Grid>
    </>
    
  );
}
