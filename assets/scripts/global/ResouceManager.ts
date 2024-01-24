import { Asset, resources } from "cc";
import { Singleton } from "../base/Singleton";

export class ResouceManger extends Singleton {
  static get ins() {
    return super.getInstance<ResouceManger>()
  }

  loadRes<T extends Asset>(path: string, type: new(...args: any[]) => T) {
    return new Promise<T>((resolve, reject) => {
      resources.load(path, type, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  loadDir<T extends Asset>(path: string, type: new(...args: any[]) => T) {
    return new Promise<T[]>((resolve, reject) => {
      resources.loadDir(path, type, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
}