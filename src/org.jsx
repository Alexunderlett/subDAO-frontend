import React, {Component, useEffect, useState} from 'react';
import PageBackground from "./components/pagebackground";
import {Button} from "react-bootstrap";
import {useSubstrate} from "./api/contracts";
import api from "./api";


export default function Org(props){

    const {state,dispatch} = useSubstrate();
    const {orgcontract} = state;

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [memberlist, setmemberlist] = useState([]);
    const [logo, setLogo] = useState('');

    useEffect(() => {
        setId(props.match.params.id);
        let logo = sessionStorage.getItem('logo');
        setLogo(logo);
    }, []);

    useEffect(async () => {
        if(orgcontract==null)return;

        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setlist(data)
        });
        await api.org.getDaoMembersList(orgcontract).then(data => {
            if (!data) return;
            setmemberlist(data)
        });
    }, [orgcontract]);
     /* example of basecontract
     useEffect(async () => {
        if (basecontract === null) return;

        try {
            const allInjected = await web3Enable('SubDAO');
            console.log("======allInjected", allInjected);
            if (allInjected.length == 0) {
                console.error("!!!!! No wallet extention detected!!");
                return;
            }

            const allAccounts = await web3Accounts();
            console.log("======allAccounts", allAccounts);

            if (allAccounts && allAccounts.length > 0) {
                console.log("the first account: ", allAccounts[0].address);
            } else {
                console.error("no valid accounts available!");
                return;
            }


            const AccountId = allAccounts[0].address;

            const injector = await web3FromAddress(AccountId);

            // const value = 0;
            // const gasLimit = 138003n * 1000000n;
            // const AccountId = JSON.parse(sessionStorage.getItem('account')); //本地账户

            console.log("local account id : ", AccountId)



            //basecontract
            console.log("baseContract: ", basecontract);

            let daoName = "mydao";
            let daoLogo = "http://example.com/logo.jpg";
            let daoDesc = "Hello World!";
            let daoOwner = AccountId;

            let optionParam = { value: 0, gasLimit: -1 };

            let tx;
            let result;




            tx = await basecontract.tx.initBase(optionParam, daoName, daoLogo, daoDesc);


            result = await tx.signAndSend(AccountId, { signer: injector.signer });
            console.log('result ', result.toString());



            tx = await basecontract.tx.setName(optionParam, daoName);
            await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
                if (result.status.isInBlock) {
                    console.log('in a block');
                 } else if (result.status.isFinalized) {
                     console.log('finalized');
                } else {
                   console.log("unexpected result", result);
                 }
             });

            result = await basecontract.query.getName(AccountId, { value: 0, gasLimit: -1 });
            console.log("======name", result)
            if (result && result.output) {
                console.log("======", result.output.toHuman());
            }


        } catch (e) {
            console.log("Catch the exception!!!", e); // 30
        }
    }, [basecontract]);*/

    // useEffect(async () => {
    //     if(orgcontract === null) return ;
    //
    //
    //     try {
    //         const allInjected = await web3Enable('SubDAO');
    //         console.log("======allInjected", allInjected);
    //         if (allInjected.length == 0) {
    //             console.error("!!!!! No wallet extention detected!!");
    //             return;
    //         }
    //
    //         const allAccounts = await web3Accounts();
    //         console.log("======allAccounts", allAccounts);
    //
    //         if (allAccounts && allAccounts.length > 0) {
    //             console.log("the first account: ", allAccounts[0].address);
    //         } else {
    //             console.error("no valid accounts available!");
    //             return;
    //         }
    //
    //
    //         const AccountId = allAccounts[0].address;
    //
    //         const injector = await web3FromAddress(AccountId);
    //
    //         // const value = 0;
    //         // const gasLimit = 138003n * 1000000n;
    //         // const AccountId = JSON.parse(sessionStorage.getItem('account')); //本地账户
    //
    //         console.log("local account id : ", AccountId)
    //
    //
    //
    //         //org
    //         console.log("orgContract: ", orgcontract);
    //
    //         let daoName = "mydao";
    //         let daoLogo = "http://example.com/logo.jpg";
    //         let daoDesc = "Hello World!";
    //         let daoOwner = AccountId;
    //
    //         let optionParam = { value: 0, gasLimit: -1 };
    //
    //         let tx;
    //         let result;
    //
    //
    //         let member_name_1 = "member_1";
    //         let member_account_1 = allAccounts[1].address;
    //         //增加普通成员
    //         tx = await orgcontract.tx.add_dao_member(optionParam, member_name_1,member_account_1);
    //         await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
    //             if (result.status.isInBlock) {
    //                 console.log('in a block');
    //              } else if (result.status.isFinalized) {
    //                  console.log('finalized');
    //             } else {
    //                console.log("unexpected result", result);
    //              }
    //          });
    //
    //         let member_name_2 = "member_2";
    //         let member_account_2 = allAccounts[3].address;
    //         //增加普通成员
    //         tx = await orgcontract.tx.add_dao_member(optionParam, member_name_2,member_account_2);
    //         await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
    //             if (result.status.isInBlock) {
    //                 console.log('in a block');
    //              } else if (result.status.isFinalized) {
    //                  console.log('finalized');
    //             } else {
    //                console.log("unexpected result", result);
    //              }
    //          });
    //
    //
    //         let moderator_name_1 = "moderator_1";
    //         let moderator_account_1 = allAccounts[2].address;
    //         //增加管理员
    //         tx = await orgcontract.tx.add_dao_moderator(optionParam, moderator_name_1,moderator_account_1);
    //         await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
    //             if (result.status.isInBlock) {
    //                 console.log('in a block');
    //              } else if (result.status.isFinalized) {
    //                  console.log('finalized');
    //             } else {
    //                console.log("unexpected result", result);
    //              }
    //          });
    //
    //
    //        // 返回org的创建者
    //         result = await orgcontract.query.get_dao_creator(AccountId, { value: 0, gasLimit: -1 });
    //         console.log("======name", result)
    //         if (result && result.output) {
    //             console.log("======", result.output.toHuman());
    //         }
    //
    //         //返回组织的id
    //          result = await orgcontract.query.get_orgid(AccountId, { value: 0, gasLimit: -1 });
    //         console.log("======name", result)
    //         if (result && result.output) {
    //             console.log("======", result.output.toHuman());
    //         }
    //
    //          //返回当前的管理员列表
    //          result = await orgcontract.query.get_dao_moderator_list(AccountId, { value: 0, gasLimit: -1 });
    //         console.log("======name", result)
    //         if (result && result.output) {
    //             console.log("======", result.output.toHuman());
    //         }
    //
    //        //返回当前的普通成员的列表
    //          result = await orgcontract.query.get_dao_members_list(AccountId, { value: 0, gasLimit: -1 });
    //         console.log("======name", result)
    //         if (result && result.output) {
    //             console.log("======", result.output.toHuman());
    //         }
    //
    //
    //
    //
    //
    //         //移除管理员
    //         tx = await orgcontract.tx.remove_dao_moderator(optionParam, moderator_name_1,moderator_account_1);
    //         await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
    //             if (result.status.isInBlock) {
    //                 console.log('in a block');
    //              } else if (result.status.isFinalized) {
    //                  console.log('finalized');
    //             } else {
    //                console.log("unexpected result", result);
    //              }
    //          });
    //
    //           //移除普通成员
    //         tx = await orgcontract.tx.remove_dao_member(optionParam, member_name_2,member_account_2);
    //         await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
    //             if (result.status.isInBlock) {
    //                 console.log('in a block');
    //              } else if (result.status.isFinalized) {
    //                  console.log('finalized');
    //             } else {
    //                console.log("unexpected result", result);
    //              }
    //          });
    //
    //         //管理员或普通成员自我退出
    //         tx = await orgcontract.tx.resign(optionParam,member_account_1);
    //         await tx.signAndSend(AccountId, { signer: injector.signer }, (result) => {
    //             if (result.status.isInBlock) {
    //                 console.log('in a block');
    //              } else if (result.status.isFinalized) {
    //                  console.log('finalized');
    //             } else {
    //                console.log("unexpected result", result);
    //              }
    //          });
    //
    //
    //     } catch (e) {
    //         console.log("Catch the exception!!!", e); // 30
    //     }
    //
    //
    //
    //
    // }, [orgcontract]);
    //
    //
    //
    // useEffect(async () => {
    //     if (daoManagercontract === null) return;
    //
    //     //daoManagercontract
    //
    // }, [daoManagercontract]);

    const handleClicktoManage = () => {
       props.history.push(`/manage/${id}`)
    }
    const handleClicktoAbout = () => {
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
                        </div>
                        <div className='col-lg-8'>
                            <ul className="org">
                                <li>
                                    <h6>Moderators</h6>
                                    <div className='orgbg'>

                                        {
                                            list.map((i,index)=><dl key={`moderator_${index}`}>
                                                {/*<dt>pETH</dt>*/}
                                                <dd><a href="#">{list[index]}</a></dd>
                                            </dl>)
                                        }
                                    </div>
                                </li>
                                <li>
                                    <h6>Members</h6>
                                    <div className='orgbg'>
                                        {
                                            memberlist.map((i,index)=><dl key={`member_${index}`}>
                                                {/*<dt>pETH</dt>*/}
                                                <dd><a href="#">{memberlist[index]}</a></dd>
                                            </dl>)
                                        }
                                    </div>
                                </li>
                                <li className='brdr'>
                                    <Button variant="outline-primary" onClick={handleClicktoAbout}>Back</Button>
                                    <Button variant="primary" onClick={handleClicktoManage}>Manage</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}

