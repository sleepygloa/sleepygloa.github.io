using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraControl : MonoBehaviour {

    GameObject cameraParent;

    Vector3 defaultPosition; //초기 좌표 저장
    Quaternion defaultRotation; //초기 각도 저장
    float defaultZoom; //초기 줌 저장 

	// Use this for initialization
	void Start () {
        cameraParent = GameObject.Find("CameraParent");

        defaultPosition = Camera.main.transform.position;
        defaultRotation = cameraParent.transform.rotation;
        defaultZoom = Camera.main.fieldOfView;
    
    }
	
	// Update is called once per frame
	void Update () {
        //카메라 이동
        if(Input.GetMouseButton(0)){
            Camera.main.transform.Translate(Input.GetAxisRaw("Mouse X") / 10,
                                            Input.GetAxisRaw("Mouse Y") / 10, 0);
        }
        //카메라 회전
        if(Input.GetMouseButton(1)){
            Camera.main.transform.Rotate(Input.GetAxisRaw("Mouse Y") * 10,
                                  Input.GetAxisRaw("Mouse X") * 10, 0);
        }
        //줌 인, 줌 아웃
        Camera.main.fieldOfView += (20 * Input.GetAxis("Mouse ScrollWheel"));

        if(Camera.main.fieldOfView < 10){
            Camera.main.fieldOfView = 10;
        }

        //카메라 위치 초기화
        if(Input.GetMouseButton(2)){
            Camera.main.transform.position = defaultPosition;
            cameraParent.transform.rotation = defaultRotation;
            Camera.main.fieldOfView = defaultZoom;
        }
	}
}
