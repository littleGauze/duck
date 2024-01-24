import { Direction, EntityActorType, WeaponType } from "./Enum"

export interface IVec2 {
  x: number
  y: number
}

export interface IActor {
  id: number
  hp: number
  type: EntityActorType
  weapon: WeaponType
  dir: IVec2
}