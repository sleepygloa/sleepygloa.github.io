import React from "react";

//Component
import SearchAddress from './SearchAddress';

//Modal
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function ModalSearchAddress(props){

    //팝업 상태
    const { isOpen, setIsOpen, setZip, setAddr } = props;
    const theme = useTheme();
    // const classes = useStyles(); 
    //반응형
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //열기
    // const handleClickOpen = () => {
    //     setIsOpen(true);
    // };
    //닫기
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open responsive dialog
        </Button> */}
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            {/* <DialogTitle id="responsive-dialog-title">
            {"주소 검색"}
            </DialogTitle> */}
            <DialogContent>
                <SearchAddress setZip={setZip} setAddr={setAddr} parentClose={handleClose} />
            </DialogContent>
        </Dialog>
        </div>

    )
}