// 3차원 세계
var scene = new THREE.Scene();

const PI_PER_180 = Math.PI / 180;

var loader = new THREE.TextureLoader();
var loaderMesh = new THREE.ColladaLoader();

function loadDAE(file, obj, callback)
{
	if(obj == undefined)obj=new Object();
	loaderMesh.load(
		file,
		function ( collada ){
			obj.obj = collada.scene;
			var i;
			for(i=0;i<obj.obj.children.length;++i)
				obj.obj.children[i].castShadow=true;
			callback(obj.obj);
	});
}

// 렌더러 정의 및 크기 지정, 문서에 추가하기
var renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;		// <-- 속도가 빠르다
renderer.gammaInput = true;
renderer.gammaOutput = true;