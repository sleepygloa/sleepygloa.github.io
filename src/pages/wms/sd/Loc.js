import React, {useEffect, useState} from "react";

// components
import PageTitle from "../../../components/PageTitle/PageTitle.js";
import SearchBar from "../../../components/SearchBar/SearchBar.js";
import {SchTextField} from "../../../components/SearchBar/Components/TextFieldDefault.js"

import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

//Common
import {client} from '../../../contraints.js';
import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
} from "../../../components/Common.js";

//CommonData
import { useCommonData } from "../../../context/CommonDataContext.js";

//Modal
import {useModal} from "../../../context/ModalContext.js";
import LocMultiReg from "./LocMultiRegPop.js";

 

export default function Biz(props) {
  const {menuTitle} = '로케이션 관리';
  const PRO_URL = '/wms/sd/loc';
  const {openModal} = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();


  const getRowId = "";

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //


  const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [dcAreaCmb, setDcAreaCmb] = useState([]); //구역콤보
  const [dcAreaZoneCmb, setDcAreaZoneCmb] = useState([]); //지역콤보
  const columns = [
    { field: "id",                headerName: "ID",                               align:"center", width:20},
    { field: "dcCd",              headerName: "물류창고코드",         editable: true,
      align:"center", type: "singleSelect", 
      valueGetter : (params) => {
        const option = dcCmb.find((v) => v.value === params.row.dcCd);
        return option ? option.label : '';
    },
      valueOptions: dcCmb,  
    },
    { field: "areaCd",            headerName: "구역코드",             editable: true, 
      align:"center", type: "singleSelect",
      valueGetter : (params) => {
        const options = dcAreaCmb[params.row.dcCd] || [];
        const option = options.find(v => v.value === params.value);
        return option ? option.label : '';
    },
      valueOptions: (params) => dcAreaCmb[params.row.dcCd] || [],
    },
    { field: "zoneCd",           headerName: "지역코드",             editable: true, 
      align:"center", type: "singleSelect",
      valueGetter : (params) => {
        if(dcAreaZoneCmb === undefined) return '';
        if(dcAreaZoneCmb[params.row.dcCd] === undefined) return '';
        if(dcAreaZoneCmb[params.row.dcCd][params.row.areaCd] === undefined) return '';

        const options = dcAreaZoneCmb[params.row.dcCd][params.row.areaCd] || [];
        const option = options.find(v => v.value === params.value);
        return option ? option.label : '';
    },
      valueOptions: (params) => dcAreaZoneCmb[params.row.dcCd][params.row.areaCd] || [],
    },
    { field: "locCd",             headerName: "로케이션코드",       editable: false, align:"left", width:120},
    { field: "linCd",             headerName: "행",               editable: true, align:"left", width:100},
    { field: "rowCd",             headerName: "열",             editable: true, align:"left", width:100},
    { field: "levCd",             headerName: "단",             editable: true, align:"left", width:100},
    { field: "locTypeCd",         headerName: "로케이션유형",     editable: true, align:"left", width:100},
    { field: "loadGbnCd",         headerName: "로케이션구분",       editable: true, align:"left", width:100},
    { field: "holdStCd",          headerName: "보류상태",         editable: true, align:"left", width:100},
    { field: "locPrioord",        headerName: "로케이션우선순위",   editable: true, align:"left", width:100},
    { field: "itemMixLoadYn",     headerName: "제품혼적여부",     editable: true, align:"left", width:100},
    { field: "lotMixLoadYn",      headerName: "LOT혼적여부",      editable: true, align:"left", width:100},
    { field: "horizontal",        headerName: "가로",           editable: true, align:"left", width:100},
    { field: "vertical",          headerName: "세로",             editable: true, align:"left", width:100},
    { field: "height",            headerName: "높이",             editable: true, align:"left", width:100},
    { field: "cbm",               headerName: "체적",             editable: true, align:"left", width:100},
    { field: "weight",            headerName: "중량",             editable: true, align:"left", width:100},
    { field: "useYn",             headerName: "사용여부",             editable: true, 
        align:"center",
        type: "singleSelect",
        valueOptions: useYnCmb,
        valueFormatter: gvGridDropdownDisLabel,
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
    id:dataList.length+1,
    bizCd:'',
    dcCd: "",
    areaCd: "",
    zoneCd: "",
    locCd: "",
    linCd: "",
    rowCd: "",
    levCd: "",
    locTypeCd: "",
    loadGbnCd: "",
    locPrioord: "",
    itemMixLoadYn: "",
    lotMixLoadYn: "",
    horizontal: "",
    vertical: "",
    cbm: "",
    weight: "",
    remark: "",
    useYn: "Y",
  }


  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState(initData);
  //화면 로드시 1번만 실행
  useEffect(() => {
    // selRowId 변경을 감지하고, 주소 찾기 함수 호출
    if (selRowId !== -1) {

    }else{
      fnSearchDc();
      fnSearchDcArea();
      fnSearchDcAreaZone();
    }

  }, [selRowId, cmmnCdData]);
  
  //물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //물류창고,구역 조회
  const fnSearchDcArea = async () => {
    await client.post(`${PRO_URL}/selectDcAreaList`, null, {})
      .then(res => {
        setDcAreaCmb(gvSetLevelDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //물류창고,구역 조회
  const fnSearchDcAreaZone = async () => {
    await client.post(`${PRO_URL}/selectDcAreaZoneList`, null, {})
      .then(res => {
        setDcAreaZoneCmb(gvSetLevel2DropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //조회
  const fnSearch = () => {
    var data = {codeCd : schValues.codeCd};
    client.post(`${PRO_URL}/selectLocList`, data, {})
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
        client.post(`${PRO_URL}/saveLoc`,rowData, {})
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
        client.post(`${PRO_URL}/deleteLoc`,rowData, {})
          .then(res => {
            alert('삭제되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  }
  //로케이션다중등록
  function onClickCustom1(){
    openModal('LOG_MULTI_REG', '로케이션다중등록 팝업', <LocMultiReg />, handleAddressUpdate, '1000px', '600px');
  }

  //로케이션다중등록 팝업 콜백함수
  const handleAddressUpdate = (props) => {
    fnSearch();
  };

  //쎌클릭 핸들링
  const handleGridCellClick = (e) => {
    setValues(e.row); 
    setSelRowId(e.row.id); 
  }  


  return (
    <>
      <PageTitle title={menuTitle}  />
      <SearchBar
        onClickSelect={onClickSelect} 
        onClickAdd={onClickAdd} 
        onClickSave={onClickSave}
        onClickDel={onClickDel}
        onClickCustom1={onClickCustom1}
        onClickCustomNm1='로케이션다중등록'
        >
          <SchTextField id="codeCd" label='코드/명'
            div={"3"}
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid item xs={12} style={{ height: 750, width: '100%' }}>
        <DataGrid
          title={"Loc List"} //제목
          rows={dataList} //dataList
          columns={columns} //컬럼 정의
          headerHeight={30} //헤더 높이
          rowHeight={28} //행 높이
          onRowClick={(e)=>{setValues(e.row); setSelRowId(e.row.id);} }
          footerHeight={30}
          selectionModel={selRowId} //쎌선택 변수지정
          
          onCellEditCommit={React.useCallback((params) => {
            dataList[params.id-1][params.field] = params.value;
            //dc 변경시 area 초기화
            if(params.field == "dcCd") {
              dataList[params.id-1]['areaCd'] = null;
              return;
            }
            //area 변경시 zone 초기화
            if(params.field == "areaCd") {
              dataList[params.id-1]['zoneCd'] = null;
              return;
            }
            
          },[dataList] //쎌변경시 데이터변경
        )}
        />
      </Grid>
    </>
    
  );
}
