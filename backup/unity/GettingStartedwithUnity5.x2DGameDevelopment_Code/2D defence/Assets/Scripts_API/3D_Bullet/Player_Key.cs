using UnityEngine;
using System.Collections;




/*
 *	플레이어 클래스(키 입력으로 조종)
 *	Maruchu
 */
public		class		Player_Key				: Player_Base {




public		static	GameObject	m_mainPlayer			= null;					// 사용자가 조종하고 있는 플레이어(AI용)


/*
 *	초기화로 자기 자신의 오브젝트를 기억한다
 */
private		void		Awake() {
	m_mainPlayer	= gameObject;
}


public				KeyCode		KEYCODE_MOVE_LEFT		= KeyCode.A;		// 키 코드(왼쪽)
public				KeyCode		KEYCODE_MOVE_UP			= KeyCode.W;		// 키 코드(위쪽)
public				KeyCode		KEYCODE_MOVE_RIGHT		= KeyCode.D;		// 키 코드(오른쪽)
public				KeyCode		KEYCODE_MOVE_DOWN		= KeyCode.S;		// 키 코드(아래쪽)

public				KeyCode		KEYCODE_SHOOT			= KeyCode.Space;	// 키 코드(사격)




/*
 *	입력 처리 검사
 */
protected	override	void	GetInput() {

	// 좌우 이동
	if( Input.GetKey( KEYCODE_MOVE_LEFT)) {
		m_playerInput[ (int)PlayerInput.Move_Left]	= true;
	} else
	if( Input.GetKey( KEYCODE_MOVE_RIGHT)) {
		m_playerInput[ (int)PlayerInput.Move_Right]	= true;
	}

	// 상하 이동
	if( Input.GetKey( KEYCODE_MOVE_UP)) {
		m_playerInput[ (int)PlayerInput.Move_Up]	= true;
	} else
	if( Input.GetKey( KEYCODE_MOVE_DOWN)) {
		m_playerInput[ (int)PlayerInput.Move_Down]	= true;
	}

	// 사격
	if( Input.GetKeyDown( KEYCODE_SHOOT)) {
        // 이 키는 누른 순간에만 유효하므로 GetKeyDown를 사용한다
		m_playerInput[ (int)PlayerInput.Shoot]	= true;
	}
}




}
