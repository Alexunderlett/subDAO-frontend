import React, {useEffect, useState} from 'react';
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import {useSubstrate} from "./api/contracts";
// import Accounts from './api/Account';
// import publicJs from "./utils/publicJs";
import api from './api/index';
import publicJs from "./utils/publicJs";
import Accounts from "./api/Account";

// import {Keyring} from "@polkadot/keyring";


export default function About(props) {
    const {state, dispatch} = useSubstrate();
    const {basecontract, vaultcontract,orgcontract,votecontract,erc20contract} = state;

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [moderators, setModerators] = useState([]);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);

    useEffect(async () => {
        setId(props.match.params.id);


        await api.vault.InitVault(state,dispatch,'5HS7Vufvtr7sCrpS4yeXBZWurT5BqpZpzKgwRsZfvmF8euMv');
        await api.org.InitOrg(state,dispatch,'5CkgafcwX8XRV7gTqMWcroBt25c8vJxHmZdiSaKFGMRyMtrd');
        await api.vote.InitVote(state,dispatch,'5CPrv4sEHos9Xc6j2AHntSaCaQPyE3ufiKnkDV1QjaV3iVsb');
        await api.erc20.InitErc20(state,dispatch,'5HU5TSviQ8UvzEoPTKb9wmqsmbSjbMtWe6AZcvyNVvDg1yqM');

    }, []);

    useEffect(async () => {
        sessionStorage.setItem('logo',logo)
    }, [logo]);

    useEffect(async () => {
        if(basecontract==null||vaultcontract==null||orgcontract==null||votecontract==null||erc20contract==null)return;

        await api.base.getBaseData(basecontract).then(data => {
            if (!data) return;
            let {nameResult, logoResult, descResult, ownerResult,erc20contract} = data;
            setName(nameResult);
            setLogo(logoResult);
            setDescription(descResult);
            setOwner(ownerResult);
        });

        // let erc20 = '5HU5TSviQ8UvzEoPTKb9wmqsmbSjbMtWe6AZcvyNVvDg1yqM';
        // await api.vault.getBalanceOf(vaultcontract,erc20).then(data => {
        //     if (!data) return;
        //     // setbalancelist(data)
        // });
        await api.vote.queryOpenVote(votecontract).then(data => {
            if (!data) return;
            let arr = data.slice(0,3);
            setActivelist(arr)
        });
        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setModerators(data)
        });


        // const AccountId = await Accounts.accountAddress();
        // const value = 0;
        // const gasLimit = -1;
        // if(erc20contract==null) return ;
        // await erc20contract.query.name(AccountId, {value, gasLimit}).then(nameResult=>{
        //     nameResult = publicJs.formatResult(nameResult);
        //     console.log("erc20 token name:", nameResult);
        // });
        //
        // await erc20contract.query.symbol(AccountId, {value, gasLimit}).then(nameResult=>{
        //     nameResult = publicJs.formatResult(nameResult);
        //     console.log("erc20 token symbol:",nameResult);
        // });
        //
        // await erc20contract.query.totalSupply(AccountId, {value, gasLimit}).then(nameResult=>{
        //     nameResult = publicJs.formatResult(nameResult);
        //     console.log("erc20 token total supply:",nameResult);
        // });


    }, [basecontract, vaultcontract,orgcontract,votecontract,erc20contract]);

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
                                        {
                                            balancelist.map((item,index)=>
                                                <li key={`balance_${index}`}>
                                                    <span>pETH 10,000,000</span>
                                                    <a href="#">2300506e9fbb4d35887c851d84440538</a>
                                                </li>
                                            )
                                        }


                                    </ul>
                                </div>
                                <div>
                                    <h4>Moderators</h4>
                                    <ul className='list'>
                                        {
                                            moderators.map((i,index)=><li key={moderators[index]}>
                                                {/*<span>Evy</span>*/}
                                                <a href="#">{moderators[index]}</a>
                                            </li>)
                                        }

                                        {/*<li>*/}
                                        {/*    <span>pETH</span>*/}
                                        {/*    <a href="">2300506e9fbb4d35887c851d84438</a>*/}
                                        {/*</li>*/}
                                        {/*<li>*/}
                                        {/*    <span>pETHA</span>*/}
                                        {/*    <a href="">230059fbb4d35887c851d84440538</a>*/}
                                        {/*</li>*/}

                                    </ul>
                                </div>
                                <div>
                                    <h4>Contracts</h4>
                                    <ul className='list'>
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
                                        {
                                            activelist.map((item,index)=><li key={`votings_${index}`}>
                                                {/*<span>Active: </span>*/}
                                                <a href="#">{item.title}</a>
                                            </li>)
                                        }

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
