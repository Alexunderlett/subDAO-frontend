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
import down from './images/down.png';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { Modal, Select, Button, Row, Col } from 'antd';
import DaosModal from "./components/DaosModal";


const HomeBg = styled.div`
    background: #FFFFFF;
    height: 100%;

    .homeTips{
        width: 75%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .top{
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
            }
        }
    }
`

const MoreDaos = styled.div`
    display: flex;
    flex-direction: column;

    .more{
        text-align: right;
        cursor: pointer;
        height: 25px;
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #10164B;
        line-height: 25px;
        margin-bottom: 20px;
    }
    .daos{
        display: flex;
        justify-content: space-around;
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
    const [moreDaos, setMoreDaos] = useState(false);

    const [selected, setselected] = useState([]);



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
                        <div className='createMy'><Button onClick={handleClick}>{t('CreateDAO')}</Button></div>
                    </div>
                }
            </section>
            <Modal
                visible={walletTips}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onCancel={() => setWalletTips(false)}
                className='newVoteBrdr homebtm'
            >
                {/* <Modal.Title closeButton /> */}
                {/* <Modal.Content> */}
                <h4>{t('noWallet')}</h4>
                {/* </Modal.Content> */}
            </Modal>
            {
                !selected.length &&
                <section className='homeTips'>
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
                    <MoreDaos>
                        <div className="more" onClick={() => { setMoreDaos(true) }}>
                            More DAOs<span>···</span>
                        </div>
                        <div className="daos">
                            {
                                [1, 1, 1, 1, 1].map(() =>
                                    <div className="daoItem">
                                        <img src={right} alt="" />
                                        <div className="title">Patract</div>
                                        <div className="detail">
                                            Litentry is built on Substrate, which inherits great features and the best technologies in
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <DaosModal moreDaos={moreDaos} handleClose={() => { setMoreDaos(false) }}/>
                    </MoreDaos>
                </section>
            }
        </HomeBg>
    )
}
export default withRouter(Home)

