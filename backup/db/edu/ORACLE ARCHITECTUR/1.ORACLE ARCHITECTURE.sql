-- 1장
-- 세션 정보 확인
-- [1-1]
SELECT SID, SERIAL#, PROGRAM, USERNAME, TYPE FROM V$SESSION;

-- 세션과 서버 프로세스 확인
-- [1-2]
SELECT S.SID, S.SERIAL#, S.USERNAME, S.PROGRAM "PROGRAM(Client)", p.pid, p.spid, p.program "PROGRAM(Oracle)"
  FROM V$SESSION S, V$PROCESS P
 WHERE S.PADDR = P.ADDR
   AND p.background IS NULL;

-- 테이블 스페이스 확인(CONTENTS:영구, UNDO, TEMP 유무)
-- [1-3]
SELECT TABLESPACE_NAME, CONTENTS FROM DBA_TABLESPACES;

-- 영구, UNDO 테이블 스페이스의 데이터 파일 확인
-- TABLESPACE_NAME : 속한 테이블 스페이스명
-- FILE_NAME       : 파일이름
-- [1-4]
SELECT T.TABLESPACE_NAME, F.FILE_NAME
  FROM DBA_TABLESPACES T, DBA_DATA_FILES F
 WHERE T.TABLESPACE_NAME = F.TABLESPACE_NAME;

-- 임시 테이블 스페이스 데이터 파일 확인
-- [1-5]
SELECT T.TABLESPACE_NAME, F.FILE_NAME
  FROM DBA_TABLESPACES T, DBA_TEMP_FILES F
 WHERE T.TABLESPACE_NAME = F.TABLESPACE_NAME;

-- SGA의 통합정보 확인
-- 데이터베이스 버퍼 캐시 확인
-- Database Buffers 확인
-- [1-6]
-- 버퍼캐시 크기가 크다? --> 기다렸다가 한번에 처리하게됨(블록 변경횟수 당 기록(처리)하게 되는 횟수가 적어짐) --> 성능향상
-- 버퍼캐시 크기가 작다? --> 같은 이류로 성능저하
SELECT * FROM V$SGA;

-- SGA의 상세정보 확인
-- buffer_cache 크기
-- [1-7]
SELECT * FROM V$SGASTAT;

-- REDO TABLE 관련 LGWR은 REDO 로그 버퍼의 데이터를 한번에 REDO 로그 파일로 가져온다.
-- LWGR --> REDO 기록 시점
--- 트랜젝션 커밋
--- DBWn 가 REDO 데이터 쓰기를 요청할 때 (데이터  ㅏ일에 변경된 블록을 기록할 때 등)
--- 3초마다
--- REDO 로그 버퍼의 용량이 부족한 경우
--- 아직기록하지못한 REDO 데이터가  REDO 로그 버퍼 전체 크기의 1/3에 도달
-- REDO 변경 처리 정지 : 로그 버퍼가 가득차면 멈춤

-- REDO 파일을 그룹화하여 관리할 수 있다.
-- group# 로그그룹 번호, status 상태, sequence 시퀀스번호, members 포함된 멤버수?
-- [1-8]
SELECT group#, status, sequence#, members FROM V$LOG;

-- 로그파일확인
-- [1-9]
SELECT   V$LOG.group#, V$LOGFILE.member
FROM     V$LOG, V$LOGFILE
WHERE    V$LOG.group# = V$LOGFILE.group#
ORDER BY group#;

-- 수동으로 로그스위치 발생
-- [1-10]
ALTER SYSTEM SWITCH LOGFILE;

-- 아카이브 로그 모드 확인
-- 데이터베이스가 REDO 데이터를 덮어 쓰기 전에 REDO 데이터를 '아카이브 REDO 로그 파일'로 복사해 운영중인 REDO 데이터를 저장하는 작동방식
-- 백업 파일 복구해야하는 에러 발생시, 백업본에 아카이브 REDO 로그 파일을 적용하는 것으로 발생 시점까지 복구 할 수 있음.
-- [1-11]
ARCHIVE LOG LIST

-- 아카이브 로그 모드 확인2
-- name : 데이터베이스이름, log_mode : ARCHIVELOG/NOARCHIVELOG
SELECT name, log_mode FROM V$DATABASE;

-- 아카이브 로그 모드로 전환
-- ORA-01126 데이터베이스는 이 인스턴스에서 마운트되어야 하고 다른 인스턴스에서 열리면 안됨
--           database must be mounted in this instance and not open in any instance
-- [1-12]
ALTER DATABASE ARCHIVELOG;

ALTER DATABASE NOARCHIVELOG;

-- 아카이브 로그모드 전환 예제
-- [1-13]
SHUTDOWN IMMEDIATE;

STARTUP MOUNT;

ALTER DATABASE OPEN;

ARCHIVE LOG LIST;

SELECT name, log_mode FROM V$DATABASE;
-- 예제 끝

-- 서버 초기 파라미터 확인
SHOW PARAMETERS buffer;

