import React, { Component } from 'react';
import t3 from "./images/t-4.png";
import Headertop from "./components/Headertop";
import bg from "./images/shape-5.png";
import bg2 from "./images/round-shape.png";
import bg3 from "./images/dottd-squre.png";
import VotePagination from './components/votePagination'

import {Button, Table} from "react-bootstrap";

class Vote extends Component {

    componentDidMount() {
        // console.log(this.props.match.params.id)
    }
    handleClicktonewVote = () => {
        this.props.history.push(`/newVote`)
    }
    render() {
        return (
            <div>
                <Headertop />

                <section>
                    <div className="shape-image-five wow fadeInLeft" data-wow-duration="3s">
                        <img src={bg} alt=""/>
                    </div>
                    <div className="shape-image-four">
                        <img src={bg2} alt="" />
                    </div>
                    <div className="shape-image-two">
                        <img src={bg3} alt="" />
                    </div>
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>
                                <div className='voteBtn'>
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
                                                <td>Otto</td>
                                                <td><span><i className="fa fa-sign-in" /> view</span></td>
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

                                        <VotePagination />
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
