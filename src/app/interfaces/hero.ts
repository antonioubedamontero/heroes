export type Gender = 'male' | 'female' | 'other';

export interface Hero {
    id: string,
    name: string,
    gender: Gender,
    isHuman: boolean,
    superPowers: string[],
    team?: string
}
