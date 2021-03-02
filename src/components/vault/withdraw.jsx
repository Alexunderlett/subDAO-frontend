import React, {Component, useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import VaultmodalTips from "./vaultmodalTips";

export default function Withdraw(props){


    const [id, setId] = useState(null);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState('');
    const [reason, setReason] = useState('');
    const [amount, setAmount] = useState('');
    const [list, setList] = useState([
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
    ]);

    useEffect(() => {
        setId(props.match.params.id)

    }, []);

    const handleClicktoVault=()=>{
       props.history.push(`/vault/${id}`)
    }
    const triggerConfirm=()=>{
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        switch(name){
            case'address':
                setAddress(value)
                break;
            case'reason':
                setReason(value)
                break;
            case'amount':
                setAmount(value)
                break;
            default:
                break;
        }
    }
    const handleConfirm=()=>{

        setShowModal(false)

        let obj = {
            address,amount,reason,selected
        }
        console.log("====",obj)
    }
    const handleSelect = (e) => {
        let template =list.filter(item => item.value === e.target.value);
        setSelected(template[0].value)
    }

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
                                        <Form.Control as="select" onChange={handleSelect}>
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
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your reason"
                                                value={reason}
                                                name='reason'
                                                onChange={handleChange}
                                            />
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Please fill your amount"
                                                value={amount}
                                                name='amount'
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="primary" onClick={handleClicktoVault}>Back</Button>
                                        <VaultmodalTips
                                            handleClose={handleClose}
                                            showTips={showModal}
                                            handleConfirm={handleConfirm}
                                        />
                                        <Button variant="outline-primary" onClick={triggerConfirm}>Request</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

