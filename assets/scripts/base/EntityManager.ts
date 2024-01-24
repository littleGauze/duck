import { Component, _decorator } from "cc";
import { EntityActionType } from "../common/Enum";
import { StateMachine } from "./StateMachine";
const { ccclass } = _decorator

@ccclass('EntityManager')
export abstract class EntityManager extends Component {
  private _state: EntityActionType = EntityActionType.Idle
  protected fsm: StateMachine = null

  get state() {
    return this._state
  }

  set state(newState: EntityActionType) {
    this._state = newState
    this.fsm.setTrigger(newState, true)
  }

  abstract init(...args: any[]): void
}