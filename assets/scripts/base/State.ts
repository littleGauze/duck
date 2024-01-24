import { AnimationClip, Sprite, SpriteFrame, animation } from "cc";
import { StateMachine } from "./StateMachine";
import { DataManager } from "../global/DataManager";
import { sortFrames } from "../utils";

export const ANIMATION_SEED = 1 / 10

export class State {
  private animClip: AnimationClip = null

  constructor(
    private fsm: StateMachine,
    private path: string,
    private wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal,
    private force = false

  ) {
    const track = new animation.ObjectTrack()
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame')
    const spriteFrames = DataManager.ins.textureMap.get(this.path)
    track.channel.curve.assignSorted(sortFrames(spriteFrames).map((frame, i) => [i * ANIMATION_SEED, frame]))

    this.animClip = new AnimationClip()
    this.animClip.name = this.path
    this.animClip.wrapMode = this.wrapMode
    this.animClip.addTrack(track)
  }

  run() {
    if (this.fsm.animComponent.defaultClip?.name === this.path && !this.force) return
    this.fsm.animComponent.defaultClip = this.animClip
    console.log(this.animClip, 'anim', this.fsm.animComponent)
    this.fsm.animComponent.play()
  }
}