import React, {Component, useEffect, useState} from 'react';
import t3 from "./images/t-4.png";
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";
import {useSubstrate} from "./api/contracts";

import { Keyring } from "@polkadot/keyring";

import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider
} from '@polkadot/extension-dapp';

export default function Vault(props){

    const {state,dispatch} = useSubstrate();
    const {vaultcontract} = state;

    const [id, setId] = useState(null);

    useEffect(() => {
        setId(props.match.params.id)
        dispatch({type: 'LOAD_VAULT'});

    }, []);

    useEffect(async () => {
        if(vaultcontract === null) return ;

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



            //vault
            console.log("vaultcontract: ", vaultcontract);

            let daoName = "mydao";
            let daoLogo = "http://example.com/logo.jpg";
            let daoDesc = "Hello World!";
            let vault_contract_address = AccountId;

            let optionParam = { value: 0, gasLimit: -1 };

            let tx;
            let result;


            tx = await vaultcontract.tx.init(optionParam,vault_contract_address );
            result = await tx.signAndSend(AccountId, { signer: injector.signer });
            console.log('result ', result.toString());



            let add_erc_token = allAccounts[1].address;
            //增加一种token
            tx = await vaultcontract.tx.add_vault_token(optionParam, add_erc_token);
            await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isInBlock) {
                    console.log('in a block');
                 } else if (result.status.isFinalized) {
                     console.log('finalized');
                } else {
                   console.log("unexpected result", result);
                 }
             });

            let add_erc_token2 = allAccounts[1].address;
            //增加另一种token
            tx = await vaultcontract.tx.add_vault_token(optionParam, add_erc_token2);
            await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isInBlock) {
                    console.log('in a block');
                 } else if (result.status.isFinalized) {
                     console.log('finalized');
                } else {
                   console.log("unexpected result", result);
                 }
             });



           // 返回 token list
            result = await vaultcontract.query.get_token_list(AccountId, { value: 0, gasLimit: -1 });
            console.log("======name", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }


            //let add_erc_token2 = allAccounts[1].address;
            //移除一种token
            tx = await vaultcontract.tx.remove_vault_token(optionParam, add_erc_token2);
            await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isInBlock) {
                    console.log('in a block');
                 } else if (result.status.isFinalized) {
                     console.log('finalized');
                } else {
                   console.log("unexpected result", result);
                 }
             });



            //把某一种token的 指定数量的资金存入国库
            let erc_20_address = allAccounts[1].address;
            let from_address =  allAccounts[2].address;
            tx = await vaultcontract.tx.deposit(optionParam, erc_20_address, from_address,110.0);
            await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isInBlock) {
                    console.log('in a block');
                 } else if (result.status.isFinalized) {
                     console.log('finalized');
                } else {
                   console.log("unexpected result", result);
                 }
             });


             // 返回 返回某一个token的余额
            result = await vaultcontract.query.get_balance_of(AccountId, { value: 0, gasLimit: -1 });
            console.log("======name", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }
            
            // 返回转账的流水。
            result = await vaultcontract.query.get_transfer_history(AccountId, { value: 0, gasLimit: -1 });
            console.log("======name", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }



            //把某一种token的 指定数量的资金转出国库
            let erc_20_address1 = allAccounts[1].address;
            let to_address =  allAccounts[2].address;
            tx = await vaultcontract.tx.withdraw(optionParam, erc_20_address1, to_address,110.0);
            await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isInBlock) {
                    console.log('in a block');
                 } else if (result.status.isFinalized) {
                     console.log('finalized');
                } else {
                   console.log("unexpected result", result);
                 }
             });



            


        } catch (e) {
            console.log("Catch the exception!!!", e); // 30
        }




    }, [vaultcontract]);



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

