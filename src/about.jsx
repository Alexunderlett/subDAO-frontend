import React, {Component, useEffect, useState} from 'react';
import t3 from "./images/t-4.png";
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import {useSubstrate} from "./api/contracts";

export default function About(props) {
    const {state,dispatch} = useSubstrate();

    const [id, setId] = useState(null);

    useEffect(() => {
        dispatch({type: 'LOAD_BASE'});
        setId(props.match.params.id)

    }, []);

   const handleClicktoType = (type) => {
        props.history.push(`/${type}/${id}`)
    }

        return (
            <div>
            <section className="section blog-single position-relative">
                <div className="footershape-image-1">
                    <img src={shap1} alt=''/>
                </div>
                <div className="footershape-image-3">
                    <img src={shap2} alt='' />
                </div>
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-4">

                            <div className='sidebar'>
                                <div className='leftTop'>
                                    <img src={t3}  alt=''/>
                                </div>
                                <ul>
                                    <li>Created by Lorem ipsum dolor sit amet</li>
                                    <li>Address: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor </li>
                                    <li>Date: 2010-10-34 00:23:39</li>
                                    <li>Website: <a href="">https://www.baidu.com</a></li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi consequat.
                                    </li>
                                </ul>
                            </div>

                        </aside>
                        <div className="col-lg-8 ">
                            <div className='post-details'>
                                <div>
                                    <h4>Balance</h4>
                                    <ul className='list'>
                                        <li>
                                            <span>pETH 10,000,000</span>
                                            <a href="">2300506e9fbb4d35887c851d84440538</a>
                                        </li>
                                        <li>
                                            <span>pETH 10,000,000</span>
                                            <a href="">2300506e9fbb4d35887c851d84438</a>
                                        </li>
                                        <li>
                                            <span>pETH 10,000,000</span>
                                            <a href="">230059fbb4d35887c851d84440538</a>
                                        </li>
                                        <li>
                                            <span>pETH 10,000,000</span>
                                            <a href="">300506e9fbb4d35887c851d84440538</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4>Moderators</h4>
                                    <ul className='list'>
                                        <li>
                                            <span>Evy</span>
                                            <a href="">2300506e9fbb4d35887c851d84440538</a>
                                        </li>
                                        <li>
                                            <span>pETH</span>
                                            <a href="">2300506e9fbb4d35887c851d84438</a>
                                        </li>
                                        <li>
                                            <span>pETHA</span>
                                            <a href="">230059fbb4d35887c851d84440538</a>
                                        </li>

                                    </ul>
                                </div>
                                <div className='list'>
                                    <h4>Contracts</h4>
                                    <ul>
                                        <li>
                                            <span>DAO Address: </span>
                                            <a href="">2300506e9fbb4d35887c851d84440538</a>
                                        </li>
                                        <li>
                                            <span>Token Address: </span>
                                            <a href="">2300506e9fbb4d35887c851d84438</a>
                                        </li>
                                        <li>
                                            <span>Vault Address: </span>
                                            <a href="">230059fbb4d35887c851d84440538</a>
                                        </li>
                                        <li>
                                            <span>Org Address: </span>
                                            <a href="">300506e9fbb4d35887c851d84440538</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4>Votings</h4>
                                    <ul className='list'>
                                        <li>
                                            <span>Active: </span>
                                            <a href="">2300506e9fbb4d35887c851d84440538</a>
                                        </li>
                                        <li>
                                            <span>Closed: </span>
                                            <a href="">2300506e9fbb4d35887c851d84438</a>
                                        </li>
                                        <li>
                                            <span>Cancel: </span>
                                            <a href="">230059fbb4d35887c851d84440538</a>
                                        </li>

                                    </ul>
                                </div>
                                <div>
                                    <ul className="service-docs">
                                        <li>
                                            <span onClick={handleClicktoType.bind(this,'vote')} >
                                                <i className="fa fa-street-view" />
                                                Voting
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={handleClicktoType.bind(this,'vault')} >
                                                <i className="fa fa-star-o" />
                                                Vault
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={handleClicktoType.bind(this,'org')} >
                                                <i className="fa fa-building-o" />
                                                Org
                                            </span>
                                        </li>

                                    </ul>

                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </section>
            </div>
        )

}
