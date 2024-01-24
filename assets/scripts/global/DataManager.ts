import { Prefab, SpriteFrame } from "cc";
import { Singleton } from "../base/Singleton";

export class DataManager extends Singleton {

  prefabMap: Map<string, Prefab> = new Map
  textureMap: Map<string, SpriteFrame[]> = new Map

  static get ins() {
    return super.getInstance<DataManager>()
  }
}