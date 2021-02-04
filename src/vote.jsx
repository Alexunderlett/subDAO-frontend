import React, { Component } from 'react';
import t3 from "./images/t-4.png";
import VotePagination from './components/votePagination';
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
    handleClicktoview (voteid){
        let { id } = this.state;
        this.props.history.push(`/voteView/${id}/${voteid}`)
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
                                        <Table striped bordered hover>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Otto </td>
                                                <td><span onClick={this.handleClicktoview.bind(this,55)}><i className="fa fa-sign-in"/> view</span></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td><span><i className="fa fa-sign-in" /> view</span></td>
                                            </tr>
                                            </tbody>
                                        </Table>

                                    </li>
                                    <li>
                                        <h6>Pending Voting List</h6>
                                        <Table striped bordered hover>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Pending</td>
                                                <td><span><i className="fa fa-toggle-on" /> trigger</span></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Pending</td>
                                                <td><span><i className="fa fa-toggle-on" /> trigger</span></td>
                                            </tr>
                                            </tbody>
                                        </Table>
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
