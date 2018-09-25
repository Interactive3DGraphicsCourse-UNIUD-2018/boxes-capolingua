var player = (function () {

    var movementRate = 2,
        playerBox,
        playerBoxMaterial,
        finishLineZPos = -620;

    function init() {}

    function moveX(movement) {
        playerBox.position.x += movementRate * movement;
        playerBox.__dirtyPosition = true;

    }

    function moveZ(movement) {
        game.camera.position.z += movementRate * movement;
        game.camera.__dirtyPosition = true;
        playerBox.position.z += movementRate * movement;
        playerBox.__dirtyPosition = true;
        checkIfPlayerAtFinish();
    }

    function checkIfPlayerAtFinish() {

        if (playerBox.position.z <= finishLineZPos) {
            alert("Hai vinto! \nComplimenti!")
            location.reload
        }
    }

    function createPlayer() {

        playerBoxMaterial = new THREE.MeshBasicMaterial({
            visible: false
        });

        var texture = THREE.ImageUtils.loadTexture('./img/frog.png');

        var personMaterial = new THREE.MeshNormalMaterial({
            color: 0x00ff00,
            map: texture
        });

        var playerBody = new THREE.Mesh(
            new THREE.BoxGeometry(12, 5, 10),
            personMaterial
        );

        playerBody.position.y = -8;


        playerBox = new THREE.Mesh(
            new THREE.BoxGeometry(12, 5, 10),
            playerBoxMaterial
        );
        playerBox.position.set(0, 5, 44);

        playerBox.castShadow = true;
        playerBox.add(playerBody);
        playerBody.position.y = 6;

        game.scene.add(playerBox);
        playerBox.userData = {
            origin: 'right',
            speed: 0.5,
            startPos: -200,
            zPos: -5
        }

        game.playerBox = playerBox;

    }

    return {
        init: init,
        createPlayer: createPlayer,
        moveX: moveX,
        moveZ: moveZ,
        playerBox: playerBox
    }

})();