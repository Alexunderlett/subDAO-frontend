import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";

const {Keyring} = require('@polkadot/keyring');

let loadvote;
let votecontract;
const InitVote = async (state, dispatch, address) => {

    const {apiState, api,votecontractState} = state;

    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' ||  !account || votecontractState!= null) return;

    if (loadvote) return dispatch({ type: 'SET_VOTE', payload: votecontract });
    loadvote = true;

    try {
        votecontract = await ConnectContract(api, 'vote', address);
        dispatch({ type: 'SET_VOTE', payload: votecontract });
    } catch (e) {
        console.error(e);
    }
    return votecontract;
}

const value = 0;
const gasLimit = -1;


async function account() {
    const keyring = new Keyring({type: 'sr25519'});

    const accountName = await Accounts.accountName();

    const alice = keyring.addFromUri(`//${accountName}`);

    return alice;
}

const queryAllVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    let dataobj = await votecontract.query.queryAllVote(AccountId, {value, gasLimit});
    dataobj = publicJs.formatResult(dataobj);

    return dataobj;
}

const queryOneVote = async (votecontract, id) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    let dataobj = await votecontract.query.queryOneVote(AccountId, {value, gasLimit}, id);
    dataobj = publicJs.formatResult(dataobj);

    return dataobj;
}

const queryWaitVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;


    let dataobj = await votecontract.query.queryWaitVote(AccountId, {value, gasLimit});
    dataobj = publicJs.formatResult(dataobj);
    return dataobj;
}

const queryOpenVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    let dataobj = await votecontract.query.queryOpenVote(AccountId, {value, gasLimit});

    dataobj = publicJs.formatResult(dataobj);

    return dataobj;
}

const queryExecutedVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    let dataobj = await votecontract.query.queryExecutedVote(AccountId, {value, gasLimit});
    dataobj = publicJs.formatResult(dataobj);
    return dataobj;
}

const newVote = async (votecontract,obj,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    const { title, desc, vote_time, support_require_num, min_require_num, choices} = obj;

    if (votecontract === null || !votecontract || !votecontract.tx || !AccountId) return;
    let data;

   await votecontract.tx.newVote({value, gasLimit}, title, desc, vote_time, support_require_num, min_require_num, choices).
        signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized) {
            cb(true)
        }
        });
    return data;
}


const executeVote = async (votecontract,id,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (votecontract === null || !votecontract || !AccountId) return;

    await votecontract.exec('execute', {value, gasLimit}, id)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized) {
                cb(true)
            }
    })
}
const VoteChoice = async (votecontract,voteid,choiceid,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    await votecontract.exec('vote', {value, gasLimit}, voteid,choiceid,AccountId)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized) {
                cb(true)
            }
    })
}

export default {
    InitVote,
    queryAllVote,
    queryOneVote,
    queryWaitVote,
    queryOpenVote,
    queryExecutedVote,
    newVote,
    executeVote,
    VoteChoice,
}



