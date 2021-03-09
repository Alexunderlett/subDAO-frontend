import React, {useEffect, useState} from 'react';
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import {useSubstrate} from "./api/contracts";

import api from './api/index';


export default function About(props) {
    const {state, dispatch} = useSubstrate();
    const {basecontract, vaultcontract, orgcontract, votecontract, erc20contract, daoManagercontract,apiState} = state;

    const [id, setAId] = useState(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [moderators, setModerators] = useState([]);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);
    const [contractlist, setcontractlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    const [daostate, setdaostate] = useState(false);
    const [basestate, setbasestate] = useState(false);
    const [vaultstate, setvaultstate] = useState(false);
    const [votestate, setvotestate] = useState(false);
    const [orgstate, setorgstate] = useState(false);

    useEffect(async () => {
        if(apiState !== 'READY' ) return;
        await api.dao.InitDAO(state, dispatch, props.match.params.id, (data) => {
            setdaostate(data)
        });
    }, [apiState]);
    useEffect(async () => {
        setAId(props.match.params.id);
    }, []);

    useEffect(async () => {

        if (daoManagercontract == null && daostate) return;
        await api.dao.queryComponentAddrs(daoManagercontract).then(data => {
            if (data) {
                setcontractlist(data)
            }

        });

    }, [daoManagercontract, daostate]);

    useEffect(async () => {

        const {vault_addr, org_addr, vote_addr, erc20_addr, base_addr} = contractlist;
        if (base_addr != null) {
            await api.base.InitBase(state, dispatch, base_addr, (data) => {
                setbasestate(data)
            });
        }
        if (vault_addr != null) {
            await api.vault.InitVault(state, dispatch, vault_addr, (data) => {
                setvaultstate(data)
            });
        }

        if (org_addr != null) {
            await api.org.InitOrg(state, dispatch, org_addr, (data) => {
                setorgstate(data)
            });
        }
        if (vote_addr != null) {
            await api.vote.InitVote(state, dispatch, vote_addr, (data) => {
                setvotestate(data)
            });
        }
        if (erc20_addr != null) {
            await api.erc20.InitErc20(state, dispatch, erc20_addr);
        }

    }, [daoManagercontract, contractlist]);


    useEffect(async () => {
        sessionStorage.setItem('logo', logo)
    }, [logo]);
    useEffect(async () => {
        let arr = [];
        let i = 0;
        for (let item of tokenlist) {
            await api.vault.getBalanceOf(vaultcontract, item).then(data => {
                if (!data) return;

                arr[i] = {
                    address: item,
                    balance: data
                };
                i++;
            });
        }
        setbalancelist(arr)
    }, [tokenlist]);
    useEffect(async () => {
        if (!basestate || contractlist.base_addr == null || !contractlist.base_addr) return;
        await api.base.getBaseData(basecontract).then(data => {
            if (!data) return;
            // let {nameResult, logoResult, descResult, ownerResult, erc20contract} = data;
            let {owner, name, logo, desc} = data;

            setName(name);
            setLogo(logo);
            setDescription(desc);
            setOwner(owner);
        });
    }, [basecontract, basestate]);

    useEffect(async () => {
        if (!vaultstate || contractlist.vault_addr == null || !contractlist.vault_addr) return;
        await api.vault.getTokenList(vaultcontract).then(data => {
            if (!data) return;
            settokenlist(data)
        });
    }, [vaultcontract, vaultstate]);

    useEffect(async () => {
        if (!votestate || contractlist.vote_addr == null || !contractlist.vote_addr) return;
        await api.vote.queryOpenVote(votecontract).then(data => {
            if (!data) return;
            let arr = data.slice(0, 3);
            setActivelist(arr)
        });
    }, [votecontract, votestate]);

    useEffect(async () => {
        if (!orgstate || contractlist.org_addr == null || !contractlist.org_addr) return;

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


    }, [orgcontract, orgstate]);

    const handleClicktoType = (type) => {
        const {vault_addr, org_addr, vote_addr, erc20_addr, base_addr} = contractlist;
        let address;
        switch (type) {
            case'vote':
                address = vote_addr;
                break;
            case'vault':
                address = vault_addr;
                break;
            default:
            case'org':
                address = org_addr;
                break;
        }

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
                                    <ul className='list balance'>
                                        {
                                            balancelist.map((item, index) =>
                                                <li key={`balance_${index}`}>
                                                    <a href="#"
                                                       target='_blank'>{item.address}</a><span>{item.balance}</span>
                                                </li>
                                            )
                                        }


                                    </ul>
                                </div>
                                <div>
                                    <h4>Moderators</h4>
                                    <ul className='list'>
                                        {
                                            moderators.map((i, index) => <li key={moderators[index]}>
                                                <span>{moderators[index][1]}</span>
                                                <a href="#" target='_blank'>{moderators[index][0]}</a>
                                            </li>)
                                        }

                                    </ul>
                                </div>
                                <div>
                                    <h4>Contracts</h4>
                                    {
                                        contractlist != null && <ul className='list'>{
                                            Object.keys(contractlist).map((key) => (
                                                <li key={`contract_${key}`}>
                                                    <span>{key}: </span>
                                                    <a href="#" target='_blank'>{contractlist[key]}</a>
                                                </li>))
                                        }

                                        </ul>
                                    }
                                </div>
                                <div>
                                    <h4>Votings</h4>
                                    <ul className='list'>
                                        {
                                            activelist.map((item, index) => <li key={`votings_${index}`}>
                                                {/*<span>Active: </span>*/}
                                                <a href="#" target='_blank'>{item.title}</a>
                                            </li>)
                                        }

                                    </ul>
                                </div>
                                <div>
                                    <ul className="service-docs">
                                        {
                                            contractlist.vote_addr !=null  &&<li>
                                                <span onClick={() => handleClicktoType('vote')}>
                                                    <i className="fa fa-street-view"/>
                                                    Voting
                                                </span>
                                            </li>
                                        }
                                        {
                                            contractlist.vault_addr !=null  && <li>
                                            <span onClick={() => handleClicktoType('vault')}>
                                                <i className="fa fa-star-o"/>
                                                Vault
                                            </span>
                                            </li>
                                        }

                                        {
                                            contractlist.org_addr !=null  && <li>
                                            <span onClick={() => handleClicktoType('org')}>
                                                <i className="fa fa-building-o"/>
                                                Org
                                            </span>
                                            </li>
                                        }


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
