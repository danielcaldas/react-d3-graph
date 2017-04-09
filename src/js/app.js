import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Demo from './components/Demo';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <div>
            <Route path='/' component={Demo}/>
        </div>
     </Router>
    , app);
