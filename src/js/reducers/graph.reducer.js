const defaultState = {
    paused: false,
    nodes: [],
    nodesCoords: {},
    links: []
};

export default function reducer(state=defaultState, action) {
    switch (action.type) {
        case 'RENDER_GRAPH':
            return {...state, fetching: true};
            break;
    }

    return state;
}
