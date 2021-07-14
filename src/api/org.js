import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import api from "./index";

let orgcontract;
const InitOrg = async (state, dispatch,address,cb) =>  {

    const {apiState, api} = state;

    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' ||  !account) return;

    try {
        orgcontract = await ConnectContract(api, 'org', address);
        dispatch({ type: 'SET_ORG', payload: orgcontract });
        if(orgcontract){
            cb(true)
        }
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

    let data = await orgcontract.query.getDaoModeratorDetailList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};
const whoAmI = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.query || !AccountId) return;

    let data = await orgcontract.query.whoAmI(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

const getDaoMembersList = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;


    // let data = await orgcontract.query.getDaoMemberDetailList(AccountId, {value, gasLimit});
    console.log("=====getDaoMemberDetailList")
    let data = await orgcontract.query.getDaoMemberDetailList([AccountId, {value, gasLimit}],result=>{
        console.error("===getDaoMemberDetailList====",result)
    });

    // data = publicJs.formatResult(data);
    // return data;

};
const getApplyList = async (orgcontract) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;


    let data = await orgcontract.query.getDaoApplyMemberDetailList(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

const addDaoModerator = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

     await orgcontract.tx.addDaoModerator({value, gasLimit}, name,address)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock ) {
                cb(true)
             }
         });
};
const addDaoMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.addDaoMember({value, gasLimit}, name,address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock) {

                    cb(true)
                }
             });
    return data;
};

const ApproveMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {name,address} = obj;
    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.approveMember({value, gasLimit}, name,address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock) {

                    cb(true)
                }
             });
    return data;
};

const applyMember = async (orgcontract,name,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();

    let data = await orgcontract.tx.applyMember({value, gasLimit}, name,AccountId)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock) {
                    cb(true)
                }
             });
    return data;
};


const resignModerator = async (orgcontract,cb)=>{

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();

    await orgcontract.tx.resignModerator({value, gasLimit},AccountId)
    .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            cb(true)
         });
}
const resignMember = async (orgcontract,cb)=>{

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();

    await orgcontract.tx.resignMember({value, gasLimit},AccountId)
    .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            cb(true)
         });
}
const removeDaoMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {address} = obj;
    const injector = await Accounts.accountInjector();



    await orgcontract.tx.removeDaoMember({value, gasLimit}, address)
            .signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isFinalized || result.status.isInBlock ) {
                    // cb(true)
                    // resolve(true);
                    if(AccountId !== address){
                        cb(true)
                    }else{
                        resignMember(orgcontract,cb)
                    }
                }
             });
};

const removeDaoModerator = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const {address} = obj;
    const injector = await Accounts.accountInjector();



    await orgcontract.tx.removeDaoModerator({value, gasLimit}, address)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock) {

                if(AccountId !== address){
                    cb(true)
                }else{
                    resignModerator(orgcontract,cb)
                }
            }
         });

};

const transferOwnership = async (orgcontract,address,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();

    await orgcontract.tx.transferOwnership({value, gasLimit}, address)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock) {

                if(AccountId !== address){
                    cb(true)
                }
            }
         });

};
const batchAddMember = async (orgcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();

    await orgcontract.tx.batchAddDaoMember({value, gasLimit}, obj)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock) {
                cb(true)
            }
         });
};

const setFreeAddMember = async (orgcontract,freeAdd,cb) => {

    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    const injector = await Accounts.accountInjector();


    await orgcontract.tx.setCanFreeAddMember({value, gasLimit}, freeAdd)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            result.events.forEach(({ phase, event: { data, method, section } }) => {
                console.error(`\t' ${phase}: ${section}.${method}:: ${data}`);
            });
            console.log("=========setCanFreeAddMember",result)
            if (result.status.isFinalized || result.status.isInBlock) {
                cb(true)
            }
         });
};
const getFreeAddMember = async (orgcontract) => {


    const AccountId = await Accounts.accountAddress();
    if (orgcontract === null || !orgcontract || !orgcontract.tx || !AccountId) return;

    let data = await orgcontract.query.getCanFreeAddMember(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;
};

export default {
    InitOrg,
    getDaoModeratorList,
    getDaoMembersList,
    getApplyList,
    addDaoModerator,
    addDaoMember,
    ApproveMember,
    applyMember,
    removeDaoMember,
    removeDaoModerator,
    transferOwnership,
    whoAmI,
    resignModerator,
    resignMember,
    setFreeAddMember,
    getFreeAddMember,
    batchAddMember,
}
