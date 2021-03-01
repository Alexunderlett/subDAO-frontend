import React, { Component } from 'react';
import t3 from "./images/t-4.png";
import VotePagination from './components/votePagination';
import VotePending from './components/votePending';
import VoteActive from './components/voteActive';
import {Button, Table} from "react-bootstrap";
import PageBackground from "./components/pagebackground";

class Vote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }

    componentDidMount() {
        this.setState({
            id:this.props.match.params.id
        })
    }
    handleClicktonewVote = () => {
        let { id } = this.state;
        this.props.history.push(`/newVote/${id}`)
    }

    render() {
        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>
                                <div className='newVote'>
                                    <Button variant="primary" onClick={this.handleClicktonewVote}>New voting</Button>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vote">
                                    <li>
                                        <h6>Active Voting List</h6>
                                        <VoteActive  id={this.state.id}  history={this.props.history} />
                                    </li>
                                    <li>
                                        <h6>Pending Voting List</h6>
                                        <VotePending  id={this.state.id}  history={this.props.history}  />
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <VotePagination id={this.state.id}  history={this.props.history}  />
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
export default Vote
