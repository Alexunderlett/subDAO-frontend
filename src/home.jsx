import React, { useEffect, useState } from 'react';
import Slick from "./components/slick";
import { useSubstrate } from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";
// import Subrouterlink from './router/subRouter';
import { withRouter } from 'react-router-dom';
import homeimg from './images/home.png'
import Accounts from "./api/Account";
import right from './images/right.png';
import down from './images/down.png';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { Modal, Select, Button, Row, Col } from 'antd';
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

            .left{
                flex-grow: 1;
                max-width: 726px;
                .hometitle{
                    font-size: 8rem;
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
                    width: 32rem;
                    height: 32rem;
                    background: #D52473;
                }
            }
        }
    }
`

const SelectAccount = styled.div`
    .title{
        font-size: 34px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #010643;
        line-height: 40px;
    }
    .detail{
        font-size: 24px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #A6A6B7;
        line-height: 28px;
        margin-top: 18px;
    }
`

function Home(props) {
    const { state, dispatch } = useSubstrate();
    let { t } = useTranslation();

    const { homepage, maincontract, allAccounts, myDao, apiState } = state;
    const [loading, setLoading] = useState(false);

    const [showButton, setShowButton] = useState(false);

    const [show, setshow] = useState(false);
    const [first, setfirst] = useState(true);
    const [imglist, setimglist] = useState([]);
    const [walletTips, setWalletTips] = useState(false);

    const [selected, setselected] = useState([]);
    const [createDAOModal, setcreateDAOModal] = useState(false);
    const [moreDaos, setMoreDaos] = useState(false);


    const account = JSON.parse(sessionStorage.getItem('account'));


    const handleClick = () => {
        if (account === null || !account.length) {
            setShowButton(true);
        } else {
            props.history.push('/create')
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
        setcreateDAOModal(!!selected && !!selected.length && (!imglist || !imglist.length))
    }, [selected, imglist])

    useEffect(() => {
        setimglist(homepage);

        if (myDao === 'TRUE') {
            if (homepage && homepage[0]) {
                props.history.push(`/about/${homepage[0].address}`)
            } else {
                props.history.push(`/home`)
            }

        } else {
            if (props.history.location.pathname === '/home' && homepage && homepage[0]) {
                props.history.push(`/about/${homepage[0].address}`)
            } else if (props.history.location.pathname.indexOf('/home') > -1 && homepage && !homepage.length) {
                props.history.push(`/home`)
            }
        }
    }, [homepage, myDao]);

    return (
        <HomeBg>
            <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={t('InitializeHome')} />
            {/* <Subrouterlink /> */}

            <section className="padding">
                {/* {
                    !!imglist && !!imglist.length && !!selected && !!selected.length && <Slick list={imglist} history={props.history} />
                } */}
                <Modal
                    visible={createDAOModal}
                    onCancel={() => setcreateDAOModal(false)}
                    footer={null}
                >
                    <SelectAccount>
                        <div className="title"> {t('noDao')}</div>
                        <div className="detail">
                            You can join other DAOs or create your own DAO!
                        </div>
                        <Button type="primary" style={{ width: '100%', margin: '80px 0 30px 0' }} onClick={() => { setcreateDAOModal(false); setMoreDaos(true) }}>Browse other DAOs</Button>
                        <Button style={{ width: '100%' }} onClick={handleClick}>{t('CreateDAO')}</Button>
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
                        {/*<img src={homeimg} alt=""/>*/}
                        <div className="header-button">
                            <Button type="primary">
                                {t('ConnectWallet')}
                                <img src={right} alt="" style={{ width: '20px' }} />
                            </Button>
                            {
                                // !showlist && !selected.length && !allList.length
                            }
                        </div>
                    </div>
                    <div className="right">
                        <img src={right} alt="" />
                    </div>
                </div>

                <MoreDaos showMoreDaos={moreDaos}/>
            </section>
        </HomeBg>
    )
}
export default withRouter(Home)

