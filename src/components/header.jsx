import React, { useState, useEffect } from 'react';
import * as history from 'history';
import { Form } from "react-bootstrap";
import Accounts from '../api/Account';
import { useSubstrate } from "../api/contracts";
import CopyStr from "./copy";
import publicJs from "../utils/publicJs";
import { useTranslation, Trans, Translation } from 'react-i18next'

import logo from '../img/logo.png';
import arrow from '../img/Polygon.png';
import balanceOfImg from '../img/balanceOf.png';
import myDao from '../img/myDao.png';
import close from '../images/shutdownW.png'
import styled from 'styled-components';
import { Modal, Button, Select } from 'antd';

const createHashHistory = history.createHashHistory();

const HeaderBg = styled.div`
    width: 100%;
    height: 10.6rem;
    background: #FFFFFF;
    box-shadow: 0rem 0rem 3rem 0rem rgba(0, 0, 0, 0.1);
    
    .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 159.2rem;
        margin: 0 auto !important;

        .lftTit{
            display: flex;
            align-items: center;
            .toFirst{
                width: 6rem;
                height: 6rem;
                background: #D51172;
                border-radius: 1.9rem;
                cursor: pointer;
                margin: 2.3rem 0;

                img{
                    width: 6rem;
                    height: 6rem;
                }
            }
            .title{
                width: 8.9rem;
                height: 2.8rem;
                font-size: 2.4rem;
                font-family: Roboto-Light, Roboto;
                font-weight: 300;
                color: #10164B;
                line-height: 2.8rem;
                margin-left: 1.6rem;
            }
        }

        .rhtBtn{
            flex-grow: 1;

            .signin{
                font-size: 1.6rem;
                font-family: Roboto-Light, Roboto;
                font-weight: 300;
                color: #10164B;
                line-height: 1.9rem;
            }
            .header-button{
                text-align: right;
                height: 1.9rem;
                font-size: 1.6rem;
                font-family: Roboto-Light, Roboto;
                font-weight: 300;
                line-height: 1.9rem;
                display: flex;
                /* align-items: center; */
                justify-content: end;
            }
            img{
                width: 1.8rem;
                height: 1.8rem;
                margin-left: 2rem;
                margin-right: 0.6rem;
                vertical-align: middle;
            }
            .createDAO{
                margin-left: 2rem;
            }
            .createDAO,.myDao,.logout{
                cursor: pointer;
            }
            .logout{
                margin-left: 5.7rem;
                opacity: 0.5;
            }
        }
    }
`

