import { Select } from "@mui/material";
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

export function SelectDefault (props) {
  const classes = useStyles(); 
  return (
    <div className={props.div === "fullwidth" ? classes.div : (props.div === "3" ? classes.div3 : (props.div ==="4"?classes.div4 :''))}>
      {props.labeling ? 
      <div className={classes.textFieldLabel}>
        <p>{props.label}</p>
      </div>
      :
      ''
      }
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
    </div>
  )
}