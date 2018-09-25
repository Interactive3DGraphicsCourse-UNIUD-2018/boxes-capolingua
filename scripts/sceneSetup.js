var sceneSetup = (function () {
    //crea la strada
    var loader_road = new THREE.TextureLoader();
    var path_road = "./img/road.jpg";
    loader_road.load(path_road, function (texture_road) {

        texture_road.wrapS = THREE.RepeatWrapping;
        texture_road.wrapT = THREE.RepeatWrapping;
        texture_road.repeat.set(4, 4);
        var road = new THREE.Mesh(

            new THREE.BoxGeometry(2000, 1, 240),
            new THREE.MeshLambertMaterial({
                map: texture_road
            }), 0
        );
        road.receiveShadow = true;
        road.position.y = 1;
        road.position.z = -100;
        game.scene.add(road);
    });

    //Create grass with texture
    var loader_grass = new THREE.TextureLoader();
    var path_grass = "./img/grass.png";
    loader_grass.load(path_grass, function (texture_grass) {

        texture_grass.wrapS = THREE.RepeatWrapping;
        texture_grass.wrapT = THREE.RepeatWrapping;
        texture_grass.repeat.set(10, 10);
        var material = new THREE.MeshLambertMaterial({
            map: texture_grass
        });
        var ground = new THREE.Mesh(
            new THREE.BoxGeometry(2000, 1, 800),
            material,
            0
        );
        ground.receiveShadow = true;
        ground.position.y = 0;
        ground.position.z = -300;
        game.scene.add(ground);
    });

    //crea il lago
    var loader_lake = new THREE.TextureLoader();
    var path_lake = "./img/water.jpg";
    loader_lake.load(path_lake, function (texture_lake) {

        texture_lake.wrapS = THREE.RepeatWrapping;
        texture_lake.wrapT = THREE.RepeatWrapping;
        texture_lake.repeat.set(1, 1);
        var lake = new THREE.Mesh(
            new THREE.BoxGeometry(2000, 1, 180),
            new THREE.MeshPhongMaterial({
                map: texture_lake
            }), 0
        );
        lake.position.y = 1;
        lake.receiveShadow = true;
        lake.position.z = -466;
        game.scene.add(lake);
    });


    function addSceneObjects() {
        setupSceneLighting();
    }

    //Gestisce le luci.
    //Source from: Starting Code for 1st Project 2017 - with lights and textures
    function setupSceneLighting() {

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 500, 0);
        game.scene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(2, 1.75, 1);
        dirLight.position.multiplyScalar(50);
        game.scene.add(dirLight);
        dirLight.castShadow = true;

    }

    return {
        addSceneObjects: addSceneObjects
    }

})();