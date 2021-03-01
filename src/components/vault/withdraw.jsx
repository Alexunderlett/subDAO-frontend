import React, { Component } from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import VaultmodalTips from "./vaultmodalTips";

class Withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            showModal: false,
            copied: false,
            address:'',
            reason:'',
            amount:'',
            selectd:'',
            list: [
                {
                    name: 'Non-Profit Organization Template',
                    value: 'value1',
                },
                {
                    name: 'name2',
                    value: 'value2',
                },
                {
                    name: 'name3',
                    value: 'value3',
                }
            ]
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
    triggerConfirm=()=>{
        this.setState({showModal: true})
    }
    handleClose = () => {
        this.setState({showModal: false})
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    handleConfirm=()=>{

        this.setState({showModal: false});

        const {address,amount,reason,selected} = this.state;
        let obj = {
            address,amount,reason,selected
        }
        console.log("====",obj)
    }
    handleSelect = (e) => {
        let template = this.state.list.filter(item => item.value === e.target.value);
        this.setState({selected:template[0].value})
    }
    render() {
        const {list,address,amount,reason} = this.state;
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
                                        <Form.Control as="select" onChange={this.handleSelect}>
                                            <option value=''>Please select option</option>
                                            {
                                                list.map(i => (
                                                    <option value={i.value} key={i.value}>{i.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                        <br />
                                    </li>
                                    <li>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your receiver's address"
                                                value={address}
                                                name='address'
                                                onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your reason"
                                                value={reason}
                                                name='reason'
                                                onChange={this.handleChange}
                                            />
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your amount"
                                                value={amount}
                                                name='amount'
                                                onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="primary" onClick={this.handleClicktoVault}>Back</Button>
                                        <VaultmodalTips
                                            handleClose={this.handleClose}
                                            showTips={this.state.showModal}
                                            handleConfirm={this.handleConfirm}
                                        />
                                        <Button variant="outline-primary" onClick={this.triggerConfirm}>Request</Button>
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
