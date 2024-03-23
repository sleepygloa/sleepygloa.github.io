import { TextField, Select } from "@mui/material";
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  textField: {
    marginBottom: 0,
    marginTop: 0,
  },
  div : {
    display:'inline-flex',
    width:'99.5%',
    height:'40px',
    margin:'0px 0px 10px 0px',
    padding:'0px 5px 0px 5px',
    overflow:'hidden',
  },
  div3 : {
    display:'inline-flex',
    width:'33%',
    height:'40px',
    margin:'0px 0px 10px 0px',
    padding:'0px 5px 0px 5px',
    overflow:'hidden',
  },
  div4 : {
    display:'flex',
    width:'24.5%',
    height:'40px',
    margin:'0px 0px 10px 0px',
    padding:'0px 5px 0px 5px',
    overflow:'hidden',
  },
  textFieldLabel:{
    width:120, 
    verticalAlign:'middle'
  },
  textFieldText:{
    margin:'4px 0px 0px 0px'
  },
  schFieldText:{
    margin:'10px 0px 0px 0px'

  },
}));

/**
 * Div Component
*/
function DivDefault (props){
  const classes = useStyles(); 
  return (
    <div className={props.props.div === "fullwidth" ? classes.div : (props.props.div === "3" ? classes.div3 : (props.props.div ==="4" ? classes.div4 :''))}>
      {/* 사용할 내부 Component  */}
      {props.children}
    </div>
  )
}

/**
 * Label Component
*/
function LabelDefault (props){
  const classes = useStyles(); 
  return (
    <div className={classes.textFieldLabel}><p className={classes.textFieldText}>{props.children}</p></div>
  )
}

export function TextFieldDefault (props) {
  const classes = useStyles(); 
  return (
    <DivDefault props={props}>
      {props.labeling ? <LabelDefault >{props.label}</LabelDefault> : ''}
      <TextField
        style={{marginTop:0}}
        margin="normal"
        type='text'
        className={classes.textField}
        id={props.id}
        name={props.id}
        label={!props.labeling ? props.label : ''}
        fullWidth
        // defaultValue={props.defaultValue ? props.defaultValue : ''}
        size="small"
        error={props.required && !props.value ? true : false }
        helperText={props.required && !props.value ? `${props.label}은(는))필수입력입니다.` : '' }
        onChange={props.onChangeHandle}
        // InputProps={props.classes}
        value={props.value || ''}
        InputLabelProps={{ shrink : (props.labeling ? false : true) }}
        disabled={props.disabled}
        placeholder={props.placeholder}
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
      />
    </DivDefault>
  )
}

export function SchTextField (props) {
  const classes = useStyles(); 
  return (
    <DivDefault props={props}>
      {props.labeling ? <LabelDefault >{props.label}</LabelDefault> : ''}
      <TextField
        // label={props.label}
        // value={value}
        id={props.id ? props.id : 'noneId'}
        defaultValue=""
        size="small"
        // error={props.required && !props.value ? `${props.label}은(는))필수입력입니다.` : '' }
        onChange={props.onChange ? props.onChange : false}
        onKeyDown={props.onKeyDown ? props.onKeyDown : null}
        InputProps={props.classes}
      />
    </DivDefault>
  )
}

export function SelectDefault (props) {
  const classes = useStyles(); 
  return (
    <DivDefault props={props}>
      {props.labeling ? <LabelDefault >{props.label}</LabelDefault> : ''}

      <Select
        //필수확인
          required={props.required}
        //아이디
          id={props.id}
        //Form 이름
          name={props.id}
        //값
          value={props.value||''}
        //..
          label={props.label}
        //가로 100%여부.
          fullWidth
        //값변경이벤트, 함수연결
          onChange={props.onChagneHandle}
        //라벨링 유무에 따른, 컴포넌트 좌 또는 위 라벨링표시여부
        
          // ={{ shrink : (props.labeling ? false : true) }}
        //에러CSS
          error={props.required && !props.value ? true : false }
        //에러시 표시할안내문구.
          //helperText={props.required && !props.value ? `${props.label}은(는))필수입력입니다.` : '' }
        //미사용처리여부
          disabled={props.disabled}
        >
        {/* 전달받은 data(code, name) 으로 콤보박스구성 */}
          {props.data && props.data.map((list, idx)=>{
            return <MenuItem key={idx} value={list.CODE}>{list.NAME}</MenuItem>
          })}
        </Select>
    </DivDefault>
  )
}
