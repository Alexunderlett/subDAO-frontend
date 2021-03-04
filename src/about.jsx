import React, { Component, useEffect, useState } from 'react';
import t3 from "./images/t-4.png";
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import { useSubstrate } from "./api/contracts";

import { Keyring } from "@polkadot/keyring";


import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider
} from '@polkadot/extension-dapp';


export default function About(props) {
    const { state, dispatch } = useSubstrate();
    const { basecontract, daoManagercontract } = state;

    const [id, setId] = useState(null);

    useEffect(() => {
        dispatch({ type: 'LOAD_BASE' });
        dispatch({ type: 'LOAD_DAO' });
        setId(props.match.params.id)

    }, []);

    useEffect(async () => {
        if (basecontract === null) return;

        try {
            const allInjected = await web3Enable('SubDAO');
            console.log("======allInjected", allInjected);
            if (allInjected.length == 0) {
                console.error("!!!!! No wallet extention detected!!");
                return;
            }

            const allAccounts = await web3Accounts();
            console.log("======allAccounts", allAccounts);

            if (allAccounts && allAccounts.length > 0) {
                console.log("the first account: ", allAccounts[0].address);
            } else {
                console.error("no valid accounts available!");
                return;
            }


            const AccountId = allAccounts[0].address;

            const injector = await web3FromAddress(AccountId);

            // const value = 0;
            // const gasLimit = 138003n * 1000000n;
            // const AccountId = JSON.parse(sessionStorage.getItem('account')); //本地账户

            console.log("local account id : ", AccountId)

            //basecontract
            console.log("baseContract: ", basecontract);

            let daoName = "mydao";
            let daoLogo = "http://example.com/logo.jpg";
            let daoDesc = "Hello World!";
            let daoOwner = AccountId;

            let optionParam = { value: 0, gasLimit: -1 };

            let tx;
            let result;
            

            // Test code for account in extension
            // tx = await basecontract.tx.initBase(optionParam, daoName, daoLogo, daoDesc);
            // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     } else {
            //         console.log("unexpected result", result);
            //     }
            // });

            tx = await basecontract.tx.initBase(optionParam, daoName, daoLogo, daoDesc);
            result = await tx.signAndSend(AccountId, { signer: injector.signer });
            console.log('result ', result.toString());

            // tx = await basecontract.tx.setName(optionParam, daoName);
            // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     } else {
            //         console.log("unexpected result", result);
            //     }
            // });

            // tx = await basecontract.tx.setDesc(optionParam, daoDesc);
            // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     }
            // });

            // tx = await basecontract.tx.setOwner(optionParam, daoOwner);
            // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     }
            // });


            // Test code for local key
            // const keyring = new Keyring({type: 'sr25519'});
            // let alicePair = keyring.createFromUri('//Alice');

            // let resp = await basecontract.tx
            // .setName(optionParam, daoName)
            // .signAndSend(alicePair, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     }
            // });

            // await basecontract.tx
            // .setLogo(optionParam, daoLogo)
            // .signAndSend(alicePair, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     }
            // });

            // await basecontract.tx
            // .setDesc(optionParam, daoDesc)
            // .signAndSend(alicePair, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     }
            // });

            // await basecontract.tx
            // .setOwner(optionParam, daoOwner)
            // .signAndSend(alicePair, (result) => {
            //     if (result.status.isInBlock) {
            //         console.log('in a block');
            //     } else if (result.status.isFinalized) {
            //         console.log('finalized');
            //     }
            // });

            result = await basecontract.query.getName(AccountId, { value: 0, gasLimit: -1 });
            console.log("======name", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }

            result = await basecontract.query.getLogo(AccountId, { value: 0, gasLimit: -1 });
            console.log("======logo", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }

            result = await basecontract.query.getDesc(AccountId, { value: 0, gasLimit: -1 });
            console.log("======desc", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }

            result = await basecontract.query.getOwner(AccountId, { value: 0, gasLimit: -1 });
            console.log("======owner", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }

        } catch (e) {
            console.log("Catch the exception!!!", e); // 30
        }
    }, [basecontract]);

    useEffect(async () => {
        if (daoManagercontract === null) return;

        //daoManagercontract





    }, [daoManagercontract]);

    const handleClicktoType = (type) => {
        props.history.push(`/${type}/${id}`)
    }

    return (
        <div>
            <section className="section blog-single position-relative">
                <div className="footershape-image-1">
                    <img src={shap1} alt='' />
                </div>
                <div className="footershape-image-3">
                    <img src={shap2} alt='' />
                </div>
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-4">

                            <div className='sidebar'>
                                <div className='leftTop'>
                                    <img src={t3} alt='' />
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
                                            <span onClick={() => handleClicktoType('vote')} >
                                                <i className="fa fa-street-view" />
                                                Voting
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={() => handleClicktoType('vault')} >
                                                <i className="fa fa-star-o" />
                                                Vault
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={() => handleClicktoType('org')} >
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
