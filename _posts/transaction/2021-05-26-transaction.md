---
title:  Transaction?
categories: 
  - transaction
tags:
  - transaction
toc: true
---

# Transaction

정처리 기사에도 나오고, 업무를 하다보면 정말 중요한 트랜잭션 개념이다.

## Transaction 기본
### 성질
- 원자성 : 한 트랜잭션 내에서 실행한 작업은 하나로 간주한다. 즉 모두 성공 혹은 모두 실패다.
- 일관성 : 트랜잭션은 데이터 인터그리티 만족 등 일관성있는 데이터베이스 상태를 유지한다.
- 격리성 : 동시에 실행되는 트랜잭션들이 서로 영향을 미치지 않게 격리한다.
- 지속성 : 트랜잭션이 성공적으로 실행되면 결과는 항상 저장된다. 


## Transaction 사용 
1. 선언적 트랜잭션 관리 : ```@Transactional``` 을 선언하여 사용.
2. JDBC : JDBC와 Mybatis 를 사용 할 때, ```DataSourceTransactionManager```를 등록하고, 전달받은 ```DataSource```의 connection으로 커밋, 롤백 등 수행.
3. JPA : ```JpaTransactionManager``` 을 Bean 으로 등록하여 사용.
4. JTA : ```분산 트랜젝션```, 여러 DB 에 접근할 때, ```JtaTransactionManager``` 을 등록하여 사용. Bean 으로 등록 시 ```transactionmanagerName``` 프로퍼티를 이용해서 JNDI 이름을 설정한다.
5. 여러 DataSource 를 이용한 개별 트랜잭션 관리
6. Lazy Connection : 쿼리 호출 시점에 DB 소스만 연결, Lazy 한 것들은 Lazy Bean ID 로 관리하고, 나머지는 일반적인 Bean ID 로 관리, 따로 관리한다.

### 선언적 트랜젝션
대부분 프레임워크 단에서 트랜잭션 범위가 지정되어있을텐데, 내부로직에서 개별로 트랜잭션처리하기 위해 선언하여 사용한다.
#### 속성
- ```REQUIRED``` : 이미 시작된 트랜잭션(부모 트랜잭션)이 있으면 참여하고 없으면 새로 시작한다. (디폴트)
- ```SUPPORTS``` : 이미 시작된 트랜잭션이 있으면 참여하고 없으면 트랜잭션 없이 진행한다.
- ```REQUIRED_NEW``` : 부모 트랜잭션을 무시하고 항상 새로운 트랜잭션을 시작한다.
- ```NESTED``` : 메인 트랜잭션 내부에 중첩된 트랜잭션을 시작한다. 부모 트랜잭션 결과에는 영향을 받지만, 자신의 트랜잭션 결과는 부모에게 영향을 미치지 않는다. 동일한 서비스 등의 트랜잭션을 중첩되어 발생하지만, 에러시 자신의 것만 롤백하고, 예외처리 로직이 필요하다.
- ```NOT_SUPPORTED``` : 트랜잭션을 사용하지 않게 한다. 이미 진행 중인 트랜잭션이 있으면 보류시킨다.
- ```MANDATORY``` : REQUIRED와 비슷하게 이미 시작된 트랜잭션이 있으면 참여하지만, 트랜잭션이 시작된 것이 없으면 예외를 발생시킨다. (혼자서 독립적으로 트랜잭션을 진행하면 안되는 경우에 사용)
- ```NEVER``` : 트랜잭션을 사용하지 않게 하며 이미 시작된 트랜잭션이 있으면 예외를 발생시킨다.

#### isolation 속성
- ```DEFAULT``` : 기본 설정, 기본 격리 수준
- ```SERIALIZABLE``` : 가장 높은 격리, 성능 저하 가능성 있음
- ```READ_UNCOMMITED``` : 커밋되지 않은 데이터 읽을 수 있음
- ```READ_COMMITED``` : 커밋된 데이터에 대해 읽기 허용
- ```REPEATABLE_READ``` : 동일 필드에 대한 다중 접근 시 동일 결과 보장

#### 사용방법
1. Anotation : 
```
@Transactional(propagation=Propagation.NESTED, rollbackFor=Exception.class)
```
2. XML : 

```
<tx:method name="insert*" propagation="NESTED" rollback-for="Exception" />
```

### JDBC, 여러 DataSource 작성 개별트랜잭션 처리.
스프링환경에서 JDBC 를 이용한 트랜젝션 처리.
주로 사용하는 세팅으로는
1. ```global.properties``` : ```.ignore``` 항목. 연결정보는 여기 저장

