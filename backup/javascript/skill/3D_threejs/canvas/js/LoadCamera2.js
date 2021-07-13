// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 1, 20000 );
	camera.position.set ( 25, 5, 3 );

// 카메라 컨트롤러
var control1 = new THREE.OrbitControls (camera, renderer.domElement);
	control1.minPolarAngle = Math.PI / -2;
	control1.maxPolarAngle = Math.PI / 2.1;
  control1.enableDamping = true;
  control1.dampingFactor = 0.1;


// 카메라 컨트롤러
var control2 = new THREE.DeviceOrientationControls (camera, renderer.domElement);
	control2.minPolarAngle = Math.PI / -2;
	control2.maxPolarAngle = Math.PI / 2.1;

// 카메라 컨트롤러
var controls = control1;

function changeVRMode()
{
	var val=document.getElementById('vrMode').checked;
	if(val==true)controls=control2;
	else controls=control1;
}