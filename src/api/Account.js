import {
    web3Accounts,
    web3Enable,

} from '@polkadot/extension-dapp';

let loadAccts = false;
let allAccounts;
export default async function loadAccounts(state, dispatch)  {
    const asyncLoadAccounts = async () => {
        try {

           const aa = await web3Enable('SubDAO');
            allAccounts = await web3Accounts();

            dispatch({ type: 'SET_ALLACCOUNTS', payload: allAccounts });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'ALLACCOUNTS_ERROR' });
        }
    };

    const { allaccountsState } = state;


    if (allaccountsState!=='LOAD_ALLACCOUNTS') return;
    if (loadAccts) return dispatch({ type: 'SET_ALLACCOUNTS', payload: allAccounts });
    loadAccts = true;
    asyncLoadAccounts();
}
