
document.addEventListener('deviceready', function() {

    var deviceWidth = innerWidth * window.devicePixelRatio;
    var deviceHeight = innerHeight * window.devicePixelRatio;
    var config = {
        type: Phaser.AUTO,//CANVAS,//WEBGL,
        width: deviceWidth,
        height: deviceHeight,
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        plugins: {
            scene: [
                { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
            ]
        }
    };
    
    var game = new Phaser.Game(config);
    
    function preload() {
        // PHASER IMAGE
        this.load.image('logo', 'img/assets/phaser/phaser.png');

        // SPINE BOY
        this.load.setPath('./img/assets/animations/spineboy/');
        this.load.spine('sb', 'demos.json', [ 'atlas1.atlas' ], true);

        // OOLAF
        // this.load.setPath('img/assets/animations/oolaf/');
        // this.load.spine('oolaf', 'fd399fada36154b280d11961efa96e33784a2257.json', [ 'fd399fada36154b280d11961efa96e33784a2257.atlas' ], true);
    }
    
    function create() {
        this.add.image(0, 0, 'logo').setOrigin(0);

        this.input.mouse.disableContextMenu();
        // SPINE BOY
        var spineObject = this.add.spine(deviceWidth/2, deviceHeight/2, 'sb.spineboy', 'idle', true).setScale(0.25);

        // OOLAF
        // var spineObject = this.add.spine(200, 600, 'oolaf', 'animation', true).setScale(0.15);

        console.log(spineObject.getAnimationList());
        console.log(spineObject);

        // RESIZE
        // boy.setDisplaySize(125, 300);
        // boy.setDisplayOrigin(0, 0);

        // this.input.mouse.capture = true;

        this.input.on('pointerdown', (pointer) => {
            spineObject.play('shoot', false, true);
        }, this);

        this.input.on('pointerup', () => {
            spineObject.play('idle', true, true);
        }, this);

        // responsive sizing
        window.addEventListener('resize', resize);
        resize();
    }    

    function update () {
    }

    function resize() {
        var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;
        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }
});
