// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 1, 20000 );
	camera.position.set ( 25, 5, 3 );

// 카메라 컨트롤러
var controls = new THREE.OrbitControls (camera, renderer.domElement);
	controls.enablePan = false;
	controls.minPolarAngle = Math.PI / -2;
	controls.maxPolarAngle = Math.PI / 2.1;
