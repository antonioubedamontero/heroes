export const HEROES_DATA_MOCK = {
    hero: { 
        id: '1',
        name: 'Magneto',
        gender: 'masculino',
        isHuman: true,
        superPowers: [
            'gravedad', 'magnetismo', 'inteligencia'
        ],
        team: 'Hermandad de Mutantes'
    },
    pageList: {
        heroes: [
            { 
                id: '1',
                name: 'Magneto',
                gender: 'masculino',
                isHuman: true,
                superPowers: [
                    'gravedad', 'magnetismo', 'inteligencia'
                ],
                team: 'Hermandad de Mutantes'
            },
            { 
                id: '2',
                name: 'Wonder Woman',
                gender: 'femenino',
                isHuman: true,
                superPowers: [
                    'fuerza'
                ],
                team: 'Liga de la Justicia'
            }       
        ],
        paginationResult: {
            page: 1,
            itemsPerPage: 5,
            numOfItems: 2
        }
    },
    pagination: {
        pageNumber: 1,
        itemsPerPage: 5
    },
    heroModified: {
        name: 'Nombre del héroe modificado',
        gender: 'otro',
        isHuman: false,
        superPowers: ['otro super poder']
    },
    newHero: {
        name: 'Un nuevo héroe',
        gender: 'masculino',
        isHuman: true,
        superPowers: ['nuevo super poder']
    }
};
