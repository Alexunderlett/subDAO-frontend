import React, { useEffect, useState } from 'react';
import Slick from "./components/slick";
import { useSubstrate } from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";
import Subrouterlink from './router/subRouter';
import { withRouter } from 'react-router-dom';
import homeimg from './images/home.png'
import Accounts from "./api/Account";
import right from './images/right.png';
import { Form } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { Button, Modal, Select } from '@geist-ui/react'



const HomeBg = styled.div`
    background: #FFFFFF;
    height: 100%;

    .homeTips{
        width: 75%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .left{
            flex-grow: 1;
            max-width: 726px;
            .hometitle{
                font-size: 80px;
                color: #10134E;
                line-height: 94px;
                span{
                    color: #D52473;
                }
            }
            .homeDesc{
                text-transform: capitalize;
                font-size: 26px;
                font-family: Roboto-Light, Roboto;
                font-weight: 300;
                line-height: 40px;
                padding-bottom: 28px;
            }
            .connect{
                cursor: pointer;
                width: 270px;
                height: 60px;
            }
        }
        .right{
            display: flex;
            flex-direction: column;
            img{
                width: 400px;
                height: 394px;
                background: #D52473;
            }
            .more{
                text-align: right;
                cursor: pointer;
            }
        }
    }
`

function Home(props) {
    const { state, dispatch } = useSubstrate();
    let { t } = useTranslation();

    const { homepage, maincontract, allAccounts, myDao, apiState } = state;
    const [loading, setLoading] = useState(false);

    const [showButton, setShowButton] = useState(false);
    const [walletTips, setWalletTips] = useState(false);
    const [show, setshow] = useState(false);
    const [first, setfirst] = useState(true);
    const [imglist, setimglist] = useState([]);

    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    const [showlist, setshowlist] = useState(false);

    const account = JSON.parse(sessionStorage.getItem('account'));

    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            props.history.push('/create')
        }
    }

    const selectAccounts = async (val) => {
        let selected = allList.filter(i => i.address === val);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));

        dispatch({ type: 'SET_ALLACCOUNTS', payload: selected });
    }
    const connectWallet = async () => {
        setVisible(true)
        setshowlist(true);
        const accoutlist = await Accounts.accountlist();
        if (typeof (accoutlist) === "string") {
            setWalletTips(true)
        } else {
            setallList(accoutlist);
        }


    }

    useEffect(() => {
        dispatch({ type: 'LOAD_MAINCONTRACT' });

        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
        if (!allAccounts && account) {
            dispatch({ type: 'SET_ALLACCOUNTS', payload: account });
        }
        setfirst(false)
    }, []);

    useEffect(() => {

        if (maincontract == null || (selected && !selected.length)) return;
        const setInstances = async () => {
            setLoading(true);
            let addresslist = await api.main.listDaoInstances(maincontract);
            console.log('===========addresslist============', addresslist)
            let arr = [];

            let mydaolist;
            if (myDao === 'TRUE') {
                mydaolist = addresslist.filter(i => i.owner === selected[0].address);
            } else {
                mydaolist = addresslist;
            }
            if (mydaolist && mydaolist.length) {

                for (let item of mydaolist) {

                    const data = await api.base.InitHome(state, item.dao_manager_addr);
                    const logo = data && data.logo ? data.logo : '';
                    arr.push({
                        address: item.dao_manager_addr,
                        logo
                    });
                }
            }
            setimglist(arr);
            setLoading(false)
            dispatch({ type: 'SET_HOME', payload: arr });

        };
        setInstances();

    }, [allAccounts, maincontract, myDao, first]);
    useEffect(() => {
        setimglist(homepage);

        if (myDao === 'TRUE') {
            if (homepage && homepage[0]) {
                props.history.push(`/home/about/${homepage[0].address}`)
            } else {
                props.history.push(`/home`)
            }

        } else {
            if (props.history.location.pathname === '/home' && homepage && homepage[0]) {
                props.history.push(`/home/about/${homepage[0].address}`)
            } else if (props.history.location.pathname.indexOf('/home') > -1 && homepage && !homepage.length) {
                props.history.push(`/home`)
            }
        }


    }, [homepage, myDao]);

    return (
        <HomeBg>
            <Loading showLoading={loading} tips={t('InitializeHome')} />
            <div>
                <Subrouterlink />
            </div>
            <section className="padding">
                {
                    !!imglist && !!imglist.length && !!selected && !!selected.length && <Slick list={imglist} history={props.history} />
                }
                {
                    !!selected && !!selected.length && (!imglist || !imglist.length) && <div className='selectAccount'>

                        <h3> {t('noDao')}</h3>
                        <div className='accountTips'>{t('canCreateDao')}</div>
                        <div className='createMy'><button onClick={handleClick}>{t('CreateDAO')}</button></div>
                    </div>
                }
            </section>
            <Modal
                show={walletTips}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setWalletTips(false)}
                className='newVoteBrdr homebtm'
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4>{t('noWallet')}</h4>
                </Modal.Body>
            </Modal>
            {
                !selected.length &&
                <section className='homeTips'>
                    <div className="left">
                        <div className="hometitle">
                            Access <span>DAO</span> Anytime, Anywhere
                        </div>
                        <div className='homeDesc'>
                            {t('homeDescription')}
                        </div>
                        {/*<img src={homeimg} alt=""/>*/}
                        <div className="header-button">
                            {
                                !showlist && !selected.length && !allList.length &&
                                <Button type="success" onClick={connectWallet}>
                                    {t('ConnectWallet')}
                                    <img src={right} alt="" />
                                </Button>
                            }
                        </div>
                    </div>
                    <div className="right">
                        <img src={right} alt="" />
                        <div className="more">
                            More DAOs ···
                        </div>
                    </div>
                </section>
            }
            {
                visible && !selected.length &&
                <Modal visible={visible} onClose={() => { setVisible(false) }}>
                    <Modal.Title>Select You Account</Modal.Title>
                    <Modal.Content>
                        <Select placeholder={t('SelectAccount')} width="100%" disableMatchWidth="true" onChange={selectAccounts}>
                            {
                                allList && allList.length && allList.map((opt) =>
                                    <Select.Option value={opt.address} key={opt.address}>{opt.meta.name}</Select.Option>
                                )
                            }
                        </Select>
                        <Button type="success" style={{width: '100%', margin:'100px 0 30px 0'}} onClick={connectWallet}>
                            Confirm
                        </Button>
                        <div style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => { setVisible(false) }}>Cancel</div>
                        {/* <div>
                                <Modal
                                    show={showButton}
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    onHide={() => setShowButton(false)}
                                    className='newVoteBrdr homebtm'
                                >
                                    <Modal.Header closeButton />
                                    <Modal.Body>
                                        <h4>{t('connect')}</h4>
                                    </Modal.Body>
                                </Modal>
                                <button onClick={handleClick}>{t('CreateDAO')}</button>
                            </div> */}
                    </Modal.Content>
                </Modal>
            }
        </HomeBg>
    )
}
export default withRouter(Home)

