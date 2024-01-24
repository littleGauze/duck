import { _decorator, Component, EventTouch, Input, Node, SpriteAtlas, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoySticker')
export class JoySticker extends Component {
  private body: Node
  private stick: Node
  private radius: number = 100
  private defaultPos: Vec2 = Vec2.ZERO

  input: Vec2 = null

  onLoad() {
    this.body = this.node.getChildByName('Body')
    this.stick = this.body.getChildByName('Stick')
    this.radius = this.body.getComponent(UITransform).width / 2
    this.defaultPos = new Vec2(this.body.position.x, this.body.position.y)

    this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
  }

  protected onDestroy(): void {
    this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
    this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
  }

  update(dt: number) {

  }

  onTouchStart(evt: EventTouch) {
    const pos = evt.getUILocation()
    this.body.setPosition(pos.x, pos.y)
  }

  onTouchMove(evt: EventTouch) {
    const pos = evt.getUILocation()
    const start = this.body.getPosition()
    const dest = new Vec2(pos.x - start.x, pos.y - start.y)
    if (dest.length() > this.radius) {
      dest.multiplyScalar(this.radius / dest.length())
    }
    this.stick.setPosition(dest.x, dest.y)
    this.input = dest.clone().normalize()
  }

  onTouchEnd(evt: EventTouch) {
    this.body.setPosition(this.defaultPos.x, this.defaultPos.y)
    this.stick.position = Vec3.ZERO
    this.input = null
  }

}

