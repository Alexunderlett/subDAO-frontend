import ConnectContract from './connectContract';

let loadMain = false;
let maincontract;

const mainAddress = window.mainAddress;
export default async function mainConnect(state, dispatch) {
    const {apiState, api, maincontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || (account && !account.length)) return;
    const asyncLoadMain = async () => {

        try {
            maincontract = await ConnectContract(api, 'main', mainAddress.main);
            dispatch({type: 'SET_MAINCONTRACT', payload: maincontract});
        } catch (e) {
            console.error(e);
            dispatch({type: 'MAINCONTRACT_ERROR'});
        }
    };
    if (maincontractState !== 'LOAD_MAINCONTRACT') return;
    if (loadMain) return dispatch({type: 'SET_MAINCONTRACT', payload: maincontract});
    loadMain = true;
    asyncLoadMain();
}
