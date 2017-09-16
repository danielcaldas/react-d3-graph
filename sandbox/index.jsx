import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Sandbox from './Sandbox';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <div>
            <Route path='/' component={Sandbox}/>
        </div>
    </Router>
    , app);
