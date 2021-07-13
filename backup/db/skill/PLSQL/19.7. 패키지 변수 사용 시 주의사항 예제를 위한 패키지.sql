CREATE OR REPLACE PACKAGE pkg_seq
IS
  v_seq NUMBER; -- 공용 패키지 변수 선언
  
  FUNCTION get_nextval RETURN NUMBER; -- 패키지 변수의 값을 1 증가시키고 이 값을 반환
END;


CREATE OR REPLACE PACKAGE body pkg_seq
IS
  FUNCTION get_nextval RETURN NUMBER IS
  BEGIN
    v_seq := v_seq + 1;
    RETURN v_seq;
  END;
BEGIN
  v_seq := 0; -- 공용 패키지 변수 초기화
END;

select pkg_seq.get_nextval from dual;