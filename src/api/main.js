import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import { randomAsHex } from '@polkadot/util-crypto';

const value = 0;
const gasLimit = -1;

const listTemplates = async (maincontract) => {

    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;


    let data = await maincontract.query.listTemplates(AccountId, {value, gasLimit});

    data = publicJs.formatResult(data);

    return data;

};


const listDaoInstances = async (maincontract) => {

    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listDaoInstances(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    return data;

};

const listDAOInfo = async (maincontract,Daoaddress) => {

    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listDaoInfo(AccountId, {value, gasLimit},Daoaddress);
    data = publicJs.formatResult(data);

    return data;

};

const mainAddress = window.mainAddress;
const listDaoInstancesByOwner = async (maincontract) => {

    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listDaoInstancesByOwner(AccountId, {value, gasLimit},AccountId);

    data = publicJs.formatResult(data);

    return data;

};

const instanceByTemplate = async (maincontract,id,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();
    const version = randomAsHex();

    if (maincontract === null || !maincontract || !AccountId) return;


    let data =  await maincontract.tx.instanceByTemplate({value, gasLimit:280000n * 1000000n}, id, AccountId,version)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock) {
                console.log('main.instanceByTemplate finalized', result);
                cb(true)
            }
        });

    return data;

};



export default {
    listTemplates,
    listDaoInstances,
    listDAOInfo,
    listDaoInstancesByOwner,
    instanceByTemplate,

}

