import React, {useEffect, useState} from 'react';
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import {useSubstrate} from "./api/contracts";
import Accounts from './api/Account';
import publicJs from "./utils/publicJs";

import {Keyring} from "@polkadot/keyring";
import Account from './api/Account';


export default function About(props) {
    const {state, dispatch} = useSubstrate();
    const {basecontract, erc20contract, daoManagercontract} = state;

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');

    useEffect(() => {
        dispatch({type: 'LOAD_BASE'});
        dispatch({type: 'LOAD_ERC20'});
        dispatch({type: 'LOAD_DAO'});
        setId(props.match.params.id)

    }, []);

    useEffect(async () => {

        const AccountId = await Accounts.accountAddress();
        if (basecontract === null || !AccountId) return;

        if (erc20contract === null || !AccountId) return;

        const value = 0;
        const gasLimit = -1;

        await basecontract.query.getName(AccountId, {value, gasLimit}).then(nameResult=>{
            nameResult = publicJs.formatResult(nameResult);
            setName(nameResult);
        });

        await basecontract.query.getLogo(AccountId, {value, gasLimit}).then(logoResult=>{
            logoResult = publicJs.formatResult(logoResult);
            setLogo(logoResult);
        });

        await basecontract.query.getDesc(AccountId, {value, gasLimit}).then(descResult=>{
            descResult = publicJs.formatResult(descResult);
            setDescription(descResult);
        });


        await basecontract.query.getOwner(AccountId, {value, gasLimit}).then(ownerResult=>{
            ownerResult = publicJs.formatResult(ownerResult);
            setOwner(ownerResult)
        });


        console.log('state---', state);


        // Section for ERC20 test
        await erc20contract.query.name(AccountId, {value, gasLimit}).then(nameResult=>{
            nameResult = publicJs.formatResult(nameResult);
            console.log("erc20 token name:", nameResult);
        });

        await erc20contract.query.symbol(AccountId, {value, gasLimit}).then(nameResult=>{
            nameResult = publicJs.formatResult(nameResult);
            console.log("erc20 token symbol:",nameResult);
        });

        await erc20contract.query.totalSupply(AccountId, {value, gasLimit}).then(nameResult=>{
            nameResult = publicJs.formatResult(nameResult);
            console.log("erc20 token total supply:",nameResult);
        });

        // try {
        //
        //
        //     const injector = await Accounts.accountInjector();
        //
        //     // const value = 0;
        //     // const gasLimit = 138003n * 1000000n;
        //     // const AccountId = JSON.parse(sessionStorage.getItem('account')); //本地账户
        //
        //
        //     let daoName = "mydao";
        //     let daoLogo = "http://example.com/logo.jpg";
        //     let daoDesc = "Hello World!";
        //     let daoOwner = AccountId;
        //
        //     let optionParam = {value: 0, gasLimit: -1};
        //
        //     let tx;
        //     let result;
        //
        //
        //     // Test code for account in extension
        //     // tx = await basecontract.tx.initBase(optionParam, daoName, daoLogo, daoDesc);
        //     // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     } else {
        //     //         console.log("unexpected result", result);
        //     //     }
        //     // });
        //
        //     tx = await basecontract.tx.initBase(optionParam, daoName, daoLogo, daoDesc);
        //     result = await tx.signAndSend(AccountId, {signer: injector.signer});
        //     console.log('result ', result.toString());
        //
        //     // tx = await basecontract.tx.setName(optionParam, daoName);
        //     // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     } else {
        //     //         console.log("unexpected result", result);
        //     //     }
        //     // });
        //
        //     // tx = await basecontract.tx.setDesc(optionParam, daoDesc);
        //     // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     }
        //     // });
        //
        //     // tx = await basecontract.tx.setOwner(optionParam, daoOwner);
        //     // await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     }
        //     // });
        //
        //
        //     // Test code for local key
        //     // const keyring = new Keyring({type: 'sr25519'});
        //     // let alicePair = keyring.createFromUri('//Alice');
        //
        //     // let resp = await basecontract.tx
        //     // .setName(optionParam, daoName)
        //     // .signAndSend(alicePair, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     }
        //     // });
        //
        //     // await basecontract.tx
        //     // .setLogo(optionParam, daoLogo)
        //     // .signAndSend(alicePair, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     }
        //     // });
        //
        //     // await basecontract.tx
        //     // .setDesc(optionParam, daoDesc)
        //     // .signAndSend(alicePair, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     }
        //     // });
        //
        //     // await basecontract.tx
        //     // .setOwner(optionParam, daoOwner)
        //     // .signAndSend(alicePair, (result) => {
        //     //     if (result.status.isInBlock) {
        //     //         console.log('in a block');
        //     //     } else if (result.status.isFinalized) {
        //     //         console.log('finalized');
        //     //     }
        //     // });
        //
        //
        //
        //
        // } catch (e) {
        //     console.log("Catch the exception!!!", e);
        // }
    }, [basecontract, erc20contract]);

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
                    <img src={shap1} alt=''/>
                </div>
                <div className="footershape-image-3">
                    <img src={shap2} alt=''/>
                </div>
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-4">

                            <div className='sidebar'>
                                <div className='leftTop'>
                                    <img src={logo} alt=''/>
                                </div>
                                <ul>
                                    <li>{name}</li>
                                    <li>Owner: {owner}</li>
                                    <li>{description}</li>
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
                                            <span onClick={() => handleClicktoType('vote')}>
                                                <i className="fa fa-street-view"/>
                                                Voting
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={() => handleClicktoType('vault')}>
                                                <i className="fa fa-star-o"/>
                                                Vault
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={() => handleClicktoType('org')}>
                                                <i className="fa fa-building-o"/>
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
