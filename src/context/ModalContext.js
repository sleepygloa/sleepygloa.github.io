import { useState, createContext } from "react";

// 현재 open된 modal들을 나타냄.
export const ModalsStateContext = createContext({
});

// modal을 열고 닫는 함수
export const ModalsDispatchContext = createContext({
    open: () => {},
    close: () => {}
});

export const ModalsProvider = ({children}) => {
    const [openedModals, setOpenedModals] = useState([]);

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
        <ModalsStateContext.Provider value={openedModals}>
            <ModalsDispatchContext.Provider value={{open, close}}>
                {children}
            </ModalsDispatchContext.Provider>
        </ModalsStateContext.Provider>
    );
}
