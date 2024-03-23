import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonGroup } from "@mui/material";

// styles
import useStyles from "./styles";

export default function SearchBar(props) {
  var classes = useStyles();
  const {title, button, onClickSelect, onClickAdd, onClickSave, onClickDel, onClickUpload, children} = props;
  console.log(props);
  return (
    <Box
      className={classes.pageTitleContainer}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      style={{marginBottom:'0px', padding:'5px'}}
    >
      {children}
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClickSelect}
          startIcon={<SearchIcon />}
        >
          조회
        </Button>
        {onClickAdd ? 
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClickAdd}
          startIcon={<AddIcon />}
        >
          신규
        </Button>
        : 
        ''}
        {onClickSave ? 
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={onClickSave}
          startIcon={<SaveIcon />}
        >
          저장
        </Button>
        :
        ''
        }

        {onClickDel ? 
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClickDel}
          startIcon={<DeleteIcon />}
          >
          삭제
        </Button>
        :
        ''
        }
        {onClickUpload ?
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClickUpload}
          startIcon={<CloudUploadIcon />}
        >
          업로드
        </Button>
        :
        ''
        }
      </ButtonGroup>
    </Box>
  );
}
