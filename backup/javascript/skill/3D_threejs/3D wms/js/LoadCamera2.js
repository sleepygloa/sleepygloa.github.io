// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1,1000);

// 카메라의 위치 조정
camera.position.set ( 150, 150, 150 );
camera.lookAt(0, 0, 0);
camera.rotation.set ( -35 * ( Math.PI / 180 ), 35 * ( Math.PI / 180 ), 0 );

// 카메라가 회전하는
var controls = new THREE.OrbitControls (camera, renderer.domElement);
controls.update();


// 카메라 컨트롤러1
var control1 = new THREE.OrbitControls (camera, renderer.domElement);
	control1.minPolarAngle = Math.PI / -2;
	control1.maxPolarAngle = Math.PI / 2.1;
	control1.enableDamping = true;
	control1.dampingFactor = 0.1;


// 카메라 컨트롤러2
var control2 = new THREE.DeviceOrientationControls (camera, renderer.domElement);
	control2.minPolarAngle = Math.PI / -2;
	control2.maxPolarAngle = Math.PI / 2.1;

// 카메라 컨트롤러
var controls = control1;

function changeVRMode()
{
	var val = document.getElementById('vrMode').checked;
	if(val == true){
		controls = control2;
	}
	else{
		controls = control1;
	}
}
