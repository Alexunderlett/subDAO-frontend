import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import { hexToString } from '@polkadot/util';


let votecontract;
const InitVote = async (state, dispatch, address,cb) => {

    const {apiState, api} = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' ||  !account) return;

    try {
        votecontract = await ConnectContract(api, 'vote', address);
        dispatch({ type: 'SET_VOTE', payload: votecontract });
        if(votecontract){
            cb(true)
        }
    } catch (e) {
        console.error(e);
    }
    return votecontract;
}

const value = 0;
const gasLimit = -1;


const queryAllVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    // let dataobj = await votecontract.query. queryExecutedVote(AccountId, {value, gasLimit});
    // let dataobj = await votecontract.query.queryAllVote(AccountId, {value, gasLimit});
    let dataobj = await votecontract.query.queryHistoryVote(AccountId, {value, gasLimit});
    dataobj = publicJs.formatResult(dataobj);

    return dataobj;
}

const queryOneVote = async (votecontract, id) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    let dataobj = await votecontract.query.queryOneVote(AccountId, {value, gasLimit}, id);
    // let dataobj = await votecontract.query.queryActiveVote(AccountId, {value, gasLimit});
    dataobj = publicJs.formatResult(dataobj);

    console.info('dataobj====',dataobj)
    return dataobj;
}

const queryWaitVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;


    // let dataobj = await votecontract.query.queryWaitVote(AccountId, {value, gasLimit});
    let dataobj = await votecontract.query.queryPendingVote(AccountId, {value, gasLimit});
    dataobj = publicJs.formatResult(dataobj);
    return dataobj;
}

const queryOpenVote = async (votecontract) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    // let dataobj = await votecontract.query.queryOpenVote(AccountId, {value, gasLimit});
    let dataobj = await votecontract.query.queryActiveVote(AccountId, {value, gasLimit});

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

const queryVoter = async (votecontract,id) => {

    const AccountId = await Accounts.accountAddress();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    let dataobj = await votecontract.query.queryVoterVoteOne(AccountId, {value, gasLimit},id,AccountId);
    dataobj = publicJs.formatResult(dataobj);
    return dataobj;
}

const newVote = async (votecontract,obj,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    const { title, desc, vote_time, support_require_num, min_require_num, choices} = obj;

    if (votecontract === null || !votecontract || !votecontract.tx || !AccountId) return;
    let data;

   await votecontract.tx.newVote({value, gasLimit}, title, desc, vote_time, support_require_num, min_require_num, choices)
       .signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized) {
            cb(true)
        }
        });
    return data;
}
const newVoteTransfer = async (votecontract,obj,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    const { title, desc, vote_time, support_require_num, min_require_num, choices,erc20_address,to_address,valueAmount} = obj;

    if (votecontract === null || !votecontract || !votecontract.tx || !AccountId) return;
    let data;

   await votecontract.tx.newVoteWithTransfer({value, gasLimit}, title, desc, vote_time, support_require_num, min_require_num, choices,erc20_address,to_address,valueAmount)
       .signAndSend(AccountId, { signer: injector.signer }, (result) => {
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

    console.log(`voteid ${voteid}, choiceid ${choiceid}`);

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (votecontract === null || !votecontract || !votecontract.query || !AccountId) return;

    await votecontract.exec('vote', {value, gasLimit}, voteid,choiceid,AccountId)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            console.error("[[[[[[[[[[[result.status]]]]]]]]]",result)


            if (result.status.isFinalized) {

                // console.log('Events:');
                // let ContractEmitted= false;
                // result.events.forEach(({ event: { data, method, section }, phase }) => {
                //     console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                //     console.error(data);
                //     if(method==='ContractEmitted'){
                //         ContractEmitted = true
                //     }
                // });
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
    newVoteTransfer,
    executeVote,
    VoteChoice,
    queryVoter,
}



