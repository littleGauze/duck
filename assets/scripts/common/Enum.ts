export enum EntityType {
  Duck = 'Duck',
  Actor1 = 'Actor1',
  Actor2 = 'Actor2',
  Weapon1 = 'Weapon1',
  Weapon2 = 'Weapon2',
  Explosion = 'Explosion',
}

export enum EntityPath {
  DuckIdle = 'actors/duck/idle',
  DuckRun = 'actors/duck/run',
  Actor1Idle = 'actors/actor1/idle',
  Actor1Run = 'actors/actor1/run',
  Actor2Idle = 'actors/actor2/idle',
  Actor2Run = 'actors/actor2/run',
  Weapon1Idle = 'weapon/weapon1/idle',
  Weapon1Attack = 'weapon/weapon1/attack',
  Weapon2Idle = 'weapon/weapon2/idle',
  Weapon2Attack = 'weapon/weapon2/attack',
  ExplosionIdle = 'explosion/explosion',
}

export enum EntityActionType {
  Idle = 'Idle',
  Run = 'Run',
  Attack = 'Attack'
}

export enum WeaponType {
  weapon1 = 'weapon1',
  weapon2 = 'weapon2'
}

export enum BulletType {
  bullet1 = 'bullet1',
  bullet2 = 'bullet2',
}

export enum Direction {
  Left,
  Right
}