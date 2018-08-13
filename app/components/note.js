const HIT_RANGE = {
    min: 670,
    max: 690
}

export default class Note extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'square')
        this.scene = scene

        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)

        this.setPosition(x, y)
        this.setScale(2)
        this.setAlpha(0.5)
        this.setOrigin(0.5, 1)

        this.body.allowGravity = false
        this.body.setSize(this.width, this.height)
        this.body.setOffset(0, -this.height / 2)

        this.noteData
        this.speed
        this.name
    }

    init(config) {
        this.noteData = config.noteData || {}
        this.speed = config.speed || 2
        this.name = config.name || 'note'

        if (this.noteData.firstNote) {
            console.log('>>>> first note')
        }

        if (this.noteData.lastNote) {
            console.log('>>>> last note')
        }
    }

    update() {
        this.y += this.speed

        if (this.y > HIT_RANGE.max + 10) {
            this.handleMiss()
        }
    }

    disableNote() {
        // disabled the note
        this.body.enable = false
        this.speed = 0
    }

    handleHit() {
        this.disableNote()

        // ranges that the note was hit
        const perfect = [678, 682]
        const great = [675, 685]

        // check
        if (this.y > perfect[0] && this.y < perfect[1]) {
            this.scene.scoreController.addScore('perfect')
        } else if (this.y > great[0] && this.y < great[1]) {
            this.scene.scoreController.addScore('great')
        } else {
            this.scene.scoreController.addScore('good')
        }

        this.destroy()
    }

    handleMiss() {
        this.disableNote()
        this.scene.scoreController.miss()
        this.destroy()
    }
}