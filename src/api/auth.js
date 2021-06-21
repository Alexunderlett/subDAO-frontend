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

const showActions = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    let data = await orgcontract.query.showActionsByContract(AccountId, {value, gasLimit},'org');
    data = publicJs.formatResult(data);
    return data;

};
// const whoAmI = async (orgcontract) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;
//
//     let data = await orgcontract.query.whoAmI(AccountId, {value, gasLimit});
//     data = publicJs.formatResult(data);
//     return data;
//
// };
//
// const getDaoMembersList = async (orgcontract) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//
//     let data = await orgcontract.query.getDaoMemberDetailList(AccountId, {value, gasLimit});
//     data = publicJs.formatResult(data);
//     return data;
//
// };
//
// const addDaoModerator = async (orgcontract,obj,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const {name,address} = obj;
//     const injector = await Accounts.accountInjector();
//
//      await orgcontract.tx.addDaoModerator({value, gasLimit}, name,address)
//         .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//             if (result.status.isFinalized ) {
//                 cb(true)
//              }
//          });
// };
// const addDaoMember = async (orgcontract,obj,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const {name,address} = obj;
//     const injector = await Accounts.accountInjector();
//
//     let data = await orgcontract.tx.addDaoMember({value, gasLimit}, name,address)
//             .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//                 if (result.status.isFinalized) {
//
//                     cb(true)
//                 }
//              });
//     return data;
// };
//
//
// const resign = async (orgcontract,cb)=>{
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const injector = await Accounts.accountInjector();
//
//     await orgcontract.tx.resign({value, gasLimit},AccountId)
//     .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//             cb(true)
//          });
// }
// const removeDaoMember = async (orgcontract,obj,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const {address} = obj;
//     const injector = await Accounts.accountInjector();
//
//
//
//     await orgcontract.tx.removeDaoMember({value, gasLimit}, address)
//             .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//                 if (result.status.isFinalized || result.status.isInBlock ) {
//                     // cb(true)
//                     // resolve(true);
//                     if(AccountId !== address){
//                         cb(true)
//                     }else{
//                         resign(orgcontract,cb)
//                     }
//                 }
//              });
// };
//
// const removeDaoModerator = async (orgcontract,obj,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const {address} = obj;
//     const injector = await Accounts.accountInjector();
//
//
//
//     await orgcontract.tx.removeDaoModerator({value, gasLimit}, address)
//         .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//             if (result.status.isFinalized) {
//
//                 if(AccountId !== address){
//                     cb(true)
//                 }else{
//                     resign(orgcontract,cb)
//                 }
//             }
//          });
//
// };
//
// const transferOwnership = async (orgcontract,address,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const injector = await Accounts.accountInjector();
//
//     await orgcontract.tx.transferOwnership({value, gasLimit}, address)
//         .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//             if (result.status.isFinalized) {
//
//                 if(AccountId !== address){
//                     cb(true)
//                 }
//             }
//          });
//
// };
//
// const setFreeAddMember = async (orgcontract,freeAdd,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     const injector = await Accounts.accountInjector();
//
//
//     await orgcontract.tx.setCanFreeAddMember({value, gasLimit}, freeAdd)
//         .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//             if (result.status.isFinalized) {
//                 cb(true)
//             }
//          });
// };
// const getFreeAddMember = async (orgcontract) => {
//
//
//     const AccountId = await Accounts.accountAddress();
//     if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;
//
//     let data = await orgcontract.query.getCanFreeAddMember(AccountId, {value, gasLimit});
//     data = publicJs.formatResult(data);
//     return data;
// };

export default {
    InitAuth,
    showActions,

}
