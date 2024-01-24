import { _decorator, Component, SpriteAtlas } from 'cc';
import { Duck } from './Duck';
import { ResouceManger } from './global/ResouceManager';
import { EntityPath } from './common/Enum';
import { DataManager } from './global/DataManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  @property(Duck)
  player: Duck = null

  protected async onLoad() {
    for (const name in EntityPath) {
      const atlas = await ResouceManger.ins.loadRes(EntityPath[name], SpriteAtlas)
      DataManager.ins.textureMap.set(name, atlas.getSpriteFrames())
    }
    this.player.init()
  }

  start() {
  }

  update(dt: number) {
    if (this.player.isReady) {
      this.player.tick(dt)
    }
  }
}

