import React from 'react';
import Home from './home';
import About from './about';
import Createnew from './create';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

function routerlink(){
    return (
        <Router>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About} />
            <Route path="/create" component={Createnew} />
        </Router>);
}
export default routerlink;
