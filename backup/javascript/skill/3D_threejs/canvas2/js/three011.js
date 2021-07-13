var framesPerSecond=30;

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

	parameters.azimuth+=0.001;

	phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

	light_sun.position.x = parameters.distance * Math.cos( phi );
	light_sun.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
	light_sun.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

	sky.material.uniforms['sunPosition'].value = light_sun.position.copy( light_sun.position );
	water.material.uniforms['sunDirection'].value.copy( light_sun.position ).normalize();

	cubeCamera.update( renderer, sky );

	// 랜더링을 수행합니다.
	renderer.render( scene, camera );
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();