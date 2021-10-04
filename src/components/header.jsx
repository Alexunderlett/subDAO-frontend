import React, { useState, useEffect } from 'react';
import * as history from 'history';
import Accounts from '../api/Account';
import { useSubstrate } from "../api/contracts";
import CopyStr from "./copy";

import logo from '../img/logo.png';
import balanceOfImg from '../img/balanceOf.png';
import myDao from '../img/myDao.png';
import styled from 'styled-components';
import { Modal, Button, Select } from 'antd';
import DaosModal from "./DaosModal";
import MsgModal from "./MsgModal";
import LoadingModal from "./LoadingModal";

import { useTranslation, Trans, Translation } from 'react-i18next'

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
                cursor: pointer;
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
    const { allAccounts, api, maincontract, daoManagercontract, daoType, msgType, loadingType, wallet } = state;
    let { i18n } = useTranslation()

    const [selected, setselected] = useState([]);

    const [moreDaos, setMoreDaos] = useState(false);
    const [showMsg, setshowMsg] = useState(false);
    const [loading, setloading] = useState(false);


    const [showButton, setShowButton] = useState(false);
    const [daoExit, setdaoExit] = useState(false);
    const [first, setfirst] = useState(false);
    const [balanceOf, setbalanceOf] = useState(0);
    const [showlist, setshowlist] = useState(false);
    const [currentAccount, setcurrentAccount] = useState(null);

    const queryBalance = async (account) => {

        if (api == null || account == null || !account.length || !account[0].address) return;
        await api.query.system.account(account[0].address, ({ data: balance }) => {
            setbalanceOf(balance.toHuman().free)
        });
    }

    useEffect(() => {
        i18n.changeLanguage('en')
    }, [])

    useEffect(() => {
        if (allAccounts == null) return;
        queryBalance(allAccounts)
    }, [allAccounts, maincontract, daoManagercontract]);

    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }

    }, [allAccounts]);


    const account = JSON.parse(sessionStorage.getItem('account'));
    const handleClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            createHashHistory.push('/create');
        }
    }
    const handleMyClick = () => {
        dispatch({ type: 'DAOTYPE', payload: 'my' });
        window.scrollTo(0,0);
    }
    const toFirst = () => {
        createHashHistory.push('/')
    }
    const exitAccount = () => {
        sessionStorage.removeItem('account');
        dispatch({ type: 'LOAD_ALLACCOUNTS' });
        setselected([]);
        createHashHistory.push('/home');
        window.location.reload()

    }
    const AddresstoShow = (address) => {

        let frontStr = address.substring(0, 4);

        let afterStr = address.substring(address.length - 4, address.length);

        return `${frontStr}...${afterStr}`

    }
    const [walletTips, setWalletTips] = useState(false);
    const connectWallet = async () => {
        dispatch({ type: 'WALLET', payload: true });

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
        dispatch({ type: 'WALLET', payload: null });
    }

    useEffect(() => {
        setMoreDaos(daoType != null);
    }, [daoType]);

    useEffect(() => {
        setshowMsg(msgType != null);
    }, [msgType]);

    useEffect(() => {
        setloading(loadingType != null);
    }, [loadingType]);


    useEffect(() => {
        setshowlist(wallet != null);
        const loadUser = async () => {
            const accoutlist = await Accounts.accountlist();
            if (typeof (accoutlist) === "string") {
                setWalletTips(true)
            } else {
                setallList(accoutlist);
            }
        };

        if (wallet != null) {
            loadUser()
        } else {
            setcurrentAccount(null)
        }
    }, [wallet]);

    const closeDAOModal = () => {
        dispatch({ type: 'DAOTYPE', payload: null });
        setMoreDaos(false);
    }

    return (
        <HeaderBg className='header'>
            <div className="row">
                <div className="lftTit">
                    <div className="toFirst" onClick={() => toFirst()}>
                        <img src={logo} alt="" />
                    </div>
                    <div className="title">SubDAO</div>
                </div>
                <div className="rhtBtn">
                    <div className="header-button">
                        <Modal
                            visible={showButton}
                            onCancel={() => { setShowButton(false) }}
                            footer={null}
                        >
                            <i className='fa fa-user-times homeTop' />
                            <h4>Please connect wallet</h4>
                        </Modal>
                        {!selected.length &&
                            <div className="signin" onClick={() => connectWallet()}>Sign in</div>
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


                        {
                            allAccounts != null && <span className='createDAO' onClick={() => handleClick()}>Create My DAO</span>
                        }

                        {
                            allAccounts != null && <span className='myDao' onClick={() => handleMyClick()}><img src={myDao} alt="" />My DAO</span>
                        }
                        {!!selected.length &&
                            <span className='logout' onClick={() => exitAccount()}>
                                Logout
                            </span>
                        }

                    </div>
                </div>
            </div>

            <DaosModal moreDaos={moreDaos} handleClose={() => closeDAOModal()} history={createHashHistory} />

            <MsgModal showMsg={showMsg} handleClose={() => { setshowMsg(false); dispatch({ type: 'MSGTYPE', payload: null }) }} />

            <LoadingModal showMsg={loading} handleClose={() => { setloading(false); dispatch({ type: 'LOADINGTYPE', payload: null }) }} />

            {
                showlist && !selected.length &&
                <Modal visible={showlist} onCancel={cancleShowlist} footer={null}>
                    <div className="title">Select You Account</div>
                    <Select placeholder="Please Select Your Account" style={{ width: '100%' }} onChange={selectAccounts}>
                        {
                            allList && allList.length && allList.map((opt) =>
                                <Select.Option value={opt.address} key={opt.address}>{opt.meta.name}</Select.Option>
                            )
                        }
                    </Select>
                    <Button type="primary" style={{ width: '100%', margin: '10rem 0 3rem 0' }} onClick={() => changeAccounts()}>
                        Confirm
                    </Button>
                    <div style={{ textAlign: 'center', cursor: 'pointer', color: '#A6A6B7' }} onClick={() => cancleShowlist()}>Cancel</div>
                </Modal>
            }
        </HeaderBg>
    );
}

