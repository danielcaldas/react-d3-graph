module.exports = {
    links: [
        {
            source: 1,
            target: 2
        },
        {
            source: 1,
            target: 3
        },
        {
            source: 1,
            target: 4
        },
        {
            source: 3,
            target: 4
        }
    ],
    nodes: [
        {
            id: 1,
            name: 'Mary',
            gender: 'female',
            hasCar: false,
            hasBike: false
        },
        {
            id: 2,
            name: 'Roy',
            gender: 'male',
            hasCar: false,
            hasBike: true
        },
        {
            id: 3,
            name: 'Frank',
            gender: 'male',
            hasCar: true,
            hasBike: true
        },
        {
            id: 4,
            name: 'Melanie',
            gender: 'female',
            hasCar: true,
            hasBike: false
        }
    ]
};
