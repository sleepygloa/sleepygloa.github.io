using UnityEngine;
using System.Collections;




/*
 *	플레이어 클래스(AI가 조작함)
 */
public	class	Player_AI	: Player_Base {

    // 검사 방향
    private	enum	CheckDir {
    	// ［←］ ［↑］ ［→］ ［↓］키 순서
    	 Left		// 왼쪽
    	,Up			// 위
    	,Right		// 오른쪽
    	,Down		// 아래
    	,EnumMax	// 키 종류 개수
    }
    // チェック情報
    private	enum	CheckData {
    	 X			// X축
    	,Y			// Y축
    	,EnumMax	// 축 개수
    }





    // 검사 방향
    private		static readonly		int[][]		CHECK_DIR_LIST			= new int[ (int)CheckDir.EnumMax][] {
    	// 										 X		 Y
    	 new int[ (int)CheckData.EnumMax] {		-1,		 0		}
    	,new int[ (int)CheckData.EnumMax] {		 0,		 1		}
    	,new int[ (int)CheckData.EnumMax] {		 1,		 0		}
    	,new int[ (int)CheckData.EnumMax] {		 0,		-1		}
    };

    private		static	readonly	int			AI_PRIO_MIN				= 99;						// AI 우선순위 중 가장 낮은 값



    private		static	readonly	float		AI_INTERVAL_MIN			= 0.5f;						// AI 사고 간격 가장 짧은 값
    private		static	readonly	float		AI_INTERVAL_MAX			= 0.8f;						// AI 사고 간격 가장 긴 값

    private		static	readonly	float		AI_IGNORE_DISTANCE		= 2.0f;						// 이 이상 플레이어에게 다가가지 않는다

    private		static	readonly	float		SHOOT_INTERVAL			= 1.0f;						// 사격 간격



    private							float		m_aiInterval			= 0f;						// AI 사고를 갱신할 때까지의 시간
    private							float		m_shootInterval			= 0f;						// 사격 간격


    private							PlayerInput	m_pressInput			= PlayerInput.Move_Left;	// AI의 입력 종류


    /*
     *	입력 처리 검사
     */
    protected	override	void	GetInput() {

        // 사용자가 조종하는 플레이어 오브젝트를 얻는다
    	GameObject	mainObject		= Player_Key.m_mainPlayer;
    	if( null==mainObject) {
    		// 플레이어가 없으면 사고를 중단
    		return;
    	}

    	// AI의 사고를 갱신할 때까지의 시간
    	m_aiInterval	-= Time.deltaTime;

    	// 사격하는 사고를 갱신할 때까지의 시간
    	m_shootInterval	-= Time.deltaTime;


        // 플레이어와 자신의 거리를 계산한
        Vector3		aiSubPosition	= (transform.position	-mainObject.transform.position);
    	aiSubPosition.y		= 0f;


    	// 거리가 생기면 움직인다
    	if( aiSubPosition.magnitude > AI_IGNORE_DISTANCE) {

    		// 일정 시간마다 AI를 갱신한다
    		if( m_aiInterval < 0f) {

    			// 다음 사고까지 기다릴 시간. 무작위로 결정.
    			m_aiInterval		= Random.Range( AI_INTERVAL_MIN, AI_INTERVAL_MAX);


                // 현재 AI 위치에서 상하좌우의 우선순위를 얻는다
    			int[]	prioTable	= GetMovePrioTable();

                // 가장 우선순위가 높은 장소의 숫자를 가져온다
    			int		highest		= AI_PRIO_MIN;
    			int		i;
    			for( i=0; i<(int)CheckDir.EnumMax; i++) {
    				// 값이 작을수록 우선순위가 높다
    				if( highest > prioTable[ i]) {
    					// 우선순위 갱신
    					highest		= prioTable[ i];
    				}
    			}

    			// 어느 방향의 우선순위가 높은지 결정한다
    			PlayerInput	pressInput	= PlayerInput.Move_Left;
    			if( highest==prioTable[ (int)CheckDir.Left]) {
    				// 왼쪽으로 이동
    				pressInput	= PlayerInput.Move_Left;
    			} else
    			if( highest==prioTable[ (int)CheckDir.Right]) {
    				// 오른쪽으로 이동
    				pressInput	= PlayerInput.Move_Right;
    			} else
    			if( highest==prioTable[ (int)CheckDir.Up]) {
    				// 위로 이동
    				pressInput	= PlayerInput.Move_Up;
    			} else
    			if( highest==prioTable[ (int)CheckDir.Down]) {
    				// 아래로 이동
    				pressInput	= PlayerInput.Move_Down;
    			}
    			m_pressInput	= pressInput;
    		}

    		// 입력
    		m_playerInput[ (int)m_pressInput]	= true;
    	}


    	// 사격 사고를 실시할지 판단한다
    	if( m_shootInterval < 0f) {

    		// X 혹은  Z 방향의 거리가 가까울 경우 직선상에 있다고 판단하면 사격한다
    		if( (Mathf.Abs( aiSubPosition.x) < 1f) || (Mathf.Abs( aiSubPosition.z) < 1f)) {
    			// 사격
    			m_playerInput[ (int)PlayerInput.Shoot]	= true;

    			// 다음 사격은 이 시간만큼 경과할 때까지 기다린다(연사 억제 기능)
    			m_shootInterval	= SHOOT_INTERVAL;
    		}
    	}
    }

