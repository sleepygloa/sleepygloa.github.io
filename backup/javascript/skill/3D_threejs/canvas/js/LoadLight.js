// 전체 조명
var light_base = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
	scene.add( light_base );

// 태양 조명
var light_sun = new THREE.DirectionalLight ( 0x808080, 5.0 );
	var shadowBlur=10;
	light_sun.castShadow=true;
	light_sun.shadow.camera.left=-shadowBlur;
	light_sun.shadow.camera.right=shadowBlur;
	light_sun.shadow.camera.top=shadowBlur;
	light_sun.shadow.camera.bottom=-shadowBlur;
	scene.add( light_sun );
