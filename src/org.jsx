import React, { useEffect, useState } from 'react';
import { useSubstrate } from "./api/contracts";
import api from "./api";

import Left from './components/left';

import Addnew from './components/org/addNew';
import AddAuth from './components/org/addAuth';
import AddApply from './components/org/addApply';
import ApplyList from './components/org/ApplyList';
import ApplyTips from './components/org/ApplyTips';
import AddBatch from './components/org/addbatch';
import LoadingNew from "./components/loadingNEW";


import { Modal, Button } from 'antd';
import Owner from "./img/owner.png";
import Admin from "./img/admin.png";
import AddP from "./img/addPeople.png";
import Remove from './img/remove.png';
import styled from "styled-components";

import TriggerBtn from "./img/switchClose.png";
import TriggerBtnActive from "./img/switchOpen.png";
import AuthImg from "./img/authHover.png";


const UlMdrt = styled.ul`
    color: #10164B;
    display: flex;
    margin-left: -6rem;
    flex-wrap: wrap;
  li{
    width: 31.3rem;
    height: 14rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: 2.4rem;
    padding: 1rem 3.7rem 1rem 1rem ;
    box-sizing: border-box;
    word-break: break-all;    
    margin:0 0 3rem 6rem;
    display: flex;
    align-content: center;
    position: relative;
    .imgAuth{
      position: absolute;
      right: 2rem;
      top: 1rem;
      width: 3.2rem;
      cursor: pointer;
      display: none;
    }
    .imgRemove{
     position: absolute;
      right: -1.6rem;
      top: -1.6rem;
      width: 3.6rem;
      cursor: pointer;
    }
    .names{
        font-size: 2rem;
        font-weight: 300;
        line-height: 2.4rem;
        margin-top: 1rem;
        font-family: Roboto-Regular;
    }
    &:hover{
      background: #FFEFF7;
      .names{
         color: #D51172;
      }
      .imgAuth{
      display: block;
    }
    }
  }
`;


const NamesAdd = styled.div`
    font-size: 2rem;
    font-weight: 400;
    font-family: Roboto-Regular;
    margin-top: 4.6rem;
    cursor: pointer;
`;

const Address = styled.div`
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 2.2rem;
    opacity: 0.4;
`;

const FirstLine = styled.div`
  position: relative;
`;
const BtnRht = styled.div`
position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  padding-right: 3rem;
  button{
    width: 9rem;
    height: 3rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    margin-left: 2rem;
    padding: 0;
    line-height: 3rem;
    &.active{
      width: 9rem;
    height: 3rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #D52473;
    color: #d52473;
    }
  }
`;

const SwitchBrdr = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  line-height: 3rem;
  img{
  cursor: pointer;
  }
  span{
    font-size: 1.6rem;
  }
`;

const SwitchBtn = styled.img`
  width: 4.2rem;
  height: 2.2rem;
  margin: 0.4rem 1rem 0 0 ;
 
