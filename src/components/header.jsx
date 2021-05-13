import React, {useState, useEffect} from 'react';
import * as history from 'history';
import {Form} from "react-bootstrap";
import Accounts from '../api/Account';
import {useSubstrate} from "../api/contracts";
import {Modal} from "react-bootstrap";

import { useTranslation, Trans, Translation } from 'react-i18next'

import logoWhite from '../images/logoWhite.png';
import arrow from '../images/Polygon.png';
import close from  '../images/shutdownW.png'

const createHashHistory = history.createHashHistory();

export default function Headertop(props) {
    const {dispatch} = useSubstrate();

    let { t ,i18n} = useTranslation()

    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    const [showButton, setShowButton] = useState(false);
    const [showExit, setshowExit] = useState(false);
    const [daoExit, setdaoExit] = useState(false);
    const [first, setfirst] = useState(false);

    useEffect(() => {
        setshowExit(createHashHistory.location.pathname === '/create');
        setfirst(createHashHistory.location.pathname === '/home');
        createHashHistory.listen((obj) => {
            setshowExit(createHashHistory.location.pathname === '/create')
            setfirst(createHashHistory.location.pathname === '/home')
        });
    }, [showExit,first]);

    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
    }, []);

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

    return (<div className='header'>
        <div className="row">
            <div className="col-4 lftTit">SubDAO</div>
            <div className="col-4 logoMid"><img src={logoWhite} alt=""/></div>
            <div className="col-4 rhtBtn">
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

                    {
                        !showExit && !first &&<button onClick={handleClick} className="btn">{t('CreateDAO')}</button>
                    }
                    {
                        showExit && !first &&<button onClick={handleExit} className="btn exit"><img src={close} alt=""/>{t('Exit')}</button>
                    }
                    {
                        !daoExit && !first && <button onClick={handleMyClick} className="btn">{t('MyDAO')}</button>
                    }
                    {
                        daoExit && !first && <button onClick={exitMyClick} className="btn">{t('Exit')}</button>
                    }

                    <div className='switchLang'>
                        <span onClick={()=>i18n.changeLanguage(i18n.language==='en'?'zh':'en')}>{i18n.language==='en'?'zh':'en'}</span>
                        <img src={arrow} alt=""/>
                    </div>

                </div>
            </div>


        </div>
    </div>);

}

