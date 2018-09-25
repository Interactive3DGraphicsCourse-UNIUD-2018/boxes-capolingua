var car = (function () {
    const ROADS = {
        road1: -5,
        road2: -60,
        road3: -130,
        road4: -190,
    }
    var enemies = [];
    var trees = [];
    //TODO aggiungere tartarughe nel fiume
    var fBox;
    var pBox;

    //
    //Crea i nemici
    //parametri, punto di origine, velocita e pos iniziali
    //
    function createEnemy(origin, speed, startPos, zPos) {
        //Costruisce i blocchi
        var loader_truck = new THREE.TextureLoader();
        var enemy; //oggetto padre enemy
        var path_truck = "./img/truck.png";
        loader_truck.load(path_truck, function (texture_truck) {

            texture_truck.wrapS = THREE.RepeatWrapping;
            texture_truck.wrapT = THREE.RepeatWrapping;
            texture_truck.repeat.set(1, 1);

            enemy = new THREE.Mesh(
                new THREE.BoxGeometry(33, 10, 15),
                new THREE.MeshPhongMaterial({
                    ambient: Math.random() * 0xffffff,
                    map: texture_truck
                })
            );
            var tyre1 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 20, 12, 12, false), new THREE.MeshBasicMaterial({
                color: 0x000000
            }));
            tyre1.position.x = -10;
            tyre1.position.y = -8;
            tyre1.rotation.x = 90 * (Math.PI / 180);

            var tyre2 = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 20, 12, 12, false), new THREE.MeshBasicMaterial({
                color: 0x000000
            }));
            tyre2.position.x = 10;
            tyre2.position.y = -8;
            tyre2.rotation.x = 90 * (Math.PI / 180);

            enemy.add(tyre1);
            enemy.add(tyre2);

            startPos = origin == 'right' ? startPos : -startPos;

            enemy.position.set(startPos, 18, zPos);

            enemy.userData = {
                origin: origin,
                speed: speed,
                startPos: startPos,
                zPos: zPos
            }
            enemy.castShadow = true;
            enemies.push(enemy);

            game.scene.add(enemy);
        });
    }
    //
    //Crea i tronchi nel fiume
    //TODO: Cercare una texture migliore
    //parametri: punto di origine, velocita e pos iniziali
    //
    function createTree(origin, speed, startPos, zPos) {
        //Create wooden blocks with texture
        var loader_block = new THREE.TextureLoader();
        var path_block = "./img/tree.jpg"
        var tree;
        loader_block.load(path_block, function (texture_block) {

            texture_block.wrapS = THREE.RepeatWrapping;
            texture_block.wrapT = THREE.RepeatWrapping;
            texture_block.repeat.set(1, 1);

            tree = new THREE.Mesh(
                new THREE.BoxGeometry(50, 0, 30),
                new THREE.MeshPhongMaterial({
                    map: texture_block
                })
            );
            startPos = origin == 'right' ? startPos : -startPos;

            tree.position.set(startPos, 2, zPos);

            tree.userData = {
                origin: origin,
                speed: speed,
                startPos: startPos,
                zPos: zPos
            }
            trees.push(tree);

            game.scene.add(tree);

        });

    }
    //
    //Ricerca collisioni tra il player box e auto
    //
    function checkForCollition() {
        if (game.playerBox.position.z > -377) {
            //road
            if (enemies.length == 0) return;
            for (var i = 0; i < enemies.length; i++) {
                var eBox = new THREE.Box3().setFromObject(enemies[i]);
                var pBox = new THREE.Box3().setFromObject(game.playerBox);
                if (pBox.isIntersectionBox(eBox)) {
                    handleCollision();
                }
            }
        } else if (game.playerBox.position.z <= -377 && game.playerBox.position.z >= -568) {
            var alive = checkWater();
            if (!alive) {
                handleCollision();
            }
        }
    }
    //
    //Verifica se la rana e' caduta in acqua
    //
    function checkWater() {
        var isAlive = false;
        if (trees.length == 0) return isAlive;
        for (var j = 0; j < trees.length; j++) {
            fBox = new THREE.Box3().setFromObject(trees[j]);
            pBox = new THREE.Box3().setFromObject(game.playerBox);
            if (pBox.isIntersectionBox(fBox)) {
                isAlive = true;
                fBox = trees[j];
                pBox = game.playerBox;
                handleFloating(trees[j], game.playerBox);
            }

        }
        return isAlive;
    }

    function handleFloating(friend, player) {
        //For friends
        if (friend.userData.origin == 'right')
            player.position.x -= friend.userData.speed;
        else
            player.position.x += friend.userData.speed;

        if ((friend.userData.origin == 'right' && player.position.x < -112) || (friend.userData.origin == 'left' && player.position.x > 112)) {
            //Player died
            handleCollision();
        } else {
            player.__dirtyPosition = true;
        }
    }

    function handleCollision() {
        alert("Mi dispiace, hai perso.\nRitenta!")
        location.reload();
    }

    function createEnemies() {

        //road 1
        createEnemy('right', 2, -300, ROADS.road1);
        createEnemy('right', 2, -100, ROADS.road1);
        createEnemy('right', 2, 100, ROADS.road1);
        createEnemy('right', 2, 300, ROADS.road1);

        //road 2
        createEnemy('left', 3.5, -550, ROADS.road2);
        createEnemy('left', 3.5, -400, ROADS.road2);
        createEnemy('left', 3.5, -350, ROADS.road2);
        createEnemy('left', 3.5, -150, ROADS.road2);
        createEnemy('left', 3.5, 0, ROADS.road2);

        //road 3
        createEnemy('right', 4.5, -200, ROADS.road3);
        createEnemy('right', 4.5, -150, ROADS.road3);
        createEnemy('right', 4.5, -50, ROADS.road3);
        createEnemy('right', 4.5, 200, ROADS.road3);
        createEnemy('right', 4.5, 300, ROADS.road3);

        createEnemy('left', 7.5, 100, ROADS.road4);
    }

    function createTrees() {

        //Lake1
        createTree('right', 0.5, -200, -393);
        createTree('right', 0.5, 0, -393);
        createTree('right', 0.5, 200, -393);
        createTree('right', 0.5, 400, -393);

        //lake2
        createTree('left', 0.6, -350, -425);
        createTree('left', 0.6, -230, -425);
        createTree('left', 0.6, -80, -425);
        createTree('left', 0.6, 150, -425);

        //lake3
        createTree('right', 0.7, 0, -457);
        createTree('right', 0.7, -100, -457);
        createTree('right', 0.7, -200, -457);
        createTree('right', 0.7, -300, -457);

        //lake4
        createTree('left', 0.6, -350, -489);
        createTree('left', 0.6, -250, -489);
        createTree('left', 0.6, -100, -489);
        createTree('left', 0.6, 50, -489);

        //lake5
        createTree('right', 0.6, 0, -521);
        createTree('right', 0.6, -100, -521);
        createTree('right', 0.6, -200, -521);
        createTree('right', 0.6, -300, -521);

        //lake6
        createTree('left', 0.7, -350, -553);
        createTree('left', 0.7, -175, -553);
        createTree('left', 0.7, 0, -553);
        createTree('left', 0.7, 150, -553);
    }


    function update() {

        if (enemies.length == 0) return;

        for (var i = 0; i < enemies.length; i++) {

            var enemy = enemies[i];

            if (enemy.userData.origin == 'right')
                enemy.position.x -= (enemy.userData.speed);
            else
                enemy.position.x += (enemy.userData.speed);


            if ((enemy.userData.origin == 'right' && enemy.position.x < -400) || (enemy.userData.origin == 'left' && enemy.position.x > 400)) {
                //restart enemy over other side
                enemy.position.x = enemy.userData.origin == 'right' ? 400 : -400;
            } else {
                //rotate tyres
                enemy.children[0].rotation.y += 1;
                enemy.children[1].rotation.y += 1;
                enemy.__dirtyPosition = true;
            }
        }


        if (trees.length == 0) return;
        const valx = 400
        for (var j = 0; j < trees.length; j++) {

            var tree = trees[j];
            if (tree.userData.origin == 'right')
                tree.position.x -= (tree.userData.speed);
            else
                tree.position.x += (tree.userData.speed);
            if ((tree.userData.origin == 'right' && tree.position.x < -valx) || (tree.userData.origin == 'left' && tree.position.x > valx)) {
                //riposiziona i tronchi al raggiungimento della fine dello schermo
                tree.position.x = tree.userData.origin == 'right' ? valx : -valx;
            } else {
                tree.__dirtyPosition = true;
            }
        }
    }

    function init() {
        createEnemies();
        createTrees();
    }

    return {
        init: init,
        update: update,
        handleFloating: handleFloating,
        checkForCollition: checkForCollition,
        fBox: fBox,
        pBox: pBox
    }

})();