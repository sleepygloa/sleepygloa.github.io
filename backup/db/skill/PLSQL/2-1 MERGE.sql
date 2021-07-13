MERGE INTO emp a
USING (SELECT   7788        AS EMPNO
            ,   'SCOTT'     AS ENAME
            ,   'ANALYST'   AS JOB
            ,   20          AS DEFAULT_DEPTNO
         FROM   DUAL) b
ON  (A.EMPNO    = B.EMPNO)
WHEN    MATCHED THEN
    UPDATE  SET A.ENAME =   B.ENAME
            ,   A.JOB   =   B.JOB
      WHEN  NOT MATCHED THEN
    INSERT (A.EMPNO, A.ENAME, A.JOB, A.DEPTNO)
    VALUES (B.EMPNO, B.ENAME, B.JOB, B.DEFAULT_DEPTNO);