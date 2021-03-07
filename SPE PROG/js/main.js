////////////////////////////////////// PRELOADER ////////////////////////////////////////////
var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Preloader ()
    {
        Phaser.Scene.call(this, { key: 'preloader' });
    },

    preload:function() {

        this.load.image('backgroundMenu','assets/img/Menu/backgroundMenu.jpg');
        this.load.image('newGameButton', 'assets/img/Menu/newGameButton.png');
        this.load.image('loadGameButton', 'assets/img/Menu/loadGameButton.png');
        this.load.image('multiPlayerButton', 'assets/img/Menu/multiPlayerButton.png');
        this.load.image('quitButton', 'assets/img/Menu/quitButton.png');

        this.load.tilemapTiledJSON ('MAP','assets/img/Tiles/MAP.json');
        this.load.image('tilesMap','assets/img/Tiles/map.png');
        this.load.image('tilesNoir','assets/img/Tiles/noir.png');
        this.load.image('tilesDiscover','assets/img/Tiles/discover.jpg');
        this.load.image('tilesChateau','assets/img/Tiles/chateauxpix2.png');
        // this.load.image('collideMap', 'assets/img/Game/collideMap.png');

        this.load.spritesheet('herosBarbare', 'assets/img/Game/herosBarbare.png', { frameWidth: 43, frameHeight: 58.8});
        this.load.spritesheet('herosElfe', 'assets/img/Game/herosElfe.png', { frameWidth: 43, frameHeight: 57.6});
        this.load.spritesheet('herosElfeNoir', 'assets/img/Game/herosElfeNoir.png', { frameWidth: 41.27, frameHeight: 58.6});
        this.load.spritesheet('herosHumain', 'assets/img/Game/herosHumain.png', { frameWidth: 41.36, frameHeight: 58.3});
        this.load.spritesheet('herosMage', 'assets/img/Game/herosMage.png', { frameWidth: 41.55, frameHeight: 58});
        this.load.spritesheet('herosNecromancien', 'assets/img/Game/herosNecromancien.png', { frameWidth: 41.91, frameHeight: 57.6});
        
        this.load.spritesheet('cursors','assets/img/Game/cursors.png', {frameWidth: 17, frameHeight:19});
        
        this.load.spritesheet('herosHumainReverse','assets/img/Game/herosHumainReverse.png',{ frameWidth: 41.36, frameHeight: 58.3});
    },

    create: function ()
        {
        this.scene.start('MainMenu');
        }
});

////////////////////////////////////// MAIN MENU ////////////////////////////////////////////

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'MainMenu' });
    },

    create: function ()
        {
            background = this.add.image(960, 540,'backgroundMenu');
            buttonNewGame = this.add.image(900, 300,'newGameButton');
            buttonNewGame.setScale(2,2)

            buttonLoadGame = this.add.image(900, 500,'loadGameButton');
            buttonLoadGame.setScale(2,2)

            buttonQuit = this.add.image(900, 700, 'quitButton');
            buttonQuit.setScale(2,2)

            buttonNewGame.setInteractive();
            buttonQuit.setInteractive();

            
            buttonNewGame.on('pointerup',() =>  {

                this.scene.start('GameScene');

            }, this);

            buttonQuit.on('pointerup', () => {

                this.scene.start('GameScene');

            }, this);

        },

});

////////////////////////////////////// GAME SCENE ////////////////////////////////////////////

var countMove = 10;

