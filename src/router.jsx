import React from 'react';
import Home from './home';
import About from './about';
import Createnew from './create';
import Vote from './vote';
import NewVote from './components/vote/newVote';

import { BrowserRouter as Router, Route} from "react-router-dom";

function routerlink(){
    return (
        <Router>
            <Route path="/" component={Home} exact />
            <Route path="/about/:id" component={About} />
            <Route path="/create" component={Createnew} />
            <Route path="/Vote/:id" component={Vote} />
            <Route path="/newVote" component={NewVote} />
        </Router>);
}
export default routerlink;
