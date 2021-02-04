import React, { Component } from 'react';
import t3 from "./images/t-4.png";
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";

class Vault extends Component {
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
    handleClicktoDetail = (type) => {
        let { id } = this.state;
        this.props.history.push(`/${type}/${id}`)
    }
    handleClicktoVote = () => {
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
                                <div className='vaultBtn'>
                                    <Button variant="primary" onClick={this.handleClicktoDetail.bind(this,'deposit')}>Deposit</Button>
                                    <Button variant="primary" onClick={this.handleClicktoDetail.bind(this,'withdraw')}>Withdraw</Button>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vault">
                                    <li>
                                        <h6>Balance</h6>
                                        <div className='vaultbg'>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000</dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000</dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000</dd>
                                            </dl>
                                        </div>
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <div className='vaultbg'>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000 <a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000 <a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000 <a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000 <a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000 <a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                            <dl>
                                                <dt>pETH</dt>
                                                <dd>1,000.0000 <a href="">fdagfdg56ythdgfjuiyyryttefd</a></dd>
                                            </dl>
                                        </div>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={this.handleClicktoVote}>Back</Button>
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
export default Vault
