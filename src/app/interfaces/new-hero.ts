import { Gender } from './hero';

export interface NewHero {
    name: string,
    gender: Gender,
    isHuman: boolean,
    superPowers: string[],
    team?: string
}
