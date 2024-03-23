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
export const gvGridDropdownDisLabel = ({ value, field, api }) => {
const colDef = api.getColumn(field);
const option = colDef.valueOptions
    ? colDef.valueOptions.find((params) => value === params.value)
    : {};
return option?.label;
}