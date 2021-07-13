var framesPerSecond=30;

// 태양 초기 위치
parameters.azimuth+=0.2;





/*
sky.material.uniforms['rayleigh'].value=2;

var rainGeo = new THREE.Geometry();
for(i=0;i<15000;i++) {
	rainDrop = new THREE.Vector3(
		Math.random() * 400 - 200,
		Math.random() * 400 - 200,
		Math.random() * 400 - 200
	);
	rainDrop.velocity = {};
	rainDrop.velocity = 0;
	rainGeo.vertices.push(rainDrop);
}
var rainMaterial = new THREE.PointsMaterial({
	color: 0xaaaaaa,
	size: 0.15,
	transparent: true
});

rainGeo.morphAttributes = [];

var rain = new THREE.Points(rainGeo,rainMaterial);
scene.add(rain);
*/

// 돌고래
/*
var dolphin = new Object();
	loaderOBJ.load(
		'dolphin/10014_dolphin_v2_max2011_it2.obj',
		function ( obj ){
			scene.add( obj.children[0] );			
			obj.scale.set(1,1,1);
			dolphin.obj = obj;
	});
*/

function moveCam(eye_x, eye_y, eye_z, target_x, target_y, target_z)
{
	createjs.Tween.removeAllTweens();
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
}

function aroundCam()
{
	createjs.Tween.removeAllTweens();
	createjs.Tween.get(camera.position, {loop: true})
		.to({
			x: 10, y: 15, z: 12
		}, 5000, 
		createjs.Ease.sineInOut)

		.wait(500)

		.to({
			x: -100, y: 17, z: 42
		}, 2000, 
		createjs.Ease.quartIn)

		.wait(500)

		.to({
			x: 126, y: 23, z: 93
		}, 6000, 
		createjs.Ease.bounceOut)

		.wait(500)

		.to({
			x: 0, y: 38, z: 227
		}, 2000,				
		createjs.Ease.cubicIn)

		.wait(500)

		.to({
			x: 36, y: 12, z: -32
		}, 15000,				
		createjs.Ease.elasticIn)

		.wait(500)

		.to({
			x: 36, y: 115, z: -2
		}, 3000,				
		createjs.Ease.backOut)

		.wait(500)

		.to({
			x: 36, y: 10, z: -2
		}, 12000,				
		createjs.Ease.bounceInOut)

		.wait(500)

		.to({
			x: 10, y: 11, z: 12
		}, 5000,				
		createjs.Ease.elasticIn)

		.wait(1500);
}

// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.
var animate = function () {
	// 프레임 처리
	setTimeout(function() {
		 requestAnimationFrame(animate); 
	}, 1000 / framesPerSecond);

	if(home_mesh.obj != undefined)
	{
		home_mesh.obj.rotation.set(-90 * PI_PER_180, 0, -45 * PI_PER_180); 
	}

	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

	parameters.azimuth+=0.00001;

	phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

	light_sun.position.x = parameters.distance * Math.cos( phi );
	light_sun.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
	light_sun.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

	sky.material.uniforms['sunPosition'].value = light_sun.position.copy( light_sun.position );
	water.material.uniforms['sunDirection'].value.copy( light_sun.position ).normalize();

	cubeCamera.update( renderer, sky );
	controls.update();


	/* rainGeo.vertices.forEach(p => {
		p.velocity -= 0.01 + Math.random() * 0.01;
		p.y += p.velocity;
		if (p.y < -200) {
			p.y = 200;
			p.velocity = 0;
		}
	});
	rainGeo.verticesNeedUpdate = true;
	rain.rotation.y +=0.002;
	*/

	// 랜더링을 수행합니다.
	renderer.render( scene, camera );

	document.getElementById('monitor').innerText = 
		camera.position.x.toFixed(2) + ", " + 
		camera.position.y.toFixed(2) + ", " + 
		camera.position.z.toFixed(2);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();