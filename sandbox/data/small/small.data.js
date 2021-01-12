module.exports = {
  links: [
    {
      source: 1,
      target: 2,
      label: "link 1 and 2",
    },
    {
      source: 1,
      target: 3,
    },
    {
      source: 1,
      target: 4,
    },
    {
      source: 3,
      target: 4,
      breakPoints: [
        { x: 100, y: 20 },
        { x: 20, y: 100 },
      ],
    },
    {
      source: 4,
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
