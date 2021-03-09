import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";

let loadDAO = false;
let daoManagercontract;
const InitDAO = async (state,dispatch,address) =>  {

    const {apiState, api,daoManagercontractState} = state;
    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account || daoManagercontractState!= null) return;

    try {
        daoManagercontract = await ConnectContract(api, 'daoManager',address);
        dispatch({ type: 'SET_DAO', payload: daoManagercontract });
    } catch (e) {
        console.error(e);

    }
    return daoManagercontract;

};


const value = 0;
const gasLimit = 138003n * 1000000n;

const setDAO = async (daoManagercontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.tx || !AccountId) return;

    const{base_name,base_logo,base_desc,erc20_name,erc20_symbol,erc20_initial_supply,erc20_decimals}=obj;

    const data = await daoManagercontract.tx.init({value, gasLimit}, base_name, base_logo,base_desc,erc20_name,erc20_symbol,erc20_initial_supply, erc20_decimals).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized || result.status.isInBlock ) {
            console.log(result.status.isFinalized ,result.status.isInBlock );
            console.log(result)
            cb(true)
        }
    });
    return data;
};

const transferToken =  async (daoManagercontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.tx || !AccountId) return;

    const{address,token}=obj;

    const data = await daoManagercontract.tx.transfer({value, gasLimit}, address, token,).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized || result.status.isInBlock ) {
            console.log(result.status.isFinalized ,result.status.isInBlock );
            cb(true)
        }
    });
    return data;
}

const addDaoModeratorTx =  async (daoManagercontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.tx || !AccountId) return;

    const{address,name}=obj;

    const data = await daoManagercontract.tx.addDaoModerator({value, gasLimit}, name,address,).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized || result.status.isInBlock ) {
            console.log(result.status.isFinalized ,result.status.isInBlock ,result);
            cb(true)
        }
    });
    return data;
}

const queryComponentAddrs = async (daoManagercontract) => {

    const AccountId = await Accounts.accountAddress();
    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.query || !AccountId) return;

    let data = await daoManagercontract.query.queryComponentAddrs(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

export default {
    InitDAO,
    setDAO,
    transferToken,
    queryComponentAddrs,
    addDaoModeratorTx,
}
