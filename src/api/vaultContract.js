import ConnectContract from './connectContract';
let loadVault = false;
let vaultcontract;
export default async function vaultConnect(state, dispatch)  {

    const {apiState, api, vaultcontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;
    const asyncLoadVault = async () => {

        try {
            vaultcontract = await ConnectContract(api, 'vault','5CAJ25hn1nNdFc3jSnU3TruY4w4pXxfSUoQuZ2ANAr8SvF9m');
            dispatch({ type: 'SET_VAULT', payload: vaultcontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'VAULT_ERROR' });
        }
    };
    if (vaultcontractState!=='LOAD_VAULT') return;
    if (loadVault) return dispatch({ type: 'SET_VAULT', payload: vaultcontract });
    loadVault = true;
    asyncLoadVault();
}
