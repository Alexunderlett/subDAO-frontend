import React from 'react';
import About from '../about';

import {HashRouter as Router, Route, Switch} from "react-router-dom";

function subrouterlink() {
    return (
        <Router>
            <Switch>
                <Route path="/home/about/:id" component={About}/>
            </Switch>
        </Router>);
}

export default subrouterlink;
