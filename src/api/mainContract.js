import ConnectContract from './connectContract';
let loadMain = false;
let maincontract;

const main_address = '5H966ELekqcNUPYc8Py9ZhiKBAE3y8Tk6688PRcZXBHkiQKS';

export default async function mainConnect(state, dispatch)  {

    const {apiState, api, maincontractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;
    const asyncLoadMain = async () => {

        try {
            maincontract = await ConnectContract(api, 'main',main_address);
            dispatch({ type: 'SET_MAINCONTRACT', payload: maincontract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'MAINCONTRACT_ERROR' });
        }
    };
    if (maincontractState!=='LOAD_MAINCONTRACT') return;
    if (loadMain) return dispatch({ type: 'SET_MAINCONTRACT', payload: maincontract });
    loadMain = true;
    asyncLoadMain();
}
