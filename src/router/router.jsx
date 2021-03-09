import React from 'react';
import Home from '../home';
import About from '../about';
import Createnew from '../createNew';
import Vote from '../vote';
import NewVote from '../components/vote/newVote';
import VoteView from '../components/vote/voteView';
import VoteOverview from '../components/vote/voteOverview';
import Vault from '../vault';
import Deposit from '../components/vault/deposit';
import Withdraw from '../components/vault/withdraw';
import Org from '../org';
import OrgManage from '../components/org/orgManage';

import {HashRouter as Router, Route, Switch} from "react-router-dom";

function routerlink() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route   activeClassName="active"  path="/about" component={About}/>
                <Route path="/create" component={Createnew}/>
                <Route path="/Vote" component={Vote}/>
                <Route path="/newVote" component={NewVote}/>
                <Route path="/voteView/:voteid" component={VoteView}/>
                <Route path="/voteOverview/:voteid" component={VoteOverview}/>
                <Route path="/vault" component={Vault}/>
                <Route path="/deposit/:id" component={Deposit}/>
                <Route path="/withdraw/:id" component={Withdraw}/>
                <Route path="/org" component={Org}/>
                <Route path="/manage" component={OrgManage}/>
            </Switch>
        </Router>);
}

export default routerlink;
