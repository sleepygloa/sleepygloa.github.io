using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Touch : MonoBehaviour {

    public AudioClip voice_01;
    public AudioClip voice_02;


	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {

        Ray ray;
        RaycastHit hit;

        if(Input.GetMouseButtonDown(0)){

            //마우스 커서 위체엇 카메라 화면 안쪽을 향해 레이를 쏜다
            ray = Camera.main.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(ray, out hit, 100)){
                Debug.Log("hit");
            }
        }

	}
}
