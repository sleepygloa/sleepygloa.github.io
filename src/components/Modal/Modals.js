import { useContext } from "react";
import { ModalsDispatchContext, ModalsStateContext } from "../../context/ModalContext";

const Modals = () => {
    const openedModals = useContext(ModalsStateContext);
    const { close, open } = useContext(ModalsDispatchContext);
    
    return openedModals.map((modal, index) => {
        const { Component, props } = modal;
        const { onSubmit, ...restProps } = props;
        
        const onClose = () => {
            close(Component);
        }
        const handleSubmit = async () => {
      	    if (typeof onSubmit === "function") {
                await onSubmit();
      	    }
            onClose();
        };
        
        return (
            <Component
                key={index}
                open={open}
                onClose={onClose}
                handleSubmit = {handleSubmit}
                title={props.title || ''}
                content={props.content || ''}
                {...restProps}
            />
        
        );
        
    });
}

export default Modals;