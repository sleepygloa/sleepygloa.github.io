using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlacingCupcakeTowerScript : MonoBehaviour
{

    //게임 매니저에 대한 참조ㅡㄹ 저장하는 private 변수
    private GameManagerScript gameManager;

    // Start is called before the first frame update
    void Start()
    {
        //게임 매니저에 대한 참조를 가져온다
        gameManager = FindObjectOfType<GameManagerScript>();
    }

    // Update is called once per frame
    void Update()
    {
        //마우스 위치를 가져온 
        float x = Input.mousePosition.x;
        float y = Input.mousePosition.y;

        /*
            마우스가 있는 곳에 있는 컵케이크 타워는 Main Camera 에서의 게임 좌표계로 변환해야한다
            카메라가 -10 에 있고 타워를 -3에 배치하고자 하므로 z축 좌표를 7로 설정해야 한다          
        */
        transform.position = Camera.main.ScreenToWorldPoint(new Vector3(x, y, 7));

        //플레이어가 클릭하면 현재 위치가 컵케이크 타워를 배치시킬 수 있는 영역안에 있는지 확인한다
        if(Input.GetMouseButtonDown(0) && gameManager.isPointerOnAllowedArea()) {
            //컵케이크 타워를 작동시키는 메인 컵케이크 타워 스크립트를 다시 활성화한다
            GetComponent<CupcakeTowerScript>().enabled = true;

            //컵케이크 타워에 콜라이더를 배치한다
            gameObject.AddComponent<BoxCollider2D>();

            //이 스크립트를 제거해 컵케이크 타워가 더는 마우스를 따라다니지 않도록 한다
            Destroy(this);
        }

    }
}
