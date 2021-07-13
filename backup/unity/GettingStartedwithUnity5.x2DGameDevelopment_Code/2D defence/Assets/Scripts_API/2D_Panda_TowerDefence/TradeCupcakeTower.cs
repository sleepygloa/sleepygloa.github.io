using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public abstract class TradeCupcakeTower : MonoBehaviour, IPointerClickHandler
{

    //슈머 미터를 저장할 변수
    protected static SugarMeterScript sugarMeter;

    //플레이어가 현재 선택되니 타워를 저장하는 변수
    protected static CupcakeTowerScript currentActiveTower;

    // Start is called before the first frame update
    void Start()
    {
        //슈거 미터에 대한 참조가 없으면 스크립트에서 이를 찾아 가져온다
        if(sugarMeter == null) {
            sugarMeter = FindObjectOfType<SugarMeterScript>();
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    //다른 스크립트가 현재 또는 새롭게 선택된 타워를 할당할 수 있도록 하는 static 함수
    public static void setActiveTower(CupcakeTowerScript cupcakeTower) {
        currentActiveTower = cupcakeTower;
    }

    //거래버튼을 누르면 트리거 되는 abstract 함수
    //하지만 구현은 거래 종류에 따라 다르다
    public abstract void OnPointerClick(PointerEventData eventData);
}
