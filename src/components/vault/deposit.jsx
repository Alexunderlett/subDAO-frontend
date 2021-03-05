import React, {Component, useEffect, useState} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button, Form, Alert} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Deposit(props){


    const [id, setId] = useState(null);
    const [copied, setCopied] = useState(false);
    const [selected, setSelected] = useState(null);
    const [list, setList] = useState([
        {
            name: 'Non-Profit Organization Template',
            value: 'value1',
            img:require('../../images/t-4.png'),
            address:'11ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
        },
        {
            name: 'name2',
            value: 'value2',
            img:require('../../images/t-2.png'),
            address:'ann3234 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
        },
        {
            name: 'name3',
            value: 'value3',
            img:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1266732253,2995515206&fm=111&gp=0.jpg',
            address:'ann654564 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
        }
    ]);

    useEffect(() => {
        setId(props.match.params.id)

    }, []);


    const handleClicktoVault=()=>{

        props.history.push(`/vault/${id}`)
    }

    const handleSelect = (e) => {
        let template = list.filter(item => item.value === e.target.value);
        setSelected(template[0])
    }



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
                                        <Form.Control as="select"  onChange={handleSelect} >
                                            <option value=''>Please select option</option>
                                            {
                                                list.map(i => (
                                                    <option value={i.value} key={i.value}>{i.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div className="col-4">

                                                {   selected &&
                                                    <div className='qrcode'>
                                                        <img src={selected.img} width="100%" alt=""/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-8">
                                                {
                                                    selected && <div>
                                                <div className='addressTop'>Deposit address</div>
                                                <div className='address'>

                                                            {selected.address}
                                                            <CopyToClipboard text='ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
                                                                             onCopy={() => setCopied(true,()=>{setTimeout(()=>{setCopied(false)},2000)})}>
                                                                <i className='fa fa-copy'/>
                                                            </CopyToClipboard>


                                                </div>
                                                    </div>
                                                }
                                                <div className='mt-4'>
                                                    {
                                                        copied &&
                                                        <Alert variant='primary' transition={true}>
                                                            Deposit address copied to clipboard!
                                                        </Alert>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </li>

                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={handleClicktoVault}>Back</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

