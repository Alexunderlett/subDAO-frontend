import React, {useEffect, useState} from 'react';
import shap1 from "./images/footer-shap-1.png";
import shap2 from "./images/footer-shap-3.png";
import {useSubstrate} from "./api/contracts";

import api from './api/index';


export default function About(props) {
    const {state, dispatch} = useSubstrate();
    const {basecontract, vaultcontract, orgcontract, votecontract, erc20contract, daoManagercontract} = state;


    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [moderators, setModerators] = useState([]);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);
    const [contractlist, setcontractlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    useEffect(async () => {
        await api.dao.InitDAO(state, dispatch, props.match.params.id);

    }, []);

    useEffect(async () => {
        if(daoManagercontract==null) return ;
        await api.dao.queryComponentAddrs(daoManagercontract).then(data=>{
            if(data){
                setcontractlist(data)
            }

        });

    }, [daoManagercontract]);

    useEffect(async () => {
        console.log("=====333===",contractlist)

        if(!contractlist.length)return ;

        const {vault_addr,org_addr,vote_addr,erc20_addr,base_addr} = contractlist;

        console.log(contractlist)
        if(base_addr!=null){
            await api.base.InitBase(state, dispatch,base_addr)
        }
        if(vault_addr!=null){
            await api.vault.InitVault(state, dispatch, vault_addr);
            // await api.vault.InitVault(state, dispatch, '5HnTRCNsNYmMmEu3kfAeF3cUT5FL5D3B4PGMimwqu2s53H8i');
        }

        if(org_addr!=null){
            await api.org.InitOrg(state, dispatch, org_addr);
            // await api.org.InitOrg(state, dispatch, '5H6TnZXVXoVgQtknwh8Ke1qu2a66NvmmVGAzvUr2ZP4VSfFK');
        }
        if(vote_addr!=null){
            await api.vote.InitVote(state, dispatch, vote_addr);
            // await api.vote.InitVote(state, dispatch, '5D4ePouE1FvZfEHcV1aGPdznG3wyDqGT7kk4d74WeJH1gF57');
        }
        if(erc20_addr!=null){
            await api.erc20.InitErc20(state, dispatch, erc20_addr);
        }

    }, [daoManagercontract,contractlist]);


    useEffect(async () => {
        sessionStorage.setItem('logo', logo)
    }, [logo]);
    useEffect(async () => {
        let arr=[];
        let i=0;
        for(let item of tokenlist){
            await api.vault.getBalanceOf(vaultcontract,item).then(data => {
                if (!data) return;

                arr[i]={
                    address:item,
                    balance:data
                };
                i++;
            });
        }
        setbalancelist(arr)
    }, [tokenlist]);

    useEffect(async () => {
        // if (basecontract == null || vaultcontract == null || orgcontract == null || votecontract == null || erc20contract == null ) return;

        await api.base.getBaseData(basecontract).then(data => {
            if (!data) return;
            let {nameResult, logoResult, descResult, ownerResult, erc20contract} = data;
            setName(nameResult);
            setLogo(logoResult);
            setDescription(descResult);
            setOwner(ownerResult);
        });

        await api.vault.getTokenList(vaultcontract).then(data => {
            if (!data) return;
            settokenlist(data)
        });

        await api.vote.queryOpenVote(votecontract).then(data => {
            if (!data) return;
            let arr = data.slice(0, 3);
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


    }, [basecontract, vaultcontract, orgcontract, votecontract, erc20contract]);

    const handleClicktoType = (type) => {
        const {vault_addr,org_addr,vote_addr,erc20_addr,base_addr} = contractlist;
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

        props.history.push(`/${type}`)

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
                                                    <a href="#" target='_blank'>{item.address}</a><span>{item.balance}</span>
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
                                                <li>
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
