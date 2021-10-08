import React, { useEffect, useState } from 'react';
import { useSubstrate } from "./api/contracts";
import api from "./api";

import right from './img/right.png';
import homeImg from './img/homeImg.png';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import MoreDaos from './components/MoreDaos';


const HomeBg = styled.div`
    background: #FFFFFF;
    height: 100%;

    .homeTips{
        display: flex;
        flex-direction: column;

        .top{
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;

            .left{
                flex-grow: 1;
                max-width: 72.6rem;
                .hometitle{
                    width: 72.6rem;
                    height: 18.8rem;
                    font-size: 8rem;
                    font-family: Roboto-Light, Roboto;
                    font-weight: 300;
                    color: #10134E;
                    line-height: 9.4rem;
                    span{
                        color: #D52473;
                    }
                }
                .homeDesc{
                    text-transform: capitalize;
                    width: 66.7rem;
                    font-size: 2.6rem;
                    font-family: Roboto-Light, Roboto;
                    font-weight: 300;
                    color: #10164B;
                    line-height: 3.96rem;
                    padding-bottom: 2.8rem;
                }
                .connect{
                    cursor: pointer;
                    width: 27rem;
                    height: 6rem;
                }
            }
            .right{
                display: flex;
                flex-direction: column;
                img{
                    width: 40rem;
                    height: 40rem;
                    margin-right: 7rem;
                }
            }
        }
    }
`

const SelectAccount = styled.div`
    .title{
        font-size: 3.4rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #010643;
        line-height: 4rem;
    }
    .detail{
        font-size: 2.4rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #A6A6B7;
        line-height: 2.8rem;
        margin-top: 1.8rem;
    }
`

function Home(props) {
    const { state, dispatch } = useSubstrate();
    let { t } = useTranslation();

    const { maincontract, allAccounts, reloadDaos } = state;

    const [showButton, setShowButton] = useState(false);

    const [first, setfirst] = useState(true);
    const [imglist, setimglist] = useState(null);
    const [walletTips, setWalletTips] = useState(false);

    const [selected, setselected] = useState([]);
    const [createDAOModal, setcreateDAOModal] = useState(false);

    const account = JSON.parse(sessionStorage.getItem('account'));

    const browseOtherDAOs =()=>{
        setcreateDAOModal(false);
        dispatch({ type: 'DAOTYPE', payload: 'all' });
        window.scrollTo(0, 0);
    }

    const handleClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            props.history.push('/create')
        }
    }
    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
    }, [allAccounts]);
    useEffect(() => {
        dispatch({ type: 'LOAD_MAINCONTRACT' });
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
        dispatch({ type: 'DAOTYPE', payload: null });
        setfirst(false)
    }, []);
    useEffect(() => {
        if (maincontract == null || imglist == null) return;
        setcreateDAOModal(!!selected && !!selected.length && !imglist.length);
    }, [selected, imglist, maincontract]);

    const setInstances = async () => {
        dispatch({ type: 'LOADINGTYPE', payload: t('InitializeHome') });

        let addresslist = await api.main.listDaoInstances(maincontract) || [];
        console.log('===========addresslist============', addresslist);
        let mydaolist = addresslist.filter(i => i.owner === allAccounts[0].address);

        setimglist(mydaolist);
        dispatch({ type: 'LOADINGTYPE', payload: null });
        sessionStorage.setItem('addresslist', JSON.stringify(addresslist));

    };
    useEffect(() => {

        if (maincontract == null || allAccounts == null  ) return;
        setInstances();
    }, [allAccounts, maincontract, first,reloadDaos])

    const ConnectWallet = () => {
        dispatch({ type: 'WALLET', payload: true });
    }
    return (
        <HomeBg>
            <section className="padding">
                <Modal
                    visible={createDAOModal}
                    onCancel={() => setcreateDAOModal(false)}
                    footer={null}
                >
                    <SelectAccount>
                        <div className="title">You are not a member of any DAO</div>
                        <div className="detail">
                            You can join other DAOs or create your own DAO!
                        </div>
                        <Button type="primary" style={{ width: '100%', margin: '8rem 0 3rem 0' }} onClick={browseOtherDAOs}>Browse other DAOs</Button>
                        <Button className="default" style={{ width: '100%' }} onClick={handleClick}>Create DAO</Button>
                    </SelectAccount>
                </Modal>
            </section>

            <Modal
                visible={walletTips}
                onCancel={() => setWalletTips(false)}
                footer={null}
            >
                <h4>{t('noWallet')}</h4>
            </Modal>

            <section className='homeTips container'>
                <div className="top">
                    <div className="left">
                        <div className="hometitle">
                            Access <span>DAO</span> Anytime, Anywhere
                        </div>
                        <div className='homeDesc'>
                            {t('homeDescription')}
                        </div>
                        <div className="header-button">

                            {
                                !account && <Button type="primary" onClick={() => ConnectWallet()}>
                                    Connect Wallet
                                    <img src={right} alt="" style={{ width: '2rem' }} />
                                </Button>
                            }
                            {
                                account && <Button type="primary" onClick={() => handleClick()}>
                                    Get Started
                                    <img src={right} alt="" style={{ width: '2rem' }} />
                                </Button>
                            }

                        </div>
                    </div>
                    <div className="right">
                        <img src={homeImg} alt="" />
                    </div>
                </div>

                <MoreDaos history={props.history} />
            </section>
        </HomeBg>
    )
}
export default Home

