module.exports = {
    links: [
        {
            source: 1,
            target: 2,
            label: "A-B",
        },
        {
            source: 1,
            target: 3,
            label: "A-C",
        },
        {
            source: 1,
            target: 4,
            label: "A-D",
        },
        {
            source: 3,
            target: 4,
            label: "C-D",
        },
    ],
    nodes: [
        {
            id: 1,
            name: "A",
            x: 50,
            y: 310,
        },
        {
            id: 2,
            name: "B",
            x: 300,
            y: 50,
        },
        {
            id: 3,
            name: "C",
            x: 400,
            y: 100,
        },
        {
            id: 4,
            name: "D",
            x: 400,
            y: 200,
        },
    ],
};
