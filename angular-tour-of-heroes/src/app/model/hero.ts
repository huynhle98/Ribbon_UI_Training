export interface Hero {
  id: number;
  name: string;
  health: number;
  healthRegen: number;//(per 5s)
  attackDamage: number;
  attackRange: number;
  powerMagic: number;
  armor: number;
  magicResist: number;
  moveSpeed: number;
  type: string;
  img: string;
}
