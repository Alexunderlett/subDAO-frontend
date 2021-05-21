import React, {useEffect, useState} from 'react';
import {useSubstrate} from "./api/contracts";
import api from "./api";

import Loading from './components/loading/Loading';
import Left from './components/left';
import Back from './images/prev.png';
import mana from './images/mana.png';
import add from './images/Add.png';
import Addnew from './components/org/addNew'
import {useTranslation} from "react-i18next";

export default function Org(props) {

    const {state,dispatch} = useSubstrate();
    const {orgcontract,allAccounts,apiState} = state;

    const [loading,setLoading]= useState(false);
    const [addshow,setaddshow]= useState(false);
    const [typeName,settypeName]= useState('');
    const [tips,setTips]= useState('');

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [memberlist, setmemberlist] = useState([]);

    let { t } = useTranslation();

    useEffect(() => {
        setId(props.match.params.id);
    }, []);


    const setall = async () => {
        setLoading(true);
        setTips(t('InitializeORG'));

        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setlist(data)
        });
        await api.org.getDaoMembersList(orgcontract).then(data => {
            if (!data) return;
            setmemberlist(data)
        });
        setLoading(false);
    };

    useEffect(async () => {
        const initVoteContract = async () =>{
            let org = JSON.parse(sessionStorage.getItem('contractlist'));
            if(orgcontract == null && org!= null){
                await api.org.InitOrg(state, dispatch, org.org_addr,(data) => {
                    console.log('orgcontract====',data);
                });
            }
            setall();
        }
        initVoteContract()
    }, [orgcontract,allAccounts,apiState]);



    const handleClicktoManage = () => {
        props.history.push(`/manage/${id}`)
    }
    const handleClicktoAbout = () => {
        props.history.push(`/home/about/${id}`)
    }
    const handleClose = () => {
        setaddshow(false)
    }
    const handleAdd = (type) => {
        settypeName(type)
        setaddshow(true)
    }

    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <section>
                <div className=" row">
                    <div className='col-lg-3'>
                        <Left />
                    </div>
                    <div className='col-lg-9'>
                        <div className='voteTop'>
                            <div className='voteLft' onClick={handleClicktoAbout}>
                                <img src={Back} alt=""/> {t('Back')}
                            </div>
                            <button className='btnR' onClick={handleClicktoManage}><img src={mana} alt=""/>{t('Manage')}</button>

                        </div>
                        <Addnew  handleClose={handleClose} showTips={addshow} typeName={typeName} refresh={setall}/>
                        <div className='orgBrdr'>
                            <ul className="org">
                                <li>
                                    <div className="titleOrg">
                                        <h6>{t('Moderators')}</h6>
                                        <button className='btnAdd' onClick={()=>handleAdd('Moderators')}><img src={add} alt=""/>{t('Add')}</button>
                                    </div>
                                    <div className='orgbg'>
                                        {
                                            list.map((i,index) => <div>
                                                <dl key={`moderators_${index}_${i[0]}`}>
                                                    <dt>{i[1]}</dt>
                                                    <dd>{i[0]}</dd>
                                                </dl>
                                            </div>)
                                        }

                                    </div>
                                </li>
                                <li>
                                    <div className="titleOrg">
                                        <h6>{t('Members')}</h6>
                                        <button className='btnAdd' onClick={()=>handleAdd('Members')}><img src={add} alt=""/>{t('Add')}</button>
                                    </div>
                                    <div className='orgbg'>
                                        {
                                            memberlist.map((i,index) => <div>
                                                <dl key={`members_${index}_${i[0]}`}>
                                                    <dt>{i[1]}</dt>
                                                    <dd>{i[0]}</dd>
                                                </dl></div>)
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )

}

