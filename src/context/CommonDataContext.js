import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../contraints';

// Context 생성
export const CommonDataContext = createContext();
export const useCommonData = () => useContext(CommonDataContext);

export const CmmnCdProvider = ({ children }) => {
    const [cmmnCdData, setCmmnCdData] = useState([]);

    useEffect(() => {
        // 이미 데이터가 존재하면 API 호출을 하지 않음
        if(cmmnCdData.length > 0) return;

        const func = async () => {
            await client.post(`/wms/sys/common/selectCodeByGroupCodeAllList`, null, {})
            .then(res => {
                console.log('12333')
                setCmmnCdData(res.data); // API 응답으로 상태 업데이트
            }).catch(error => { 
              console.log('error = '+error); 
            })
        }
        func();

    }, [cmmnCdData]);

    // 특정 그룹 코드에 해당하는 데이터만 반환하는 함수
    const getCodesByGroupCode = (groupCode) => {
        return cmmnCdData.filter(code => code.codeGrpCd === groupCode);
    };
    
    // 특정 그룹 코드에 해당하는 데이터만 반환하는 함수
    const getCodesCmbByGroupCode = (groupCode) => {
        const filterData = cmmnCdData.filter(code => code.codeGrpCd === groupCode);
        const cmbList = [];
        filterData.map((code) => {
            cmbList.push({value: code.codeCd, label: code.codeNm+'['+code.codeCd+']'})
        })
        return cmbList;
    };

    return (
        <CommonDataContext.Provider value={{ cmmnCdData, setCmmnCdData, getCodesByGroupCode, getCodesCmbByGroupCode }}>
            {children}
        </CommonDataContext.Provider>
    );
};

export default CommonDataContext;
