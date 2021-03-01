import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import INIT_STATE from './initState';
import ConnectContract from './connectContract';

import {ApiPromise, WsProvider} from '@polkadot/api';
import {ContractPromise} from '@polkadot/api-contract';

import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider

} from '@polkadot/extension-dapp';


// const contractAddress='5DpVJVPrq2qJVrnRB85uvYmrcJoJmyD431Z7EbJtN1VjfdAN' ;
//
// const contracts = async  ()=> {
//     const wsProvider = new WsProvider('ws://39.101.70.206:9944');
//     const api = await ApiPromise.create({ provider: wsProvider,  types: {
//             // mapping the actual specified address format
//             Address: 'AccountId',
//             // mapping the lookup
//             LookupSource: 'AccountId'
//         }
//     });
//     console.log(api.genesisHash.toHex());
//
//
//
//
//     // return new ContractPromise(api, abi, contractAddress)
//     const contract = await new ContractPromise(api, abi, contractAddress)
//     console.log(contract)
//
//     return contract
//     //
//     //
//     // const target = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY' ;
//     // const from = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' ;
//     //
//     //
//     //
//     //
//     // const callValue = await contract.query.queryComponentAddrs('5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY', { value: 0, gasLimit: -1 });
//     //
//     // console.log("======",callValue.output.toHuman())
//     //
//     //
//     //
//     // const value = 0; // only useful on isPayable messages
//     // const gasLimit = 3000n * 1000000n;
//     // const incValue = 1;
//     //
//     //
//     // const { Keyring } = require('@polkadot/keyring');
//     //
//     // const keyring = new Keyring({ type: 'sr25519' });
//     // let alicePair = keyring.createFromUri('//Alice');
//     //
//     // console.log(alicePair)
//     //
//     // await contract.tx
//     //     .addDaoModerator({ value, gasLimit }, 'name1','5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY')
//     //     .signAndSend(alicePair, (result) => {
//     //         if (result.status.isInBlock) {
//     //             console.log('in a block',result);
//     //         } else if (result.status.isFinalized) {
//     //             console.log('finalized');
//     //         }
//     //     });
//     //
//     //
//     //
//
//
//
//
//
//
//
// }

// export default contracts


const SubstrateContext = React.createContext();


const connect = async (state, dispatch) => {
    const {apiState} = state;

    if (apiState) return;

    dispatch({type: 'CONNECT_INIT'});


    const wsProvider = new WsProvider('ws://39.101.70.206:9944');
    const api = await ApiPromise.create({
        provider: wsProvider, types: {
            Address: 'AccountId',
            LookupSource: 'AccountId'
        }
    });


    if (api.isConnected) {
        dispatch({type: 'CONNECT', payload: api});
    }
    await api.isReady.then((api) => dispatch({type: 'CONNECT_SUCCESS'}));


};
let loadMain = false;
const mainConnect = async (state, dispatch) => {

    const {apiState, api, maincontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account) return;

        let maincontract;
        const asyncLoadMain = async () => {
            dispatch({type: 'LOAD_MAINCONTRACT'});
        try {
            maincontract = await ConnectContract(api, 'main');

            dispatch({ type: 'SET_MAINCONTRACT', payload: maincontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'MAINCONTRACT_ERROR' });
        }
    };

    if (maincontractState) return;
    if (loadMain) return dispatch({ type: 'SET_MAINCONTRACT', payload: maincontract });
    loadMain = true;
    asyncLoadMain();
}

const SubstrateContextProvider = (props) => {
    const initState = {...INIT_STATE};
    const [state, dispatch] = useReducer(reducer, initState);

    connect(state, dispatch);

        mainConnect(state, dispatch);

    // loadAccounts(state, dispatch);
    return <SubstrateContext.Provider value={state}>
        {props.children}
    </SubstrateContext.Provider>;
};


const useSubstrate = () => ({...useContext(SubstrateContext)});

export {SubstrateContextProvider, useSubstrate};
