import React, { Component } from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

class Withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            copied: false,
        }
    }
    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        });
    }
    handleClicktoVault=()=>{
        let { id } = this.state;
        this.props.history.push(`/vault/${id}`)
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
                                <ul className="withdraw">
                                    <li>
                                        <Form.Control as="select">
                                            <option>Default select</option>
                                            <option>Default select</option>
                                            <option>Default select</option>
                                        </Form.Control>
                                        <br />
                                    </li>
                                    <li>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your receiver's address"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your reason"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your amount"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="primary" onClick={this.handleClicktoVault}>Back</Button>
                                        <Button variant="outline-primary" onClick={this.handleClicktoVote}>Request</Button>
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
export default Withdraw;
