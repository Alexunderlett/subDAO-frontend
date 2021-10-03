import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";

let basecontract;
const InitBase = async (state,dispatch, address,cb) => {

    const {apiState, api} = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account ) return;

    try {
        basecontract = await ConnectContract(api, 'base', address);
        if(basecontract){
            cb(true)
        }
        dispatch({ type: 'SET_BASE', payload: basecontract });

    } catch (e) {
        console.error(e);
    }

    return basecontract;

};

const value = 0;
const gasLimit = -1;

const InitHome = async (state,address) => {
    const {api} = state;
    const AccountId = await Accounts.accountAddress();



    const  daoManagercontract = await ConnectContract(api, 'daoManager',address);

    if(!daoManagercontract) return;
    let data = await daoManagercontract.query.queryComponentAddrs(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    console.error("========InitHome",data,data.base_addr,!data.base_addr,"address",address)

    if( !data || data.base_addr==null)return;
    const basecontract = await ConnectContract(api, 'base', data.base_addr);

    let res = await basecontract.query.getBase(AccountId, {value, gasLimit});
    res = publicJs.formatResult(res);



    console.log("======res",res)
    return res;
};

const getBaseData = async (basecontract) => {
    const AccountId = await Accounts.accountAddress();
    if (basecontract === null || !basecontract || !basecontract.query || !AccountId) return;

    let nameResult = await basecontract.query.getBase(AccountId, {value, gasLimit});
    nameResult = publicJs.formatResult(nameResult);

    return nameResult;

};

export default {
    InitBase,
    InitHome,
    getBaseData
}
