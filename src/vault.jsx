import React, { useEffect, useState, useRef } from 'react';
import { Table, Button } from 'antd';
import { useSubstrate } from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";
import Left from "./components/left";
import Back from "./images/prev.png";
import depositimg from "./images/deposit.png";
import withdrawimg from "./images/Withdraw.png";
import Deposit from './components/vault/deposit';
import sel from './images/Sel.png';
import close from './images/shutdownW.png';
// import Withdraw from "./components/vault/withdraw";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import LoadingNew from "./components/loadingNEW";


const Ul = styled.ul`
    color: #10164B;
    display: flex;
    flex-wrap: wrap;
    margin-left: -6rem;
  li{
    width: 31.3rem;
    height: 16rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: 2.4rem;
    padding: 2rem 2.8rem;
    box-sizing: border-box;
    word-break: break-all;    
    margin-left: 6rem;
  }
`;

const BalanceNum = styled.div`
    font-size: 3.2rem;
    font-weight: 300;
    line-height: 3.8rem;
    margin-bottom: 0.1rem;
`;

const Symbol = styled.div`
    font-size: 2.2rem;
    font-weight: 300;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.6;
`;

const Address = styled.div`
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 2.2rem;
    opacity: 0.4;
`;


export default function Vault(props) {


    const { state, dispatch } = useSubstrate();
    const { vaultcontract, allAccounts, apiState, erc20contract } = state;

    // const [loading, setLoading] = useState(false);
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


    let { t } = useTranslation();

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
        // setLoading(false);
    };
    useEffect(() => {
        setbalance();
    }, [list, historylist]);
    let beforelen, afterlen;
    const setShow = async (type) => {

        if (type === 'deposit') {
            let obj
            if (childRef.current != null) {
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


        beforelen = historylist.length

        await await setAlllist()
        if (afterlen > beforelen) {
            setshowvaultTips(true)
        }

        setTimeout(async () => {
            setshowvaultTips(false)


        }, 3000)


    }
    const setAlllist = async () => {

        // setLoading(true);
        setTips(t('InitializeVault'));
        await api.vault.getTokenList(vaultcontract).then(data => {
            if (!data) return;
            setlist(data)
        });
        await api.vault.getTransferHistory(vaultcontract).then(data => {
            if (!data) return;
            sethistorylist(data)
            afterlen = data.length

        });

    };

    useEffect(async () => {
        const initVaultcontract = async () => {
            let vault = JSON.parse(sessionStorage.getItem('contractlist'));
            if (vaultcontract == null && vault != null) {
                await api.vault.InitVault(state, dispatch, vault.vault_addr, (data) => {
                    console.log('vaultcontract====', data);
                });
            }
            if (erc20contract == null && vault != null) {
                await api.erc20.InitErc20(state, dispatch, vault.erc20_addr, (data) => {
                    console.log('erc20contract====', data);
                });
            }
            setAlllist();
        }
        initVaultcontract()
    }, [vaultcontract, allAccounts, apiState, erc20contract]);

    const handleClicktoDetail = (type) => {
        if (type === 'deposit') {
            setnewshow(true)
        } else {
            setnewWithdraw(true)
        }

    }

    const handleClicktoAbout = () => {
        props.history.push(`/about/${props.match.params.id}`);
    }

    return (
        <div className='container'>
            {/* <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} /> */}
            {
                showvaultTips && TipsNum && <div className="vaultTips">

                    <div><img src={sel} alt="" /></div>
                    <div className='tipsNumber'>{TipsNum}</div>
                    {/*{*/}
                    {/*    type && <div className='tipsDesc'>{t('sentfrom')}{TipsAddress}</div>*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    !type && <div className='tipsDesc'>{t('sentto')}{TipsAddress}</div>*/}
                    {/*}*/}

                    <div className='tipsDesc'>{t('sentto')}{TipsAddress}</div>
                    <div className='closeBg' onClick={() => handleClickClose()}><img src={close} alt="" /></div>
                </div>
            }

            <Deposit
                handleClose={handleClose}
                showTips={newshow}
                setShow={() => setShow('deposit')}
                ref={childRef}
            />
            {/*<Withdraw*/}
            {/*    handleClose={handleClose}*/}
            {/*    showTips={newWithdraw}*/}
            {/*    setShow={() => setShow('withdraw')}*/}
            {/*    ref={withdrawRef}*/}
            {/*/>*/}
            <section>
                <div className="row">
                    <div className='col-lg-3'>
                        <Left history={props.history} id={props.match.params.id} owner={props.match.params.owner} />
                    </div>
                    <div className='col-lg-9'>
                        <div className='voteTop'>
                            <div className='voteLft' onClick={handleClicktoAbout}>
                                <img src={Back} alt="" /> {t('Back')}
                            </div>
                            <div>
                                <Button className='btnR' onClick={() => handleClicktoDetail('deposit')}><img
                                    src={depositimg} alt="" />{t('deposit')}</Button>
                                {/*{*/}
                                {/*    withDrawS &&*/}
                                {/*    <Button className='btnR' onClick={() => handleClicktoDetail('withdraw')}><img*/}
                                {/*        src={withdrawimg} alt=""/>{t('withdraw')}</Button>*/}
                                {/*} */}

                                {/*<Button className='btnR' onClick={() => handleClicktoDetail('withdraw')}><img*/}
                                {/*    src={withdrawimg} alt=""/>{t('withdraw')}</Button>*/}
                            </div>
                        </div>

                        <div>
                            <div className="titleTop">{t('Balance')}</div>
                            <Ul>
                                {
                                    false && <LoadingNew />
                                }

                                {
                                    true && tokenlist.map((item, index) =>
                                        <li key={`balance_${index}`}>
                                            <BalanceNum>{item.balance}</BalanceNum>
                                            <Symbol>{item.symbol}</Symbol>
                                            <Address>{item.token}</Address>
                                        </li>
                                    )
                                }
                            </Ul>
                            {/* <div className="vaultwrap">
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
                            </div> */}
                        </div>
                        <div className='hslist'>
                            <div className="titleTop">{t('History')}</div>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

