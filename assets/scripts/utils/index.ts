import { SpriteFrame } from "cc";

export function sortFrames(frames: SpriteFrame[]) {
  const idx = (name: string) => parseInt(name.match(/(\d+)/)?.[1] || '0')
  return frames.sort((a: SpriteFrame, b: SpriteFrame) => {
    return idx(a.name) - idx(b.name)
  })
}