import React, { useEffect, useState, useRef } from 'react';
import { Table, Form, Button, Tag } from 'antd';
import { useSubstrate } from "./api/contracts";
import api from "./api";
import Left from "./components/left";
import cancel from "./img/cancel.png";
import failure from "./img/failure.png";
import finish from "./img/finish.png";
import Deposit from './components/vault/deposit';
import sel from './img/Sel.png';
import close from './img/shutdownW.png';
import Withdraw from "./components/vault/withdraw";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import LoadingNew from "./components/loadingNEW";
import PublicJS from './utils/publicJs';
import CopyStr from "./components/copy";


const FirstLine = styled.div`
  position: relative;
`;

const BtnRht = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    padding-right: 3rem;
    button{
        width: 9rem;
        height: 3rem;
        border-radius: 0.4rem;
        font-size: 1.2rem;
        margin-left: 2rem;
        padding: 0;
        line-height: 3rem;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        
        &.active{
            width: 9rem;
            height: 3rem;
            border-radius: 0.4rem;
            border: 0.1rem solid #D52473;
            color: #d52473;
        }
    }
    .withdrawBtn{
        background: #10164B;
        color: #FFFFFF;
        &:hover{
            border: 0;
            opacity: 0.8;
        }
    }
`;

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
    margin-bottom: 2rem;
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

    const [loading, setLoading] = useState(false);

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
    const [current, setcurrent] = useState(1);


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
        setLoading(false);
        // dispatch({ type: 'LOADINGTYPE', payload: null });
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

        await setAlllist()
        if (afterlen > beforelen) {
            setshowvaultTips(true)
        }

        setTimeout(async () => {
            setshowvaultTips(false)
        }, 3000)

    }
    const setAlllist = async () => {
        setLoading(true);
        // dispatch({ type: 'LOADINGTYPE', payload: t('InitializeVault') });
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

    const columns = [
        {
            title: 'Deposit',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'From',
            dataIndex: 'from_address',
            key: 'from_address',
            render: tag => (`${tag.slice(0, 15)}…${tag.slice(-15)}`),
        },
        {
            title: 'To',
            dataIndex: 'to_address',
            key: 'to_address',
            render: tag => (`${tag.slice(0, 15)}…${tag.slice(-15)}`),
        },
        {
            title: 'Behavior',
            dataIndex: 'transfer_direction',
            key: 'transfer_direction',
            align: 'center',
            render: tag => {
                let color = 'green';
                let text = 'OUT';
                if (tag === '2') {
                    color = 'volcano'
                    text = 'IN'
                }
                return (
                    <Tag color={color} key={tag}>
                        {text}
                    </Tag>
                );
            }
        },
        {
            title: 'State',
            dataIndex: 'transfer_time',
            key: 'transfer_time',
            align: 'center',
            render: State => {
                let img
                let text = 'Failure'
                if (State) {
                    img = finish
                    text = 'Finish'
                } else if (State === 'cancel') {
                    img = cancel
                } else {
                    img = failure
                }
                return (
                    <>
                        <img src={img} alt="" style={{ width: '2rem', height: '2rem',marginRight: '1rem' }} />
                        {text}
                    </>
                )
            },
        },
        {
            title: 'Time',
            dataIndex: 'transfer_time',
            key: 'transfer_time',
            align: 'center',
            render: time => {
                let t = parseInt(time.replace(/,/g, ""))
                let date = PublicJS.dateFormat(t)
                return date
            }
        },
    ];

    return (
        <div className='container'>
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
            <Withdraw
                handleClose={handleClose}
                showTips={newWithdraw}
                setShow={() => setShow('withdraw')}
                ref={withdrawRef}
            />
            <section>
                <FirstLine>
                    <Left history={props.history} id={props.match.params.id} owner={props.match.params.owner} />
                    <BtnRht>
                        {/* <div className='voteLft' onClick={handleClicktoAbout}>
                            <img src={Back} alt="" />
                            {t('Back')}
                        </div> */}

                        <Button type="primary" onClick={() => handleClicktoDetail('deposit')}>
                            {/* <img src={depositimg} alt="" /> */}
                            {t('deposit')}
                        </Button>

                        {/* {withDrawS &&
                            <Button className='withdrawBtn' onClick={() => handleClicktoDetail('withdraw')}>
                                {t('withdraw')}
                            </Button>
                        } */}
                        {/* <img src={withdrawimg} alt="" /> */}
                    </BtnRht>
                </FirstLine>

                <div>
                    <div className="titleTop">{t('Balance')}</div>
                    <Ul>
                        {
                            loading && <LoadingNew />
                        }
                        {
                            !loading && tokenlist.map((item, index) =>
                                <li key={`balance_${index}`}>
                                    <BalanceNum>{item.balance}</BalanceNum>
                                    <Symbol>{item.symbol}</Symbol>
                                    <Address>
                                        {item.token}
                                        <CopyStr address={item.token} />
                                    </Address>
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
                    <Table
                        dataSource={historylist}
                        columns={columns}
                        size="middle"
                        pagination={false}
                    />
                </div>
            </section>
        </div>
    )
}

