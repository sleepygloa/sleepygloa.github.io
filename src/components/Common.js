import React, {useEffect, useState, useCallback, useRef } from "react";
import { TextField } from "@mui/material";
import numeral from 'numeral';

//오늘날짜 구하기
export function gvGetToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return year + month + day;
}

//날짜 변환
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    const returnDate = [year, month, day].join('');
    return returnDate;
  }

//공통코드들 저장 
export const gvSeData = {
    bizCd : ""
};

//공통코드들 저장 
export function gvCommCodeData(){
    
}



//그리드 선택한 행의 데이터 조회
export function gvGetRowData(data, id){
    for(var i = 0; i < data.length; i++){
        if(data[i].id === id){
        return data[i]
        }
    }
}
//그리드 선택한 행의 데이터 세팅
export function gvSetRowData(data, id, values){
    for(var i = 0; i < data.length; i++){
        if(data[i].id === id){
            console.log(data[i], id, values)
        data[i] = values;
        }
    }
}



//다이얼로그 공통
export function gvConfirm(){
    
}

//데이터를 트리뷰구조로변경
export function gvMakeTreeList(categories, parent){
    const node = []
    var listP = categories.filter(category => category.parent === parent);
    for(var row in listP){
        var category = listP[row];
        var list = categories
            .filter(categorychild => categorychild.parent === category.child);
        if(list.length > 0) {
            category["children"] = gvMakeTreeList(categories, category.child);
        }
        node.push(category);
    }
    return node
}
//재귀 수정
export function gvMakeTreeList2(list, parent){
    var returnList = [];
    if(parent === undefined) parent = "0";

    list.filter(list => list.parent === parent).map((listC)=>{
        returnList.push(listC);
        
        var listCC = list.filter(list => listC.child === list.parent);
        if(listCC.length > 0) gvMakeTreeList2(list, listC.child).map((listCC)=>{returnList.push(listCC)})
    });
    return returnList;
}

//리스트중 펼칠 리스트를 재구성
export function gvGetGridTreeExpand(list){
    //펼침조건 지정
    var expandedArr = ['0'];
    {list && list.map(
      (data)=>{
        expandedArr.push(data.id);
      }
    )}
    return expandedArr;
}

//
// export async function gvMakeTreeList(categories, parent){
//     const node = [];

//     await categories
//     .filter(category => category.parent !== parent)
//     .map(category => {
//         //하위 팩토리
//         var list = categories
//             .filter(categorychild => categorychild.parent === category.child);
//             console.log(category.child, list)
//             console.log(1)
//         if(list.length > 0) {
//             console.log(2)
//             category["children"] = gvMakeTreeList(list, category.child);
//         }
//         console.log(3)
//         console.log(category)
//         node.push(category);
//     })
//     // console.log(node)
    
    
//     return node
// }

export const recursiveSearch = (obj, searchKey, results = []) => {
    const r = results;
    Object.keys(obj).forEach(key => {
       const value = obj[key];
       if(key === searchKey && typeof value !== 'object'){
          r.push(value);
       }else if(typeof value === 'object'){
          recursiveSearch(value, searchKey, r);
       }
    });
    return r;
 };  

// export function gvMakeTreeList(categories, parent){
//     let node = {}
//     categories
//     .filter(category => category.parent === parent)
//     .forEach(category => node[category.child] = gvMakeTreeList(categories, category.child))
// return node
// }


//값넣기
//row Data
export const gvOnChagneHandle = (event, values, setValues) => {
    setValues({ ...values, [event.target.id]: event.target.value });
};




//그리드 드랍다운 label 보이기
export const gvSetDropdownData = (data) => {
    var list = [];
    // list.push({value:'', label:''}) //빈값 추가
    data.map((data)=>{
        list.push({value:data["code"], label:data["name"]})
    })
    return list;
}

//그리드 드랍다운 label 보이기
export const gvSetLevelDropdownData = (data) => {
    const map = {};

    data.forEach(item => {
        const group = item.parent; // 부모 코드를 기준으로 그룹화
        if (!map[group]) {
            map[group] = []; // 해당 그룹이 존재하지 않으면 새 배열을 생성하고 초기 선택 옵션을 추가
            // map[group] = [{ value: '', label: '' }]; // 해당 그룹이 존재하지 않으면 새 배열을 생성하고 초기 선택 옵션을 추가
        }
        map[group].push({
            value: item.code,
            label: item.name
        });
    });
    return map;
}


