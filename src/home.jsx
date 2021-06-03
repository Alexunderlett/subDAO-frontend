import React, {useEffect, useState} from 'react';
import Slick from "./components/slick";
import {useSubstrate} from "./api/contracts";
import api from "./api";
import Loading from "./components/loading/Loading";
import Subrouterlink from './router/subRouter';
import {withRouter} from  'react-router-dom';
import homeimg from './images/home.png'
import Accounts from "./api/Account";
import before from './images/before.png';
import {Modal,Form} from 'react-bootstrap';
import {useTranslation} from "react-i18next";


function Home(props) {
    const {state,dispatch} = useSubstrate();
    let { t } = useTranslation();

    const {homepage,maincontract,allAccounts,myDao,apiState} = state;
    const [loading,setLoading]= useState(false);

    const [showButton, setShowButton] = useState(false);
    const [show, setshow] = useState(false);
    const [first, setfirst] = useState(true);
    const [imglist, setimglist] = useState([]);

    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    const [showlist, setshowlist] = useState(false);

    const account = JSON.parse(sessionStorage.getItem('account'));

     const handleClick = ()=> {
         if(account === null || !account.length){
             setShowButton(true);
         }else{
             props.history.push('/create')
         }
     }

    const selectAccounts = async(e) => {
        let selected = allList.filter(i => i.address === e.target.value);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));

        dispatch({type: 'SET_ALLACCOUNTS',payload:selected});
    }
    const connectWallet = async () => {

        setshowlist(true);
        const accoutlist = await Accounts.accountlist();
        setallList(accoutlist);
    }

    useEffect(() => {
        dispatch({type: 'LOAD_MAINCONTRACT'});

        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
        if(!allAccounts && account){
            dispatch({type: 'SET_ALLACCOUNTS',payload:account});
        }
        setfirst(false)
    }, []);

     useEffect(() => {

         if(maincontract==null || selected && !selected.length ) return ;
         const setInstances = async() => {
             setLoading(true);
             let addresslist = await api.main.listDaoInstances(maincontract);
             console.log('===========addresslist============',addresslist)
             let arr = [];

             let mydaolist;
             if(myDao === 'TRUE'){
                 mydaolist = addresslist.filter(i=>i.owner === selected[0].address);
             }else{
                 mydaolist = addresslist;
             }
             if (mydaolist && mydaolist.length) {

                 for (let item of mydaolist) {
                     const data = await api.base.InitHome(state, item.dao_manager_addr);
                     const logo = data && data.logo?data.logo:'';
                     arr.push({
                         address: item.dao_manager_addr,
                         logo
                     }) ;
                 }
             }
             setimglist(arr);
             dispatch({type: 'SET_HOME', payload: arr});
             setLoading(false)
         };
         setInstances();

    }, [allAccounts,maincontract,myDao,first]);
    useEffect(() => {
        setimglist(homepage);
        if( myDao === 'TRUE' && homepage && homepage[0]){
            props.history.push(`/home/about/${homepage[0].address}`)
        }else{
            if(props.history.location.pathname === '/home' && homepage && homepage[0]){
                props.history.push(`/home/about/${homepage[0].address}`)
            }else if(props.history.location.pathname.indexOf('/home')>-1 && homepage && !homepage.length){
                props.history.push(`/home`)
            }
        }


    }, [homepage,myDao]);
    return (<div>
        <Loading showLoading={loading} tips={t('InitializeHome')}/>
            <div>
                <Subrouterlink />
            </div>
            <section className="padding">
                {
                    !!imglist && !!imglist.length && !!selected && !!selected.length && <Slick list={imglist} history={props.history}/>
                }
                {
                    !!selected && !!selected.length && (!imglist || !imglist.length) && <div className='selectAccount'>

                            <h3> {t('noDao')}</h3>
                            <div className='accountTips'>{t('canCreateDao')}</div>
                            <div className='createMy'><button onClick={handleClick}>{t('CreateDAO')}</button></div>

                    </div>
                }
            </section>
        {
            !showlist && !selected.length && <section className='container homeTips'>
                <div className="hometitle">
                    {t('hometitle')}
                </div>
                 <div className='homeDesc'>
                     {t('homeDescription')}
                 </div>
                <img src={homeimg} alt=""/>
                <div className="header-button">
                    {
                        !showlist && !selected.length && !allList.length &&
                        <button className='btn connect' onClick={connectWallet}><img src={before} alt=""/> {t('ConnectWallet')}</button>
                    }

                </div>
            </section>
        }
        {
            showlist && !selected.length &&
            <div className='selectAccount'>
                <div>
                    <h3>{t('YourAccount')}</h3>
                    <div className='accountTips'>{t('SelectAccount')}</div>
                </div>
                <div className="firstSelect">
                    <Form.Control as="select" onChange={(event) => selectAccounts(event)}>
                        <option value=''>{t('SelectOption')}</option>
                        {
                            allList.map((opt) =>
                                <option value={opt.address} key={opt.address}>{opt.meta.name}</option>
                            )
                        }
                    </Form.Control>
                </div>
                <div>
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
                </div>
            </div>

        }

        </div>)
}
export default withRouter(Home)

