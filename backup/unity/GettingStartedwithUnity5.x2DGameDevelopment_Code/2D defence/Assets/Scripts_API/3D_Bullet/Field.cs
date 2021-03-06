using UnityEngine;
using System.Collections;


/*
 *	자동 미로 생성 프로그램
 *	Maruchu
 */
public		class		Field				: MonoBehaviour {





public							GameObject	m_blockObject			= null;					//블록 프리팹

public							GameObject	m_player1Object			= null;					//플레이어1의 프리팹
public							GameObject	m_player2Object			= null;					//플레이어2의 프리팹




public		static readonly		int			FIELD_GRID_X			= 9;					//필드의 X 그리드 개수
public		static readonly		int			FIELD_GRID_Y			= 9;					//필드의 Y 그리드 개수

public		static readonly		float		BLOCK_SCALE				= 2.0f;					//블록의 스케일(블록 한 개 크기)
public		static readonly		Vector3		BLOCK_OFFSET			= new Vector3(1,1,1);	//블록 배치 오브젝트



//배치할 물체 종류
public	enum	ObjectKind {
	 Empty		//	0	공백
	,Block		//	1	블록
	,Player1	//	2	플레이어1
	,Player2	//	3	플레이어2
}

public		static readonly		int[]		GRID_OBJECT_DATA		= new int[] {			//배치 데이터
	//	0이 공란, 1이 블록
	1,	1,	1,	1,	1,	1,	1,	1,	1,
	1,	2,	0,	0,	0,	0,	0,	0,	1,
	1,	0,	1,	1,	1,	0,	1,	0,	1,
	1,	0,	0,	0,	0,	0,	0,	0,	1,
	1,	0,	1,	0,	1,	1,	1,	0,	1,
	1,	0,	1,	0,	1,	0,	0,	0,	1,
	1,	0,	1,	0,	0,	0,	1,	0,	1,
	1,	0,	0,	0,	1,	0,	0,	3,	1,
	1,	1,	1,	1,	1,	1,	1,	1,	1,

	//배치할 때 위아래가 뒤집히므로 주의해야 한다
};



private							GameObject	m_blockParent			= null;					//생성한 블록의 부모가 되는 오브젝트






/*
 *	시작 시에 호출되는 함수
 */
private		void	Awake() {

	//필드 초기화
	InitializeField();
}



/*
 *	필드 초기화
 *	배열 변수를 초기화해서 외벽과 기둥을 만든다
 */
private		void	InitializeField() {

	//블록의 부모를 만든다
	m_blockParent					= new GameObject();
	m_blockParent.name				= "BlockParent";
	m_blockParent.transform.parent	= transform;


	//블록을 만든다
	GameObject	originalObject;		//생성할 블록의 기준 오브젝트
	GameObject	instanceObject;		//블록을 일단 넣어두는 변수
	Vector3		position;			//블록 생성 위치


	//외곽과 안쪽에 기둥을 만들어간다
	int		gridX;
	int		gridY;
	for( gridX=0; gridX<FIELD_GRID_X; gridX++) {
		for( gridY=0; gridY<FIELD_GRID_Y; gridY++) {

			//이 위치에 무엇을 넣을지 결정한다
			switch( (ObjectKind)GRID_OBJECT_DATA[ gridX +(gridY *FIELD_GRID_X)]) {
			case ObjectKind.Block:
				//벽
				originalObject	= m_blockObject;
				break;
			case ObjectKind.Player1:
				//플레이어
				originalObject	= m_player1Object;
				break;
			case ObjectKind.Player2:
				//플레이어
				originalObject	= m_player2Object;
				break;
			default:
				//그 밖에는 모두 공백
				originalObject	= null;
				break;
			}

			//공백이라면 다음으로 넘어간다
			if( null==originalObject) {
				continue;
			}


			//블록 생성 위치
			position			= new Vector3( gridX *BLOCK_SCALE, 0, gridY *BLOCK_SCALE)		+BLOCK_OFFSET;				//유니티에서는 XZ 평면이 지평선이다

			//블록 생성                              복사할 대상         생성 위치        회전
			instanceObject		= Instantiate(		originalObject,		position,		originalObject.transform.rotation)		as GameObject;
			//이름 변경
			instanceObject.name	= ""+ originalObject.name +"("+ gridX +","+ gridY +")";		//그리드 위치를 써둔다

			//로컬 스케일(크기)를 변경한다
			instanceObject.transform.localScale	= (Vector3.one	*BLOCK_SCALE);				//Vector3.one は new Vector3( 1f, 1f, 1f)와 같다

			//instanceObject의 자식으로 넣는다
			instanceObject.transform.parent		= m_blockParent.transform;
		}
	}
}






}
