export const HEROES_DATA_MOCK = {
    hero: { 
        id: '1',
        name: 'Magneto',
        gender: 'male',
        isHuman: true,
        superPowers: [
            'gravity', 'magnetism', 'intelligence'
        ],
        team: 'Brotherhood of Mutants'
    },
    pageList: {
        heroes: [
            { 
                id: '1',
                name: 'Magneto',
                gender: 'male',
                isHuman: true,
                superPowers: [
                    'gravity', 'magnetism', 'intelligence'
                ],
                team: 'Brotherhood of Mutants'
            },
            { 
                id: '2',
                name: 'Wonder Woman',
                gender: 'female',
                isHuman: true,
                superPowers: [
                    'strong'
                ],
                team: 'League of Justice'
            }       
        ],
        paginationResult: {
            page: 1,
            itemsPerPage: 25,
            numOfItems: 2
        }
    },
    pagination: {
        pageNumber: 1,
        itemsPerPage: 25
    },
    heroModified: {
        name: 'Hero name modified',
        gender: 'other',
        isHuman: false,
        superPowers: ['Other super power']
    },
    newHero: {
        name: 'A new Hero',
        gender: 'male',
        isHuman: true,
        superPowers: ['very strong']
    }
};