```
Globals.DriverClass.oracle = oracle.jdbc.driver.OracleDriver

DB.UserName = UserName
DB.Password = Password
DB.Url = jdbc:sqlserver://Url:Port;DatabaseName=DBName
```
1. ```Context-Datasource.xml``` : DB 연결정보

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
        http://www.springframework.org/schema/jdbc  http://www.springframework.org/schema/jdbc/spring-jdbc-4.0.xsd">

	<!-- 환경설정 기본정보를 globals.properties 에서 참조하도록 propertyConfigurer 설정 -->
	<bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
		<property name="locations">
			<list>
				<value>classpath:/properties/globals.properties</value>
			</list>
		</property>
	</bean>    


	
   <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="${DB.driverClassName}"/>
        <property name="url" value="${DB.url}" />
        <property name="username" value="${DB.UserName}"/>
        <property name="password" value="${DB.Password}"/>
		<property name="maxActive" value="100"/>
		<property name="minIdle" value="10"/>
        <property name="maxWait" value="1200000"/>
        <property name="validationQuery" value="select 1"/>
        <property name="testWhileIdle" value="true"/>
        <property name="timeBetweenEvictionRunsMillis" value="60000"/>
    </bean>


	<bean id="dataSource_log4j" class="net.sf.log4jdbc.Log4jdbcProxyDataSource">
		<constructor-arg ref="dataSource" />
		<property name="logFormatter">
			<bean class="net.sf.log4jdbc.tools.Log4JdbcCustomFormatter">
				<property name="loggingType" value="MULTI_LINE" />
				<property name="sqlPrefix" value="SQL         : " />
			</bean>
		</property>
	</bean>
</beans>
```

2. Context-transaction.xml :  트랜잭션 매니저, AOP 설정을 해준다.


```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
    	http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.0.xsd
    	http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.0.xsd">

	<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource" ref="dataSource"/>
	</bean>

	<tx:advice id="txAdvice" transaction-manager="txManager">
		<tx:attributes>
			<tx:method name="*" propagation="REQUIRED" isolation="READ_COMMITTED" rollback-for="Exception"/>	
			<tx:method name="select*" propagation="NOT_SUPPORTED" />
		</tx:attributes>
	</tx:advice>

	<aop:config>
		<aop:pointcut id="requiredTx" expression="execution(* com..service.*Service.*(..))"/>
		<aop:advisor advice-ref="txAdvice" pointcut-ref="requiredTx" />
	</aop:config>
	
</beans>
```

DB 접속정보를 ```DataSourcre``` 에 작성하고, ```TransactionManager``` 에 넣어준다.
그리고 ```txAdvice``` 부분에서 어느 부분에 공통적으로 적용할지 정한다.




### JPA 트랜잭션
```
	<!-- Hybernate JPA NLMS DB ===================================================================== -->
	<bean id="dataSource_jpa" class="org.springframework.jdbc.datasource.SimpleDriverDataSource">
		<property name="driverClass" value="${Globals.DriverClass.mssql}" />
		<property name="url" value="${Url}" />
		<property name="username" value="${UserName}" />
		<property name="password" value="${Password}" />
	</bean>	
	<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
      <property name="dataSource" ref="dataSource_jpa" />
      <!-- This makes /META-INF/persistence.xml is no longer necessary -->
      <property name="packagesToScan" value="nlms.domain" />
      <!-- JpaVendorAdapter implementation for Hibernate EntityManager.
           Exposes Hibernate's persistence provider and EntityManager extension interface -->
      <property name="jpaVendorAdapter">
         <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter" />
      </property>
      <property name="jpaProperties">
         <props>
         	<prop key="hibernate.dialect">org.hibernate.dialect.Oracle10gDialect</prop>
            <!-- prop key="hibernate.hbm2ddl.auto">validate</prop>
			<prop key="hibernate.format_sql">true</prop>
			<prop key="hibernate.use_sql_comments">true</prop>
			<prop key="hibernate.jdbc.batch_size">5</prop>
            <prop key="hibernate.temp.use_jdbc_metadata_defaults">false</prop-->
         </props>
      </property>
   </bean>
