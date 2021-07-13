REM 시퀀스 emp_seq 생성
CREATE SEQUENCE emp_seq;

DECLARE
  v_seq_value NUMBER;
BEGIN
  -- SQL 없이 시퀀스를 직접 사용하는 방법
  --v_seq_value := emp_seq.NEXTVAL;
  
  -- SQL을 사용하여 시퀀스 값을 얻어 옴.
  -- 'v_seq_value := emp_seq.NEXTVAL' 에 비해 비효율적임.
  SELECT emp_seq.NEXTVAL
    INTO v_seq_value
    FROM DUAL;
  
  DBMS_OUTPUT.PUT_LINE('시퀀스 값: '|| TO_CHAR(v_seq_value));
END;

