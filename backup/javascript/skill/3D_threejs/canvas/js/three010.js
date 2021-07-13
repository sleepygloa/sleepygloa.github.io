var framesPerSecond=30;

// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.
var animate = function () {
	// 프레임 처리
	setTimeout(function() {
		 requestAnimationFrame(animate); 
	}, 1000 / framesPerSecond);

	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

	// 랜더링을 수행합니다.
	renderer.render( scene, camera );
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();