```


### 분산 트랜잭션 처리

분산 트랜잭션처리는 다른 여러 DB를 연결하여 사용할 때, 한 프로세스내에서 발생하는 여러 DB의 트랜잭션 처리에 대해 생각 해 볼 수 있다.

간단히 DataSource 를 선언하여 작성하면 그것만으로도 가능하지만, 그렇게 되면 Main 이 되는 DataSource 만 롤백이 되는 경우가 발생하는거 같다.

그래서 그렇게 처리할 것인지. 그것들의 서비스를 묶어 예외 처리를 할 것인지. FrameWork 단에서 ```JTATransactionManager``` 라는 것을 사용하여 하나의 트랜잭션처리로 할 것인지 생각해야한다.
마지막 방법을 찾다 블로그를 작성하게 되었지만, 현재 회사에서는 제가 공통쪽을 건들면, 별로 좋지않은 일이 생길거 같기 때문에, 건들지는 않고 알아보기만 하였다.

#### 서버(톰캣)에서 통합(글로벌) 트랜잭션관리
스프링 을 쓴다면, 
```
<jee:jndi-lookup id="dbDataSource" jndi-name="jdbc/DatabaseName" expected-type="javax.sql.DataSource" />
```
위 한문장으로 ```DataSource```정보를 모아준다고한다.


```JtaTransactionManager``` 를 선언해주자.

 ```
<bean id="txManager" class="org.springframework.transaction.jta.JtaTransactionManager" />
```

이렇게 작성하고 tomcat 을 사용한다는 전제로 tomcat 파일을 수정해야한다.
트랜잭션을 서버에서 관리하기 때문이다. 톰캣 안네 ```jdbc/DatabaseName``` 을 선언해주어야한다.

```tomcat``` - ```context.xml```

```
<Resource name="jdbc/DatabaseName" auth="Container" type="javax.sql.DataSouurce" factory="org.apache.tomcat.dbcp.dbcp2.BasicDataSourceFactory" driverClassName="oracle.jdbc.OracleDriver" url="jdbc:oracle:thin:@//url:port/dbname" username="username" password="pw" maxActive="100" maxIdle="30" maxWait="100009" removeAbandoned="true" removeAbandoneTimeout="60" />
```

```tomcat``` - ```web.xml```

```
<resource-ref>
 <description>DB Connection</description>
  <res-ref-name>jdbc/DatabaseName</res-ref-name>
  <ref-type>javax.sql.DataSource</ref-type>
  <res-auth>Container</res-auth>
</resource-ref>
```

#### 독립형 JTA TransactionManager
JTA TransactionManager 만을 이용한 글로벌 트랜잭션 처리
서버의 기능을 사용하지 않고, JTA 만의 기능으로 글로벌 트랜잭션 처리를 할 수 있다.
관련한 대표적인 라이브러리는 ```JTOM```, ```Atomiko``` 이다.

1. Atomiko
Atomiko Bean 등록
```
<bean id="atomikosTransactionManager"
    class="com.atomikos.icatch.jta.UserTransactionManager"
    init-method="init" destroy-method="close">
    <property name="forceShutdown">
        <value>true</value>
    </property>   
</bean>
 
<bean id="atomikosUserTransaction"
    class="com.atomikos.icatch.jta.UserTransactionImp">
    <property name="transactionTimeout">
        <value>300</value>
    </property>   
</bean>
```
트랜잭션 매니저 선언
```
<bean id="transactionManager"
    class="org.springframework.transaction.jta.JtaTransactionManager">
    <property name="transactionManager" ref="atomikosTransactionManager"/>
    <property name="userTransaction" ref="atomikosUserTransaction"/>  
</bean>
```

다음은 XA를 지원하는 DataSource를 빈으로 등록할 차례다. 글로벌/분산 트랜잭션을 사용하는 만큼 여러 개의 DB를 사용하도록 하나 이상의 DataSource를 등록한다. DataSource는 JTA 트랜잭션 매니저와 XA 프로토콜을 통한 트랜잭션이 동작하도록 만들어야 한다. 따라서 일반 DataSource 대신 XA를 지원하는 XA DataSource를 사용해야 한다. Atomikos 는 XA 지원 드라이브를 사용할 수도 있고, XA를 지원하지 않는 드라이버를 Atomikos의 도움을 통해 XA 드라이버처럼 사용하게 만들 수도 있다. 여기서는 MySQL이 제공하는 XA DataSource인 MysqlXADataSource를 사용해보겠다.

먼저 다음과 같이 첫 번째 DB를 위한 DataSource를 등록해보자. JTA에서 사용할 DataSource에는 고유한 리소스 이름을 지정해 줘야 한다.
```
<bean id="dataSource1" class="com.atomikos.jdbc.AtomikosDataSourceBean"
    init-method="init" destroy-method="close">
    <property name="uniqueResourceName" value="MySQLXA1"/>
    <property name="xaDataSourceClassName" value="com.mysql.jdbc.jdbc2.optional.MysqlXADataSource"/>
    <property name="xaProperties">
        <props>
            <prop key="user">jtauser</prop>
            <prop key="password">jtapassword</prop>
            <prop key="url">jdbc:mysql://localhost/tx1</prop>
        </props>
    </property>   
    <property name="poolSize" value="1"/>
