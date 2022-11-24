import { Hero } from './hero';
import { PaginationResult } from './pagination-result';

export interface PageList {
    heroes: Hero[];
    paginationResult: PaginationResult;
}
