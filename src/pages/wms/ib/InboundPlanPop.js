import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, MenuItem, Select, InputLabel, FormControl, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

//Common
import {client} from '../../../contraints.js';
import { useModal } from "../../../context/ModalContext.js";
import { useCommonData } from "../../../context/CommonDataContext.js";
import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
} from "../../../components/Common.js";

import SearchBar from "../../../components/SearchBar/SearchBar.js";

import { FrmSelect, FrmTextField, FrmDate, GridDateRenderField, GridDateSetField, GridNumberSetField } from '../../../components/SearchBar/Components/TextFieldDefault.js';
import { parse, isValid, format, parseISO } from 'date-fns';

// 필드 정보를 관리하는 객체
const fieldLabels = {
  ibNo: '입고번호',
  dcCd: '물류창고',
  clientCd: '고객사',
  ibGbnCd: '입고구분',
  ibProgStCd: '입고진행상태',
  ibPlanYmd: '입고예정일',
  ibYmd: '입고일',
  poNo: '발주번호',
  poYmd: '발주일자',
  supplierCd: '공급처',
  carNo: '차량번호',
  tcObNo: '이고출고번호',
  userCol1: '사용자컬럼1',
  userCol2: '사용자컬럼2',
  userCol3: '사용자컬럼3',
  userCol4: '사용자컬럼4',
  userCol5: '사용자컬럼5',
  remark: '비고',
  useYn: '사용여부',
};


