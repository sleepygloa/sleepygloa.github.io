DECLARE
  v_org_sal NUMBER := 5000;
BEGIN
  DELETE FROM emp WHERE empno = 9000; --이전 예제에서 생성된 데이터 삭제
  COMMIT;
  INSERT INTO emp(empno,  ename,   hiredate, sal)
          VALUES (9000,   '홍길동', SYSDATE,  v_org_sal);
  SAVEPOINT p1; --첫번째 SAVEPOINT p1
  UPDATE emp SET sal = sal + 100 WHERE empno = 9000;
  SAVEPOINT p1; --8번 줄과 SAVEPOINT 이름이 동일, p1을 이 지점으로 옮김
  BEGIN
    INSERT  INTO emp(empno, ename,   hiredate, sal)
             VALUES (9000,  '임꺽정', SYSDATE,  v_org_sal);
  EXCEPTION WHEN OTHERS THEN
    --12번째 줄의 INSERT문이 실패하면, INSERT만 취소하고
    --6번 줄의 INSERT문과 9번 줄의 UPDATE 문은 변경에 반영하도록 한다.
  DBMS_OUTPUT.PUT_LINE('오류 발생 감지 : ' ||SQLERRM); --오류 메시지 출력
  ROLLBACK TO p1; --트랙젝션을 P1상태로 복귀
  END;
  COMMIT;
  DECLARE
    v_sal NUMBER;
  BEGIN
    SELECT sal INTO v_sal FROM emp WHERE empno = 9000;
    DBMS_OUTPUT.PUT_LINE('SAL = '||v_sal); -- 6번 줄에서 INSERT된 급여가 출력된다.
    IF v_org_sal <> v_sal THEN
      DBMS_OUTPUT.PUT_LINE('원 급여가 변경되었습니다.');
    ELSE
      DBMS_OUTPUT.PUT_LINE('원 급여가 변경되지 않았습니다.');
    END IF;
  END;
END;