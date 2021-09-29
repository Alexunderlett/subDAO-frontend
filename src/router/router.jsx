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

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function routerlink() {
    return (
        <Switch>
            {/*<Route path="/" component={Home} exact/>*/}

            <Route path="/home" component={Home} />
            <Route  path="/about/:id/:owner" component={About}/>
            {/*<Route   activeClassName="active"  path="/about/:id" component={About}/>*/}
            <Route path="/create" component={Createnew} />
            <Route path="/Vote/:id/:owner" component={Vote} />
            <Route path="/newVote/:owner" component={NewVote} />
            <Route path="/voteView/:id/:voteid/:owner" component={VoteView} />
            <Route path="/voteOverview/:id/:voteid/:owner" component={VoteOverview} />
            <Route path="/vault/:id/:owner" component={Vault} />
            <Route path="/deposit/:id/:owner" component={Deposit} />
            <Route path="/withdraw/:id/:owner" component={Withdraw} />
            <Route path="/org/:id/:owner" component={Org} />
            <Redirect from="/" to="/home" exact />
        </Switch>
    );
}

export default routerlink;