-- name : 초기화 파라미터 명칭
-- type : 초기화 파라미터 값 종류(Boolean, String, Integer, Parameter file, Reserved, Big Integer
-- value : 현재 적용된 설정값
-- isdefault : 설정값이 기본값일때
-- isses_modifiable : ALTER SESSION 문으로 변경가능 유/무 --> true/false
-- issys_modifiable : 설정값을 즉시변경할수있을때 immediate
-- 현재 세션에 적용된 초기화 파라미터의 상세 정보
SELECT  name, type, value, isdefault ISDEF,
        isses_modifiable SESMOD, issys_modifiable SYSMOD
FROM    V$PARAMETER;

-- 현재 인스턴스에 적용된 초기화 파라미터의 상세 정보
SELECT  name, type, value, isdefault ISDEF,
        isses_modifiable SESMOD, issys_modifiable SYSMOD
FROM    V$SYSTEM_PARAMETER;

SELECT  name, type, value, isdefault ISDEF,
        isses_modifiable SESMOD, issys_modifiable SYSMOD
FROM    V$PARAMETER WHERE name LIKE '%buffer%';

SELECT  name, type, value, isdefault ISDEF,
        isses_modifiable SESMOD, issys_modifiable SYSMOD
FROM    V$SYSTEM_PARAMETER WHERE name LIKE '%buffer%';

-- 컨트롤파일
SELECT name FROM V$CONTROLFILE;

-- 특정 프로세스만이 사용하는 메모리영역  : PGA(Program Global Area)
-- 프로게스 간에 공유하는 메모리 영역    : SGA(System Global Area)

-- PGA는 PGA 간 공유하지않음
-- PGA는 SGA 와 공유함.

-- 프로세스와 PGA확인
-- pid            : 오라클 내부에서 관리하는 프로세스 ID
-- spid           : OS레벨의 프로세스 ID
-- program        : 프로그램명칭(프로세스명칭)
-- background     : 가동중 여부 가동중일때 1
-- PGA_ALLOC_MEM  : 프로세스에 현재 할당된 PGA의 크기
-- SGA : 서버프로세스(섀도 프로세스)
-- [1-14]
SELECT pid, spid, program, background, pga_alloc_mem FROM V$PROCESS;

-- [1-15]
-- SGA 보관 데이터는 모든 서버 프로세스 및 백그라운드 프로세스에 공유
--     인스턴스기동시 확보됨
-- 공유풀 : 3개 캐시 (LIBRARY 캐시, DICTIONARY 캐시, RESULT 캐시)
-- 라지풀 : 프로세스간 통신이 필요한 특정 처리에서 필요한 메모리 영역
-- 자바풀 : 오라클 JVM 실행에 필요항 정보를 보관하는 메모리영역
-- 스트림 풀 : STREAMS 를 실행하는데 필요한 정보를 보관하는 메모리영역
-- 데이터베이스 버퍼 캐시 : 블록을 보관하는 메모리 영역 블록에 대한 캐시, 버퍼역할도 함
-- REDO 로그 버퍼 : REDO 로그파일에 기록하지않은 데이터를 보관하는 영역

-- 공유풀 : 데이터 블록 이외의 공유 가능한 데이터를 임시로 보관하기 위한 메모리 영역
--- 삭제 시점은 LRU 에 의해 관리됨.
--- 공유풀과 버퍼는 데이터 블록을 공유하냐 이외의 데이터를 공유하냐임
---- LIBRARY 캐시    : 파싱한 SQL정보, 컴파일된 PL/SQL 코드
---- DICTIONARY 캐시 : 데이터 딕셔너리에서 조회한 데이터(???)
---- RESULT 캐시     : 쿼리의 결과와 PL/SQL 함수의 결과

--- LIBRARY 캐시 : 첫번째 실행시 SQL정보를 파싱하고, 두번째 실행시 부터는 파싱하지않고 처리하고 로우를 가져온다.(???) 파싱되는 시점은?
--- DICTIONARY 캐시 : (???) SYSTEM 테이블 스페이스에 저장됨, 테이블 스페이스에 저장되는 DICTIONARY 정보를 DICTIONARY 캐시에 저장하면 액세스 를 줄일 수 있다.(???) 방법은?
--- RESULT 캐시 : 11G 부터 지원, QUERY 결과를 캐시 하기 위해서는 'PARAMETER:RESULT_CACHE_MODE:MANUAL' 설정하고 SQL힌트절에 'result cache' 명시 하거나 또는 'PARAMETER:RESULT_CACHE_MODE:AUTO' 로 지정
 
-- 자유풀 : 크기가 큰 데이터를 주고받을때 이용하는 메모리 영역
--- 삭제 시점은 사용이 끝난 순간 바로 삭제됨. LRU 관리 안함.
--- 공유 서버 접속시 공유 서버 프로세스간 통신 처리
--- 병렬 쿼리 등에서의 QUERY COORDINATOR PROCESS와 PARALLEL SLAVE PROCESS 간의 통신 처리
--- RMAN 을 사용한 백업/리스토어 처리에서의 I/O SLAVE PROCESS와의 통신 처리

-- 자바풀 : 오라클 JVM을 실행할 때 사용
--- 자바프로시저를 실행하기 위함

-- 스트림 풀 : ORACLE STREAMS, 메세지 기능을 구현하기 위한 메모리 영역

-- [1-16]
-- 메모리 관리 방식
--- AMM(Automatic Memory Management) : 11g 이후, SGA, PGA 합계가 'PARAMETER:MEMORY_TARGET' 보다 낮게 자동 조절됨.
--- ASMM(Automatic Shared Memory Management) : 10g 이후, 데이터베이스 버퍼 캐시나 공유풀 등의 크기를 자동조절.'PARAMETER:SGA_START' 보다 낮도록 자동조절.
---- 대상 : 공유풀, 라지풀, 자바풀, 데이터베이스 버퍼 캐시, 스트림풀(10g R2 이후)
---- 초기파라미터파일이 (SPFILE, PFILE) 이냐에 따라 순서대로 재기동시 유지, 초기화 됨
--- APMM(Automatic PGA Memory Management) : 9g 이후, 'PARAMETER:WORKAREA_SIZE_POLICY:AUTO, PGA_AGGREGATE_TARGET' 보다 낮게 자동조절함.
---- 관리되는 PGA 내 WORKAREA 를 제외한 영역은 관리 안되기때문에 TARGET SIZE보다 커질수있다.

-- 수동메모리 관리
--- SQL Work Areas의 xxxx_AREA_SIZE를 제어하는 방식
--- 최대로 설정하고싶을땐 WORKAREA_SIZE_POLICY:MANUAL, SORT_AREA_SIZE:1M 으로 설정

-- [1-17]
-- SMON(System Monitor)
--- 정기적으로 인스턴스의 상태를 감시하고 데이터베이스의 무결성을 유지, 관리하는 백그라운드 프로세스
---- 인스턴스 기동 시 복구가 필요하면 인스턴스 복구 수행
---- 다 사용한 임시 세그먼트를 정리(????) 세그먼트?
---- UNDO 세그먼트를 관리 크기가 커진 UNDO 세크먼트의 축소

-- PMON(Process Monitor)
--- 정기적으로 프로세스의 상태를 감시하고 프로세스 처리에 관련된 데이터 베이스의 무결성을 유지, 관리하는 백그라운드 프로세스
---- 클라이언트 애플리케이션이 비정상 종료 됐을때 처리 중 이었던 각 데이터를 복구하고 정리
---- 디스패처 프로세스와 서버 프로세스의 상태를 정기적으로 체크하고 실행이 정지된 서버 프로시스가 있다면 재기동
---- 인스턴스 및 디스패처 프로세스에 관한 정보를 리스너에 등록

-- CKPT(Check Point)
--- 이벤트에 관련된 정보를 각 파일에 기록하는 백그라운드 프로세스
---- 체크 포인트가 발생하면 데이터베이스의 모든 데이터 파일과 컨트롤 파일에 체크 포인트의 정보를 기록
---- 컨트롤 파일에 3초마다 REDO 로그 파일의 체크 포인트 위치에 관한 정보를 기록.

-- 백그라운드 프로세스 확인
-- [1-18]
SELECT pid, spid, PROGRAM, background, pga_alloc_mem
FROM   V$PROCESS WHERE BACKGROUND = 1;

-- 백그라운드 프로세스의 간단한 설명
-- [1-19]
SELECT name, description FROM V$BGPROCESS;

-- 패스워드 파일
-- [1-20]
--- 패스워드 파일 인증 이라 불리는 인증 방식을 사용할 때 필요한 인증 데이터를 보관하는 파일
--- **. 데이터 딕셔너리 인증은 인증정보를 데이터베이스에서 가져오기때문에 인스턴스 기동이 되지않으면 사용할 수 없다.
--- **. SYSDBA 권한의 DBA계정은 인스턴스 기동이되지않은 상태에서도 인증처리해야되므로, 패스워드파일인증, OS인증을 사용할 수 있도록 되어있다.
--- 유닉스/리눅스   : <ORACLE_HOME/dbs/orapw/<SID>
--- 윈도우용 오라클 : <ORACLE_HOME>\database\pwd<SID>.ora

-- 로그파일
-- [1-21]
-- 과거의 운영상태를 확인할때 로그 파일에 기록된 정보를 확인 및 장애 분석

--- ALERT 로그
---- 데이터베이스 운영 중에 발생하는 심각한 에러뿐아니라, 기동, 종료 등의 관리 작업에 관한 중요한 정보가 출력되는 텍스트 형식의 로그파일
---- 파일명 : alert_<ORACLE_SID>.log
---- 위치  : 10g - 초기파라미터 'PARAMETER:BACKGROUND_DUMP_DEST'
---- 위치  : 11g - ADR_HOME 아래 TRACE에 출력
---- 내용
----- 인스턴스가 기동될 때의 흐름과 기본값이 아닌 초기화 파라미터값
----- 인스턴스를 종료할 때의 흐름
----- 발생한 모든 ORA-00600에러, 블록과 관련된 ORA-1578에러 및 deadlock 관련 ORA-00060 에러, 그 밖의 심각한 에러
----- 데이터 베이스의 관리 조작 명령어와 실행 결과(SQL문의 CREATE/ALTER/DROP DATABASE/TABLESPACE 및ARCHIVE LOG의 출력, 복구 처리등)
----- materialized view 의 자동 갱신시 발생하는 에러
----- (????) cat 이나 tail을 활용한 시스템 분석 활용에 좋을거같음

--- 트레이스 파일
---- 트레이스 파일은 서버 프로세스나 백그라운드 프로세스 등 각종 프로시스의 에러 정보나 상세한 진단 정보가 출력되는 텍스트파일
---- 심각한 에러 발생 시, ALERT 로그에 에러 번호, 동시에 트레이스파일에 정보 출력됨(프로세스 명칭, 프로세스 PID)
---- 위치  : 10g - 서버      프로세스의 트레이스 파일은 초기파라미터 'PARAMETER:USER_DUMP_DEST' 에 설정된 디렉토리에 출력
----              백그라운드 프로세스의 트레이스 파일은 초기파라미터 'PARAMETER:BACKGROUND_DUMP_DEST' 에 설정된 디렉토리에 출력
---- 위치  : 11g - 서버, 백그라운드 모두 ADR_HOME 아래 trace 디렉터리 트레이스 파일이 출력

--- Net Services 관련 로그
---- 네트워크를 통해 인스턴스를 접속할때 Net Services SW를 사용하는데 접속 장애 등의 문제를 분석할때 로그파일

-- [1-22]
-- 데이터 딕셔너리 뷰와 동적 성능 뷰
--- 데이터 딕셔너리 뷰 : 오라클 내부의 구성 정보를 제공하는 특수한 읽기 전용 뷰
--- SYS 계정 소유
--- 애초에 딕셔너리 테이블 수가 많고 유저 권한에서 함부로 수정할 수 없어, 매뉴얼공개되지 않음

-- [1-23]
-- 동적 성능 뷰
--- 오라클의 동적 상태에따라 내용이 지속적으로 변하는 각종 통계정보나 동작상태를 확인 할 수 있는 조회 전용 뷰
---- 각종 통계정보
---- 프로세스, 세션 메로리 영역의 상태
---- 그 외 오라클의 동작 상태에 관한 정보


-- [2]
-- 계정과 권한

-- [2-1]
-- 스키마 : 계정이 소유하는 테이블이나 인덱스 등의 오브젝트를 포함하는 논리적인 콘테이너
-- 계정정보 백업 : 데이터 딕셔너리에 저장되므로 백업할 수 없으나, 계정생성시 사용한 DDL 이나 DBMS_METADATA 패키지를 사용해 DDL 추출
-- 계정 속성
--- DEFAULT 테이블 스페이스 : 오브젝트를 생성 할 때 저장할 테이브 스페이스를 지정하지 않았을때 저장되는 테이블 스페이스
--- DEFAULT 임시 테이블 스페이스 : SQL 실행 시 임시 세그먼트가 필요할 때 임시 세그먼트를 확보하기 위한 테이블 스페이스(????) 세그먼트
--- 권한 : 특정 조작을 수행 할 수 있는 권리
--- 롤 : 여러 개의 권한을 모아 둔 것
--- QUOTA(테이블 스페이스의 할당 제한) : 테이블 스페이스 안에서 해당 계정이 사용할 수 있는 공간의 상한값, 특정 계정이 테이블 스페이스를 독점해 버리는 상황을 방지
--- 계정 프로파일 : 계정이 사용 할 수 있는 자원을 제한, 패스워드의 관리 정책을 규정
---- SESSION_PER_USER : 동시에 접속할 수 있는 세션 수 : 접속수
----  CONNECT_TIME :  세션의 최대 접속 허용 시간 : 분
---- IDLE_TIME : 세션에서 허용되는 최대 idle 시간 : 분
---- CPU_PER_SESSION : 한 세션이 사용 할수 있는 최대 CPU 시간 : 1/100초
---- CPU_PER_CALL : 한 SQL 이 사용 할 수 있는 최대 CPU 시간 : 1/100초
---- LOGICAL_READS_PER_SESSION : 한 세션이 읽어 올 수 있는 최대 논리 블록의 수 : 블록
---- LOGICAL_READS_PER_CALL : 한 호출당 읽어 올 수 있는 최대 논리 블록의 수 : 블록
---- PRIVATE_SGA : 공유 서버 구성에서 한 세션이 개별적으로 확보하는 메모리 영역(SGA 공유 풀 내)의 크기 : 바이트
---- FAILED_LOGIN_ATTEMPTS : 로그인 실패 허용 횟수, 초과하면 계정 잠김 : 횟수
---- PASSWORD_LIFE_TIME : 패스워드를 변경하지 않고 사용할 수 있는 기간 : 일
---- PASSWORD_REUSE_TIME : 현재 사용하고 있는 패스워드를 다음에 다시 사용할 수 있을 때까지의 기간 : 일
---- PASSWORD_REUSE_MAX : 현재 사용하고 있는 패스워드를 다음에 다시 사용할 수 있을때까지의 횟수 : 횟수
---- PASSWORD_LOCK_TIME : 로그인할 때 연속으로 암호가 틀릴 경우 계정을 잠금 기간 : 일
---- PASSWORD_GRACE_TIME : 패스워드의 사용 기한이 끝난 후에 주어지는 패스워드 사용 유예 기간, 유예 기간이 지난 후에 패스워드를 변경하지 않으면 로그인 할 수 없음
---- PASSWORD_VERIF_FUNCTION : 패스워드의 복잡함을 검증하는 스크립트 : 스크립트명

-- [2-2]
-- 계정 확인
SELECT USERNAME, ACCOUNT_STATUS ACCOUNT, DEFAULT_TABLESPACE DEFAULT_TS,
       TEMPORARY_TABLESPACE TEMP_TS, PROFILE
FROM   DBA_USERS;

-- [2-3]
-- QUOTA 확인
SELECT tablespace_name, userName, max_bytes
FROM   DBA_TS_QUOTAS;
--WHERE  username = '계정명';
--- username : QUOTA 가 할당된 계정명
--- max_bytes : 계정에 할당된 QUOTA 의 크기, 무제한 일때는 '-1'
--- 예제: 계정에 QUOTA가 10M 할당되어있을때
--- connect test/test
--- CREATE TABLE test1 (n varchar2(10)) STORAGE (INITIAL 10M);
--- CREATE TABLE test0 (n varchar2(10)) STORAGE (INITIAL 10M); --> 에러 발생 ORA-1536

-- [2-4]
-- 계정 프로파일 확인
-- RESOURCE_TYPE : 제한할때는 KERNEL, 패스워드 운용정책 때는 PASSWORD
SELECT profile, resource_name, resource_type, limit
FROM   DBA_PROFILES;

-- [2-5]
-- 권한 확인 : 오브젝트 권환 과 시스템 권한
--- 오브젝트 권한 : 특정 오브젝트에 관한 권한
-- 모든 오브젝트의 권한 확인
SELECT grantee, owner, table_name, grantor, privilege, grantable
FROM   DBA_TAB_PRIVS;
-- 계정의 오브젝트의 권한 확인
SELECT grantee, owner, table_name, grantor, privilege, grantable
FROM   USER_TAB_PRIVS;

-- 시스템 권한
--- 모든 시스테 권한 확인
SELECT grantee, privilege, admin_option FROM DBA_SYS_PRIVS;

--- 계정에 직접 할당돼 있는 시스템 권한을 확인
SELECT username, privilege, admin_option FROM USER_SYS_PRIVS;

--- 계정에 할당된 모든 시스템 권한
SELECT privilege FROM SESSION_PRIVS;

-- 일반 사용자 계정에도 SYSDBA 권한을 줄수는 있지만, AS SYSDBA, AS SYSOPER 로 접속해야하며, 접속후 SYS, PUBLIC 으로 변경이 되어 실제로 접속하는 계정이 다르게 된다.

-- 롤
-- [2-6] 롤 확인
SELECT role FROM DBA_ROLES;

-- [2-7]
-- 계정 또는 롤에 직업 부여된 롤 확인
-- grantee : granted_role (롤) 이 부여된 계정명과 롤
-- admin_option :  롤이 WITH ADMIN 옵션으로 부여됨 유무
SELECT grantee, granted_role, admin_option FROM DBA_ROLE_PRIVS;

-- [2-8]
-- 현재 계정에 직접적으로 부여된 롤 확인
SELECT username, granted_role, admin_option FROM USER_ROLE_PRIVS;

-- [2-9]
-- 현재 계정에 부여되 있는 모든 룰 확인
SELECT role FROM SESSION_ROLES;



-- [2-10] 테이블 관리
-- 여러 로우를 '영구 테이블 스페이스' 내 블록에 저장한다.
-- 블록에 저장은 가장 하단 부터 채워지며, PCTFREE, PCTUSED 에 의해 판단
-- PCTFREE : 블록 대비 로우를 저장 하는 비율
-- 세그먼트 공간 관리 방식 과 PCTUSED : 블록 내 로우 가 변경됬을때 다시 저장 하는 비율(정도)
-- 세그먼트 빈 공간 관리 방식 종류 FLM(Free List Management), ASSM(Automatic Segment Space Management)
--- FLM : PCTUSED 를 설정하고 사용률이 이 아래로 내려갈 때 데이터를 입력가능하게 한다. 수동, 10g2 미만, 'PARAMETER:SEGMENT SPACE MANAGEMENT:MANUAL'
--- ASSM : 자동으로 판단하고, 10gR2 이후 방식, 'PARAMETER:SEGMENT SPACE MANAGEMENT:AUTO'
SELECT tablespace_name, segment_space_management FROM DBA_TABLESPACES;

-- [2-11] 로우 마이그레이션과 로우 체이닝
-- SELECT table_name, chain_cnt FROM USER_TABLES WHERE table_name = <테이블명>;
-- 로우 마이그레이션
--- 세그만트 공간관리방식과 PCTUSED 에 의핸 빈공간은 블록 내 로우의 UPDATE 로 인한 데이터 크기거 커졌을때를 대비하기 위한 공간인데
--- 실제로 공간이 커졌을때, 다른 블록으로 로우를 이동시키면서 원래 로우에 이동시켜진 블록의 로우의 위치를 저장한 포인터를 저장한다. 
--- 읽어들일땐, 포인터를 가진 블록과 로우가 존재하는 블록을 읽어야하기때문에 마이그레이션이 자주발생하는 경우 속도가 느려진다.

-- 로우 체이닝
--- 로우의 크기가 블록의 크기보다 클때, 여러 블록에 나누어서 저장되는 형식이다. 
--- 이 때, 세그먼트 공간관리방식과 로우 마이그레이션의 방식이 적용된다.
--- PCTFREE 만큼 저장되고 다른블록으로 저장이될때, 포인터가 저장된다.

-- 세그먼트 공간 관리 방식 확인
SELECT table_name, chain_cnt FROM USER_TABLES;

-- 로우 마이그레이션과 로우 체이닝 확인
-- ANALYZE <테이블명>  COMPUTE STATISTICS;
-- SELECT table_name, chain_cnt FROM USER_TABLES WHERE table_name = <테이블명>;

-- 로우 마이그레이션 / 로우 체이닝이 발생한 로우를 확인
SELECT owner_name, table_name, head_rowid FROM chained_rows;

SELECT rowid, empno, ename FROM emp;

-- [2-11]
-- 로우 저장 블록은 저장 순서가 있는게 아니라 임의대로 저장된다. 그렇기 때문에 select 하면 정렬되지 않은 데이터가 보여진다.
-- rowid : 로우의 물리적인 위치를 표시하는 특수 식별자임
-- rowid = 파일번호 + 블록번호+로우번호+보조정보
-- SELECT rowid FROM <테이블명>;
-- rowid 를 이용한 검색이 가장빠르다

-- [2-12] 문자 세트 확인
SELECT * FROM V$NLS_PARAMETERS WHERE parameter LIKE '%CHARACTERSET';


-- [2-13] 테이블 확인
SELECT owner, table_name, tablespace_name, pct_free, pct_used FROM DBA_TABLES;

SELECT table_name, tablespace_name, pct_free, pct_used FROM USER_TABLES;

-- [2-14] 모든 컬럼에 관한 정보 확인
SELECT owner, table_name, column_name data_type, data_length, data_precision, data_scale, nullable, char_length, char_used
  FROM DBA_TAB_COLUMNS;
  
-- [2-15] 접속한 계정이 소유하는 테이블의 칼럼에 관한 정보 확인
-- data_precision 정밀도, data_scale 스케일, char_used 칼럼 길이를 지정하는 단위(바이트B, 문자C)
SELECT table_name, column_name data_type, data_length, data_precision, data_scale, nullable, char_length, char_used
  FROM USER_TAB_COLUMNS;
  
-- [2-16] 데이터베이스에 존재하는 제약 확인
SELECT owner, constraint_name, constraint_type, table_name, r_owner, r_constraint_name, index_owner, index_name
  FROM DBA_CONSTRAINTS;
  
-- [2-17] 접속한 계정이 소유한 제약 확인
-- constraint_type(C:heck, P:rimary key, U:nique key, R:Foreign key)
SELECT constraint_name, constraint_type, table_name, r_owner, r_constraint_name, index_owner, index_name
  FROM USER_CONSTRAINTS;
  
-- [2-18] 인덱스 [???]
--- 인덱스종류
--- NORMAL : B 트리 인덱스
--- BITMAP : 비트맵 인덱스
--- NORMAL/REV : 리버스 키 인덱스
--- FUNCTION-BASED NORMAL : B 트리 인덱스로 만들어진 함수 기반 인덱스
--- FUNCTION-BASED BITMAP : 비트맵 인덱스로 만들어진 함수 기반 인덱스
--- FUNCTION-BASED NORMAL/REV : 리버스 키 인덱스로 만들어진 함수 기반 인덱스
-- 데이터베이스 내에 존재하는 인덱스 확인
SELECT owner, index_name, index_type, uniqueness, table_owner, table_name, tablespace_name
  FROM DBA_INDEXES;
  
-- 접속한 계정이 소유하고 있는 인덱스 확인
SELECT index_name, index_type, uniqueness, table_owner, table_name
  FROM USER_INDEXES;
  
-- B 트리 인덱스가 생성된 칼럼의 확인
SELECT index_owner, index_name, table_name, column_name
  FROM DBA_IND_COLUMNS;
  
-- [2-19] OLTP 환경(OnLine Transaction Processing)
-- 실시간으로 데이터를 변경하는 트랜젝션을 여러 사용자가 동시에 수행함. 트랜젝션 데이터양은 비교적 적다.
-- 은행 거래 시스템, 항공 예약 시스템

-- [2-20] DW 환경(Data Warehouse)
-- 대량으로 축적된 데이터를 분석하는 쿼리가 수행. 실시간반영이 매우 적고, 주로 야간에 일괄처리를 함.
-- OLTP 에서 쌓인 데이터를 분석하기 위한 용으로 많이 사용

-- [3-1] 그 밖의 오브젝트


-- [3-2] 뷰
-- 데이터베이스 안의 뷰 확인
SELECT owner, view_name, text FROM DBA_VIEWS;

-- 접속한 계정이 소유한 뷰 확인
SELECT view_name, text FROM USER_VIEWS;

-- [3-3] MATERIALIZED VIEW 구체화된 뷰
--- 뷰와 다르게 자기자신이 조회한 데이터를 가지고있다. 그 테이블을 '디테일 테이블(마스터 테이블)' 이라함.
--- 보안성과 쿼리 간결화의 이점이있지만, MATERIALIZED VIEW 의 결과를 실제 테이블에 반영하기 위해선 리프레시를 해야한다.
--- ON COMMIT : 매번 커밋되는 점에서 성능이 저하될수있다.
--- ON DEMAND : 성능 저하는 없지만, 일일이 커밋해야 결과가 반영된다.

-- MATERIALIED VIEW 확인
SELECT owner, mview_name, query, refresh_mode FROM DBA_MVIEWS;

-- [3-4] SEQUENCE 시퀀스
--- 대량의 테이블데이터 시퀀스를 생성할때는 테이블에 LOCK 걸릴 수 있어 성능에 좋지 않다.

-- 시퀀스 확인
SELECT sequence_owner, sequence_name, min_value, increment_by
  FROM DBA_SEQUENCES;

-- [3-5] SYNONYM 시노님
-- 오브젝트의 별칭
-- 테이블이나 뷰, 시퀀스, 프로시저, 패키지등 여러가지를 시노님으로 정의할수있다.
-- 보아성과 조작성이 향상된다.

-- 시노님 확인
SELECT owner, synonym_name, table_owner, table_name FROM DBA_SYNONYMS;

-- [3-6] 오브젝트 저장 방시과 저장공간
-- 논리적인 공간에 일대일로 저장하는 세그먼트는 테이블과 인덱스와 일대일로존재하고
-- 테이블이있으면 세그먼트도 있다고보면된다.

-- [3-7]  데이터베이스 내의 세그먼트 정보 확인
SELECT owner, segment_name, segment_type, tablespace_name, bytes, blocks
  FROM DBA_SEGMENTS;
  
-- 접속한 계정이 소유한 세그먼트 정보 확인
SELECT segment_name, segment_type, tablespace_name, bytes, blocks
  FROM USER_SEGMENTS;
  
-- [3-8] 익스텐트 : 특정 데이터 파일안에 연속된 블록의 집합, 묶어 관리하는 것.
-- 데이터베이스 내의 익스텐트 확인
SELECT owner, segment_name, segment_type, tablespace_name, extent_id
  FROM DBA_EXTENTS;
  
-- 접속한 계정이 소유한 세그먼트의 익스텐트 정보확인
SELECT segment_name, segment_type, tablespace_name, extent_id
  FROM USER_EXTENTS;
  
-- [3-9] 익스텐트 자동관리방식
-- UNIFORM : 테이블 스페이스 내의 모든 익스텐트를 같는 크기로 관리하는 방식
-- AUTOALLOCATE , 초기 익스텐트 개수와 크기를 무시하며, 내부 알고리즘에 따라 자동으로 결정됨
-- 익스텐트 관리방식은 테이블 스페이스를 생성할 때 지정하고, 오브젝트를 생성할 때 사용자가 지정할 수 없다

-- [3-10] 익스텐트 추가할당
-- 오브젝트에 저장된 데이터가 많아 새로운 데이터를 세그먼트에 저장 할 수 없을때, 자동으로 익스텐트를 추가 할당해 세그먼트를 확장한다

-- [3-11] 익스텐트 할당 해제
-- 원칙적으로 한번 세그먼트에 할당되면 해당 세그먼트의 오브젝트를 제거할 때까지 테이블 스페이스에 반환하지 않지만,

-- TRUNCATE TABLE : 테이블 내의 모든 데이터가 삭제되며, 테이블을 생성했던 때의 최초 익스텐트 할당 상태로 줄어든다.
-- ALTER TABLE DEALLOCATE UNUSED : HWM 을 넘어서는 사용하지 ㅇ낳는 익스텐트를 해제한다.
-- ALTER TABLE SHRINK SPACE : 세그먼트 단편화를 해소하고 HM 을 낮추는 것으로 사용하지 않는 익스텐트를 해제함

-- [3-12] 세그먼트의 HWM : 이후의 블록은 모두 포맷되지 않은 DBA 
-- 세그먼트에 할당된 블록은 포맷된 블록과 비포맷 블록으로 나뉘고, 포맷된 블록에만 데이터가 저장된다.

-- [3-13] TRUNCATE TABLE 문
-- 테이블의 모든 데이터를 삭제하는 SQL문, 실행시 HWM 은 첫 번째 익스텐트의 시작 블록으로 이동하기 때문에 최초할당상태로 돌아간다

-- [3-14] ALTER TABLE DEALLOCATE UNUSED 문
-- HWM 을 넘어가는 포맷되지 않은 블록을 해제하는 SQL문
-- 로컬관리 테이블 스페이스의 경우(?????), 테이블 스페이스의 설정에 따라 오라클의 익스텐트 크기를 자동 관리하기 때문에 HWM을 넘어가는 모든 블록이 해제되는 것은 아니다.
-- HWM 을 넘어가는 익스텐트 중 모든 블록이 포맷되지 않은 익스텐트만 해제됨

-- [3-15] ALTER TABLE SHRINK SPACE 문
-- 세그먼트의 단편화를 해소하고 HWM 을 낮추며 HWM 이후의 사용되지 않은 익스텐트를 해제하는 SQL 문이다. 
-- 1. 세그먼트의 단편화를 해소하는 처리
-- 2. HWM 을 낮추고 사용되지 않은 익스텐트를 해제하는 처리





-- [4] SQL 처리 
-- [4-1] SQL 처리 절차
-- 1. 공유 풀 확인 -> SQL 검증 -> 실행 계획 생성 -> 분석된 SQL문을 공유 풀에 보관
-- 2. SQL 처리의 실행
-- 3. 데이터베이스 버퍼 캐시의 블록에서 로우를 가져옴

-- 옵티마이저 통계수집을 수동, 자동, 임시수집 방법으로 한다.
-- 테이블, 인덱스에서 통계를 내고 CBO, 예상비용을 산출한다.

-- [4-2] 분석이 끝난 SQL 정보 저장
-- 실행 가능한 SQL 과 실행 계획을 포함한 분석된 SQL 정보를 SGA 의 공유 풀 내부의 라이브러리 캐시에 저장
-- 대소문자, 띄어쓰기를 주의해야 한다.

-- [4-3] SQL실행 
-- INSERT, UPDATE, DELETE 는 데이터베이스 버퍼 캐시 의 블록이 실제로 변경
-- SELECT 는 로우를 마킹 처리만하고 로우 가져오기에서 수행함

-- [4-4] 로우 검색
-- SELECT 에서 마킹한 로우 데이터를 가져온다.
-- 일괄로 가져오는게 아니라 로우를 분할하여 가져온다. ORDER BY 를 수행

-- [4-5] 실행 계획 확인
-- 실행 계획 확인하기 SQL*PLUS AUTOTRACE 기능을 이용함.
-- SCOTT 세팅
-- EXECUTE DBMS_STATS.GATHER_SCHEMA_STATS('SCOTT');
-- 실행 계획 표시하기 : SET AUTOTRACE ON EXPLAIN;
-- SELECT * FROM EMP0;

-- [4-6] 분석된 SQL 정보의 보관과 공유하기
-- SQL을 분석할 때 실행 계획인 만들어지고, 공유 풀에 저장된다. 확인해 보자
-- 실행 계획 관리
ALTER SYSTEM FLUSH SHARED_POOL; -- 공유풀 메모리 삭제
-- 공유 풀 내의 분석된 SQL의 정보 확인
SELECT sql_text FROM V$SQL WHERE sql_text = 'SELECT * FROM EMP0';

-- SQL문을 실행하여 하드 파싱 발생하기
-- 위에 EXECUTION PLAN 이 없는 것을 확인하고 다시 SQL 문을 실행해봅시다
SELECT * FROM EMP0;

-- [4-7] 데이터베이스 버퍼 캐시의 역할과 효과
-- 실행계획을 실행해 로우로 읽으려면 데이터 파일에서 블록을 가져와야한다.
-- SGA 의 데이터베이스 버퍼 캐시

-- 1. 최초 실행시
-- SELECT 실행 -> 블록 존재 유무 확인 -> 데이터 파일에서 블록을 가져와 블록을 데이터베이스 버퍼캐시에 저장
-- -> 버퍼 캐시에서 해당 블록을 읽음 -> 블록에서 로우를 졸비해 클라이언트 어플리케이션으로 전송

-- 2. 두번째 이후
-- 같은 SELECT 문 실행 -> 데이터베이스 버퍼 캐시에 필요한 블록이 존재하는지 확인 -> 읽음 -> 클라이언트로 전송

-- 여기서 두번째 이후로는 데이터베이스 파일에서 읽는 것보다 메모리에서 읽는 것이 빠르기 때문에,
-- 메모리의 크기를 높이는 것으로 성능을 향상 시킬수 잇다. 
-- 동일한 블록은 여러번 읽는건 한정되어있기 때문에 무작정 크기를 늘리는것은 방법이아니다
-- 계산해보기
--- 데이터전송속도 1.5Gb/S (약 190MB/s)
--- 회전수 7,200 RPM
--- 평균 탐색 시간 약 9ms
-- 8KB 데이터를 읽어 오는 시간은 ? 
--- 데이터 전송시간(8KB / 190MB/s = 43us) + 회전 대기 시간 (60초/ 7,200RPM / 2 = 4ms) + 평균 탐색시간
--- = 약 13ms
-- 일반적인 메모리의 8KB 전송 시간
--- 8KB / 19.2GB = 약0.4us(0.0004ms) 
-- 데이터 파일을 읽는 것과 메모리를 읽는 것은 약 30배 차이가 난다.

-- 데이터가 많아진 SQL SELECT 문을 실행해 통계를 보자
SELECT * FROM EMP1;
-- 2번 실행해보면 physical reads 부분이 0으로 줄어든 것을 볼 수 있다.


-- [4-8] 인덱스 효과
SET AUTOTRACE ON;
SELECT * FROM EMP1 WHERE EMPNO = '3';
-- * 표시와 Predicate Information 항목이 추가되었다.
-- B-TREE 인덱스가 적합하다.
-- 4-7과 4-8 에서는 CONSISTENT GETS 을 비교해보면, 87과 2 로 블록을 읽어오는 수가 감소했다.

-- [4-9] 정렬 수행과 PGA, 임시 테이블 스페이스
-- 회신하기전에 ORDER BY 로 정렬해야 할 때가 있다.

-- PGA와 임시 테이블 스페이스
-- 서버 프로세스는 정렬 작업을 수행 하는 경우 SQL Work Areas 또는 임시 테이블 스페이스를 사용한다.
-- SQL Work Areas 가 SQL 작업 수행에 필요한 크기보다 작을때 임시 테이블 스페이스가 사용된다.
-- 하지만 매우느리다.

-- SQL Work Areas 와 임시 테이블 스페이스와 차이점
-- 1. 정렬이 발생하지 않는 쿼리 (ORDER BY 절 없음)
SET AUTOTRACE TRACEONLY
SET TIMING ON
SELECT * FROM EMP1;
-- 0 sorts (memory), 0 sorts (disk) 로 정렬이 되지 않았다.

-- 2. 정렬 처리가 발생하는 쿼리 (메모리에서만 정렬)
SET AUTOTRACE TRACEONLY
SET TIMING ON
SELECT * FROM EMP1 ORDER BY ENAME;
-- 먼저 테이블 스캔 실행 후 정렬이 되었다(SORT ORDER BY)
-- 1 sorts (memory) 인 것으로보아 메모리(PGA)에서 정렬이 되었다.

-- 3. 정렬 처리가 발생하는 쿼리 (디스크에서 정렬)
-- PGA 크기를 초과하는 데이터 정렬을 할 때 디스크를 사용합니다.
-- PGA 는 오라클에서 자동으로 조정한다.
ALTER SESSION SET WORKAREA_SIZE_POLICY = MANUAL;
ALTER SESSION SET SORT_AREA_SIZE = 51200;
SET AUTOTRACE TRACEONLY;
SET TIMING ON;
SELECT * FROM EMP1 ORDER BY ENAME;
-- 실행계획에 SORT ORDER BY, 1 sorts (disk) 확인가능하다.

-- [5-1] 변경 처리 원리
-- SQL이 오라클 내부에서 어떤식으로 처리되는지 알아보자.

-- [5-2] 오라클 변경 처리
-- 블록 단위로 데이터가 분할 저장되지만 변경 처리마다 블록을 변경하지않는다.
-- 체크 포인트 등의 데이터 파일에 기록해 두었다가 한꺼번에 처리하여 성능과 트랜젝션을 관리하게된다
-- 서버 프로세스 단에서 REDO 로그 버퍼에 기록, 데이터베이스 버퍼캐시에 기록된 후 REDO 로그파일에 기록되고, 블록에 바로 적용되지 않는다.

-- [5-3] 트랜젝션의 개념
-- 여러 SQL을 모아 둔 작업 단위. 트랜젝션 실행 중 커밋으로 확정, 롤백으로 취소 할 수 있다.

-- UPDATE 문 처리원리
--- UPDATE 문 실행 -> UNDO 세그먼트에 할당 -> 블록 취득  -> REDO 로그 버퍼 -> 변경 전 데이터를 UNDO 세그먼트에 보관 -> 블록 변경
--- 클라이언트 APP 에서 UPDATE 실행, 서버프로세스에서 트랜젝션 실행 -> 트랜젝션 변경 전 데이터를 저장 하기 위해 UNDO 세그먼트에 트랜젝션을 할당
--- -> 변경대상 블록이 데이터버퍼캐시에 존재하지 않으면 적재 -> REDO 로그 버퍼 생성 -> UNDO 세그먼트에 저장
--- -> 데이터 버퍼 캐시에 있는 블록이 변경
--- -> 클라이언트 APP에서 커밋실행. -> 트랜젝션과 UNDO 세그먼트 할당이 해제됨 -> REDO 파일이 기록 -> 커밋처리 완료 통지

-- [5-4] 체크포인트
-- 체크포인트가 발생하면 CKPT(체크 포인트 프로세스) 에서 DBWn(데이터베이스 라이터 프로세스)에 
-- 체크포인트가 발생한 것을 통지, 통지받은 DBWn 은 데이터베이스 버퍼 캐시에 변경된 블록을 데이터 파일에 기록

-- [5-5] 트랜젝션에 관한 정보 확인
SELECT xid, xidusn, status, start_time FROM V$TRANSACTION;
-- 확인하기
SET AUTOTRACE ON STATISTICS;
UPDATE EMP1 SET ENAME = 'test' WHERE EMPNO = 1;
SET AUTOTRACE OFF;
SELECT xid, xidusn, status, start_time FROM V$TRANSACTION;

-- SELECT 문은 REDO 가 생성되지 않는다.

-- [6-1] 트랜젝션의 개요와 ACID 속성
-- 트랜젝션 : 클라이언트 애플리케이션에서 실행되는 여러 SQL 문을 한 작업 단위로 묶은 것
-- 원자성의 특징을 가진다
-- 트랜젝션을 푸는 로직으로는 1. 처리 중 에러발생시 모두 되돌리는 방법과, 2. 처리완료하고 에러발생한 데이터를 보여주어 따로 처리하는 방법이있다.

-- [6-2] ACID 속성 , Atomicity 원자성, Consistency 일관성, Isolaion 고립성, Durability 지속성
-- 일관성 : 트랜젝션 실행 전에 데이터베이스가 데이터의 무결성을 유지한 상태이면, 실행 후에도 무결성을 유지해야한다.
-- 고립성 : 동시에 실행된 트랜젝션끼리 서로 간섭하지 않는 고립된 상태이다.
--- 두 가지 격리 수준 : READ COMMITED, SERIALIZABLE
--- READ COMMITED : 다른 트랜젝션에서 커밋한 변경 데이터만 읽을 수 있다. 커밋 안 된 데이터는 읽을 수 없다.
-- 지속성 : 커밋된 트랜젝션은 적절하게 보관될 것이고, 간단하게 손실 될 수 없다.
--- 장애가 발생하더라도 제대로 유지된다.

-- [6-3] 트랜젝션 시작과 종료 
-- 시작 :  DML(UPDATE, INSERT, DELETE)와 SET TRANSACTINO 으로 실행 했을 때
-- 종료 : 
--- COMMIT 또는 ROLLBACK 시점
--- CREATE, DROP, RENAME 또는 ALTER 등 DDL 실행된 시점, 이 때 실행중이던 트랜젝션은 커밋됨
--- 클라이언트 애플리케이션이 명시적으로 세션종료될때, 커밋된다.
--- 클라이언트 애플리케이션이 비정상적인 종료, 롤백
--- 서버 프로세스 및 인스턴스가 비정상적인 종료, 롤백

-- [6-4] 세이브 포인트
-- SQL 문의 처리는 세이브 포인트라는 중간포인트가 존재한다
-- 세이브 포인트가 지정되어있다면, SQL 처리중에 롤백이 되더라도 세이브 포인트 이후의 처리만 롤백이된다.
-- 세이브 포인트 정의
SAVEPOINT <세이브포인트명>;

-- 세이브 포인트까지 롤백
ROLLBACK TO <세이브포인트명>;

-- [7-1] 오라클의 트랜젝션과 고립성
-- [7-2] 표준 SQL의 격리 수준과 오라클의 격리수준
-- 표준 SQL에 정의돼어 있는 격리수준의 비교 1.낮은수준 ~ 4.높은수준
-- 1. READ UNCOMMITED : 다른 트랜젝션에서 커밋하지 않은 변경 데이터를 읽어 올 수 있다.
-- 커밋이 정상적으로 종료됐을 때 트랜젝션에서 변경한 것은 이상 없이 반영된다.
-- 2. READ COMMITED : 다른 트랜젝션에서 커밋한 데이터만을 읽을 수 있다. 커밋돼 있지 않은 데이터는 읽을 수 없다.
-- 3. REPEATABLE READ : 트랜젝션 내에서는 데이터를 반복적으로 조회해도 결과는 같은 데이터다.
-- 커밋하지 않은 변경 데이터는 읽을 수 없다.
-- 4. SERIALIZABLE : 읽어 오는 결과는 항상 같다. 커밋하지 않은 변경 데이터는 읽을 수 없다.

-- READ UNCOMMITED
--- 가장 낮은 격리 수준, 실용성이 낮기 때문에 오라클에는 없다.
-- READ COMMITED
--- 오라클에서는 기본적으로 이격리 수준으로 실행된다.
--- 트랜젝션이 실행되지 않은 상태에서 다음 명령이 실행된다
SET TRANSACTION ISOLATION LEVEL READ COMMITED
--- 로우 레벨 LOCK 및 다중버전동시제어 메커니즘이 실행됨

-- [7-3] 로우 레벨 LOCK
-- UPDATE, INSERT, DELETE 대상은 자동으로 LOCK 이 걸렸다가 트랜젝션 종료시에 LOCK 을 해제 합니다.
-- 다른 트랜젝션은 LOCK 이 해제될대까지 기다린다.

-- [7-4] LOST UPDATE 현상
-- 변경 처리 할 때, LOCK 이 없는 경우, LOST UPDATE 라는 간섭 현상이 발생한다.
-- 트랜젝션이 성공 했음에도 불구하고 내용이 반영되지 않은 현상, 이고 나중에 실행된 내용에 덮어씌워지게된다.
-- 트랜젝션이 많으면 LOCK에 의한 경합이 이루어지는데, 성능에 저하를 일으킬 수 있다.

-- [7-5] 다중 버전 동시성 제어(MVCC, Multi-versino concurrency control)
-- 트랜젝션이 동시에 실행된 경우, 각각의 트랜젝션에 일관성을 가진 적절한 버전에 데이터를 반환하는 구조
-- READ COMMITED 격리 수준에서는 SQL 실행됬던 시점 버전의 데이터가 반환됨.
-- SERIALIZABLE 격리 수준과 읽기 전용 트랜젝션에서는 트랜젝션 시작한 시점 버전의 데이터가 반환된다.

-- [7-6] READ COMMITED 격리 수준과 문장 수준의 읽기 일관성
-- [7-7] MVCC의 구조 
-- SCN(System Change Number) 와 before image 로 구현되어있다.
-- SCN : 트랜젝션이 커밋될 때마다 증가하는 데이터베이스의 버전 번호. 블록에 SCN 번호가 저장되어있다.
-- before image : UNDO 테이블 스페이스의 UNDO 세그먼트에 포함된 UNDO데이터에서 생성되는 변경 전 블록

-- [7-8] MVCC와 ORA-1555 에러
-- before image 를 만드는데 필요한 UNDO 데이터는 오라클에서 자동으로 UNDO 테이블 스페이스에 저장된다.
-- 그러나 테이블 스페이스는 데이터양에 한계가 있어 다른 UNDO 데이터가 덮어 쓸 수도 있다. ORA-1555
-- 테이블스페이스의 데이터양을 늘리거나, UNDO_RETENTION 파라미터를 수정하는 것이 좋다.

-- [7-9] Non- Repeatable Read 현상
-- READ COMMITED 격리 수준의 SQL 실행은 '문장 수준의 읽기 일관성'을 가지므로 읽기 결과도 일관성을 가진다.
-- 그러나, 여러번 SQL 문을 실행한 경우는 해당 결과가 달라지는 Non-Repeatable Read 가 발생할 수 있다.
-- 격리 수준을 SERIALIZABLE 이나 읽기 전용 트랜젝션을 실행해야한다.

-- [7-10] Repeatable Read 격리 수준
-- 커밋된 데이터를 읽을 수 있으면서 동일한 트랜젝션 내의 쿼리에서 얻어지는 내용이 동일하게 유지되는 수준
-- Phontom Read가 발생 : 동일한 조건의 쿼리를 실행하면, 다른 트랜젝션이 데이터를 입력 했기 대문에 전에는 존재하지 않은 데이터가 포함되 쿼리결과가 달라지는 현상

-- [7-11] Serializable 격리 수준
-- 읽기 가능한 데이터가 트랜젝션 시작 시점에 커밋된 데이터에 한정되어있고, 쿼리결과가 동일한 격리 수준
-- 트랜젝션 수준의 읽기 일관성. LOST UPDATE, DRITY READ, Non-Repeatable Read, Phantom Read 발생하지않음
-- SERIALIZABLE 격리 수준을 가진 트랜젝션 시작
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE

-- [7-12] 직렬화 기능 개념
-- 병렬로 실행된 트랜젝션의 처리 결과를 특정 순서대로 시리얼하게 수행한 처리결과와 같게 할수 있다.

-- [7-13] SERIALIZABLE 격리 수준의 주의점
-- ORA-1555 : SNAPSHOT TOO OLD
-- ORA-8177 : CANT SERIALIZE ACCESS FOR THIS TRANSACTION

-- [7-14] 읽기 전용 트랜젝션
-- SERIALIZABLE 격리 수준과 같고, 읽기만 가능하다
-- 읽기 전용 트랜젝션 시작
SET TRANSACTION READ ONLY;
-- 읽기전용에서 DML을 실행하면, ORA-1456이 발생

-- [8-1] 오라클의 LOCK 기능
-- 여러 트랜젝션이 동시에 실행되지 않으면 필요없다

-- [8-2] 자동 LOCK의 동작
-- 대상 로우에 대해 exclusive lock 모드에서 로우레벨 lock
-- 대상 테이블에 대해 shared lock 모드에서 테이블레벨 lock

-- 배타적 lock 모드와 공유 lock 관계
-- 어떤 대상이 공유 lock 모드에서 lock을 취득한경우, 다른 세션은 공유 lock 모드로 lock 을 취득할 수 는 있지만 배타적 lock 모드로는 lock을 취득불가
-- 어떤 대상이 배타적 lock 모드에서 lock을 취득한경우, 다른 세션은 공유 lock 모드든 배타적 lock 모드든 lock 을 취득할 수 없다.


-- [8-3] 자동 LOCK의 확인
-- 2개의 각 다른 SQLPLUS로 TEST로 로그인해각각 UPDATE 를 쳐보자
-- 하나씩하여 LOCK을 확인하고 하나씩 COMMIT 하여 상태변화를 확인하자
-- LOCK 의 취득상황과 세션의 상태확인
SELECT s.username, s.sid, s.serial#, l.type TYPE,
       l.id1, l.id2, l.lmode HELD, l.request REQ
FROM   V$LOCK l, V$SESSION s
WHERE  l.sid = s.sid AND s.username = 'SCOTT'
ORDER BY s.sid, l.type;

-- lmode : lock 3, exclusive 6
-- request : 0 은 요청하고있지않음.

 -- [8-4] 수동 LOCK과 SELECT FOR UPDATE 문
 -- 동시다발적으로 진행되는 SELECT와 UPDATE 때문에, UPDATE 처리결과가 제대로 반영안될때가있다
 SELECT <칼럼명>
 FROM   <테이블명>
 WHERE  <검색조건> FOR UPDATE;
 
-- [8-5] DEADLOCK
-- 하나의 트랜젝션에서 여러 로우의 LOCK을 취득하는 경우에는 LOCK을 취득하는 순서에 따라 두개의 세션이 서로가 가진 LOCK의 해제를 기다리는 상황
-- 하나의 쿼리를 중단시켜야한다. 그러나 ROLLBACK된다.

-- [8-6] DEADLOCK 발생원인
-- 애플리케이션에서 실행되는 SQL문의 순서가 적절하지않을때
-- ID 값이 작은 로우부터 LOCK을 취득한다고 기준이있으면 DEADLOCK 이 발생하지않음


-- [9-1] 기동과 정지 그리고 복구 원리
-- [9-2] 인스턴스 기동
-- 기동단계
--- CLOSE 상태 : 오라클 관련 파일은 오픈하지 않음
---              백그라운드 프로세스는 기동되지 않음
---              SGA가 확보되지 않음
--- NOMOUNT 상태 : 서버 파라미터 파일 오픈
---                백그라운드 프로세스는 기동 완료
---                SGA 확보 완료
--- MOUNT 상태 : 컨트롤 파일 오픈
--- OPEN 상태 : 데이터베이스에 접속 가능
---             데이터 파일 오픈
---             REDO 로그 파일 오픈

-- CLOSE 상태에서 NOMOUNT 상태로 전환
--- SYSDBA의 SYS 계정이 STARTUP 실행, 서버파라미터 파일을 읽고, 인스턴스 기동되고, SGA가 확보됨

-- NOMOUNT 상태 에서 MOUNT 상태로 전환
--- 컨트롤 파일을 오픈(CONTROL_FILES), 컨트롤 파일을 하나라도 못열면 MOUNT 상태가 되지 못한다.

-- MOUNT 상태에서 OPEN 상태로 전환
--- 데이터파일과 REDO 로그 파일을 오픈, 이때 데이터 베이스에 액세스 가능하다

-- [9-3] 인스턴스 기동 시 ALERT 로그 출력
-- 인스턴스를 NOMOUNT 상태로 기동
STARTUP NOMOUNT
-- 인스턴스를 MOUNT 상태로 기동
START MOUNT
-- NOMOUNT 상태, MOUNT 상태에서 OPEN 상태로 전화
ALTER DATEBASE OPEN;

-- [9-4] 기동 상태 전환 명령어
-- STARTUP NOMOUNT --> ALTER DATABASE MOUNT --> ALTER DATABASE OPEN

-- [9-5] 인스턴스 정지
SHUTDOWN [NORMAL|TRANSACTIONAL|IMMEDIATE|ABORT]

-- NORMAL : 기본값. 인스턴스에 접속되어있는 세젼종료를 기다렸다가 정상처리
-- TRANSACTIONAL : 인스턴스에서 실행되고 있는 트랜젝션 종료를 기다린후 정리처리
-- IMMEDIATE : 인스턴스에서 실행되고있는 트랜젝션을 기다리지않고 롤백한후 정지처리
-- ABORT : 인스턴스를 강제로 정지.무결성 확보 못함

-- [10-1] 복구처리원리
-- 트랜젝션 복구의 수행과 롤백, 아래의 상황에서 자동으로 복구 수행을 한다
--- 클라이언트 애플리케이션이 롤백을 실행 했을때
--- 트랜젝션을 실행한 서버 프로세스가 비정상 종료된 경우
--- 인스턴스가 비정상 종료되거나 강제 정지 도니 후 인스턴스를 다시 기동할 때

-- [10-2] 클라이언트 어플리케이션 롤백 실행
-- UNDO 세그먼트에 저장된 데이터를 가져와 복원함

-- [10-3] 트랜젝션을 실행한 서버 프로세스가 비정상 종료된경우
-- 백그라운드 프로세스 PMON이 비정상종료된 것을 찾아 롤백한다

-- [10-4] 인스턴스가 비정상 종료되거나 강제 정지 도니 후 인스턴스를 다시 기동할때
-- 트랜젝션이 존재하는 상황에서 인스턴스가 비정상되거나 SHUTDOWN ABORT 로 강제 정지후 다시시작할대
-- 복구가된다

-- [10-5] 인스턴스 복구 원리
-- 인스턴스에 장애가 발생해 비정상적으로 종료됐을 때나 인스턴스를 SHUTDONW ABORT 명령어로 사용해 강제정지한후,
-- 다시기동했을때 백그라운드 프로세스 SMON 이 자동으로 수행하는 복구 처리

-- [10-6] 내부적으로 일관성을 확보하지 못한 데이터베이스상태
-- 커밋되지 않은 데이터는 데이터블록에 반영되면 안도니다

-- [10-7] 롤포워드와 롤백에 의한 일관성 회복
-- 내부의 일관성을 회복하지 않으면 인스턴스 복구를 통해 롤포워드와 롤백을 수행하는것으로 일관성을 회복한다
-- 롤포워드 : 커밋된 트랜젝션의 적용, REDO 로그 파일의 체크 포인트보다 이후의 REDO 데이터에 기록된 트랜젝션을 실행
-- 롤백 : 커밋되지 않은 트랜젝션의 취소: UNDO 세그먼트에 포함된 UNDO 데이터를 이용해 커밋안한 데이터의 반영을 취소

-- [10-8] 롤백의 필요성과 원리
-- 트랜젝션이 커밋되지 않더라도 데이터베이스 버퍼 캐시의 여유공간이 부족한 경우에는 DBWn 백그라운드 프로세스를 통해 변경된 블록이 데이터 파일에 기록된다

-- [10-9] 미디어 복구와 악카이브 REDO 로그
-- 데이터 베이스를 구성하는 파일이 손상되면 미디어 복구를 이용해 복구한다.
-- 미리 받아준 백업 파일에서 데이터베이스를 복구하는 방법이다.

-- [10-10] 롤포워드에 필요한 REDO 로그 파일
-- 백업본을 보관한 시점부터 장애 발생 시점까지 생성되었던 REDO 데이터를 적용한다.
-- 온라인 REDO 로그 파일 뿐만 아니라 아카이브 REDO 로그 파일도 필요하다

-- [11-1] Oracle Net Services와 클라이언트/서버
-- Oracle Net Services :오라클을 네트워크 환경에서 사용하는데 필요한 컴포넌트를 부르는 이름
-- Oracle Net, Oracle Net Listener, NetConfiguration Assistant, Net Manager
--- Oracle Net: 클라이언트와/서버 간의 네트워크 통신을 제공하는 소프트웨어
--- Oracle Net Listener 원격 접속을 수신하기 위한 상주형 서버 프로그램
--- Net configuration Assistant : 리스너 구성과 Oracle Net Service의 기본적인 구성을 수행 할 수 있는 GUI 도구
--- Net Manager :  Oracle Net Services 전반을 설정할 수 있는 GUI 도구

-- [11-2] 인스턴스 접속 방법
-- 로컬 접속 : 인스턴스가 가동되는 장비의 클라이언트 어플리케이션에서 인스턴스에 접속할때 
---           ORACLE_SID 를 이용한 오라클의 독자적인 노드 내 통신방식을 사용하고있다.
--- 데이터 베이스의 기동이나 정지 등의 고나리 작업을 수행하는 경우
--- Stand-alone 환경
--- 단일 데이터베이스의 배치 처리

-- 원격 접속 : 데이터 베이스 서버가 아닌 별도 장비의 클라이언트 어플리케이션에서 네트워크를 통해 인스턴스에 액세스할때
---           클라이언트/서버 접속
--- oracle net 과 네트워크를 통해 통신함, 서버와 클라이언트 모두 oracle net을 설치, oracle net services 를 구성해야한다
--- 동일한 장비에서 접속한 것이 아니기때문에 ORACLE_SID 설정을 할 필요가 없다.

-- [11-3] 클라이언트/서버 아키텍처
-- 클라이언트/서버 아키텍처 : 클라이언트와 서버가 네트워크를 통해 통신하며 서비스를 제공하는 아키텍처

-- oracle net 을 지원하는 네트워크 프로토콜은 tcp/ip, ssl tcp/ip 가 있다.
-- 이말은 oracle net을 사용하기 위해 tcp/ip 구성이 되어있어야한다

-- [11-4] 프로그래밍 인터페이스
-- JDBC Thin 드라이버를 제외한 모든 프로그래밍 인터페이스 제품은 오라클 접속시 oracle Net을 사용한다.
--- ODBC : ODBC API를 지원하는윈도우 기반 프로그래밍 언어
--- OO4O(Oracle Objects for OLE) : OLE/COM 을 지원하는 윈도우 기반 프로그래밍 언어(비주얼베이직, C/C++)
--- ODP.NET(Oracle Data Provider for .NET) : .Net Framework 를 지원하는 .NET 기반 프로그래밍 언어(C#, VB.NET)
--- Pro*C/C++ : C/C++언어
--- OCI : C/C++ 언어
--- Oracle JDBC OCI Driver : 자바
--- Oracle JDBC Thin Driver : 자바

-- [11-5] Oracle Net Service 구성
-- 리스너를 이용해 클라이언트와 서버간 세션을 수립한다.
-- ttnsnames.ora 에 인스턴스에 관한 접속 정보를 기재

-- [11-6] 설정 파일
--- listenr.ora : 데이터베이스 서버 : 리스너의 구성 정보를 기재해 두는 설정파일
--- tnsnames.ora : 클라이언트 장비, 데이터베이스 장비 : 리스너와 오라클에 관련한 접속 정보를 기재해 두는 파일
--- sqlnet.ora : 데이터베이스 서버 클라이언트 장비 : Oracle net 에 관련된 각종 파라미터를 기재해 두는 설정파일

-- [11-7] 설정 파일을 읽어 오는 순서
-- 기본디렉토리 : <ORACLE_HOME>/network/admin
-- 우선순위 : 계정 수준의 설정파일 - 환경변수, 레지스트리 TNS_ADMIN의 디렉터리 - 시스템 수준 설정파일 - 기본설정파일

-- [11-8] listener.ora
-- 데이터베이스 서버상에서 동작하면 원격 접속을 접수받는 프로세스입니다.
-- 하나의 리스너는 여러 접속을 리스닝 할 수 있다. 여러 리스너에서 하나의 접속 요청을 리스닝 할 수 있다.

--- 리스너 구성정보
---- 리스너가 리스닝하기 위한 프로토콜 주소
---- 리스너가 접속을 중계할 인스턴스의 정보(선택사항)

--- 리스너 로그
---- 기본디렉터리 : <ORACLE_BASE>/diag/tnslsnr/<호스트명>/<리스너명>/trace/

-- [11-9] tnsnames.ora
-- 접속을 요청하는 측인 클라이언트 장비의 Oracle Net Services 의 구성에 관해 설명

--- 접속 기술자 및 원격 접속
---- 클라이언트에서 Oracle Net 을 이용해 원격 접속할때는, 리스너의 프로토콜 주소와 접속 할 인스턴스의 정보로 구성된 접속기술자(connection descriptor) 정보가 필요하다
---- 맨날 설정하는 것

-- [11-10] Local Naming Method와 tnsnames.ora
-- 일반적인 네트워크에서는 이름으로 주소를 가져오는 방식으로 관리 비용을 감소시킨다

-- [11-11] sqlnet.ora
-- 원격으로 접속 할 때 여러 가지 설정을 추가하는 옵션의 설정 파일.
-- 유닉스/리눅스에서는 다로 설정할 필요없고
-- 윈도우에서는 OS인증을 사용할때, 'SQLNET.AUTHENTICATION_SERVICES = NTS' 의 설정이 필요하다

--- 주요 파라미터
--- NAMES.DEFAULT_DOMAIN : 도메인명을 지정. 도메인명을 넷 서비스에 자동추가함.
--- NAMES. DIRECTORY_PATH : 클라이언트의 naming_method 의 순서를 지정. local이 순서가 가장 높다
--- SQLNET.AUTHENTICATION_SERVICES : 한 개 이상의 인증 서비스를 사용할 수 잇도록 한다.

-- [12-1] 동적 서비스 등록/공유 서버 구성/ 데이터베이스 링크
-- [12-2 ]정적 서비스 등록 : listener.ora에 미리 중계할 인스턴스의 정보를 기재해 두는 인스턴스 등록 방법
-- 별로 사용하지 않을거같은..설정

-- [12-3] 동적 서비스 등록
-- 리스너가 접속을 중계하는 인스턴스의 정보를 동적으로 관리하는 등록 방법
-- 등록해두면 listener.ora를 작성하는 내용이 많이 줄어든다. 인스턴스 기동상태를 인스턴스가 인식할 수 있다.

--- 예: LISTENER =(DESCRIPTION= ADDRESS=(PROTOCOL=tcp)(HOST=db01svr)(PORT=1522))
--- 우리가 사용하는 방법
--- 등록한 후 이 리스너 파일이 구동되지 않으면 인식되지 않기 때문에 수동으로 등록한다
ALTER SYSTEM REGISTER;

-- [12-4] 전용서버 구성
-- 클라이언트 어플리케이션에 전용 서버 프로세스를 기동해 1:1 통싱을 수행하는 구성, 요청이 없을땐 IDLE 상태가 된다.
-- 대량의 트랜젝션 처리하는 배치, 작업에 적합하다

-- [12-5] 공유 서버 구성
-- 한 개의 세션에서 발생하는 요청을 여러 프로세스가 처리하는 서버구성
-- 다른 공유 서버의 클라이언트에 의해 다른 클라이언트가 처리 될 수 있다.
-- 디스페처 프로세스와 프로세스 통신을 한다, 디스패처가 받아들인 후 적은 수로 사용되는 프로세스에 할당한다
-- 처리시간이 짧은 트랜젝션이 많은 시스템에 적합

-- [12-6] 공유 서버 구성과 관련된 초기화 파라미터
--- DISPATCHERS : 디스패처의 프로세스의 구성, 네트워크설정 및 기동할 프로세스 수
-- SHARED_SERVERS : 공유 서버 프로세스의 초기 기동 수
-- MAX_SHARED_SERVERS : 공유 서버 프로세스의 최대 수, 
-- SHARED_SERVER_SESSIONS : 공유 서버 구성의 세션 최대 수

-- [12-7] 서버 구성과 PGA
-- 메모리가 PGA가 아닌 SGA에 할당되고 라지풀이있다면 라지풀에, 라지풀이 없다면 공유풀에 할당

-- [12-8] 데이터베이스 링크와 Oracle Net Services
-- 데이터베이스 링크 : 여러 데이터베이스가 존재하는 분산 데이터베이스 환경에서 사용되는 데이터 통합을 위한 기능

-- [12-9] 데이터베이스 링크를 사용하지 않은 접속, DB LINK
-- 클라이언트 어플리에키션은 각각의 데이터베이스에 세션을 수립해야함.
-- 각기 다른 DB의 테이블 데이터를 조인하는 SQL 은 수행불가능하다

-- [12-10] DB LIN, 데이터베이스 링크를 사용한 접속
-- 클라이언트 어플리케이션은 데이터베이스 ORCL에 접속하는 것만으로도 데이터 베이스 PROD 데이터에 엑세스할 수 잇다.
-- 각 다른 DB의 테이블간 조인도 가능하다.
-- 데이터베이스 링크의 방향은 단방향
-- 로컬 데이터베이스 : 링크를 생성할 데이터베이스
-- 원격 데이터베이스 : 접속할 데이터베이스
-- 로컬 데이터베이스에서 데이터베이스링크를 정의하기때문에 원격 데이터베이스에서는 데이터베이스 링크를 정의 할 필요가없다.
-- Oracle Net을 통해 수행된다
-- <오브젝트명>@<데이터베이스 링크명>

-- [12-11] 데이터베이스 링크 확인, DBLINK 확인
-- 기본적인 CREATE DATABASE LINK 문
CREATE [PUBLIC] DATABASE LINK <데이터베이스 링크명>
[CONNECT TO <계정> IDENTIFIED BY <패스워드>]
USING <넷 서비스명>;
-- [PUBLIC] 을 지정하지않으면, 전용 데이터베이스 링크가 생성됨
--             지정하면 공용 데이터베이스 링크가 생성됨

-- [12-12] SQL실행
-- SELECT * FROM EMP@DB02;

-- [12-13] 데이터베이스 링크 확인
-- 데이터베이스 내에 존재하는 모든 데이터베이스 링크는 DBA_DB_LINKS 뷰에서 확인가능
-- 소유한 데이터베이스 링크는 USER_DB_LINKS
SELECT owner, db_link, username, host, created FROM DBA_DB_LINKS;

SELECT db_link, username, host, created FROM USER_DB_LINKS;


