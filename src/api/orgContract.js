import ConnectContract from './connectContract';
let loadOrg = false;
let orgcontract;
export default async function orgConnect(state, dispatch)  {

    const {apiState, api, orgcontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;

    const asyncLoadorg = async () => {

        try {
            orgcontract = await ConnectContract(api, 'org','5CAJ25hn1nNdFc3jSnU3TruY4w4pXxfSUoQuZ2ANAr8SvF9m');
            dispatch({ type: 'SET_ORG', payload: orgcontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'ORG_ERROR' });
        }
    };
    if (orgcontractState!=='LOAD_ORG') return;
    if (loadOrg) return dispatch({ type: 'SET_ORG', payload: orgcontract });
    loadOrg = true;
    asyncLoadorg();
}
