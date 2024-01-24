import { _decorator } from "cc";
import { EntityManager } from "../../base/EntityManager";
import { IActor } from "../../common/Interface";
import { HeroStateMachine } from "./HeroStateMachine";
import { EntityActionType } from "../../common/Enum";
const { ccclass } = _decorator

@ccclass('HeroEntity')
export class HeroEntity extends EntityManager {
  init(actor: IActor): void {
    this.fsm = this.node.addComponent(HeroStateMachine)
    this.fsm.init(actor.type)
    this.state = EntityActionType.Idle
  }
}