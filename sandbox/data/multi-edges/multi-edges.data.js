module.exports = {
    links: [
        {
            id: "12",
            source: 1,
            target: 2,
            label: "link between 1 and 2",
            type: "STRAIGHT",
        },
        {
            id: "122",
            source: 1,
            target: 2,
            label: "second link between 1 and 2",
            type: "CURVE_FULL",
        },
        {
            id: "123",
            source: 1,
            target: 2,
            label: "third link between 1 and 2",
            type: "CURVE_SMOOTH",
        },
        {
            id: "13",
            source: 1,
            target: 3,
        },
        {
            id: "14",
            source: 1,
            target: 4,
        },
        {
            id: "34",
            source: 3,
            target: 4,
        },
        {
            id: "341",
            source: 3,
            target: 4,
        },
    ],
    nodes: [
        {
            id: 1,
            name: "Node 1",
        },
        {
            id: 2,
            name: "Node 2",
        },
        {
            id: 3,
            name: "Node 3",
        },
        {
            id: 4,
            name: "Node 4",
        },
    ],
};
