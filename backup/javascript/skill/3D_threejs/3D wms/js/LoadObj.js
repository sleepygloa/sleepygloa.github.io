var loader = new THREE.OBJLoader();

/*******************************************
 * 지게차 로딩
 * *****************************************/
loader.load( './img/Forklift.obj',
    function ( model ) {
        model.scale.set(0.01, 0.01, 0.01);
        model.position.set(0, 0, 0);
        scene.add( model );
    }
);

