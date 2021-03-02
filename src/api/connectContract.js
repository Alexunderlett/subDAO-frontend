import { ContractPromise } from '@polkadot/api-contract';

import mainAbi from '../abi/target/main_v0.1';

import baseAbi from '../abi/target/base_v0.1';

const mainAddress='5CAJ25hn1nNdFc3jSnU3TruY4w4pXxfSUoQuZ2ANAr8SvF9m' ;

const ConnectContract = async (api,type) =>{
    if(!api){
      return
    }
    let abi;
    let contractAddress;
    switch(type){

        case'base':
            abi = baseAbi;
            contractAddress = mainAddress;
            break;
        default:
        case'main':
            abi = mainAbi;
            contractAddress = mainAddress;
            break;
            break;
    }
    const mainContract = new ContractPromise(api, abi, contractAddress);
    return mainContract;
  }

export default ConnectContract
