import ConnectContract from './connectContract';
let loadDao = false;
let daoManagercontract;
export default async function daoManagerConnect(state, dispatch)  {

    const {apiState, api, daoManagercontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;
    const asyncLoadDao = async () => {

        try {
            daoManagercontract = await ConnectContract(api, 'daoManager','5CAJ25hn1nNdFc3jSnU3TruY4w4pXxfSUoQuZ2ANAr8SvF9m');
            dispatch({ type: 'SET_DAO', payload: daoManagercontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'DAO_ERROR' });
        }
    };
    if (daoManagercontractState!=='LOAD_DAO') return;
    if (loadDao) return dispatch({ type: 'SET_DAO', payload: daoManagercontract });
    loadDao = true;
    asyncLoadDao();
}
