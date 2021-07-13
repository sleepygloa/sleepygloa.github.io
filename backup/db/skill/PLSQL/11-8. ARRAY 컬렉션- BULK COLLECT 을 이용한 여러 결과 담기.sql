DECLARE
  TYPE string_array IS VARRAY(20) OF CARCHAR2(100);
  v_arr string_array;
BEGIN
  -- 테이블 emp의 모든 로우의 ename을 VARRAY 컬렉션에 한 번에 적재한다.
  SELECT ename
    BULK COLLECT INTO v_arr
    FROM emp
   WHERE ROWNUM <= 20;
  DBMS_OUTPUT.PUT_LINE('VARRAY 컬렉션 건수 = '||v_arr.COUNT);
END;