import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  formTitle:{
    fontSize:'1.5em'
  },
  gridTitle:{
    fontSize:'1.5em'
  },
  mainTitle:{
    fontSize:'1.5em'
  },
  popupTitle:{
    fontSize:'1.5em'
  },
  textField: {
    marginBottom: 0,
    marginTop: 0,
  },
  div : {
    display:'inline-flex',
    width:'100%',
    height:'50px',
    margin:'0px 0px 10px 0px',
    padding:'0px 5px 0px 5px',
    overflow:'hidden',
  },
  div3 : {
    display:'inline-flex',
    width:'33.3%',
    height:'50px',
    margin:'0px 0px 10px 0px',
    padding:'0px 5px 0px 5px',
    overflow:'hidden',
  },
  div4 : {
    display:'flex',
    width:'25%',
    height:'50x',
    margin:'0px 0px 10px 0px',
    padding:'0px 5px 0px 5px',
    overflow:'hidden',
  },
  textFieldLabel:{
    width:80, 
    verticalAlign:'middle'
  },
}));



function LabelTitle (props) {
  const classes = useStyles(); 
  return (
    <div className={classes.div}>
      <span className={props.h === "formTitle" ? classes.formTitle : (props.h === "mainTitle" ? classes.mainTitle : (props.h === "gridTitle" ? classes.gridTitle : classes.popupTitle))}>{props.text ? props.text : ''}</span>
    </div>
  )
}
export {LabelTitle}
