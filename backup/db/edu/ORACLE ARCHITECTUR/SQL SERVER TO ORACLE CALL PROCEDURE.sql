
DECLARE @param_out_1 VARCHAR(10);
DECLARE @param_out_2 VARCHAR(10);
--EXEC ( '{CALL SP_OB_CANCEL_REM(?, ?, ?, ?, ?)}', "OFV", "BD001", "1000", "2018122607", "JHLEE") AT [TEST];
EXEC ( '{CALL SP_OB_CANCEL_REM(?, ?, ?, ?, ?, ?, ?)}', "OFV", "BD001", "1000", "2018122607", "JHLEE", @param_out_1 OUTPUT, @param_out_2 OUTPUT) AT [TEST];
SELECT @param_out_1,@param_out_2;



SELECT * FROM OPENQUERY ([TEST], 'SELECT * FROM TAB');



