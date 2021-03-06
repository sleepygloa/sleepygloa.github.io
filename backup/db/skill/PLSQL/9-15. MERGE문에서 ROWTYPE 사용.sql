DECLARE
 v_emprec emp%ROWTYPE;
BEGIN
 -- 테스트용 데이터 한 건 추출
 SELECT * INTO v_emprec FROM emp WHERE empno = 7788;
 
 v_emprec.empno := 9000;    --사번 변경
 v_emprec.ename := '홍길동'; --이름 변경
 --MERGE문에서 사용
 MERGE INTO emp a
 USING DUAL
    ON (a.empno = v_emprec.empno)
  WHEN MATCHED THEN --사번이 9000인 로우 존재 시 커미션을 10% 증가
   UPDATE           --MERGE문의 UPDATE절에는 레코드 변수를 사용 할 수 없다.
      SET a.comm = a.comm*1.1
 WHEN NOT MATCHED THEN --사번이 9000인 로우 미존재시 로우 추가
  INSERT
  VALUES v_emprec; --MERGE문의 INSERT절에는 레코드 변수를 사용 할 수 있다.
  DBMS_OUTPUT.PUT_LINE('MERGE 건수: '||SQL%ROWCOUNT); --변경도니 건수 출력
  COMMIT;
END;