    /*
     *	위치에서 그리드로 변환한다 (그리드 X)
     */
    private		int		GetGridX( float posX) {
    	// 그리드 범위 내에 들어오도록 Mathf.Clamp로 제한한다
    	return	Mathf.Clamp((int)((posX) /Field.BLOCK_SCALE),0,(Field.FIELD_GRID_X -1));
    }
    /*
     *	위치에서 그리드로 변환한다 (그리드 Y)
     */
    private		int		GetGridY( float posZ) {
    	// 유니티에서는 XZ 평면이 지평선이다
    	return	Mathf.Clamp((int)((posZ) /Field.BLOCK_SCALE),0,(Field.FIELD_GRID_Y -1));
    }



    /*
     *	AI가 이동할 때의 우선순위 가져오기
     */
    private		int[]	GetMovePrioTable() {

    	int	i, j;

    	// 자신(AI)의 위치
    	Vector3		aiPosition	= transform.position;
    	// 그리드로 변환
    	int			aiX			= GetGridX( aiPosition.x);
    	int			aiY			= GetGridY( aiPosition.z);

    	// 사용자가 조종하고 있는 플레이어 오브젝트를 얻어온다
    	GameObject	mainObject		= Player_Key.m_mainPlayer;
    	// 공격 목표 위치를 얻어온다
    	Vector3		playerPosition	= mainObject.transform.position;
    	// 그리드로 변환
    	int			playerX			= GetGridX( playerPosition.x);
    	int			playerY			= GetGridY( playerPosition.z);
    	int			playerGrid		= playerX	+(playerY *Field.FIELD_GRID_X);


    	// 그리드의 각 위치의 우선순위를 저장하는 배열
    	int[]		calcGrid		= new int[ (Field.FIELD_GRID_X *Field.FIELD_GRID_Y)];
    	// 초기화
    	for( i=0; i<(Field.FIELD_GRID_X *Field.FIELD_GRID_Y); i++) {
    		// 우선순위를 가장 낮게 설정한다
    		calcGrid[ i]	= AI_PRIO_MIN;
    	}



    	// 현재 플레이어가 있는 위치에 일단 1을 넣는다
    	calcGrid[ playerGrid]	= 1;


    	// 우선순위 검사는 일단 1부터 시작하도록 설정한다
    	int			checkPrio		= 1;
    	// 검사용 변수
    	int			checkX;
    	int			checkY;
    	int			tempX;
    	int			tempY;
    	int			tempGrid;
    	// 무언가를 검사할 때에는 true
    	bool		update;
    	do {
    		// 초기화
    		update	= false;

    		// 검사 시작
    		for( i=0; i<(Field.FIELD_GRID_X *Field.FIELD_GRID_Y); i++) {
    			// 검사할 우선순위가 아니면 무시한다
    			if( checkPrio!=calcGrid[ i]) {
    				continue;
    			}

    			// 이 그리드가 검사 우선순위를 나타낸다
    			checkX	= (i %Field.FIELD_GRID_X);
    			checkY	= (i /Field.FIELD_GRID_X);

    			// 상하좌우를 검사
    			for( j=0; j<(int)CheckDir.EnumMax; j++) {
    				// 조사할 곳에 인접한 곳
    				tempX	= (checkX +CHECK_DIR_LIST[ j][ (int)CheckData.X]);
    				tempY	= (checkY +CHECK_DIR_LIST[ j][ (int)CheckData.Y]);
    				// 그리드 밖인지 확인한다
    				if( (tempX < 0) || (tempX >= Field.FIELD_GRID_X) || (tempY < 0) || (tempY >= Field.FIELD_GRID_Y)) {
    					// 영역 밖이므로 무시한다
    					continue;
    				}
    				// 이곳을 조사한다
    				tempGrid	= (tempX +(tempY *Field.FIELD_GRID_X));

    				// 인접한 벽인지 검사한다
    				if( Field.ObjectKind.Block==(Field.ObjectKind)Field.GRID_OBJECT_DATA[ tempGrid]) {
    					// 벽이라면 무시한다
    					continue;
    				}

    				// 이 곳의 우선순위 숫자가 현재 검사하고 있는 우선순위보다 높으면 갱신한다
    				if( calcGrid[ tempGrid] > (checkPrio +1)) {
    					// 값을 갱신한다
    					calcGrid[ tempGrid] = (checkPrio +1);	// 이 숫자가 다음 검사에서의 우선순위이다
    					// 플래그를 true로 지정한다
    					update	= true;
    				}
    			}
    		}

    		// 검사할 우선순위에 1을 더한다
    		checkPrio++;

    		// 갱신되었다면 루프를 다시 한 번 돈다
    	} while( update);



    	// AI 주변의 우선순위 테이블
    	int[]		prioTable		= new int[ (int)CheckDir.EnumMax];

        // 우선순위 테이블을 작성했으면 AI 주변 우선순위를 가져온다
    	for( i=0; i<(int)CheckDir.EnumMax; i++) {

    		// 조사할 장소에 인접한 곳
    		tempX	= (aiX +CHECK_DIR_LIST[ i][ (int)CheckData.X]);
    		tempY	= (aiY +CHECK_DIR_LIST[ i][ (int)CheckData.Y]);
    		// 그리드 밖인지 검사한다
    		if( (tempX < 0) || (tempX >= Field.FIELD_GRID_X) || (tempY < 0) || (tempY >= Field.FIELD_GRID_Y)) {
    			// 영역 밖이므로 우선순위를 가장 낮을 값으로 설정한다
    			prioTable[ i]	= AI_PRIO_MIN;
    			continue;
    		}

    		// 이 곳의 우선순위를 대입한다
    		tempGrid	= (tempX +(tempY *Field.FIELD_GRID_X));
    		prioTable[ i]	= calcGrid[ tempGrid];
    	}


    	// 우선순위 테이블을 로그로 출력한다
    	{
    		// 디버그용 문자열
    		string	temp	= "";

            // 우선순위 테이블을 작성했으면 AI 주변의 우선순위를 가져온다
    		temp	+= "PRIO TABLE\n";
    		for( tempY=0; tempY<Field.FIELD_GRID_Y; tempY++) {
    			for( tempX=0; tempX<Field.FIELD_GRID_X; tempX++) {

    				// Y축은 위아래가 거꾸로 출력되므로 미리 뒤집어 놓는다
    				temp	+= "\t\t"+ calcGrid[ tempX +((Field.FIELD_GRID_Y -1 -tempY) *Field.FIELD_GRID_X)] +"";

    				// 자신의 위치
    				if( (aiX==tempX) && (aiY==(Field.FIELD_GRID_Y -1 -tempY))) {
    					temp	+= "*";
    				}
    			}
    			temp	+= "\n";
    		}
    		temp	+= "\n";

    		// 이동 방향별 우선순위 정보
    		temp	+= "RESULT\n";
    		for( i=0; i<(int)CheckDir.EnumMax; i++) {
    			// 이곳의 우선순위를 대입한다
    			temp	+= "\t"+ prioTable[ i] +"\t"+ (CheckDir)i +"\n";
    		}

    		// 출력
    		Debug.Log( ""+ temp);
    	}


    	// 네 방향의 우선순위를 반환한다
    	return	prioTable;
    }

}
