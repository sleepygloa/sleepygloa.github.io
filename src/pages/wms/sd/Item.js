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
  itemNm: '상품명',
  itemSpec: '상품규격',
  itemGbnCd: '상품구분',
  largeClassCd: '대분류',
  middleClassCd: '중분류',
  smallClassCd: '소분류',
  ibCost: '입고단가',
  obCost: '출고단가',
  horizontal: '가로',
  vertical: '세로',
  height: '높이',
  cbm: '체적',
  weight: '중량',
  itemBarcode: '상품바코드',
  boxBarcode: '박스바코드',
  keepTempeGbnCd: '보관온도구분',
  replaceItemCd: '대체상품',
  distExpiryDays: '유통기한일수',
  minUomCd: '최소단위',
  setItemYn: '세트상품여부',
  vatYn: '과세여부',
  userCol1: '사용자컬럼1',
  userCol2: '사용자컬럼2',
  userCol3: '사용자컬럼3',
  userCol4: '사용자컬럼4',
  userCol5: '사용자컬럼5',
  remark: '비고',
  useYn: '사용여부',
};

export default function Item(props) {
  const {menuTitle} = '상품 관리';
  const PRO_URL = '/wms/sd/item';
  const classes = useStyles();
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();


  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  //배송처 콜백 데이터 변수
  const [callbackDelivery, setCallbackDelivery] = useState(null);

  const [keepTempeGbnCdCmb, setKeepTempeGbnCdCmb] = useState([]);
  const [minUomCdCmb, setMinUomCdCmb] = useState([]);
  const [setItemYnCmb, setSetItemYnCmb] = useState([]);
  const [vatYnCmb, setVatYnCmb] = useState([]);
  const [useYnCmb, setUseYnCmb] = useState([]);
  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "bizCd",             headerName: "사업자코드",           editable: true, align:"left", width:100},
    { field: "clientCd",          headerName: "고객사코드",            editable: true, align:"left", width:100},
    { field: "itemCd",            headerName: "상품코드",             editable: true, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",              editable: true, align:"left", width:100},
    { field: "itemSpec",          headerName: "상품규격",             editable: true, align:"left", width:100},
    { field: "itemGbnCd",         headerName: "상품구분",             editable: true, align:"left", width:200},
    { field: "largeClassCd",      headerName: "대분류",              editable: true, align:"left", width:100},
    { field: "middleClassCd",     headerName: "중분류",              editable: true, align:"left", width:100},
    { field: "smallClassCd",      headerName: "소분류",              editable: true, align:"left", width:100},

    { field: "ibCost",             headerName: "입고단가",            editable: true, align:"left", width:300},
    { field: "obCost",             headerName: "출고단가",            editable: true, align:"left", width:300},
    { field: "horizontal",         headerName: "가로(m)",            editable: true, align:"left", width:100},
    { field: "vertical",           headerName: "세로(m)",            editable: true, align:"left", width:100},
    { field: "height",             headerName: "높이(m)",            editable: true, align:"left", width:100},
    { field: "cbm",                headerName: "체적(m3)",           editable: true, align:"left", width:100},
    { field: "weight",             headerName: "중량(Kg)",           editable: true, align:"left", width:100},
    { field: "itemBarcode",        headerName: "아이템바코드",         editable: true, align:"left", width:100},
    { field: "boxBarcode",         headerName: "박스바코드",           editable: true, align:"left", width:100},
  
    { field: "keepTempeGbnCd",     headerName: "보관온도구분",          editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: keepTempeGbnCdCmb,
  },
    { field: "replaceItemCd",      headerName: "대체상품코드",          editable: true, align:"left", width:100},
    { field: "distExpiryDays",     headerName: "유통기한일수",          editable: true, align:"left", width:100},
    { field: "minUomCd",           headerName: "최소단위코드",          editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: minUomCdCmb,
  },
    { field: "setItemYn",          headerName: "세트상품여부",          editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: setItemYnCmb,
  },
    { field: "vatYn",              headerName: "과세여부",             editable: true, 
      align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
      valueOptions: vatYnCmb,
  },
    { field: "useYn",              headerName: "사용여부",             editable: true, 
        align:"center", type: "singleSelect", valueFormatter: gvGridDropdownDisLabel,
        valueOptions: useYnCmb,
    },
    { field: "userCol1",         headerName: "사용자컬럼1",               editable: true, align:"left", width:100},
    { field: "userCol2",         headerName: "사용자컬럼2",               editable: true, align:"left", width:100},
    { field: "userCol3",         headerName: "사용자컬럼3",               editable: true, align:"left", width:100},
    { field: "userCol4",         headerName: "사용자컬럼4",               editable: true, align:"left", width:100},
    { field: "userCol5",         headerName: "사용자컬럼5",               editable: true, align:"left", width:100},
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
    id: dataList.length+1,
    bizCd: '',
    clientCd: '',
    itemCd: '',
    itemNm: '',
    itemSpec: '',
    itemGbnCd: '',
    largeClassCd: '',
    middleClassCd: '',
    smallClassCd: '',
    ibCost: '',
    obCost: '',
    horizontal: '',
    vertical: '',
    height: '',
    cbm: '',
    weight: '',
    itemBarcode: '',
    boxBarcode: '',
    keepTempeGbnCd: '',
    replaceItemCd: '',
    distExpiryDays: '9999',
    minUomCd: '',
    setItemYn: 'N',
    vatYn: 'N',
    useYn: 'Y',
    userCol1: '',
    userCol2: '',
    userCol3: '',
    userCol4: '',
    userCol5: '',
    remark: '',
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);

  //화면 로드시 1번만 실행
  useEffect(() => {
    //콤보박스 데이터 조회
    setKeepTempeGbnCdCmb(getCodesCmbByGroupCode('KEEP_TEMPE_GBN_CD'));
    setMinUomCdCmb(getCodesCmbByGroupCode('MIN_UOM_CD'));
    setSetItemYnCmb(getCodesCmbByGroupCode('SET_ITEM_YN'));
    setVatYnCmb(getCodesCmbByGroupCode('VAT_YN'));
    setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
  }, []);
  
  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectItemList`, data, {})
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
        client.post(`${PRO_URL}/saveItem`,rowData, {})
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
        client.post(`${PRO_URL}/deleteItem`,rowData, {})
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
      <PageTitle title={'상품 관리'}  />
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
