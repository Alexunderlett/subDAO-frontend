import React, {Component, useEffect, useState} from 'react';
import PageBackground from "./components/pagebackground";
import t3 from "./images/t-4.png";
import {Button} from "react-bootstrap";
import {useSubstrate} from "./api/contracts";

export default function Org(props){

    const {state,dispatch} = useSubstrate();
    const {orgcontract} = state;

    const [id, setId] = useState(null);

    useEffect(() => {
        setId(props.match.params.id)
        dispatch({type: 'LOAD_ORG'});
    }, []);


    useEffect(() => {



        // orgcontract





    }, [orgcontract]);

    const handleClicktoManage = () => {
       props.history.push(`/manage/${id}`)
    }
    const handleClicktoAbout = () => {
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
                                    <Button variant="outline-primary" onClick={handleClicktoAbout}>Back</Button>
                                    <Button variant="primary" onClick={handleClicktoManage}>Manage</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}

