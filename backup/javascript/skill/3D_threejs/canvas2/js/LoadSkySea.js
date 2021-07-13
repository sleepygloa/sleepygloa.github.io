// 하늘
var sky = new THREE.Sky();
	sky.material.uniforms['turbidity'].value=10;
	sky.material.uniforms['rayleigh'].value=2;
	sky.material.uniforms['luminance'].value=1;
	sky.material.uniforms['mieCoefficient'].value=0.005;
	sky.material.uniforms['mieDirectionalG'].value=0.8;

	var parameters = {
		distance: 400,
		inclination: 0.1,
		azimuth: -0.1
	};

	var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
	scene.background = cubeCamera.renderTarget;

	var theta = Math.PI * ( parameters.inclination - 0.5 );
	var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

	light_sun.position.x = parameters.distance * Math.cos( phi );
	light_sun.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
	light_sun.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

	sky.material.uniforms['sunPosition'].value = light_sun.position.copy( light_sun.position );

	cubeCamera.update( renderer, sky );

// 바다
var water = new THREE.Water(
		new THREE.PlaneBufferGeometry( 100000, 100000 ),
		{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new THREE.TextureLoader().load( 'http://dreamplan7.cafe24.com/canvas/img/waternormals.jpg', function ( texture ) {

				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

			} ),
			alpha: 1.0,
			sunDirection: light_sun.position.clone().normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: scene.fog !== undefined
		}
	);

	water.rotation.x = - Math.PI / 2;
	water.material.uniforms['sunDirection'].value.copy( light_sun.position ).normalize();
	scene.add( water );
