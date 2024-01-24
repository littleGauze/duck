import { _decorator, Animation, AnimationClip, CCInteger, Component, Vec3 } from 'cc';
import { JoySticker } from './JoySticker';
import { HeroEntity } from './entities/hero/HeroEntity';
import { EntityActionType, EntityType, WeaponType } from './common/Enum';
const { ccclass, property } = _decorator;

@ccclass('Duck')
export class Duck extends Component {
    @property(CCInteger)
    speed = 100

    @property(JoySticker)
    sticker: JoySticker = null

    hero: HeroEntity = null

    isReady = false

    init() {
        this.hero = this.getComponent(HeroEntity)
        this.hero.init({
            id: 1,
            hp: 100,
            type: EntityType.Duck,
            weapon: WeaponType.weapon1,
            dir: { x: 0, y: 0 }
        })
        this.isReady = true
    }

    tick(dt: number) {
        const input = this.sticker.input
        if (input) {
            let move = this.node.position.x - this.speed * dt
            if (input.x > 0) {
                move = this.node.position.x + this.speed * dt
                this.node.setRotationFromEuler(Vec3.ZERO)
            } else {
                this.node.setRotationFromEuler(new Vec3(0, 180, 0))
            }
            this.node.setPosition(move, this.node.position.y)
            this.hero.state = EntityActionType.Run
            return
        }
        this.hero.state = EntityActionType.Idle
    }

}