`

export default function Org(props) {

    const { state, dispatch } = useSubstrate();
    const { orgcontract, allAccounts, apiState, authcontract, erc20contract,maincontract } = state;

    const [addshow, setaddshow] = useState(false);
    const [authshow, setauthshow] = useState(false);
    const [applyshow, setapplyshow] = useState(false);
    const [addapplyshow, setaddapplyshow] = useState(false);
    const [batchshow, setbatchshow] = useState(false);
    const [typeName, settypeName] = useState('');
    const [tips, setTips] = useState('');
    const [showTips, setshowTips] = useState(false);
    const [manage, setManage] = useState(false);

    const [id, setId] = useState(null);
    const [list, setlist] = useState([]);
    const [listStatus, setlistStatus] = useState(false);
    const [memberlist, setmemberlist] = useState([]);
    const [memberlistStatus, setmemberlistStatus] = useState(false);
    const [authlist, setauthlist] = useState([]);

    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);
    const [applyAuth, setapplyAuth] = useState(false);
    const [triggerStatus, settriggerStatus] = useState(false);
    const [address, setaddress] = useState('');
    const [owner, setowner] = useState('');
    const [errorShow, seterrorShow] = useState(false);


    useEffect(() => {
        setId(props.match.params.id);
    }, []);

    useEffect(() => {
        if (orgcontract == null) return;
        const whoAmI = async () => {
            await api.org.whoAmI(orgcontract).then(data => {
                if (!data) return;
                setisMember(data[0]);
                setisModerator(data[1]);
                setisOwner(data[2])

            });
        };
        whoAmI();
        const getFree = async () => {
            await api.org.getFreeAddMember(orgcontract).then(data => {
                settriggerStatus(data);
                setapplyAuth(data)
            });
        }
        getFree()

        const initOwner = async()=>{
            await api.main.listDAOInfo(maincontract, id).then((data)=>{
                if(!data)return;
                setowner(data.owner)
            });
        }

        initOwner();
    }, [orgcontract, id, applyAuth]);

    const setall = () => {
        setModeratorFunc()
        setMemberFunc()

    }
    const setModeratorFunc = async () => {
        setlistStatus(true);
        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setlist(data);
            setlistStatus(false)
        });
    }
    const setMemberFunc = async () => {
        setmemberlistStatus(true);
        await api.org.getDaoMembersList(orgcontract).then(data => {
            if (!data) return;
            setmemberlist(data);
            setmemberlistStatus(false);
        });
    }
    const initVoteContract = async () => {
        let org = JSON.parse(sessionStorage.getItem('contractlist'));
        if (orgcontract == null && org != null) {
            await api.org.InitOrg(state, dispatch, org.org_addr, (data) => {
                console.log('orgcontract====', data);
            });
        }

        if (erc20contract == null && org != null) {
            await api.erc20.InitErc20(state, dispatch, org.erc20_addr, (data) => {
                console.log('erc20contract====', data);
            });
        }
        if (authcontract == null) {
            await api.auth.InitAuth(state, dispatch, org.auth_addr, (data) => {
                console.log('authcontract====', data);
            });

        }
        setall();
    }
    useEffect(async () => {

        initVoteContract();
    }, [orgcontract, allAccounts, apiState, authcontract, erc20contract]);


    const handleClicktoManage = (type) => {
        setManage(type)

    }
    const handleClose = () => {
        setaddshow(false)
    }
    const handleBatch = () => {
        setaddshow(false);
        setbatchshow(true);
    }
    const handleBatchAdd = () => {
        setaddshow(true);
        setbatchshow(false);
    }
    const handleBatchClose = () => {
        setbatchshow(false);
    }
    const handleAdd = (type) => {
        settypeName(type);
        setaddshow(true)
    }
    const handleAuth = async (item) => {
        setauthshow(true);
        let list = await api.auth.showActions(authcontract);
        setauthlist(list);
        setaddress(item)
    }
    const handleAuthClose = () => {
        setauthshow(false);
        setaddress('');
        setauthlist([])

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
    const handleSetApply = async () => {
        dispatch({ type: 'LOADINGTYPE', payload: 'Set the way to add members' });

        await api.org.setFreeAddMember(orgcontract, !applyAuth, (data) => {
            setapplyAuth(!applyAuth);
            settriggerStatus(!triggerStatus);
            dispatch({ type: 'LOADINGTYPE', payload: null });
        }).catch((error) => {
            seterrorShow(true);
            dispatch({ type: 'MSGTYPE', payload: { msg: `Org: ${error.message}`, closable: true  } })
            dispatch({ type: 'LOADINGTYPE', payload: null });
        });
    }

    const handleClicktoview = async (item, type) => {
        let obj = {
            name: item[1],
            address: item[0]
        }
        if (type === 'moderators') {
            dispatch({ type: 'LOADINGTYPE', payload: 'Remove a DAO moderator' });
            await api.org.removeDaoModerator(orgcontract, obj, (result) => {
                dispatch({ type: 'LOADINGTYPE', payload: null });

                setModeratorFunc();
            }).then(data => {
                if (!data) return;

            }).catch((error) => {
                seterrorShow(true)
                dispatch({ type: 'MSGTYPE', payload: { msg: `Remove Moderator: ${error.message}` , closable: true } })
                dispatch({ type: 'LOADINGTYPE', payload: null });
            });
        } else if (type === 'members') {
            dispatch({ type: 'LOADINGTYPE', payload: 'Remove a DAO member' });

            await api.org.removeDaoMember(orgcontract, obj, (result) => {
                dispatch({ type: 'LOADINGTYPE', payload: null });
                setMemberFunc();
            }).then(data => {
                if (!data) return;

            }).catch((error) => {
                seterrorShow(true)
                dispatch({ type: 'MSGTYPE', payload: { msg: `Remove Member: ${error.message}`, closable: true  } })
                dispatch({ type: 'LOADINGTYPE', payload: null });
            });
        }
    }

    return (
        <div>
            <ApplyList handleClose={handleApplist} showTips={applyshow} refresh={setall} />
            <ApplyTips showTips={showTips} handleClose={handleAppTipsClose} />
            <Addnew
                handleClose={handleClose}
                showTips={addshow}
                typeName={typeName}
                refresh={setall}
                handleBatch={handleBatch}
                applyAuth={applyAuth}
            />
            <AddApply handleClose={handleApplyClose} showTips={addapplyshow} handleTips={handleAppTips} refresh={setall} />
            <AddBatch
                handleClose={handleBatchClose}
                showTips={batchshow}
                refresh={setall}
                handleBatch={handleBatch}
                handleBatchAdd={handleBatchAdd}
            />
            <AddAuth handleClose={handleAuthClose} showTips={authshow} authlist={authlist} address={address} />

            <div className='container'>
                <FirstLine>
                    <Left history={props.history} id={props.match.params.id} owner={props.match.params.owner} />
                    <BtnRht>
                        {
                            isOwner && !manage &&
                            <SwitchBrdr>
                                <span>Join the org directly？</span>
                                <SwitchBtn src={!triggerStatus ? TriggerBtn : TriggerBtnActive} alt="" onClick={() => handleSetApply()} />
                            </SwitchBrdr>
                        }
                        {
                            isOwner && !manage &&
                            <Button onClick={handleApplistShow}>Apply List</Button>
                        }
                        {(isOwner || isModerator) && !manage && <Button type="primary" onClick={() => handleClicktoManage(true)}>Manage</Button>}
                        {
                            (isOwner || isModerator) && manage && <Button className="active" onClick={() => handleClicktoManage(false)}>Complete</Button>
                        }
                    </BtnRht>
                </FirstLine>

                <section>
                    <div className="titleTop">Moderators</div>
                    <UlMdrt>
                        {
                            listStatus && <LoadingNew />
                        }
                        {
                            !listStatus && list.map((i, index) => <li key={`moderators_${index}_${i[0]}`}>
                                <img src={owner === i[0] ? Owner : Admin} alt="" />
                                <div>
                                    <div className="names">{i[1]}</div>
                                    <Address>{i[0]}</Address>
                                </div>
                                {
                                    isOwner && !manage && <img src={AuthImg} alt="" onClick={() => handleAuth(i[0])} className="imgAuth" />
                                }
                                {
                                    manage && <img src={Remove} alt="" className="imgRemove" onClick={() => handleClicktoview(i, 'moderators')} />
                                }

                            </li>)
                        }
                        {
                            isOwner && <li onClick={() => handleAdd('Moderators')}>
                                <img src={AddP} alt="" />
                                <NamesAdd>Add Moderator</NamesAdd>
                            </li>
                        }
                    </UlMdrt>
                </section>
                <section>
                    <div className="titleTop">Members</div>
                    <UlMdrt>
                        {
                            memberlistStatus && <LoadingNew />
                        }
                        {
                            !memberlistStatus && memberlist.map((i, index) => <li key={`members_${index}_${i[0]}`}>
                                <img src={Admin} alt="" />
                                <div>
                                    <div className="names">{i[1]}</div>
                                    <Address>{i[0]}</Address>
                                </div>
                                {
                                    manage && <img src={Remove} alt="" className="imgRemove" onClick={() => handleClicktoview(i, 'members')} />
                                }
                            </li>)
                        }
                        {
                            applyAuth && <li onClick={() => handleAdd('Members')}>
                                <img src={AddP} alt="" />
                                <NamesAdd>Add Member</NamesAdd>
                            </li>
                        }
                        {
                            !applyAuth && <li onClick={() => handleaddApply()}>
                                <img src={AddP} alt="" />
                                <NamesAdd>Apply Member</NamesAdd>
                            </li>
                        }
                    </UlMdrt>
                </section>
            </div>
        </div>
    )
}

