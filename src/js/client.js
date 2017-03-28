import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Layout from './components/Layout';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path='/' component={Layout}/>
            </div>
         </Router>
    </Provider>
    , app);
