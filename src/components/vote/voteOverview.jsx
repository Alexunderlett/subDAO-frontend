import React, { Component } from 'react';
import PageBackground from "../pagebackground";
import VoteEcharts from "./voteEcharts";
import {Badge, Button} from "react-bootstrap";

class VoteOverview extends Component {
    constructor(props) {
        super(props);
        this.state={
            id: null
        };

    }
    componentDidMount() {
        this.setState({
            id:this.props.match.params.id
        })
    }
    handleClicktoVote = () => {
        let { id } = this.state;
        this.props.history.push(`/vote/${id}`)
    }

    render() {
        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4 bg'>
                                <ul>
                                    <li>
                                        Voting Number: 12234345
                                    </li>
                                    <li>status:
                                        <Badge variant="primary"><i className="fa fa-remove"/> Failed</Badge>
                                        <Badge variant="success"><i className="fa fa-check"/> Success</Badge>
                                        <Badge variant="secondary"><i className="fa fa-retweet"/> Pending</Badge>
                                    </li>
                                    <li>
                                        Creator: Hongfei <a href="">43ertowjtrejorejtwoot43ertowjtrejorejtwoot</a>
                                    </li>
                                    <li>
                                        <div>
                                            Voting Description:
                                        </div>
                                        <div>
                                            this voting is to make this voting is to make is to make this voting is to make is to make this voting is to make is to make this voting is to make
                                        </div>
                                    </li>
                                </ul>
                                <div className='brdr'>
                                    <Button variant="outline-primary" onClick={this.handleClicktoVote}>Back</Button>
                                </div>
                            </div>
                            <div className='col-lg-8 bg'>
                                <VoteEcharts />

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
export default VoteOverview;
