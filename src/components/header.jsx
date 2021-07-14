import React, {useState, useEffect} from 'react';
import * as history from 'history';
import {Form} from "react-bootstrap";
import Accounts from '../api/Account';
import {useSubstrate} from "../api/contracts";
import {Modal} from "react-bootstrap";

import publicJs from "../utils/publicJs";

import { useTranslation, Trans, Translation } from 'react-i18next'

import logoWhite from '../images/logoWhite.png';
import arrow from '../images/Polygon.png';
import close from  '../images/shutdownW.png'


const createHashHistory = history.createHashHistory();

export default function Headertop(props) {
    const {state,dispatch} = useSubstrate();
    const {allAccounts,api,maincontract,daoManagercontract,refreshBalance} = state;

    let { t ,i18n} = useTranslation()

    const [selected, setselected] = useState([]);

    const [showButton, setShowButton] = useState(false);
    const [showExit, setshowExit] = useState(false);
    const [daoExit, setdaoExit] = useState(false);
    const [first, setfirst] = useState(false);
    const [balanceOf, setbalanceOf] = useState(0);

    useEffect(() => {
        setshowExit(createHashHistory.location.pathname === '/create');
        setfirst(createHashHistory.location.pathname === '/home');
        createHashHistory.listen((obj) => {
            setshowExit(createHashHistory.location.pathname === '/create')
            setfirst(createHashHistory.location.pathname === '/home')
        });
    }, [showExit,first]);

    useEffect(() => {
        i18n.changeLanguage('en')
    }, []);


    const queryBalance = async (account) =>{

        if(api == null || account == null || !account.length || !account[0].address) return;
         await api.query.system.account(account[0].address,({ data: balance })=>{
             setbalanceOf(balance.toHuman().free)
        });
    }

    useEffect(() => {
       if(allAccounts == null ) return
       queryBalance(allAccounts)
        dispatch({type: 'NOREFRESH'});
    }, [allAccounts,maincontract,daoManagercontract,refreshBalance]);
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
    const handleClick = ()=> {
        if(account === null || !account.length){
            setShowButton(true);
        }else{
            createHashHistory.push('/create')
        }
    }
    const handleExit = ()=> {
        createHashHistory.push('/')
    }
    const handleMyClick = ()=> {
        if(account === null || !account.length){
            setShowButton(true);
        }else{
            dispatch({type: 'MYDAO'});
            createHashHistory.push('/')
            setdaoExit(true)
        }
    }
    const exitMyClick = ()=> {
        if(account === null || !account.length){
            setShowButton(true);
        }else{
            dispatch({type: 'NOMAY'});
            setdaoExit(false)
        }
    }
    const exitAccount = ()=> {
        sessionStorage.removeItem('account');
        dispatch({type: 'LOAD_ALLACCOUNTS'});
        setselected([])
        createHashHistory.push('/home')
        window.location.reload()

    }
    const AddresstoShow = (address)=> {

        let frontStr = address.substring(0,4);

        let afterStr = address.substring(address.length-4,address.length);

        return `${frontStr}...${afterStr}`

    }

    return (<div className='header'>
        <div className="row">
            <div className="col-4 lftTit"><a href="/"><img src={logoWhite} alt=""/></a></div>
            {/*<div className="col-4 logoMid"><img src={logoWhite} alt=""/></div>*/}
            <div className="col-8 rhtBtn">
                <div className="header-button">
                    <Modal
                        show={showButton}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => setShowButton(false)}
                    >
                        <Modal.Header closeButton>
                                <i className='fa fa-user-times homeTop' />
                        </Modal.Header>
                        <Modal.Body className='homebtm'>
                            <h4>Please connect wallet</h4>
                        </Modal.Body>
                    </Modal>
                    {  !!selected.length && <div className='addressBrdr'>
                        {AddresstoShow(selected[0].address)}
                        <span onClick={exitAccount}> <img src={close} alt=""/>{t('logout')}</span>

                    </div>}
                    {
                        allAccounts !=null &&   <span className='balanceRht'>{balanceOf}</span>
                    }


                    {
                        !showExit && !first &&<button onClick={handleClick} className="btn">{t('CreateDAO')}</button>
                    }
                    {
                        showExit && !first &&<button onClick={handleExit} className="btn exit"><img src={close} alt=""/>{t('ExitCreate')}</button>
                    }
                    {
                         !first && <button onClick={handleMyClick} className="btn">{t('MyDAO')}</button>
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
    </div>);

}

