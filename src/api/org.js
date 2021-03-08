import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";

let loadOrg = false;
let orgcontract;
const InitOrg = async (state, dispatch,address) =>  {

    const {apiState, api,orgcontractState} = state;

    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' ||  !account || orgcontractState!= null) return;

    if (loadOrg) return dispatch({ type: 'SET_ORG', payload: orgcontract });
    loadOrg = true;

    try {
        orgcontract = await ConnectContract(api, 'org', address);
        dispatch({ type: 'SET_ORG', payload: orgcontract });
    } catch (e) {
        console.error(e);
    }
    return orgcontract;
}

const value = 0;
const gasLimit = -1;

const getDaoModeratorList = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;


    let data = await orgcontract.query.getDaoModeratorList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

const getDaoMembersList = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;


    let data = await orgcontract.query.getDaoMembersList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

const addDaoModerator = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.addDaoModerator({value, gasLimit}, name,address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock ) {
                    console.log(result.status.isFinalized ,result.status.isInBlock );
                    cb(true)
                 }
             });
    return data;
};
const addDaoMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.addDaoMember({value, gasLimit}, name,address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock ) {
                    console.log(result.status.isFinalized ,result.status.isInBlock );
                    cb(true)
                }
             });
    return data;
};

const removeDaoMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    // let data = await orgcontract.tx.removeDaoMember({value, gasLimit}, name,address)
    let data = await orgcontract.tx.removeDaoMember({value, gasLimit}, address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock ) {
                    console.log(result.status.isFinalized ,result.status.isInBlock );
                    cb(true)
                }
             });

    return data;
};

const removeDaoModerator = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.removeDaoModerator({value, gasLimit}, address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock ) {
                    console.log(result.status.isFinalized ,result.status.isInBlock );
                    cb(true)
                }
             });

    return data;
};

export default {
    InitOrg,
    getDaoModeratorList,
    getDaoMembersList,
    addDaoModerator,
    addDaoMember,
    removeDaoMember,
    removeDaoModerator,
}
