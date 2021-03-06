
var step = 0;

var scene = new THREE.Scene();


/*******************************************
 * 렌더링 정의
 * *****************************************/
//var renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;		// <-- 속도가 빠르다
renderer.gammaInput = true;
renderer.gammaOutput = true;

/*******************************************
 * 축 생성
 * *****************************************/
//Show Axis
var axes = new THREE.AxisHelper(50);
scene.add(axes);

/*******************************************
 * 바닥 생성
 * *****************************************/
//Let's make a plane
var planeGeometry = new THREE.PlaneGeometry(50,50,1,1);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xCCCCCC});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

document.body.appendChild(renderer.domElement);

/*
// 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
var controls = new THREE.OrbitControls(camera);
controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
controls.zoomSpeed = 1.2; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
controls.panSpeed = 0.8; // 패닝 속도 입니다. 기본값(Float)은 1입니다.
controls.minDistance = 5; // 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
controls.maxDistance = 1000; // 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
*/

/*******************************************
 * 박스 생성.
 * x.y.x 행열단
 * *****************************************/
var dd = [
	[[1,1],[1,1],[1,1],[1,1],[1,1]],
	[[1,1],[1,1],[1,1],[1,1],[1,1]],
	[[1,1],[1,1],[1,1],[1,1],[1,1]]
];

for( var i = 0 ; i < dd.length; i++){

	for(var j = 0; j < dd[i].length; j++){

		for(var z = 0; z < dd[i][j].length; z++){

			//Let's make a cube  
			var cubeGeometry = new THREE.BoxGeometry(j,i,6);  
			var cubeMeterial = new THREE.MeshBasicMaterial({color: 0x0089A0});  
			var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);  
			cube.position.x = (j - dd[i].length / 2) * 5;  
			cube.position.y = (z == 0 ? 1 : 4);
			cube.position.z = (i - dd[i].length / 2) * 10;  
			scene.add(cube);
		}
	}
}






	

