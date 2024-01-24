import { Animation, Component, _decorator } from "cc"
import { State } from "./State"
import { SubStateMachine } from "./SubStateMachine"

const { ccclass } = _decorator

export type StateTriggerValue = number | boolean

export enum StateTriggerType {
  Switch,
  Number,
}

export interface IStateTrigger {
  type: StateTriggerType
  value: StateTriggerValue
}

type StateType = State | SubStateMachine

@ccclass('StateMachine')
export abstract class StateMachine<EntityType = string, EntityActionType = string> extends Component {
  private _state: StateType = null
  type: EntityType = null
  animComponent: Animation = null
  triggers: Map<EntityActionType, IStateTrigger> = new Map()
  stateMachines: Map<EntityActionType, StateType> = new Map()

  get state() {
    return this._state
  }

  set state(state: StateType) {
    this._state = state
    this._state.run()
  }

  getTrigger(identifer: EntityActionType) {
    if (this.triggers.has(identifer)) return this.triggers.get(identifer)
  }

  setTrigger(identifer: EntityActionType, value: StateTriggerValue) {
    if (this.triggers.has(identifer)) {
      this.triggers.get(identifer).value = value
      this.run()
      this.resetTriggers()
    }
  }

  registerTrigger(identifer: EntityActionType, type = StateTriggerType.Switch) {
    this.triggers.set(identifer, StateMachine.newState(type))
  }

  resetTriggers() {
    for (const [_, trigger] of this.triggers) {
      if (trigger.type === StateTriggerType.Switch) {
        trigger.value = false
      } else {
        trigger.value = 0
      }
    }
  }

  registerState(type: EntityActionType, state: StateType) {
    this.stateMachines.set(type, state)
  }

  static newState(type: StateTriggerType): IStateTrigger {
    if (type === StateTriggerType.Number) return { type, value: 0 }
    return { type, value: false }
  }

  abstract init(...args: any[]): void
  abstract run(): void
}