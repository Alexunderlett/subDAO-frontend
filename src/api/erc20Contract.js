import ConnectContract from './connectContract';
let loadERC20 = false;
let erc20contract;
export default async function erc20Connect(state, dispatch)  {

    const {apiState, api, erc20contractState} = state;
    let account = JSON.parse(sessionStorage.getItem('account'));
    if (apiState !== 'READY' || account && !account.length) return;
    const asyncLoaderc20 = async () => {

        try {
            erc20contract = await ConnectContract(api, 'erc20','5HU5TSviQ8UvzEoPTKb9wmqsmbSjbMtWe6AZcvyNVvDg1yqM');
            dispatch({ type: 'SET_ERC20', payload: erc20contract });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'ERC20_ERROR' });
        }
    };
    if (erc20contractState!=='LOAD_ERC20') return;
    if (loadERC20) return dispatch({ type: 'SET_ERC20', payload: erc20contract });
    loadERC20 = true;
    asyncLoaderc20();
}
