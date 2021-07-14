import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import api from "./index";

let authcontract;
const InitAuth = async (state, dispatch,address,cb) =>  {

    const {apiState, api} = state;

    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' ||  !account) return;

    try {
        authcontract = await ConnectContract(api, 'auth', address);
        dispatch({ type: 'SET_AUTH', payload: authcontract });
        if(authcontract){
            cb(true)
        }
    } catch (e) {
        console.error(e);
    }
    return authcontract;
}

const value = 0;
const gasLimit = -1;

const showActions = async (authcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (authcontract === null || !authcontract || !authcontract.query || !AccountId) return;

    // let objArr = [ 'vote', 'vault', 'org'];
    let objArr = [ 'vote'];
    let result = [];

    for(let item of objArr){
        let data = await authcontract.query.showActionsByContract(AccountId, {value, gasLimit},item);
        data = publicJs.formatResult(data);
        result.push(...data)
    }

    return result;

};
const showActionsByUser = async (authcontract,address) => {

    const AccountId = await Accounts.accountAddress();
    if (authcontract === null || !authcontract || !authcontract.query || !AccountId) return;

    let data = await authcontract.query.showActionsByUser(AccountId, {value, gasLimit},address);
    data = publicJs.formatResult(data);
    return data;

};

const grantPermission = async (authcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (authcontract === null || !authcontract || !authcontract.tx || !AccountId) return;
    const {address,contract_name,function_name} = obj;
    const injector = await Accounts.accountInjector();

     await authcontract.tx.grantPermission({value, gasLimit}, address, contract_name, function_name)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock ) {
                cb(true)
             }
         });
};
const revokePermission = async (authcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (authcontract === null || !authcontract || !authcontract.tx || !AccountId) return;
    const {address,contract_name,function_name} = obj;
    const injector = await Accounts.accountInjector();

     await authcontract.tx.revokePermission({value, gasLimit}, address, contract_name, function_name)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock ) {
                cb(true)
             }
         });
};

export default {
    InitAuth,
    showActions,
    showActionsByUser,
    grantPermission,
    revokePermission

}