export default function Headertop(props) {
    const { state, dispatch } = useSubstrate();
    const { allAccounts, api, maincontract, daoManagercontract } = state;

    let { t, i18n } = useTranslation()

    const [selected, setselected] = useState([]);

    const [showButton, setShowButton] = useState(false);
    const [showExit, setshowExit] = useState(false);
    const [daoExit, setdaoExit] = useState(false);
    const [first, setfirst] = useState(false);
    const [balanceOf, setbalanceOf] = useState(0);
    const [showlist, setshowlist] = useState(false);
    const [currentAccount, setcurrentAccount] = useState(null);

    useEffect(() => {
        setshowExit(createHashHistory.location.pathname === '/create');
        setfirst(createHashHistory.location.pathname === '/home');
        createHashHistory.listen((obj) => {
            setshowExit(createHashHistory.location.pathname === '/create')
            setfirst(createHashHistory.location.pathname === '/home')
        });
    }, [showExit, first]);

    useEffect(() => {
        i18n.changeLanguage('en')
        dispatch({ type: 'MYDAO' });
    }, []);


    const queryBalance = async (account) => {

        if (api == null || account == null || !account.length || !account[0].address) return;
        await api.query.system.account(account[0].address, ({ data: balance }) => {
            setbalanceOf(balance.toHuman().free)
        });
    }

    useEffect(() => {
        if (allAccounts == null) return
        queryBalance(allAccounts)
    }, [allAccounts, maincontract, daoManagercontract]);
    useEffect(() => {


        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }

    }, [allAccounts]);

    const backNav = () => {
        createHashHistory.goBack()
    }

    const backHome = () => {
        createHashHistory.push(`/`)
    }
    const account = JSON.parse(sessionStorage.getItem('account'));
    const handleClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            createHashHistory.push('/create')
        }
    }
    const handleExit = () => {
        createHashHistory.push('/')
    }
    const handleMyClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            dispatch({ type: 'MYDAO' });
            createHashHistory.push('/')
            setdaoExit(true)
        }
    }
    const exitMyClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            dispatch({ type: 'NOMAY' });
            setdaoExit(false)
        }
    }
    const toFirst = () => {
        dispatch({ type: 'NOMAY' });
        createHashHistory.push('/')
    }
    const exitAccount = () => {
        sessionStorage.removeItem('account');
        dispatch({ type: 'LOAD_ALLACCOUNTS' });
        setselected([])
        createHashHistory.push('/home')
        window.location.reload()

    }
    const AddresstoShow = (address) => {

        let frontStr = address.substring(0, 4);

        let afterStr = address.substring(address.length - 4, address.length);

        return `${frontStr}...${afterStr}`

    }

    const [walletTips, setWalletTips] = useState(false);
    const connectWallet = async () => {
        setshowlist(true);
        const accoutlist = await Accounts.accountlist();
        if (typeof (accoutlist) === "string") {
            setWalletTips(true)
        } else {
            setallList(accoutlist);
        }
    }

    const [allList, setallList] = useState([]);

    const selectAccounts = (val) => {
        setcurrentAccount(val)
    }

    const changeAccounts = async (val) => {
        let selected = allList.filter(i => i.address === currentAccount);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));
        dispatch({ type: 'SET_ALLACCOUNTS', payload: selected });
        cancleShowlist()
    }

    const cancleShowlist = () => {
        setshowlist(false);
        setcurrentAccount(null)
    }

    return (
        <HeaderBg className='header'>
            <div className="row">
                <div className="lftTit">
                    <div className="toFirst" onClick={toFirst}>
                        <img src={logo} alt="" />
                    </div>
                    <div className="title">SubDAO</div>
                </div>
                <div className="rhtBtn">
                    <div className="header-button">
                        <Modal
                            visible={showButton} onCancel={() => { setShowButton(false) }}
                        >
                            {/* <Modal.Title closeButton> */}
                            <i className='fa fa-user-times homeTop' />
                            {/* </Modal.Title> */}
                            {/* <Modal.Content className='homebtm'> */}
                            <h4>Please connect wallet</h4>
                            {/* </Modal.Content> */}
                        </Modal>
                        {!selected.length &&
                            <Button type="text" className="signin" onClick={connectWallet}>Sign in</Button>
                        }
                        {!!selected.length &&
                            <div className='addressBrdr'>
                                {AddresstoShow(selected[0].address)}
                                <CopyStr address={selected[0].address} />
                            </div>
                        }
                        {
                            allAccounts != null && <span className='balanceRht'><img src={balanceOfImg} alt="" />{balanceOf}</span>
                        }


                        {/*{*/}
                        {/*    !showExit && !first &&<button onClick={handleClick} className="btn">{t('CreateDAO')}</button>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    showExit && !first &&<button onClick={handleExit} className="btn exit"><img src={close} alt=""/>{t('ExitCreate')}</button>*/}
                        {/*}*/}
                        {
                            !first && <span className='createDAO' onClick={handleClick}>{t('CreateDAO')}</span>
                        }
                        {
                            !first && <span className='myDao' onClick={handleMyClick}><img src={myDao} alt="" />{t('MyDAO')}</span>
                        }
                        {!!selected.length &&
                            <span className='logout' onClick={exitAccount}>
                                {/* <img src={close} alt="" /> */}
                                {t('logout')}
                            </span>
                        }
                        {/*{*/}
                        {/*    !daoExit && !first && <button onClick={handleMyClick} className="btn">{t('MyDAO')}</button>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    daoExit && !first && <button onClick={exitMyClick} className="btn">{t('ExitMy')}</button>*/}

                        {/*{*/}
                        {/*    <button  className="btn">{t('Exit')}</button>*/}
                        {/*}*/}

                        {/*<div className='switchLang'>*/}
                        {/*    /!*<span onClick={()=>i18n.changeLanguage(i18n.language==='en'?'zh':'en')}>{i18n.language==='en'?'zh':'en'}</span>*!/*/}
                        {/*    /!*<img src={arrow} alt=""/>*!/*/}
                        {/*</div>*/}

                    </div>
                </div>
            </div>

            {
                showlist && !selected.length &&
                <Modal visible={showlist} onCancel={cancleShowlist} footer={null}>
                    <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Select You Account</h2>
                    {/* <Modal.Content> */}
                    <Select placeholder={t('SelectAccount')} style={{ width: '100%' }} onChange={selectAccounts}>
                        {
                            allList && allList.length && allList.map((opt) =>
                                <Select.Option value={opt.address} key={opt.address}>{opt.meta.name}</Select.Option>
                            )
                        }
                    </Select>
                    <Button type="primary" style={{ width: '100%', margin: '10rem 0 3rem 0' }} onClick={changeAccounts}>
                        Confirm
                    </Button>
                    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={cancleShowlist}>Cancel</div>
                    {/* <div>
                                <Modal
                                    visible={showButton}
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    onClose={() => setShowButton(false)}
                                    className='newVoteBrdr homebtm'
                                >
                                    <Modal.Title closeButton />
                                    <Modal.Content>
                                        <h4>{t('connect')}</h4>
                                    </Modal.Content>
                                </Modal>
                                <button onClick={handleClick}>{t('CreateDAO')}</button>
                            </div> */}
                    {/* </Modal.Content> */}
                </Modal>
            }
        </HeaderBg>
    );
}