</bean>
<bean id="dataSource2" class="com.atomikos.jdbc.AtomikosDataSourceBean"
    init-method="init" destroy-method="close">
    <property name="uniqueResourceName" value="MySQLXA2"/>
    <property name="xaDataSourceClassName" value="com.mysql.jdbc.jdbc2.optional.MysqlXADataSource"/>
    <property name="xaProperties">
        <props>
            <prop key="user">jtauser</prop>
            <prop key="password">jtapassword</prop>
            <prop key="url">jdbc:mysql://localhost/tx1</prop>
        </props>
    </property>   
    <property name="poolSize" value="1"/>
</bean>
 
<bean id="dataSource3" class="com.atomikos.jdbc.AtomikosDataSourceBean"
    init-method="init" destroy-method="close">
    <property name="uniqueResourceName" value="MySQLXA3"/>
    <property name="xaDataSourceClassName" value="com.mysql.jdbc.jdbc2.optional.MysqlXADataSource"/>
    <property name="xaProperties">
        <props>
            <prop key="user">jtauser</prop>
            <prop key="password">jtapassword</prop>
            <prop key="url">jdbc:mysql://localhost/tx1</prop>
        </props>
    </property>   
    <property name="poolSize" value="1"/>
</bean>
```

### 그외 개념

#### JTA와 XA
JTA?
Java Transaction API의 약자. 각 플랫폼별 트랜잭션 매니저의 인터페이스를 정의한 것. 당연히 여러 구현체들을 가지고 있다. 일반적으로는 웹서버에 딸려있는걸 쓰거나 별도로 서버를 구축해서 쓰는데, 내 경우에는 그정도 규모까진 아직 필요가 없어서 embedded JTA로 찾아보게 되었다. 그에 따라 선택한 것이 atomikos 이다. 우선 오픈소스이고, 개발 기간도 비교적 오래되었으며, 스프링 문서에서도 언급되고 있는 부분이 마음에 들었다.

XA?
eXtended Architecture의 약자. 하나의 같은 global 트랜잭션에서 다른 여러 데이터 저장소들에 접근하기 위한 표준이다. XA는 트랜잭션 매니저의 여러가지 기능을 제어한다. 하나는 우선 트랜잭션의 일부로 어떤 작업이 진행되고 있는지 데이터베이스에게 알리는 기능이고, 다른 것은 각 트랜잭션이 종료될 때 2PC (2-phase commit) 프로토콜을 수행하는 기능이다. 또한 데이터 저장소에서 보류 중인 트랜잭션을 복구하는 기능도 제공한다.

XA는 여러 데이터 저장소에서 호환되는 표준이므로 여러 트랜잭션 매니저들이 global 트랜잭션의 일부로써 동작할 수 있게 해준다. 다르게 말해보면 XA는 서로 다른 트랜잭션 매니저들 사이에서 일종의 풀처럼 동작하는데, 이 풀은 2PC 프로토콜을 사용해서 서로서로를 붙이게 된다.

#### 라우팅 트랜잭션?


### 참고사이트
- 참고
트랜젝션 이란? : https://sarc.io/index.php/java/1965-transaction
스프링 트랜젝션** : http://ldg.pe.kr/framework_reference/spring/ver1.2.2/html/transaction.html
스프링 : https://springsource.tistory.com/127

jee : https://pythonq.com/so/java/20505
jee : https://mkil.tistory.com/425

전정부 분산 : https://m.blog.naver.com/PostView.naver?blogId=im7015&logNo=120206965477&proxyReferer=https:%2F%2Fwww.google.com%2F
분산처리 : https://github.com/naver/jta-sample
분산 : https://meaownworld.tistory.com/90
jta : https://title-developer.tistory.com/53
라우팅 트랜젝션 : https://d2.naver.com/helloworld/5812258
분산 : https://skasha.tistory.com/30

분산 : https://leeyongjin.tistory.com/entry/JTA%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B8%80%EB%A1%9C%EB%B2%8C%EB%B6%84%EC%82%B0-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98


https://12bme.tistory.com/386