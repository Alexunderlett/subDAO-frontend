import React, {Component, useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import VaultmodalTips from "./vaultmodalTips";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";

export default function Withdraw(props){
    const {state,dispatch} = useSubstrate();
    const {vaultcontract} = state;

    const [id, setId] = useState(null);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState('');
    const [token, setToken] = useState('');
    const [reason, setReason] = useState('');
    const [amount, setAmount] = useState('');
    const [logo, setLogo] = useState('');


    const [list, setList] = useState([]);

    useEffect(() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);

    useEffect(async () => {
        await api.vault.getTokenList(vaultcontract).then(data => {
            if (!data) return;
            setList(data)
        });
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
    const handleConfirm= async()=>{

        setShowModal(false)

        let obj = {
            address,amount,selected
        }


        await api.vault.withdraw(vaultcontract,obj,(result)=> {
            if(result){
                props.history.push(`/vault/${id}`)
            }
        }).then(data => {
            // if (!data) return;
            // // setActivelist(data)

            // if(data){
            //     props.history.push(`/vote/${id}`)
            // }

        });
    }
    const handleSelect = (e) => {
        // let template =list.filter(item => item.value === e.target.value);
        setSelected(e.target.value)
    }

        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={logo} alt=""/>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="withdraw">
                                    <li>
                                        <Form.Control as="select" name='selected' onChange={handleSelect}>
                                            <option key='noselect'>Please select option</option>
                                            {
                                                list.map(i => (
                                                    <option value={i} key={i}>{i}</option>
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
                                        {/*<InputGroup className="mb-3">*/}
                                        {/*    <FormControl*/}
                                        {/*        placeholder="Please fill your reason"*/}
                                        {/*        value={reason}*/}
                                        {/*        name='reason'*/}
                                        {/*        onChange={handleChange}*/}
                                        {/*    />*/}
                                        {/*</InputGroup>*/}

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

