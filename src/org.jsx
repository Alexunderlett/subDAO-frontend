import React, {useEffect, useState} from 'react';
import {useSubstrate} from "./api/contracts";
import api from "./api";

import Loading from './components/loading/Loading';
import Left from './components/left';
import Back from './images/prev.png';
import mana from './images/mana.png';
import add from './images/Add.png';
import auth from './images/Vector.png';
import applyList from './images/apply.png';
import Addnew from './components/org/addNew'
import AddAuth from './components/org/addAuth'
import AddApply from './components/org/addApply'
import ApplyList from './components/org/ApplyList'
import ApplyTips from './components/org/ApplyTips'
import AddBatch from './components/org/addbatch'
import {useTranslation} from "react-i18next";
import TriggerBtn from "./images/triggerBtn.png";
import TriggerBtnActive from "./images/triggerBtnActive.png";

export default function Org(props) {

    const {state,dispatch} = useSubstrate();
    const {orgcontract,allAccounts,apiState,authcontract} = state;

    const [loading,setLoading]= useState(false);
    const [addshow,setaddshow]= useState(false);
    const [authshow,setauthshow]= useState(false);
    const [applyshow,setapplyshow]= useState(false);
    const [addapplyshow,setaddapplyshow]= useState(false);
    const [batchshow,setbatchshow]= useState(false);
    const [typeName,settypeName]= useState('');
    const [tips,setTips]= useState('');
    const [showTips,setshowTips]= useState(false);

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [memberlist, setmemberlist] = useState([]);
    const [authlist, setauthlist] = useState([]);

    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);
    const [applyAuth, setapplyAuth] = useState(false);
    const [triggerStatus, settriggerStatus] = useState(false);
    const [triggerTips, settriggerTips] = useState(false);

    let { t } = useTranslation();

    useEffect(() => {
        setId(props.match.params.id);
    }, []);

    useEffect( () => {
        if (orgcontract == null) return;
        const whoAmI = async () => {
            await api.org.whoAmI(orgcontract).then(data => {
                if (!data) return;
                setisMember(data[0])
                setisModerator(data[1])
                setisOwner(data[2])
            });
        };
        whoAmI();
        const getFree = async () =>{
            await api.org.getFreeAddMember(orgcontract).then(data => {
                settriggerStatus(data)
                setapplyAuth(data)
            });
        }
        getFree()
    }, [orgcontract,id,applyAuth]);

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
            if(orgcontract == null && org!= null){
                await api.erc20.InitErc20(state, dispatch, org.erc20_addr,(data) => {
                    console.log('orgcontract====',data);
                });
            }
            setall();
        }
        initVoteContract()
        const initAuthContract = async () =>{
            let auth = JSON.parse(sessionStorage.getItem('contractlist'));
            if(authcontract == null && auth!= null){
                await api.auth.InitAuth(state, dispatch, auth.auth_addr,(data) => {
                    console.log('orgcontract====',data);
                });
            }
        }
        initAuthContract()
    }, [orgcontract,allAccounts,apiState,authcontract]);


    const handleClicktoManage = () => {
        props.history.push(`/manage/${id}`)
    }
    const handleClicktoAbout = () => {
        props.history.push(`/home/about/${id}`)
    }
    const handleClose = () => {
        setaddshow(false)
    }
    const handleBatch = () => {
        setaddshow(false);
        setbatchshow(true)
    }
    const handleBatchAdd = () => {
        setaddshow(true);
        setbatchshow(false)
    }
    const handleBatchClose = () => {
        setbatchshow(false)
    }
    const handleAdd = (type) => {
        settypeName(type);
        setaddshow(true)
    }
    const handleAuth = async () => {
        setauthshow(true)
        let list = await api.auth.showActions(authcontract);
        setauthlist(list)
    }
    const handleAuthClose = () => {
        setauthshow(false)
    }
    const handleApplist = () => {
        setapplyshow(false)
    }
    const handleApplistShow = () => {
        setapplyshow(true)
    }
    const handleApplyClose = () => {
        setaddapplyshow(false)
    }
    const handleaddApply = () => {
        setaddapplyshow(true)
    }
    const handleAppTips = () => {
        setshowTips(true)
    }
    const handleAppTipsClose = () => {
        setshowTips(false)
    }
    const handleTriggerTips = () => {
        settriggerTips(!triggerTips)
    }
    const handleSetApply = async() => {
        settriggerStatus(!triggerStatus);
        settriggerTips(!triggerTips)
        setLoading(true);
        setTips(t('setFreeAddMember'));
        await api.org.setFreeAddMember(orgcontract,!applyAuth,(data) => {
            setapplyAuth(!applyAuth)
            setLoading(false);
        });
    }

    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <section>
                <ApplyList  handleClose={handleApplist} showTips={applyshow} refresh={setall}/>
                <ApplyTips  showTips={showTips} handleClose={handleAppTipsClose} />
                <div className=" row">
                    <div className='col-lg-3'>
                        <Left />
                    </div>
                    <div className='col-lg-9'>
                        <div className='voteTop'>
                            <div className='voteLft' onClick={handleClicktoAbout}>
                                <img src={Back} alt=""/> {t('Back')}
                            </div>

                            {
                                isOwner &&
                                <div>
                                    <div className='btnRht10'>
                                        {
                                            triggerTips && <div className='triggerTips'>
                                                <div className="trigger3" />
                                                {t('triggerStatus')}
                                            </div>
                                        }

                                        {
                                            !triggerStatus &&<img src={TriggerBtn} alt=""  onClick={handleSetApply} onMouseOver={handleTriggerTips} onMouseOut={handleTriggerTips}/>
                                        }
                                        {
                                            triggerStatus &&<img src={TriggerBtnActive} alt="" onClick={handleSetApply} onMouseOver={handleTriggerTips} onMouseOut={handleTriggerTips}/>
                                        }
                                    </div>

                                        <button className='topRhtBtn' onClick={handleApplistShow}><img src={applyList}
                                                                                                       alt=""/>{t('applyList')}
                                        </button>

                                        <button className='btnR' onClick={handleClicktoManage}><img src={mana}
                                                                                                    alt=""/>{t('Manage')}
                                        </button>

                                </div>
                            }
                        </div>
                        <Addnew
                            handleClose={handleClose}
                            showTips={addshow}
                            typeName={typeName}
                            refresh={setall}
                            handleBatch={handleBatch}
                            applyAuth={applyAuth}
                        />
                        <AddApply  handleClose={handleApplyClose} showTips={addapplyshow} handleTips={handleAppTips} refresh={setall} />
                        <AddBatch
                            handleClose={handleBatchClose}
                            showTips={batchshow}
                            refresh={setall}
                            handleBatch={handleBatch}
                            handleBatchAdd={handleBatchAdd}
                        />
                        <AddAuth  handleClose={handleAuthClose} showTips={authshow} authlist={authlist} />
                        <div className='orgBrdr'>
                            <ul className="org">
                                <li>
                                    <div className="titleOrg">
                                        <h6>{t('Moderators')}</h6>
                                        {
                                            isOwner &&  <button className='btnAdd' onClick={()=>handleAdd('Moderators')}><img src={add} alt=""/>{t('Add')}</button>
                                        }
                                    </div>
                                    <div  className={isOwner?'orgbg auth':'orgbg'}>
                                        {
                                            list.map((i,index) => <div key={`moderators_${index}_${i[0]}`}>
                                                <dl>
                                                    <dt>{i[1]}</dt>
                                                    <dd>{i[0]}</dd>
                                                    {
                                                        isOwner && <dd><img src={auth} alt="" onClick={()=>handleAuth()}/></dd>
                                                    }

                                                </dl>
                                            </div>)
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="titleOrg">
                                        <h6>{t('Members')}</h6>
                                        {
                                            applyAuth && <button className='btnAdd' onClick={()=>handleAdd('Members')}><img src={add} alt=""/>{t('Add')}</button>
                                        }
                                        {
                                            !applyAuth && <button className='btnAdd' onClick={()=>handleaddApply()}><img src={add} alt=""/>{t('apply')}</button>
                                        }

                                    </div>
                                    <div className='orgbg'>
                                        {
                                            memberlist.map((i,index) => <div key={`members_${index}_${i[0]}`}>
                                                <dl>
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

