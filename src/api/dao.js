import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";
import { randomAsHex } from '@polkadot/util-crypto';

let daoManagercontract;
const InitDAO = async (state,dispatch,address,cb) =>  {

    const {apiState, api} = state;
    let account = await Accounts.accountAddress();

    if (apiState !== 'READY' || !account ) return;

    try {
        daoManagercontract = await ConnectContract(api, 'daoManager',address);

        dispatch({ type: 'SET_DAO', payload: daoManagercontract });
        if(cb){
            cb(true)
        }
    } catch (e) {
        console.error(e);

    }
    return daoManagercontract;

};


const value = 0;
const gasLimit = 138003n * 1000000n;

const setDAO = async (daoManagercontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.tx || !AccountId) return;

    let {base_name,base_logo,base_desc,erc20_name,erc20_symbol,erc20_initial_supply,erc20_decimals,token, tokenlist,admin,adminlist}=obj;

    erc20_initial_supply= erc20_initial_supply?erc20_initial_supply:1;
    erc20_decimals= erc20_decimals?erc20_decimals:0;

    let objData= {
        base: {
            owner: AccountId,
            name: base_name,
            logo: base_logo,
            desc: base_desc
        },
        erc20: {
            owner:AccountId,
            name: erc20_name,
            symbol: erc20_symbol,
            total_supply: erc20_initial_supply,
            decimals: erc20_decimals
        },
        // erc20Transfers: {},
        org: {
            owner:AccountId,
            // moderators: {}
        },
        auth: {
            owner:AccountId,
            // moderators: {}
        }
    }
    if(token){
        objData.erc20Transfers =[]
        let i = 0;
       for(let item  in tokenlist) {
           // objData.erc20Transfers[tokenlist[item].address] = parseInt(tokenlist[item].token);
           objData.erc20Transfers[i] = [tokenlist[item].address,parseInt(tokenlist[item].token)];
           i++;
       }
    }

    if(admin){
        objData.org.moderators =[]
        let i = 0;
       for(let item  in adminlist) {
           // objData.org.moderators[adminlist[item].name] = adminlist[item].address;
           objData.org.moderators[i] = [adminlist[item].name,adminlist[item].address];
           i++;
       }
    }
       console.log(objData)

    const version = randomAsHex();
    console.log('======version=====',version)

    const data = await daoManagercontract.tx.initByParams({value, gasLimit:-1}, objData,version).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized ) {
            console.log(result.status.isFinalized ,result.status.isInBlock );
            console.log(result)
            cb(true)
        }
    });
    return data;
};

const transferToken =  async (daoManagercontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.tx || !AccountId) return;

    const{address,token}=obj;

    await daoManagercontract.tx.transfer({value, gasLimit}, address, token,).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized ) {
            console.log(result.status.isFinalized ,result.status.isInBlock );
            cb(true)
        }
    });
}

const addDaoModeratorTx =  async (daoManagercontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.tx || !AccountId) return;

    const{address,name}=obj;

    await daoManagercontract.tx.addDaoModerator({value, gasLimit}, name,address,).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized) {
            console.log(result.status.isFinalized ,result.status.isInBlock ,result);
            cb(true)
        }
    });
}

const queryComponentAddrs = async (daoManagercontract) => {

    const AccountId = await Accounts.accountAddress();
    if (daoManagercontract === null || !daoManagercontract || !daoManagercontract.query || !AccountId) return;

    let data = await daoManagercontract.query.queryComponentAddrs(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);
    return data;

};

export default {
    InitDAO,
    setDAO,
    transferToken,
    queryComponentAddrs,
    addDaoModeratorTx,
}
