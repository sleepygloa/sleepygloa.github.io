






function moveCam(eye_x, eye_y, eye_z, target_x, target_y, target_z)
{
	//동중이던 자동화 기능들을 모두 지우는 기능
	createjs.Tween.removeAllTweens();
	//카메라를 부드럽게 이동하는 명령
	createjs.Tween.get(camera.position)
		.to({
			x: eye_x, 
			y: eye_y, 
			z: eye_z
		}, 900, 
		createjs.Ease.sineInOut);

	createjs.Tween.get(controls.target)
		.to({
			x: target_x, 
			y: target_y, 
			z: target_z
		}, 900, 
		createjs.Ease.sineInOut);

	animate();
}

function aroundCam()
{
	createjs.Tween.removeAllTweens();

/*
	createjs.Tween.get(controls.target)
		.to({
			x: 0, 
			y: 0, 
			z: 0
		}, 900, 
		createjs.Ease.sineInOut);
			*/

//createjs.Ease.sineInOut
//createjs.Ease.quartIn
//createjs.Ease.bounceOut
//createjs.Ease.cubicIn
//createjs.Ease.elasticIn
//createjs.Ease.backOut
//createjs.Ease.bounceInOut
//createjs.Ease.elasticIn

	/**
	 * get(target, [props], [pluginData], [override=false]) : tween 인스턴스 리턴
	 * target : 타켓 오브젝트
	 * props : ex {loop : true, paused: true}
	 * loop : 루프 속성을 설정합니다
	 * useTricks : 밀리 초 대신 모든 기간에 대해 틱을 사용한다
	 * ignoreGlobalPause : 틱 멈춤 시 계속 동작 여부
	 * override : true -> createjs.Tween.removeAllTweens(); 이 호출되 타켓 트윈이 삭제
	 * position : 초기 위치를 나타냄
	 * onChange : Change 이벤트에 대한 리스너를 지정
	 * wait(duration, [passive]) : 대기
	 * duration : 시간, 1000 = 1초
	 * topros, [duration=0], [ease="linear"]) : 이동
	 * props : {scalseX, scaleY, x, y alpha, rotation, width, height, top, left}
	 * duration : 시간
	 * ease : 동작방식
	 * casle(callback, [params], [scope]) : 함수 호출
	 * callback : 호출할 함수
	 * params : 함수 파라미터
	 * scope
	 * set(props, [target]) : 설정 바꾸기
	 * props : {visible : false}
	 * target : tween 타켓
	* */




	createjs.Tween.get(camera.position, {loop: true})
		.to({
			x: 10, y: 10, z: 10
		}, 5000, 
		createjs.Ease.sineInOut)
		.wait(500)
		.to({
			x: 10, y: 10, z: -10
		}, 2000, 
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: -10, y: 10, z: -10
		}, 6000, 
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: -10, y: 10, z: 10
		}, 2000,				
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: 10, y: 10, z: 10
		}, 15000,				
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: 0, y: 3, z: 0
		}, 3000,				
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: -10, y: 10, z: -10
		}, 12000,				
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: 10, y: 10, z: 10
		}, 5000,				
		createjs.Ease.sineInOut)

		.wait(1500);




}



