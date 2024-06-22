import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, MenuItem, Select, InputLabel, FormControl, useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';

//Common
import {client} from '../../../contraints.js';
import { useModal } from "../../../context/ModalContext.js";
import { gvGridDropdownDisLabel, 
  gvGetRowData, 
  gvSetDropdownData, 
  gvGridLevelDropdownDisLabel, 
  gvSetLevelDropdownData ,
  gvGridLevel2DropdownDisLabel, 
  gvSetLevel2DropdownData ,
} from "../../../components/Common.js";

// 필드 정보를 관리하는 객체
const fieldLabels = {
  dcCd: '물류센터',
  areaCd: '구역코드',
  zoneCd: '지역코드',
  linCdFrom: '행(From)',
  linCdTo: '행(To)',
  rowCdFrom: '열(From)',
  rowCdTo: '열(To)',
  levCdFrom: '단(From)',
  levCdTo: '단(To)'
};

function LocMultiReg() {
  const key = 'LOG_MULTI_REG'
  const PRO_URL = '/wms/sd/loc';
  const { modals, openModal, closeModal, updateModalData, getModalData } = useModal();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    dcCd: '',
    areaCd: '',
    zoneCd: '',
    linCdFrom: '',
    linCdTo: '',
    rowCdFrom: '',
    rowCdTo: '',
    levCdFrom: '',
    levCdTo: ''
  });

  const [dcCmb, setDcCmb] = useState([]); //물류센터콤보
  const [dcAreaCmb, setDcAreaCmb] = useState([]); //구역콤보
  const [dcAreaZoneCmb, setDcAreaZoneCmb] = useState([]); //지역콤보

  // 입력값 변경 이벤트
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'dcCd' && { areaCd: '', zoneCd: '' }), // Reset area and zone on dcCd change
      ...(name === 'areaCd' && { zoneCd: '' }) // Reset zone on areaCd change
    }));
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    updateModalData(key, { ...getModalData(key), [name]: value });
  };


  //화면 로드시 1번만 실행
  useEffect(() => {
    // fnSearch();
    fnSearchDc();
    fnSearchDcArea();
    fnSearchDcAreaZone();

  }, []);

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

  //입력값 검증
  const validateInput = (id, value) => {
    if(id === 'dcCd' || id === 'areaCd' || id === 'zoneCd') return '';

    // 입력 형식이 01, 02 등의 두 자리 숫자인지 확인합니다.
    if (!/^(0[1-9]|[1-9]\d)$/.test(value)) {
      return "형식에 맞게 입력하세요 (예: 01, 02, ...)";
    }

    const baseId = id.replace('From', '').replace('To', '');
    const fromId = `${baseId}From`;
    const toId = `${baseId}To`;

    const fromValue = id.includes('From') ? value : formData[fromId];
    const toValue = id.includes('To') ? value : formData[toId];

    if (fromValue && toValue && fromValue > toValue) {
      return `${fieldLabels[id]}의 From 값은 To 값보다 작거나 같아야 합니다.`;
    }

    return '';
  };

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
        client.post(`${PRO_URL}/saveLocMultiReg`,formData, {})
          .then(res => {
            openModal('', 'I', '저장 되었습니다.');
            closeModal(key);
          }).catch(error => { 
            console.log('error = '+error); 
          })
      }
    );
  };


  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="dcCd-label">물류센터</InputLabel>
              <Select
                labelId="dcCd-label"
                name="dcCd"
                value={formData.dcCd}
                label="물류센터"
                onChange={handleChange}
              >
                {dcCmb ? dcCmb.map((item) => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                ) : ''
                }
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="areaCd-label">구역코드</InputLabel>
              <Select
                labelId="areaCd-label"
                name="areaCd"
                value={formData.areaCd}
                label="구역코드"
                onChange={handleChange}
                disabled={!formData.dcCd}
              >
                {dcAreaCmb[formData.dcCd] ? dcAreaCmb[formData.dcCd].map((item) => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                ) : ''
                }
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal"  sx={{ marginBottom: 2 }}>
              <InputLabel id="zoneCd-label">지역코드</InputLabel>
              <Select
                labelId="zoneCd-label"
                name="zoneCd"
                value={formData.zoneCd}
                label="지역코드"
                onChange={handleChange}
                disabled={!formData.areaCd}
              >
                {dcAreaZoneCmb[formData.dcCd] && dcAreaZoneCmb[formData.dcCd][formData.areaCd] ? dcAreaZoneCmb[formData.dcCd][formData.areaCd].map((item) => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                ) : ''
                }
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <TextField label="행(from)" variant="outlined" value={formData.linCdFrom} onChange={handleChange} fullWidth name="linCdFrom" 
              error={!!errors['linCdFrom']} helperText={errors['linCdFrom']}
              />
              <TextField label="행(to)" variant="outlined" value={formData.linCdTo} onChange={handleChange} fullWidth name="linCdTo" 
              error={!!errors['linCdTo']} helperText={errors['linCdTo']}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <TextField label="열(from)" variant="outlined" value={formData.rowCdFrom} onChange={handleChange} fullWidth name="rowCdFrom" 
              error={!!errors['rowCdFrom']} helperText={errors['rowCdFrom']}
              />
              <TextField label="열(to)" variant="outlined" value={formData.rowCdTo} onChange={handleChange} fullWidth name="rowCdTo" 
              error={!!errors['rowCdTo']} helperText={errors['rowCdTo']}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <TextField label="단(from)" variant="outlined" value={formData.levCdFrom} onChange={handleChange} fullWidth name="levCdFrom" 
              error={!!errors['levCdFrom']} helperText={errors['levCdFrom']}
              />
              <TextField label="단(to)" variant="outlined" value={formData.levCdTo} onChange={handleChange} fullWidth name="levCdTo" 
              error={!!errors['levCdTo']} helperText={errors['levCdTo']}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(key)}>확인</Button>
        <Button onClick={() => closeModal(key)}>닫기</Button>
      </DialogActions>
    </>
  );
}

export default LocMultiReg;
