import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import INIT_STATE from './initState';

import mainConnect from './mainContract';
import loadAccounts from './Account';
import baseConnect from './baseContract';
import orgConnect from './orgContract';
import vaultConnect from './vaultContract';
import voteConnect from './voteContract';
import daoManagerConnect from './daoManagerContract';

import {ApiPromise, WsProvider} from '@polkadot/api';

const SubstrateContext = React.createContext();


const connect = async (state, dispatch) => {
    const {apiState} = state;

    if (apiState) return;

    dispatch({type: 'CONNECT_INIT'});


    // const wsProvider = new WsProvider('ws://39.101.70.206:9944');
    const wsProvider = new WsProvider('ws://localhost:9944');
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

const initState = {...INIT_STATE};

const SubstrateContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);
    console.log("=====state=====",state)

    const {maincontractState, allaccountsState, basecontractState, orgcontractState, vaultcontractState,votecontractState,daoManagercontractState} = state;
    connect(state, dispatch);


    if(maincontractState === 'LOAD_MAINCONTRACT'){
        mainConnect(state, dispatch);
    }
    // if(allaccountsState === 'LOAD_ALLACCOUNTS'){
    //     loadAccounts(state, dispatch);
    // }
    if(basecontractState === 'LOAD_BASE'){
       baseConnect(state, dispatch);
    }
    if(orgcontractState === 'LOAD_ORG'){
        orgConnect(state, dispatch);
    }
    if(vaultcontractState === 'LOAD_VAULT'){
        vaultConnect(state, dispatch);
    }
    if(votecontractState === 'LOAD_VOTE'){
        voteConnect(state, dispatch);
    }
    if(daoManagercontractState === 'LOAD_DAO'){
        daoManagerConnect(state, dispatch);
    }
    return <SubstrateContext.Provider value={{state,dispatch}}>
        {props.children}
    </SubstrateContext.Provider>;
};

const useSubstrate = () => ({...useContext(SubstrateContext)});

export {SubstrateContextProvider, useSubstrate};