//그리드 드랍다운 label 보이기
export const gvSetLevel2DropdownData = (data) => {
    const map = {};

    data.forEach(item => {
        const parentGroup = item.parent; // 첫 번째 부모 코드를 기준으로 그룹화
        const subParentGroup = item.parent2; // 두 번째 부모 코드를 기준으로 그룹화

        if(!parentGroup || !subParentGroup) return;

        // 첫 번째 부모 그룹이 존재하지 않으면 생성
        if (!map[parentGroup]) {
            map[parentGroup] = {};
        }

        // 두 번째 부모 그룹이 존재하지 않으면 해당 첫 번째 부모 내에 생성
        if (!map[parentGroup][subParentGroup]) {
            map[parentGroup][subParentGroup] = [];
        }

        // 최종적으로 해당 두 부모 그룹에 속하는 아이템을 배열에 추가
        map[parentGroup][subParentGroup].push({
            value: item.code,
            label: item.name
        });
    });

    return map;
}


//그리드 드랍다운 label 보이기
export const gvGridDropdownDisLabel = ({ value, field, api }) => {
    const colDef = api.getColumn(field);
    const option = colDef.valueOptions
        ? colDef.valueOptions.find((params) => value === params.value)
        : {};
    return option && option.label ? option.label : '';
}

//그리드 드랍다운 level-label 보이기
export const gvGridLevelDropdownDisLabel = ({ value, field, api, id }, parent) => {
    const colDef = api.getColumn(field);
    const row = api.getRow(id);
    const valueOptions = colDef.valueOptions;
    const ds = valueOptions[row[parent]];
    if(ds === undefined) return '';
    var option = valueOptions[row[parent]].find((params) => value === params.value);
    return option && option.label ? option.label : '';
}
export const gvGridLevel2DropdownDisLabel = ({ value, field, api, id }, parent, parent2, ds) => {
    if(!value) return '';
    const colDef = api.getColumn(field);
    const row = api.getRow(id);
    // 두 개의 부모 키를 사용하여 ds에서 올바른 레이블을 조회
    const group = row[parent];
    const subGroup = row[parent2];
    if(group === undefined
        || subGroup === undefined
        || ds[group] === undefined
        || ds[group][subGroup] === undefined
    ) return [];

    const options = ds[group][subGroup];
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
}


//핸드폰 번호 포멧
export const gvGridFieldFormatPhoneNumber = (value) => {
    if (!value) return '';
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};
//핸드폰 번호 포멧
export const gvGridFieldParsePhoneNumber = (value) => value.replace(/[^\d]/g, '');
//핸드폰 번호 포멧
export const gvGridFieldInputPhoneNumber = (params) => {
    return <TextField
        fullWidth
        value={gvGridFieldFormatPhoneNumber(params.value)}
        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: gvGridFieldParsePhoneNumber(e.target.value) })}
    />
};

//팩스 번호 포멧
export const gvGridFieldFormatFaxNumber = (value) => {
    if (!value) return '';
    const faxNumber = value.replace(/[^\d]/g, '');
    const faxNumberLength = faxNumber.length;
    if (faxNumberLength < 4) return faxNumber;
    if (faxNumberLength < 8) return `${faxNumber.slice(0, 3)}-${faxNumber.slice(3)}`;
    return `${faxNumber.slice(0, 3)}-${faxNumber.slice(3, 7)}-${faxNumber.slice(7, 11)}`;
}
export const gvGridFieldParseFaxNumber = (value) => value.replace(/[^\d]/g, '');
export const gvGridFieldInputFaxNumber = (params) => {
    return <TextField
        fullWidth
        value={gvGridFieldFormatFaxNumber(params.value)}
        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: gvGridFieldParseFaxNumber(e.target.value) })}
    />
};

//이메일 포멧
export const gvGridFieldEmailInput = ({ api, value, id, field }) => {


    const onChangeHandle = (event) => {
        const { value } = event.target;
        api.setEditCellValue({ id, field, value: value }, event);
      };
    const onBlurHandle = (event) => {
        const { value } = event.target;
        if(value == '') return;
        const emailRegex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{0,6}$/;
        if(!emailRegex.test(value)){
            alert('이메일 형식이 아닙니다.')
            api.setEditCellValue({ id, field, value: '' }, event);
        }
    };
    const onKeyDownHandle = (event) => {
        if(event.key === 'Enter'){
            onBlurHandle(event);
        }
    }

  return <TextField 
            fullWidth 
            value={value} 
            onChange={onChangeHandle} 
            onBlur={onBlurHandle} 
            onKeyDown={onKeyDownHandle}/>;
};


//그리드 숫자(가로, 세로, 높이 등) 포켓
// 사용 예: 1000 -> 1,000
export const gvGridFieldNumberPreEdit = (params) => {
    const hasError = isNaN(Number(params.props.value));
    return { ...params.props, error: hasError };
}
export const gvGridFieldNumberFormatter = (value, defaultValue) => {
    if(value === undefined || value == '') return (defaultValue ? defaultValue : '');
    return numeral(value).format('0,0');

}
export const gvGridFieldNumberParser = (value) => {
    return numeral(value).value(); // 콤마를 제거하고 숫자로 변환
}
