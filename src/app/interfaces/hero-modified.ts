import { Gender } from './hero';

export interface HeroModified {
    name?: string,
    gender?: Gender,
    isHuman?: boolean,
    superPowers?: string[],
    team?: string
}
