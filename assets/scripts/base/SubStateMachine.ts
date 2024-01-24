import { State } from "./State";
import { StateMachine } from "./StateMachine";

export abstract class SubStateMachine {
  private _state: State = null
  protected stateMachines: Map<string, State> = new Map

  constructor(private fsm: StateMachine) {}

  get state() {
    return this._state
  }

  set state(newState) {
    if (!newState) return
    this._state = newState
    this._state.run()
  }
  
  abstract run(): void
}