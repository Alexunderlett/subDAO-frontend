import React, { Component } from 'react';
import PageBackground from "./components/pagebackground";
import t3 from "./images/t-4.png";
import {Button} from "react-bootstrap";

class Org extends Component {
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
    handleClicktoManage = () => {
        let { id } = this.state;
        this.props.history.push(`/manage/${id}`)
    }
    handleClicktoAbout = () => {
        let {id} = this.state;
        this.props.history.push(`/about/${id}`)
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
                            </div>
                            <div className='col-lg-8'>
                                <ul className="org">
                                    <li>
                                        <h6>Moderators</h6>
                                        <div className='orgbg'>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd><a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd><a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd><a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                        </div>
                                    </li>
                                    <li>
                                        <h6>Members</h6>
                                        <div className='orgbg'>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd><a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd><a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd><a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                        </div>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={this.handleClicktoAbout}>Back</Button>
                                        <Button variant="primary" onClick={this.handleClicktoManage}>Manage</Button>
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
export default Org;
