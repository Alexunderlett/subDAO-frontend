import React, {Component, useEffect, useReducer, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import ConnectContract from '../../api/connectContract'
import {useSubstrate} from "../../api/contracts";

export default function SecondStep(props) {
    const {maincontract} = useSubstrate();

    let [selected, setselected] = useState([]);
    let [list, setlist] = useState([]);

    const toThirdStep = () => {
        props.handlerSet(3);
        sessionStorage.setItem('secondStep', JSON.stringify(selected))
    }
    const toFirstStep = () => {
        props.handlerSet(1)
    }
    const handleSelect = (e) => {
        let template = list.filter(item => item.id === e.target.value);
        setselected(template)

    }
    useEffect(() => {
        let selected = JSON.parse(sessionStorage.getItem('secondStep'));
        if (selected) {
            setselected(selected)
        }
    }, []);
    useEffect(async () => {
        if(maincontract){
            console.log(maincontract)
            const AccountId = JSON.parse(sessionStorage.getItem('account'));
            const list = await maincontract.query.listTemplates(AccountId[0].address, { value: 0, gasLimit: -1 });
            setlist(list.output.toHuman())
        }

    }, [maincontract]);
    return <ul>
        <li><Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Please choose one template to create your DAO</Form.Label>
            <Form.Control as="select" onChange={handleSelect} value={selected && selected[0] && selected[0].id}>
                <option>please select option</option>
                {
                    list.map(i => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                    ))
                }
            </Form.Control>
        </Form.Group></li>

        <li>
            <div className="templateBrdr">
                {
                    selected && selected[0] && !!selected[0].components.length && selected[0].components.map(item => (
                        <div key={item[1]}>{item[0]}</div>
                    ))
                }
            </div>
        </li>
        <li className='brdr'>
            <Button variant="outline-primary" className='leftBtn' onClick={toFirstStep}>Let me think~</Button>
            <Button variant="primary" onClick={toThirdStep}>Go Next</Button>
        </li>
    </ul>;

}