var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    

    initialize:

    function Games ()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    

    create: function ()
        {
            // Map //
            // map = this.add.image(0, 0,'map');
            // collideMap = this.physics.add.image(0, 0,'collideMap');
            const map = this.make.tilemap({key:'MAP'});
            // const tilesetMap = map.addTilesetImage('map', 'map',42,59);
            // const tilesetNoir = map.addTilesetImage('noir', 'noir',42,59);
            // const tilesetChateaux = map.addTilesetImage('chateauxpix2', 'chateauxpix2',42,59);
            // const tilesetDiscover = map.addTilesetImage('discover', 'discover',42,59);
            terrain = map.createLayer('Map', map);
            col = map.createLayer('col', map);
            chateaux = map.createLayer('chateaux', map);
            discover = map.createLayer('discover', map);

            Phaser.Tilemaps.Tilemap#width = 42;
            this.tileHeight = 59;

            

            
            
            // Player //
            player = this.physics.add.sprite(200,300,'herosHumain');
            player.body.collide = true;
            // player.body.collideWorldBounds = true;            
            
            movePoint = this.anims.create({
                key: 'point',
                frames: this.anims.generateFrameNumbers('cursors', {frames: [0] }),
                // frameRate:6,
            });


            cross = this.anims.create({
                key: 'cross',
                frames: this.anims.generateFrameNumbers('cursors', {frames: [5] }),
                // frameRate:6,
            });
            
            

            

            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('herosHumain', {frames: [12] }),
                frameRate:6,
                repeat:-1
            });

            this.anims.create({
                key: 'walkRight',
                frames: this.anims.generateFrameNumbers('herosHumain', {frames: [23,24,25,26,27,28,29,30,31,32] }),
                frameRate : 6,
                repeat : -1
            });

            this.anims.create({
                key: 'walkLeft',
                frames: this.anims.generateFrameNumbers('herosHumainReverse', {frames: [23,24,25,26,27,28,29,30,31,32] }),
                frameRate : 6,
                repeat : -1
            });

            this.anims.create({
                key: 'walkUp',
                frames: this.anims.generateFrameNumbers('herosHumain', {frames: [0,1,2,3,4,5,6,7,8,9,10] }),
                frameRate : 6,
                repeat : -1
            });

            this.anims.create({
                key: 'walkDown',
                frames: this.anims.generateFrameNumbers('herosHumain', {frames: [34,35,36,37,38,39,40,41,42,43] }),
                frameRate : 6,
                repeat : -1
            });


            // Buttons //
            buttonQuit = this.add.image(0, 10, 'quitButton');
            buttonQuit.setScale(2,2);

            buttonQuit.setInteractive();

            buttonNewGame.on('pointerup', function () {

                this.scene.start('MainMenu');

            }, this);

            buttonQuit.on('pointerup', function () {

                this.scene.start('MainMenu');

            }, this);
            
            // Event //

            cursors = this.input.keyboard.createCursorKeys();

            // CAMERA //

            // this.cameras.main.setBounds(-100, 0, 2020,3080);
            this.cameras.main.startFollow(player);
            
            // Colliders //
            col.setCollisionByExclusion(-1,true);
            this.physics.add.collider(player, col);
            // this.physics.add.overlap(player, movePoint, collectMovePoint, null, this);
            // this.physics.add.overlap(player, cross, collectCross, null, this);
            // this.physics.add.overlap(col, movePoint, inaccessiblePoint, null, this);
            // this.physics.add.overlap(col, cross, inaccessibleCross, null, this);

            //this.physics.add.overlap(arrow, collideMap);
            //this.physics.add.overlap(arrow, player);

            // functions
            // function inaccessiblePoint (movePoint, col){
            //     movePoint.tint = cc0000;
            // }

            // function inaccessibleCross (cross, col){
            //     movePoint.tint = cc0000;
            // }

            // function collectMovePoint (player, movePoint){
            //     movePoint.disableBody(true, true)
            //     countMove-= 1;
            // }
            // function collectCross (player, cross){
            //     cross.disableBody(true, true)
            //     countMove-= 1;
            // }

        },
    
    update: function()
        {
            var pointer = this.input.activePointer;

            // player.setVelocityX(0);
            // player.setVelocityY(0);
            buttonQuit.x = player.x - 820;
            buttonQuit.y = player.y - 480;

            this.input.on('pointerdown', function (pointer){
                if(pointer.worldX+21 < player.x ){

                    player.x -=5;
                    player.play('walkLeft', true);
                }
                else if(pointer.worldX-21 > player.x){

                    player.x +=5;
                    player.play('walkRight', true);
                }
                else if(pointer.worldY+29 < player.y){

                    player.y -=5;
                    player.play('walkUp', true);
                }
                else if(pointer.worldY-29 > player.y){

                    player.y +=5;
                    player.play('walkDown', true);
                }
                else{
                    player.play('idle',true);
                }

            },this);



            if(cursors.up.isDown){
                player.setVelocity(0,-58.3);
                player.play('walkUp', true);
                //looseMove(); 
            }
            else if(cursors.right.isDown){
                player.setVelocity(41.36, 0);
                player.play('walkRight', true);
                //looseMove(); 
            }
            else if(cursors.down.isDown){
                player.setVelocity(0, 58.3);
                player.play('walkDown', true);
                //looseMove(); 
            }
            else if(cursors.left.isDown){
                player.x -=5;
                player.play('walkLeft', true);
                //looseMove(); 
            }
            else{
                player.play('idle',true);
            }

            

            function looseMove(){    
                day = 1 ;
                if (day < 8){
                    if (countMove == 0){
                        prompt('fin du tour');
                        countMove = 10;
                        day += 1;
                    }
                    else{
                        collectMove()
                    }
                }
                else {
                    prompt('fin de semaine ! vous pouvez maintenant recruter de nouvelles créatures dans votre château'); 
                    day = 1
                }
            }  
            // colliders //

            this.physics.add.overlap(player, movePoint, collectMove, null, this);

            function collectMove (player, movePoint){
                movePoint.disableBody(true, true)
            }
        }
});

///////////// CURSEUR HOVER //////////

// function create() {

//     background = game.add.tileSprite(0, 0, 800, 600, 'backgroundMenu');

//     button = game.add.button(game.world.centerX - 95, 400, 'newGameButton', actionOnClick, this, 2, 1, 0);

//     button.onInputOver.add(over, this);
//     button.onInputOut.add(out, this);
//     button.onInputUp.add(up, this);

// }

// function up() {
//     console.log('button up', arguments);
// }

// function over() {
//     console.log('button over');
// }

// function out() {
//     console.log('button out');
// }

// function actionOnClick () {

//     background.visible =! background.visible;

// }

////////////////////////////////////// CONFIG ////////////////////////////////////////////

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    pixelArt: true,
    antialias:false, 
    autoResize: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [  Preloader, MainMenu, GameScene ]
};

const game = new Phaser.Game(config);
const keys = ['idle','walkUp','walkDown','walkRight','walkLeft'];