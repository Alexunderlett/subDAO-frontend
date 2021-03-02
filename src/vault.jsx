import React, {Component, useEffect, useState} from 'react';
import t3 from "./images/t-4.png";
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";


export default function Vault(props){

    const [id, setId] = useState(null);

    useEffect(() => {
        setId(props.match.params.id)

    }, []);

    const handleClicktoDetail = (type) => {
        props.history.push(`/${type}/${id}`)
    }
    const handleClicktoVote = () => {
        props.history.push(`/about/${id}`)
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
                                <div className='vaultBtn'>
                                    <Button variant="primary" onClick={()=>handleClicktoDetail('deposit')}>Deposit</Button>
                                    <Button variant="primary" onClick={()=>handleClicktoDetail('withdraw')}>Withdraw</Button>
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
                                        <Button variant="outline-primary" onClick={handleClicktoVote}>Back</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

