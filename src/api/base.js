import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";
import api from "./index";

let loadBase = false;
let basecontract;
const InitBase = async (state,dispatch, address) => {

    const {apiState, api,basecontractState} = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account || basecontractState!= null) return;

    if (loadBase) return dispatch({ type: 'SET_BASE', payload: basecontract });
    loadBase = true;

    try {
        basecontract = await ConnectContract(api, 'base', address);
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

    let data = await daoManagercontract.query.queryComponentAddrs(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    const basecontract = await ConnectContract(api, 'base', data.base_addr);

    let logo = await basecontract.query.getLogo(AccountId, {value, gasLimit});

    logo = publicJs.formatResult(logo);
    return logo;
};

const getBaseData = async (basecontract) => {
    let dataObj = {};
    const AccountId = await Accounts.accountAddress();
    if (basecontract === null || !basecontract || !basecontract.query || !AccountId) return;

    let nameResult = await basecontract.query.getName(AccountId, {value, gasLimit});
    nameResult = publicJs.formatResult(nameResult);

    let logoResult = await basecontract.query.getLogo(AccountId, {value, gasLimit});
    logoResult = publicJs.formatResult(logoResult);

    let descResult = await basecontract.query.getDesc(AccountId, {value, gasLimit});
    descResult = publicJs.formatResult(descResult);

    let ownerResult = await basecontract.query.getOwner(AccountId, {value, gasLimit});
    ownerResult = publicJs.formatResult(ownerResult);

    dataObj = {
        nameResult,
        logoResult,
        descResult,
        ownerResult,
    };

    return dataObj;

};

export default {
    InitBase,
    InitHome,
    getBaseData
}
