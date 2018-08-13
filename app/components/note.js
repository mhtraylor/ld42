export default class Note extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene

        this.setTexture('square')
        this.setPosition(x, y)
        this.setScale(2)
        this.setAlpha(0.5)

        this.noteData
        this.speed
        this.name
    }

    init(config) {
        this.noteData = config.noteData || {}
        this.speed = config.speed || 2
        this.name = config.name || 'note'

        this.scene.add.existing(this)

        if (this.noteData.firstNote) {
            console.log('>>>> first note')
        }

        if (this.noteData.lastNote) {
            console.log('>>>> last note')
        }
    }

    update() {
        this.y += this.speed
    }
}