import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

// import reducer from './reducers';

// const middleware = applyMiddleware(promise(), thunk, logger());

// export default createStore(reducer, middleware);
