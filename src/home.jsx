import React, { useEffect, useState } from 'react';
import { useSubstrate } from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";

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

    const {  maincontract, allAccounts, apiState } = state;
    const [loading, setLoading] = useState(false);

    const [showButton, setShowButton] = useState(false);

    const [show, setshow] = useState(false);
    const [first, setfirst] = useState(true);
    const [imglist, setimglist] = useState(null);
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
        if(maincontract == null || imglist == null ) return;
        setcreateDAOModal(!!selected && !!selected.length &&  !imglist.length);
    }, [selected, imglist,maincontract]);


    useEffect(() => {
        if (maincontract == null || (selected && !selected.length)) return;
        const setInstances = async () => {
            setLoading(true);
            let addresslist = await api.main.listDaoInstances(maincontract);
            console.log('===========addresslist============', addresslist);
            let mydaolist= addresslist.filter(i => i.owner === selected[0].address);
            setimglist(mydaolist);
            setLoading(false);
            setListAll(addresslist,'all');
            setListAll(mydaolist,'my');



        };
        const setListAll = async (mydaolist,typeStr) => {
            let arr=[];
            if (mydaolist && mydaolist.length) {
                for (let item of mydaolist) {
                    const data = await api.base.InitHome(state, item.dao_manager_addr);
                    if(!data) continue;
                    const logo = data.logo ? data.logo : '';
                    const name = data.name ? data.name : '';
                    const desc = data.desc ? data.desc : '';
                    arr.push({
                        address: item.dao_manager_addr,
                        logo,
                        name,
                        owner:item.owner,
                        desc,
                    });
                }
            }
            if( typeStr  === 'all'){
                sessionStorage.setItem('daoList',JSON.stringify(arr));

            }else{
                sessionStorage.setItem('mydaoList',JSON.stringify(arr))
            }
        }
        setInstances();


    }, [allAccounts, maincontract, first]);

    return (
        <HomeBg>
            <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={t('InitializeHome')} />

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
                        <Button type="primary" style={{ width: '100%', margin: '8rem 0 3rem 0' }} onClick={() => { setcreateDAOModal(false); setMoreDaos(true) }}>Browse other DAOs</Button>
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
                        <div className="header-button">
                            <Button type="primary">
                                {t('ConnectWallet')}
                                <img src={right} alt="" style={{ width: '2rem' }} />
                            </Button>
                            {
                                // !showlist && !selected.length && !allList.length
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

