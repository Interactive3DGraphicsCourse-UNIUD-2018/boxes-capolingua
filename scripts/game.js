var game = (function () {
    var scene = new THREE.Scene(),
        camera,
        width = window.innerWidth,
        height = window.innerHeight - 10,
        playerBox,
        renderer = new THREE.WebGLRenderer({
            antialias: true
        }),
        playerActive = true,
        score = 0,
        playerBox,
        controls;

    renderer.setSize(width, height);
    renderer.setClearColor(0xE0EEEE);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    document.getElementById("canva").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        50,
        width / height,
        20,
        900
    );
    scene.add(camera);

    function init() {
        resetScene();
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
        sceneSetup.addSceneObjects();
        car.init();
        player.createPlayer();
        gameControls.init();
        render();
    }

    function resetScene() {
        camera.position.set(0, 180, 10);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    function startNewGame() {
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
    }

    function render() {
        car.update();
        stats.update();
        car.checkForCollition();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        scene: scene,
        camera: camera,
        playerBox: playerBox,
        renderer: renderer,
        init: init,
        render: render,
        controls: controls,
        playerActive: playerActive,
        resetScene: resetScene,
        score: score,
        startNewGame: startNewGame
    }

})();

window.onload = game.init();