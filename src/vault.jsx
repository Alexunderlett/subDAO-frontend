import React, { useEffect, useState,useRef} from 'react';
import { Table} from "react-bootstrap";
import {useSubstrate} from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";
import Left from "./components/left";
import Back from "./images/prev.png";
import depositimg from "./images/deposit.png";
import withdrawimg from "./images/Withdraw.png";
import Deposit from './components/vault/deposit';
import sel from './images/Sel.png';
import close from './images/shutdownW.png';
import Withdraw from "./components/vault/withdraw";
import {useTranslation} from "react-i18next";

export default function Vault(props){


        const {state,dispatch} = useSubstrate();
        const {vaultcontract,allAccounts,apiState} = state;

        const [loading, setLoading] = useState(false);
        const [tips, setTips] = useState('');

        const [newshow, setnewshow] = useState(false);
        const [newWithdraw, setnewWithdraw] = useState(false);
        const [showvaultTips, setshowvaultTips] = useState(false);

        const [id, setId] = useState(null);
        const [list, setlist] = useState([]);
        const [tokenlist, settokenlist] = useState([]);
        const [historylist, sethistorylist] = useState([]);
        // const [withDrawS, setwithDrawS] = useState(true);
        const [TipsNum, setTipsNum] = useState(0);
        const [TipsAddress, setTipsAddress] = useState(0);
        const [type, setType] = useState(true);

        let {t} = useTranslation();

        const childRef = useRef();
        const withdrawRef = useRef();

        const handleClickDeposit = () => {
            setnewshow(true)
        }
        const handleClickClose = () => {
            setshowvaultTips(false)
        }

        const handleClose = () => {
            setnewshow(false)
            setnewWithdraw(false)
        }

        useEffect(() => {
            setId(props.match.params.id);

        }, []);
        // useEffect(() => {
        //     if (vaultcontract == null) return;
        //     const checkAuthority = async () => {
        //         await api.vault.checkAuthority(vaultcontract).then(data => {
        //             setwithDrawS(data)
        //         });
        //     };
        //     checkAuthority();
        // }, [vaultcontract]);
        const setbalance = async () => {
            let arr = [{
                token: '',
                balance: ''
            }];
            let index = 0;
            for (let item of list) {
                arr[index].token = item;
                // eslint-disable-next-line no-loop-func
                await api.vault.getBalanceOf(vaultcontract, item).then(data => {
                    if (!data) return;
                    arr[index].balance = data
                });
                index++;
            }
            settokenlist(arr);
            setLoading(false);

        };
        useEffect(() => {
            setbalance();
        }, [list, historylist]);
        const setShow = (type) => {

            if (type === 'deposit') {
                let obj
                if(childRef.current != null){
                    obj = childRef.current.resultToVault();
                    setTipsNum(obj.amount)
                    setTipsAddress(obj.selected)
                    setType(true)
                    childRef.current.amountToNull()
                }


            }
            // else {
            //     let obj = withdrawRef.current.resultToVault();
            //     setTipsNum(obj.amount)
            //     setTipsAddress(obj.address)
            //     setType(false)
            //     withdrawRef.current.amountToNull()
            // }

            setshowvaultTips(true)

            setTimeout(() => {
                setshowvaultTips(false)
                setAlllist()
            }, 3000)


        }
        const setAlllist = async () => {

            setLoading(true);
            setTips(t('InitializeVault'));
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setlist(data)
            });
            await api.vault.getTransferHistory(vaultcontract).then(data => {
                if (!data) return;
                sethistorylist(data)
            });

        };

    useEffect(async () => {
        const initVaultcontract = async () =>{
            let vault = JSON.parse(sessionStorage.getItem('contractlist'));
            if(vaultcontract == null && vault!= null){
                await api.vault.InitVault(state, dispatch, vault.vault_addr,(data) => {
                    console.log('vaultcontract====',data);
                });
            }
            setAlllist();
        }
        initVaultcontract()
    }, [vaultcontract,allAccounts,apiState]);

        const handleClicktoDetail = (type) => {
            if (type === 'deposit') {
                setnewshow(true)
            } else {
                setnewWithdraw(true)
            }

        }

        const handleClicktoAbout = () => {
            props.history.push(`/home/about/${props.match.params.id}`);
        }

        return (
            <div className='topTipsBrdr'>
                <Loading showLoading={loading} tips={tips}/>
                {
                    showvaultTips && TipsNum && <div className="vaultTips">

                        <div><img src={sel} alt=""/></div>
                        <div className='tipsNumber'>{TipsNum}</div>
                        {
                            type && <div className='tipsDesc'>{t('sentfrom')}{TipsAddress}</div>
                        }
                        {
                            !type && <div className='tipsDesc'>{t('sentto')}{TipsAddress}</div>
                        }


                        <div className='closeBg' onClick={() => handleClickClose()}><img src={close} alt=""/></div>

                    </div>
                }


                <Deposit
                    handleClose={handleClose}
                    showTips={newshow}
                    setShow={() => setShow('deposit')}
                    ref={childRef}
                />
                <Withdraw
                    handleClose={handleClose}
                    showTips={newWithdraw}
                    setShow={() => setShow('withdraw')}
                    ref={withdrawRef}
                />
                <section>
                    <div className="row">
                        <div className='col-lg-3'>
                            <Left/>
                        </div>
                        <div className='col-lg-9'>
                            <div className='voteTop'>
                                <div className='voteLft' onClick={handleClicktoAbout}>
                                    <img src={Back} alt=""/> {t('Back')}
                                </div>
                                <div>
                                    <button className='btnR' onClick={() => handleClicktoDetail('deposit')}><img
                                        src={depositimg} alt=""/>{t('deposit')}</button>
                                    {/*{*/}
                                    {/*    withDrawS &&*/}
                                    {/*    <button className='btnR' onClick={() => handleClicktoDetail('withdraw')}><img*/}
                                    {/*        src={withdrawimg} alt=""/>{t('withdraw')}</button>*/}
                                    {/*} */}

                                        {/*<button className='btnR' onClick={() => handleClicktoDetail('withdraw')}><img*/}
                                        {/*    src={withdrawimg} alt=""/>{t('withdraw')}</button>*/}

                                </div>


                            </div>
                            <ul className="vault">
                                <li>
                                    <h3>{t('Balance')}</h3>
                                    <div className="vaultwrap">
                                        <div className='vaultbg'>
                                            <div className="vaultbalance">
                                                {
                                                    tokenlist.map((item, index) => <dl key={`balance_${index}`}>
                                                        <dd>{item.balance}</dd>
                                                        <dt>{item.token}</dt>

                                                    </dl>)
                                                }
                                            </div>

                                        </div>
                                    </div>

                                </li>
                                <li className='hslist'>
                                    <h3>{t('History')}</h3>
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            <th>{t('Amount')}</th>
                                            <th>{t('Transfer')}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            historylist.map((item, index) => <tr key={`history_${index}`}>
                                                <td>{item.value}</td>
                                                <td>{item.from_address}</td>

                                            </tr>)
                                        }
                                        </tbody>
                                    </Table>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        )


}

