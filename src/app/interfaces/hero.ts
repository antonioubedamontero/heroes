export type Gender = 'masculino' | 'femenino' | 'otro';

export interface Hero {
    id: string,
    name: string,
    gender: Gender,
    isHuman: boolean,
    superPowers: string[],
    team?: string
}
