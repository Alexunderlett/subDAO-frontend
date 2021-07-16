import ConnectContract from './connectContract';
import Accounts from "./Account";
import publicJs from "../utils/publicJs";

let erc20contract;
const InitErc20 = async (state, dispatch, address) =>  {

    const {apiState, api,} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || !account ) return;

    try {
        erc20contract = await ConnectContract(api, 'erc20',address);
        dispatch({ type: 'SET_ERC20', payload: {erc20contract,address} });
    } catch (e) {
        console.error(e);
    }
    return erc20contract;
}

const value = 0;
const gasLimit = -1;

const approveOp = async (erc20contract, spender, total,cb) => {
    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (erc20contract === null || !erc20contract || !erc20contract.tx || !AccountId) return;

    await erc20contract.tx.approve({value, gasLimit}, spender, total)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
          if (result.status.isFinalized || result.status.isInBlock) {
             cb(true);
         }
       });
}

const queryInfo = async (erc20contract) => {

    const AccountId = await Accounts.accountAddress();
    if (erc20contract === null || !erc20contract || !erc20contract.query || !AccountId) return;

    let data = await erc20contract.query.queryInfo(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    return data;

};
export default {
    InitErc20,
    approveOp,
    queryInfo
}
