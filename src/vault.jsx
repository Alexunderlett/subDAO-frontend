import React, {Component, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import PageBackground from "./components/pagebackground";
import {useSubstrate} from "./api/contracts";
import api from "./api";

export default function Vault(props){

    const {state,dispatch} = useSubstrate();
    const {vaultcontract} = state;

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);
    const [historylist, sethistorylist] = useState([]);
    const [logo, setLogo] = useState('');
    const [withDrawS, setwithDrawS] = useState(true);

    useEffect(async() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);

    }, []);
    useEffect(async() => {
        if(vaultcontract==null) return ;
        let aa = await api.vault.checkAuthority(vaultcontract).then(data => {
            setwithDrawS(data)
        });
    }, [vaultcontract]);

    useEffect( async () => {
        let arr=[{
            token:'',
            balance:''
        }];
        let index = 0;
        for(let item of list){
            arr[index].token = item;
            await api.vault.getBalanceOf(vaultcontract,item).then(data => {
                if (!data) return;
                arr[index].balance = data
            });
            index++;
        }
        settokenlist(arr)

    }, [list]);

    useEffect(async () => {
        if(vaultcontract === null) return;

        await api.vault.getTokenList(vaultcontract).then(data => {
            if (!data) return;
            setlist(data)
        });

        await api.vault.getTransferHistory(vaultcontract).then(data => {
            if (!data) return;
            sethistorylist(data)
        });

        // try {
        //     const allInjected = await web3Enable('SubDAO');
        //     console.log("======allInjected", allInjected);
        //     if (allInjected.length == 0) {
        //         console.error("!!!!! No wallet extention detected!!");
        //         return;
        //     }
        //
        //     const allAccounts = await web3Accounts();
        //     console.log("======allAccounts", allAccounts);
        //
        //     if (allAccounts && allAccounts.length > 0) {
        //         console.log("the first account: ", allAccounts[0].address);
        //     } else {
        //         console.error("no valid accounts available!");
        //         return;
        //     }
        //
        //
        //     const AccountId = allAccounts[0].address;
        //
        //     const injector = await web3FromAddress(AccountId);
        //
        //     // const value = 0;
        //     // const gasLimit = 138003n * 1000000n;
        //     // const AccountId = JSON.parse(sessionStorage.getItem('account')); //本地账户
        //
        //     console.log("local account id : ", AccountId)
        //
        //
        //
        //     //vault
        //     console.log("vaultcontract: ", vaultcontract);
        //
        //     let daoName = "mydao";
        //     let daoLogo = "http://example.com/logo.jpg";
        //     let daoDesc = "Hello World!";
        //     let vault_contract_address = AccountId;
        //
        //     let optionParam = { value: 0, gasLimit: -1 };
        //
        //     let tx;
        //     let result;
        //
        //
        //     tx = await vaultcontract.tx.init(optionParam,vault_contract_address );
        //     result = await tx.signAndSend(AccountId, { signer: injector.signer });
        //     console.log('result ', result.toString());
        //
        //
        //
        //     let add_erc_token = allAccounts[1].address;
        //     //增加一种token
        //     tx = await vaultcontract.tx.add_vault_token(optionParam, add_erc_token);
        //     await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //         if (result.status.isInBlock) {
        //             console.log('in a block');
        //          } else if (result.status.isFinalized) {
        //              console.log('finalized');
        //         } else {
        //            console.log("unexpected result", result);
        //          }
        //      });
        //
        //     let add_erc_token2 = allAccounts[1].address;
        //     //增加另一种token
        //     tx = await vaultcontract.tx.add_vault_token(optionParam, add_erc_token2);
        //     await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //         if (result.status.isInBlock) {
        //             console.log('in a block');
        //          } else if (result.status.isFinalized) {
        //              console.log('finalized');
        //         } else {
        //            console.log("unexpected result", result);
        //          }
        //      });
        //
        //
        //
        //    // 返回 token list
        //     result = await vaultcontract.query.get_token_list(AccountId, { value: 0, gasLimit: -1 });
        //     console.log("======name", result)
        //     if (result && result.output) {
        //         console.log("======", result.output.toHuman());
        //     }
        //
        //
        //     //let add_erc_token2 = allAccounts[1].address;
        //     //移除一种token
        //     tx = await vaultcontract.tx.remove_vault_token(optionParam, add_erc_token2);
        //     await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //         if (result.status.isInBlock) {
        //             console.log('in a block');
        //          } else if (result.status.isFinalized) {
        //              console.log('finalized');
        //         } else {
        //            console.log("unexpected result", result);
        //          }
        //      });
        //
        //      //把某一种token的 指定数量的资金存入国库
            // 1.1 需要执行一步 etc20合约的approve。
         //   tx = await erc20_contract.tx.approve(optionParam, vault_contract_address,200.0);
         //   await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
         //       if (result.status.isInBlock) {
         //           console.log('in a block');
         //       } else if (result.status.isFinalized) {
         //           console.log('finalized');
          //      } else {
         //           console.log("unexpected result", result);
         //       }
        //    });

            // 1.2 实际执行 vaultcontract.tx.deposit
        //     let erc_20_address = allAccounts[1].address;
        //     let from_address =  allAccounts[2].address;
        //     tx = await vaultcontract.tx.deposit(optionParam, erc_20_address, from_address,110.0);
        //     await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //         if (result.status.isInBlock) {
        //             console.log('in a block');
        //          } else if (result.status.isFinalized) {
        //              console.log('finalized');
        //         } else {
        //            console.log("unexpected result", result);
        //          }
        //      });
        //
        //      let erc_20_address3 = allAccounts[1].address;
        //      // 返回 返回某一个token的余额
        //     result = await vaultcontract.query.get_balance_of(AccountId, { value: 0, gasLimit: -1 },erc_20_address3);
        //     console.log("======name", result)
        //     if (result && result.output) {
        //         console.log("======", result.output.toHuman());
        //     }
        //
        //     // 返回转账的流水。
        //     result = await vaultcontract.query.get_transfer_history(AccountId, { value: 0, gasLimit: -1 });
        //     console.log("======name", result)
        //     if (result && result.output) {
        //         console.log("======", result.output.toHuman());
        //     }
        //
        //
        //
        //     //把某一种token的 指定数量的资金转出国库
        //     let erc_20_address1 = allAccounts[1].address;
        //     let to_address =  allAccounts[2].address;
        //     tx = await vaultcontract.tx.withdraw(optionParam, erc_20_address1, to_address,110.0);
        //     await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
        //         if (result.status.isInBlock) {
        //             console.log('in a block');
        //          } else if (result.status.isFinalized) {
        //              console.log('finalized');
        //         } else {
        //            console.log("unexpected result", result);
        //          }
        //      });
        //
        //
        //
        //
        //
        //
        // } catch (e) {
        //     console.log("Catch the exception!!!", e); // 30
        // }




    }, []);



    const handleClicktoDetail = (type) => {
        props.history.push(`/${type}/${id}`)
    }
    const handleClicktoVote = () => {
        props.history.push(`/about/${id}`)
    }

        return (
            <div>
                <section>
                    <PageBackground />
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={logo} alt=""/>
                                </div>
                                <div className='vaultBtn'>
                                    <Button variant="primary" onClick={()=>handleClicktoDetail('deposit')}>Deposit</Button>
                                    {
                                        withDrawS&&<Button variant="primary" onClick={()=>handleClicktoDetail('withdraw')}>Withdraw</Button>
                                    }

                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vault">
                                    <li>
                                        <h6>Balance</h6>
                                        <div className='vaultbg'>
                                            {
                                                tokenlist.map((item,index)=><dl key={`balance_${index}`}>
                                                    <dt>{item.token}</dt>
                                                    <dd>{item.balance}</dd>
                                                </dl>)
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <h6>History</h6>
                                        <div className='vaultbg hslist'>
                                            {
                                                historylist.map((item,index)=><dl key={`history_${index}`}>
                                                    {
                                                        item.transfer_direction === '2' &&  <span>
                                                            <dt>deposit</dt>
                                                        </span>
                                                    }
                                                    {
                                                        item.transfer_direction === '1' &&  <span>
                                                            <dt>Transfer from</dt>
                                                            <dd><a href="#">{item.from_address}</a></dd>
                                                        </span>
                                                    }

                                                    <dd>{item.value}</dd>
                                                </dl>)
                                            }
                                        </div>
                                    </li>
                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={handleClicktoVote}>Back</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )

}

