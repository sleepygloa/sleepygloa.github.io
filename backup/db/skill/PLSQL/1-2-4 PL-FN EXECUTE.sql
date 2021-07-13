DECLARE
    v_cnt   PLS_INTEGER;
    
BEGIN
    v_cnt   := get_dept_employee_count(10);
    DBMS_OUTPUT.PUT_LINE('»ç¿ø ¼ö : ' || v_cnt);
END;
/