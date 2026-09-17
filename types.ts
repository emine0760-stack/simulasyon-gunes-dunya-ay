
export enum LabModule {
  SUN_STRUCTURE = 'SUN_STRUCTURE',
  MOON_PHASES = 'MOON_PHASES',
  SYSTEM_ORBITS = 'SYSTEM_ORBITS',
  SIZE_COMPARISON = 'SIZE_COMPARISON'
}

export interface CelestialBody {
  name: string;
  radius: number;
  color: string;
  rotationSpeed: number;
  orbitRadius?: number;
  orbitSpeed?: number;
}
