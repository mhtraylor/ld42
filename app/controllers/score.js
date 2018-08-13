import CONST from 'data/const'

const HitTiming = {
    GOOD: 'good',
    GREAT: 'great',
    PERFECT: 'perfect'
}

const NOTE_VALUE = 10

export default class ScoreController {
    constructor(scene) {
        this.scene = scene

        this.totalScore = 0
        this.streak = 0

        this.scoreUI
        this.streakUI
    }

    init() {
        this.registerScores()

        const settings = {
            fill: CONST.colors.white,
            fontFamily: CONST.fonts.default,
            fontSize: 20,
            fontStyle: 'bold'
        }

        this.scoreUI = this.scene.add
                            .text(20, 748, 
                                this.scene.registry.get('score'), 
                                settings)
                            .setOrigin(0, 1)
                            .setShadow(0, 1, CONST.colors.black, 5)

        this.streakUI = this.scene.add
                            .text(412, 748, 
                                'Streak: ' + this.scene.registry.get('streak'), 
                                settings)
                            .setOrigin(1, 1)
                            .setShadow(0, 1, CONST.colors.black, 5)
    }

    // hit timing (good, great, perfect)
    addScore(timing) {
        this.updateStreak()

        let value = NOTE_VALUE
        switch (timing) {
            case HitTiming.GOOD:
                // default value
                this.scene.registry.set('timing', HitTiming.GOOD)
                break

            case HitTiming.GREAT:
                value *= 2
                this.scene.registry.set('timing', HitTiming.GREAT)
                break

            case HitTiming.PERFECT:
                value *= 5
                this.scene.registry.set('timing', HitTiming.PERFECT)
                break
        }

        // streak multiplier
        value *= this.streak

        this.updateTotal(value)
    }

    updateStreak() {
        if (this.streak < 26) this.streak++
    }

    resetStreak() {
        this.streak = 0
    }

    updateTotal(value) {
        this.totalScore += value

        this.scoreUI.setText(this.totalScore)
        this.streakUI.setText('Streak: ' + this.streak)

        this.registerScores()
    }

    registerScores() {
        this.scene.registry.set('score', this.totalScore)
        this.scene.registry.set('streak', this.streak)
    }
}