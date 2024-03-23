import React, {createContext, useState, useCallback} from "react";

const initialState = {
  currTabList : [],
  addTab : (item) => {},
  removeTab : (item) => {}
}

export const TabContext = createContext(initialState);

export const TabProvider = ({children}) => {
  const [currTabList, setCurrTabList] = useState([{idx : 0, menuCd : '10001', menuNm : '대쉬보드', url : '/app/dashboard', menuId : 'Dashboard'}])
  const [selTabIdx, setSelTabIdx] = useState(0);

  const addTab = useCallback((item)=>{
    if(!item.menuCd) {
      console.log("메뉴 코드가 없습니다.")
      return;
    };
    if(!item.menuId) {
      console.log("메뉴 아이디가 없습니다.")
      return;
    };
    if(!item.url) {
      console.log("메뉴 URL이 없습니다.")
      return;
    };
    if(!item.menuNm) {
      console.log("메뉴 명이 없습니다.")
      return;
    };

    if(currTabList.length > 10){
      alert('10개이상 메뉴를 열수 없습니다.')
      return;
    }

    //이미 열려있는지 확인
    var openFlag = false;
    var idx = -1;
    {currTabList && currTabList.map((list)=>{
      if(list.menuCd == item.menuCd){
        openFlag = true;
        idx = list.idx;
        return;
      }
    })}

    //신규탭 일때만 세팅
    if(!openFlag){
      idx = (currTabList.length === 1 ? 1 : currTabList.length)
      setCurrTabList(currTabList.concat({idx : idx, menuCd : item.menuCd, menuNm : item.menuNm, url : item.url, menuId : item.menuId}));
    }

    //세팅된 IDX 값변경//탭 화면노출
    setSelTabIdx(idx);
  }, [currTabList,selTabIdx])
  
  const removeTab = useCallback((item)=>{
    if(!item.menuCd) return;
      var removeMenuCd = -1;
      currTabList && currTabList.map((menu, index)=>(
        (menu === item.menuCd ? 
          ({removeMenuCd} = {menu})
          : 
          removeMenuCd = -1
          )
      ))
      if(removeMenuCd > -1) setCurrTabList(currTabList.filter(tabList => tabList.menuCd !== item.menuCd));
  }, [currTabList])

  return (
    <TabContext.Provider value={{currTabList, addTab, removeTab, selTabIdx, setSelTabIdx}}>
        {children}
    </TabContext.Provider>
  );
}

// ###########################################################
