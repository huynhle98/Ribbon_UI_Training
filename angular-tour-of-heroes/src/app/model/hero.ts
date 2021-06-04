export interface Hero {
  id?: number|null;
  name: string|"";
  health: number|0;
  healthRegen: number|0;//(per 5s)
  attackDamage: number|0;
  attackRange: number|0;
  powerMagic: number|0;
  armor: number|0;
  magicResist: number|0;
  moveSpeed: number|0;
  type: string | "Physical";
  img: string|"";
}
