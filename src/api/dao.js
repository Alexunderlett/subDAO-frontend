import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";

const InitDAO = async (state,dispatch,address) =>  {
    let daoC;
    const {apiState, api} = state;
    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || account) return;

    try {
        daoC = await ConnectContract(api, 'base',address);
        dispatch({ type: 'SET_DAO', payload: daoC });
    } catch (e) {
        console.error(e);

    }
    return daoC;

};


export default {
    InitDAO,

}
