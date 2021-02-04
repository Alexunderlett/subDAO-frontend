import React, {Component} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import d1 from "../../images/download.png";
import {Button, Form, Alert} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Deposit extends Component {
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
                    <PageBackground/>
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vault">
                                    <li>
                                        <Form.Control as="select">
                                            <option>Default select</option>
                                            <option>Default select</option>
                                            <option>Default select</option>
                                        </Form.Control>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div className="col-4">
                                                <div className='qrcode'><img src={d1} alt=""/></div>
                                            </div>
                                            <div className="col-8">
                                                <div className='addressTop'>Deposit address</div>
                                                <div className='address'>
                                                    ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph
                                                    <CopyToClipboard text='ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
                                                                     onCopy={() => this.setState({copied: true},()=>{setTimeout(()=>{this.setState({copied: false})},2000)})}>
                                                        <i className='fa fa-copy'/>
                                                    </CopyToClipboard>
                                                </div>
                                                <div>

                                                </div>
                                                <div className='mt-4'>
                                                    {
                                                        this.state.copied &&
                                                        <Alert variant='primary' transition={true}>
                                                            Deposit address copied to clipboard!
                                                        </Alert>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </li>

                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={this.handleClicktoVault}>Back</Button>
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

export default Deposit;
