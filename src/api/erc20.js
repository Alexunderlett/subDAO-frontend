import ConnectContract from './connectContract';
import Accounts from "./Account";
let loadERC20 = false;
let erc20contract;

const InitErc20 = async (state, dispatch, address) =>  {

    const {apiState, api, erc20contractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || !account || erc20contract!= null) return;


    if (loadERC20) return dispatch({ type: 'SET_ERC20', payload: erc20contract });
    loadERC20 = true;
    try {
        erc20contract = await ConnectContract(api, 'erc20',address);
        dispatch({ type: 'SET_ERC20', payload: erc20contract });
    } catch (e) {
        console.error(e);
    }
    return erc20contract;
}
export default {
    InitErc20,
}
