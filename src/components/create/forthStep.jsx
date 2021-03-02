import React, {Component, useEffect} from 'react';
import {Button} from "react-bootstrap";
// import ConnectContract from "../../api/connectContract";
import {useSubstrate} from "../../api/contracts";
import {Keyring} from "@polkadot/keyring";

import { ContractPromise } from '@polkadot/api-contract';

export default function ForthStep(props) {
    const {state,dispatch} = useSubstrate();
    const {maincontract} = state;

    const toThirdStep = () => {
       props.handlerSet(3)
    }
    const handleClicktoAbout =(id) => {
      props.history.push(`/about/${id}`)
    }
    useEffect(async () => {
console.log("=====000000099990",maincontract)
        if(maincontract){

            const AccountId = JSON.parse(sessionStorage.getItem('account'));

console.log(AccountId,AccountId[0].address,AccountId[0].meta.name)




// NOTE the apps UI specified these in mega units
            const value = 0;
            const gasLimit = 138003n * 1000000n;
            const keyring = new Keyring({type: 'sr25519'});
            let alicePair = keyring.createFromUri('//Alice');
// Perform the actual read (no params at the end, for the `get` message)
// (We perform the send from an account, here using Alice's address)
            console.info(maincontract.query)
            console.info(maincontract.tx)

            // query
            // const { gasConsumed, result, outcome } = await contract.query.listTemplates(alicePair.address, { value, gasLimit });
            // // The actual result from RPC as `ContractExecResult`
            // console.log(result);
            // // gas consumed
            // console.log(gasConsumed.toHuman());

            // tx
            await maincontract.tx.instanceByTemplate({value, gasLimit}, 0, "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")
                .signAndSend(alicePair, (result) => {
                    console.log("hello");
                    if (result.status.isInBlock) {
                        console.log('in a block',result);
                        // console.log(result.output.toHuman())
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });



    // const value = 0;
    // // const gasLimit = 3000n * 1000000n;
    // const gasLimit = -1;
    //
    // const keyring = new Keyring({ type: 'sr25519' });
    // let alicePair = keyring.createFromUri(`//${AccountId[0].meta.name}`);
    // // let alicePair = keyring.createFromUri('//Alice');
    //
    // let templateid = JSON.parse(sessionStorage.getItem('secondStep'))[0].id
    // console.log(templateid)
    //
    // await maincontract.tx
    //     .instanceByTemplate({ value, gasLimit }, templateid,AccountId[0].address)
    //     .signAndSend(alicePair, (result) => {
    //         if (result.status.isInBlock) {
    //             console.log('in a block',result);
    //         } else if (result.status.isFinalized) {
    //             console.log('finalized');
    //         }
    //     });
    //
        }

    }, [maincontract]);
        return <ul>
            <li className='successful'>
                <div className="successFont">
                    <h1>
                        <span>S</span>
                        <span>U</span>
                        <span>C</span>
                        <span>C</span>
                        <span>e</span>
                        <span>s</span>
                        <span>s</span>
                        <span>f</span>
                        <span>u</span>
                        <span>l</span>
                    </h1>
                </div>
                <div className="successInfo">Create PAKA Labs successful !!</div>
            </li>
            <li className="addresslist">
                <div>
                    <span>DAO Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
                <div>
                    <span>Token Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
                <div>
                    <span>Vault Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
                <div>
                    <span>Org Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
            </li>

            <li className='brdr'>
                <Button variant="outline-primary" className='leftBtn' onClick={toThirdStep}>Previous</Button>
                <Button variant="primary" onClick={handleClicktoAbout.bind(this, 3)}>Manage</Button>
            </li>
        </ul>;


}
