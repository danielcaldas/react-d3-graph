import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Layout from './components/Layout';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <div>
            <Route path='/' component={Layout}/>
        </div>
     </Router>
    , app);