function InboundPlanPop() {
  const key = 'INBOUND_PLAN_POP'
  const PRO_URL = '/wms/ib/inboundPlan';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const { cmmnCdData, getCodesCmbByGroupCode } = useCommonData();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ibNo: '',
    dcCd: '',
    clientCd: '',
    ibGbnCd: '',
    ibProgStCd: '',
    ibPlanYmd: '',
    ibYmd: '',
    poNo: '',
    poYmd: '',
    supplierCd: '',
    carNo: '',
    tcObNo: '',
    userCol1: '',
    userCol2: '',
    userCol3: '',
    userCol4: '',
    userCol5: '',
    remark: '',
    useYn: '',
  });



  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [clientCmb, setClientCmb] = useState([]); //구역콤보
  const [ibGbnCdCmb, setIbGbnCdCmb] = useState([]); //입고구분코드콤보 
  const [ibProgStCdCmb, setIbProgStCdCmb] = useState([]); //입고진행상태콤보
  const [useYnCmb, setUseYnCmb] = useState([]); //사용여부콤보

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  const [selDtlRowId, setSelDtlRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //
  const [dataDtlList, setDataDtlList] = useState([]); //



  //입고전표컬럼
  const columnsDtl = [
    { field: "modFlag",           headerName: "",             editable:false, align:"center", width:20},
    { field: "id",                headerName: "ID",             editable:false, align:"center", width:20},

    { field: "ibNo",              headerName: "입고번호",         editable: false, align:"left", width:120},
    { field: "ibDetailSeq",       headerName: "입고상세순번",       editable: false, align:"left", width:120},
    { field: "poDetailSeq",       headerName: "발주상세순번",       editable: false, align:"left", width:120},
    { field: "ibProgStCd",        headerName: "입고진행상태코드",   
      align:"center", type: "singleSelect",
      valueOptions: ibProgStCdCmb,
      valueFormatter: gvGridDropdownDisLabel,
    },
    { field: "itemCd",            headerName: "상품코드",   editable: false, align:"left", width:100},
    { field: "itemNm",            headerName: "상품명",   editable: false, align:"left", width:100},
    { field: "itemStCd",          headerName: "상품상태코드",   editable: false, align:"left", width:100},
    { field: "poUomCd",           headerName: "발주단위코드",   editable: false, align:"left", width:100},
    { field: "poQty",             headerName: "발주수량",   editable: false, align:"left", width:100},
    { field: "planQty",           headerName: "예정수량",   editable: false, align:"left", width:100},
    { field: "confQty",           headerName: "확정수량",   editable: false, align:"left", width:100},
    { field: "apprQty",           headerName: "승인수량",   editable: false, align:"left", width:100},
    { field: "examQty",           headerName: "검수수량",   editable: false, align:"left", width:100},
    { field: "instQty",           headerName: "지시수량",   editable: false, align:"left", width:100},
    { field: "putwQty",           headerName: "적치수량",   editable: false, align:"left", width:100},

    { field: "noIbRsnCd",         headerName: "미입고사유코드",   editable: false, align:"left", width:100},
    { field: "ibCost",            headerName: "입고단가",   editable: false, align:"left", width:100},
    { field: "ibVat",             headerName: "입고VAT",   editable: false, align:"left", width:100},
    { field: "ibAmt",             headerName: "입고금액",   editable: false, align:"left", width:100},
    { field: "makeLot",           headerName: "제조LOT",   editable: true, align:"left", width:100,
      valueSetter: (params) => {return GridNumberSetField(params, 'makeLot', 12);},
    },
    { field: "makeYmd",           headerName: "제조일자",   editable: true, align:"left", width:150,
      valueSetter: (params) => {return GridDateSetField(params, 'makeYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "distExpiryYmd",     headerName: "유통기한일자",   editable: true, align:"left", width:150,
      valueSetter: (params) => {return GridDateSetField(params, 'distExpiryYmd');},
      renderCell: (params) => <GridDateRenderField params={params} />,
    },
    { field: "lotId",             headerName: "LOT_ID",   editable: false, align:"left", width:100},
    { field: "lotAttr1",          headerName: "LOT속성1",   editable: false, align:"left", width:100},
    { field: "lotAttr2",          headerName: "LOT속성2",   editable: false, align:"left", width:100},
    { field: "lotAttr3",          headerName: "LOT속성3",   editable: false, align:"left", width:100},
    { field: "lotAttr4",          headerName: "LOT속성4",   editable: false, align:"left", width:100},
    { field: "lotAttr5",          headerName: "LOT속성5",   editable: false, align:"left", width:100},

    { field: "tcObDetailSeq",     headerName: "이고출고상세순번",     editable: false, align:"left", width:100},
    { field: "userCol1",          headerName: "사용자컬럼1",      editable: false, align:"left", width:100},
    { field: "userCol2",          headerName: "사용자컬럼2",      editable: false, align:"left", width:100},
    { field: "userCol3",          headerName: "사용자컬럼3",      editable: false, align:"left", width:100},
    { field: "userCol4",          headerName: "사용자컬럼4",      editable: false, align:"left", width:100},
    { field: "userCol5",          headerName: "사용자컬럼5",       editable: false, align:"left", width:100},
    { field: "useYn",             headerName: "사용여부",         editable: false, 
        align:"center", type: "singleSelect",
        valueOptions: useYnCmb,
        valueFormatter: gvGridDropdownDisLabel,
    },
    { field: "remark",            headerName: "비고",               editable: false, align:"left", width:300},
  ];


  // 입력값 변경 이벤트
  const handleChange = (value, id) => {
    const error = validateInput(id, value);
    setFormData(prev => ({...prev,[id]: value}));
    setErrors(prev => ({...prev,[id]: error}));
  };

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearchDc();
    fnSearchClient();

    setUseYnCmb(getCodesCmbByGroupCode('USE_YN'));
    setIbGbnCdCmb(getCodesCmbByGroupCode('IB_GBN_CD'));
    setIbProgStCdCmb(getCodesCmbByGroupCode('IB_PROG_ST_CD'));
    // setIbGbnCdCmb(prevCmb => [...prevCmb, ...getCodesCmbByGroupCode('IB_GBN_CD')]);
    // setIbProgStCdCmb(prevCmb => [...prevCmb, ...getCodesCmbByGroupCode('IB_PROG_ST_CD')]);
  }, []);

  //물류창고 조회
  const fnSearchDc = async () => {
    await client.post(`${PRO_URL}/selectDcCmbList`, null, {})
      .then(res => {
        setDcCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }
  //고객사 콤보 조회
  const fnSearchClient = async () => {
    await client.post(`${PRO_URL}/selectClientCmbList`, null, {})
      .then(res => {
        setClientCmb(gvSetDropdownData(res.data));
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  const handleSubmit = (key) => {
    const modalInfo = modals[key];
    if (modalInfo.callback) {
        const result = modalInfo.callback(modalInfo.data);
        if (result == false) return;
    }

    if(formData.dcCd == ''){
      openModal('', 'I', '물류센터를 선택해주세요.');
      return;
    }
    if(formData.areaCd == ''){
      openModal('', 'I', '구역을 선택해주세요.');
      return;
    }
    if(formData.zoneCd == ''){
      openModal('', 'I', '지역을 선택해주세요.');
      return;
    }
    if(formData.linCdFrom == ''){
      openModal('', 'I', '행을 입력해주세요.');
      return;
    }
    if(formData.linCdTo == ''){
      openModal('', 'I', '행을 입력해주세요.');
      return;
    }
    if(formData.rowCdFrom == ''){
      openModal('', 'I', '열을 입력해주세요.');
      return;
    }
    if(formData.rowCdTo == ''){
      openModal('', 'I', '열을 입력해주세요.');
      return;
    }
    if(formData.levCdFrom == ''){
      openModal('', 'I', '단을 입력해주세요.');
      return;
    }
    if(formData.levCdTo == ''){
      openModal('', 'I', '단을 입력해주세요.');
      return;
    }
    
    openModal('', '',  '저장 하시겠습니까?', 
      () => {
        //로케이션 저장
        client.post(`${PRO_URL}/saveInboundPlan`,formData, {})
          .then(res => {
            openModal('', 'I', '저장 되었습니다.');
            closeModal(key);
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  };

  //입력값 검증
  const validateInput = (id, value) => {
    if(id === 'dcCd' || id === 'areaCd' || id === 'zoneCd') return '';

    // // 입력 형식이 01, 02 등의 두 자리 숫자인지 확인합니다.
    // if (!/^(0[1-9]|[1-9]\d)$/.test(value)) {
    //   return "형식에 맞게 입력하세요 (예: 01, 02, ...)";
    // }

    // const baseId = id.replace('From', '').replace('To', '');
    // const fromId = `${baseId}From`;
    // const toId = `${baseId}To`;

    // const fromValue = id.includes('From') ? value : formData[fromId];
    // const toValue = id.includes('To') ? value : formData[toId];

    // if (fromValue && toValue && fromValue > toValue) {
    //   return `${fieldLabels[id]}의 From 값은 To 값보다 작거나 같아야 합니다.`;
    // }

    return '';
  };

  //신규클릭
  //입고예정팝업 상세추가
  function onClickAdd(){
    //dataDtlList 추가
    setDataDtlList(data => [...data, {
      modFlag: 'I',
      id: dataDtlList.length + 1,
      useYn: 'Y',
      ibProgStCd: '10',
    }]
    )
  }

  //입고예정팝업 저장
  function onClickSave(){

  }

  //입고예정팝업 삭제
  function onClickDel(){
    // openModal('INBOUND_PLAN_POP', '입고예정 팝업', <InboundPlanPop />, handleInboundPlanUpdate, '1200px', '750px');
  }


  return (
    <>
      <DialogContent>
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="ibNo"
              name={fieldLabels["ibNo"]}
              value={formData.ibNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
              readonly
              maxLength={12}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="dcCd"
              name={fieldLabels["dcCd"]}
              formData={formData}
              errors={errors}
              list={dcCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="clientCd"
              name={fieldLabels["clientCd"]}
              value={formData.clientCd}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="ibGbnCd"
              name={fieldLabels["ibGbnCd"]}
              formData={formData}
              errors={errors}
              list={ibGbnCdCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="ibProgStCd"
              name={fieldLabels["ibProgStCd"]}
              formData={formData}
              errors={errors}
              list={ibProgStCdCmb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate 
              id="ibPlanYmd"
              name={fieldLabels["ibPlanYmd"]}
              selected={formData.ibPlanYmd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate 
              id="ibYmd"
              name={fieldLabels["ibYmd"]}
              selected={formData.ibYmd}
              onChange={handleChange}
              readonly
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="poNo"
              name={fieldLabels["poNo"]}
              value={formData.poNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
              readonly
              maxLength={12}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmDate 
              id="poYmd"
              name={fieldLabels["poYmd"]}
              selected={formData.poYmd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="supplierCd"
              name={fieldLabels["supplierCd"]}
              value={formData.supplierCd}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="carNo"
              name={fieldLabels["carNo"]}
              value={formData.carNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="tcObNo"
              name={fieldLabels["tcObNo"]}
              value={formData.tcObNo}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol1"
              name={fieldLabels["userCol1"]}
              value={formData.userCol1}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol2"
              name={fieldLabels["userCol2"]}
              value={formData.userCol2}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol3"
              name={fieldLabels["userCol3"]}
              value={formData.userCol3}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol4"
              name={fieldLabels["userCol4"]}
              value={formData.userCol4}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="userCol5"
              name={fieldLabels["userCol5"]}
              value={formData.userCol5}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmTextField 
              id="remark"
              name={fieldLabels["remark"]}
              value={formData.remark}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FrmSelect 
              id="useYn"
              name={fieldLabels["useYn"]}
              formData={formData}
              errors={errors}
              list={useYnCmb}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <SearchBar
          // onClickSelect={onClickSelect} 
          onClickAdd={onClickAdd} 
          // onClickSave={onClickSave}
          onClickDel={onClickDel}
          >
        </SearchBar>
        <Grid item style={{ height: '500px', width: '100%' }}>
          <DataGrid
            title={"Inbound Detail List"} //제목
            rows={dataDtlList} //dataList
            columns={columnsDtl} //컬럼 정의
            headerHeight={30} //헤더 높이
            rowHeight={28} //행 높이
            // onRowClick={(e)=>{setValuesDtl(e.row); setSelDtlRowId(e.row.id);} }
            footerHeight={30}
            selectionModel={selDtlRowId} //쎌선택 변수지정
            onCellEditCommit={React.useCallback((params) => {
              dataDtlList[params.id-1][params.field] = params.value;
            },[dataDtlList] //쎌변경시 데이터변경
          )}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(key)}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}

export default InboundPlanPop;
