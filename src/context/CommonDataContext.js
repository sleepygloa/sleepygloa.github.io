
/******************************************************************
 * 공통으로사용할 콤보박스 데이터들을 미리불러온다.
 ******************************************************************/
 import { useState, createContext } from "react";

 //API
 import {client} from '../../contraints';

 // 현재 open된 modal들을 나타냄.
 export const CommonDataStateContext = createContext({
 });
 
 // modal을 열고 닫는 함수

 export const CommonDataDispatchContext = createContext({
     open: () => {},
     close: () => {},
     init: () => {},
     data : {}
 });
 
 export const ModalsProvider = ({children}) => {
     const [data, setData] = useState([]);

     const init = () => {
        client.get('/api/sys/code/selectCode')
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.log('error', error);
        })
     }
 
     const open = (Component, props) => {
         setOpenedModals((modals) => {
             return [...modals, { Component, props }];
         });
     }
     const close = (Component) => {
         setOpenedModals((modals) => {
             return modals.filter(modal => modal.Component !== Component);
         });
     }
     return (
         <CommonDataStateContext.Provider value={openedModals}>
             <CommonDataDispatchContext.Provider value={{open, close}}>
                 {children}
             </CommonDataDispatchContext.Provider>
         </CommonDataStateContext.Provider>
     );
 }
 