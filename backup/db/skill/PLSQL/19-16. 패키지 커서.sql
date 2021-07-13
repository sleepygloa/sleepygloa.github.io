CREATE OR REPLACE PACKAGE pkg_emp
IS
  CURSOR c_emp_cur  RETURN emp%ROWTYPE ;
END;

CREATE OR REPLACE PACKAGE BODY pkg_emp
IS
  CURSOR c_emp_cur  RETURN emp%ROWTYPE IS
    SELECT *
      FROM emp
     ORDER BY ename;
END;


BEGIN
  FOR cur IN pkg_emp.c_emp_cur
  LOOP 
    DBMS_OUTPUT.PUT_LINE(cur.ename);
  END LOOP;
END;