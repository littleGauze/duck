import { Animation, AnimationClip, _decorator } from "cc";
import { State } from "../../base/State";
import { StateMachine } from "../../base/StateMachine";
import { EntityActionType, EntityType } from "../../common/Enum";
const { ccclass } = _decorator

@ccclass('HeroStateMachine')
export class HeroStateMachine extends StateMachine<EntityType, EntityActionType> {
  init(type: EntityType): void {
    this.type = type
    this.registerTrigger(EntityActionType.Idle)
    this.registerTrigger(EntityActionType.Run)

    this.registerState(EntityActionType.Idle, new State(this, `${type}${EntityActionType.Idle}`, AnimationClip.WrapMode.Loop))
    this.registerState(EntityActionType.Run, new State(this, `${type}${EntityActionType.Run}`, AnimationClip.WrapMode.Loop))

    this.animComponent = this.node.addComponent(Animation)
  }

  run(): void {
    switch (this.state) {
      case this.stateMachines.get(EntityActionType.Idle):
      case this.stateMachines.get(EntityActionType.Run):
        if (this.triggers.get(EntityActionType.Idle).value) {
          this.state = this.stateMachines.get(EntityActionType.Idle)
        } else if (this.triggers.get(EntityActionType.Run).value) {
          this.state = this.stateMachines.get(EntityActionType.Run)
        } else {
          this.state = this.state
        }
        break
      default:
        this.state = this.stateMachines.get(EntityActionType.Idle)
        break
    }
  }
}