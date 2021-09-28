import React, {useEffect, useState} from 'react';
import {useSubstrate} from "./api/contracts";
import api from "./api";

import Left from './components/left';

import Addnew from './components/org/addNew';
import AddAuth from './components/org/addAuth';
import AddApply from './components/org/addApply';
import ApplyList from './components/org/ApplyList';
import ApplyTips from './components/org/ApplyTips';
import AddBatch from './components/org/addbatch';
import LoadingNew from "./components/loadingNEW";


import {Modal} from "react-bootstrap";

import {Button} from "antd";
import Owner from "./img/owner.png";
import Admin from "./img/admin.png";
import styled from "styled-components";

import TriggerBtn from "./images/triggerBtn.png";
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
  right: 2rem;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  button{
    width: 9rem;
    height: 3rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    margin-left: 2rem;
  }
`;

const SwitchBrdr = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  line-height: 3rem;
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

    const {state,dispatch} = useSubstrate();
    const {orgcontract,allAccounts,apiState,authcontract,erc20contract} = state;

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

    const [errorShow,seterrorShow]= useState(false);
    const [errorTips,seterrorTips]= useState('');


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
        setlistStatus(true);
        await api.org.getDaoModeratorList(orgcontract).then(data => {
            if (!data) return;
            setlist(data)
            setlistStatus(false)
        });
        setmemberlistStatus(true);
        await api.org.getDaoMembersList(orgcontract).then(data => {
            if (!data) return;
            setmemberlist(data)
            setmemberlistStatus(false);
        });

    };

    useEffect(async () => {
        const initVoteContract = async () =>{
            let org = JSON.parse(sessionStorage.getItem('contractlist'));
            if(orgcontract == null && org!= null){
                await api.org.InitOrg(state, dispatch, org.org_addr,(data) => {
                    console.log('orgcontract====',data);
                });
            }

            if(erc20contract == null && org!= null){
                await api.erc20.InitErc20(state, dispatch, org.erc20_addr,(data) => {
                    console.log('erc20contract====',data);
                });
            }
            if(authcontract == null ){
                await api.auth.InitAuth(state, dispatch, org.auth_addr,(data) => {
                    console.log('authcontract====',data);
                });

            }
            setall();
        }
    initVoteContract()
    }, [orgcontract,allAccounts,apiState,authcontract,erc20contract]);


    const handleClicktoManage = () => {
        props.history.push(`/manage/${id}/${props.match.params.owner}/${isOwner?1:0}/${isModerator?1:0}`)
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
    const handleSetApply = async() => {


        await api.org.setFreeAddMember(orgcontract,!applyAuth,(data) => {
            setapplyAuth(!applyAuth);
            settriggerStatus(!triggerStatus);

        }).catch((error) => {
            seterrorShow(true);
            seterrorTips(`Org: ${error.message}`);


        });
    }

    return (
        <div>
            <Modal
                show={errorShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => seterrorShow(false)}
                className='newVoteBrdr homebtm'
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4>{errorTips}</h4>
                </Modal.Body>
            </Modal>

            <ApplyList  handleClose={handleApplist} showTips={applyshow} refresh={setall}/>
            <ApplyTips  showTips={showTips} handleClose={handleAppTipsClose} />
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
            <AddAuth  handleClose={handleAuthClose} showTips={authshow} authlist={authlist}  address={address}/>

            <div className='container'>
                <FirstLine>
                    <Left  history={props.history} id={props.match.params.id} owner={props.match.params.owner}/>
                    <BtnRht>
                        {
                            isOwner &&
                            <SwitchBrdr>
                               <span>Join the org directly？</span>
                                <SwitchBtn src={!triggerStatus?TriggerBtn:TriggerBtnActive} alt=""  onClick={handleSetApply} />
                            </SwitchBrdr>
                        }
                        {
                            isOwner &&
                            <Button onClick={handleApplistShow}>Apply List</Button>
                        }
                        { (isOwner ||isModerator )&&  <Button type="primary" onClick={handleClicktoManage}>Manage</Button>}
                    </BtnRht>
                </FirstLine>

                <section>
                    <div className="titleTop">Moderators</div>
                    <UlMdrt>
                        {
                            listStatus &&  <LoadingNew  />
                        }

                        {
                            !listStatus && list.map((i,index) => <li key={`moderators_${index}_${i[0]}`}>
                                <img src={ props.match.params.owner === i[0] ? Owner :Admin} alt=""/>
                                <div>
                                    <div className="names">{i[1]}</div>
                                    <Address>{i[0]}</Address>
                                </div>
                                {
                                isOwner && <img src={AuthImg} alt="" onClick={()=>handleAuth(i[0])} className="imgAuth"/>
                            }
                            </li>)
                        }
                        {
                            isOwner &&   <li  onClick={()=>handleAdd('Moderators')}>
                                <img src={ Owner} alt=""/>
                                <NamesAdd>Add Moderator</NamesAdd>
                            </li>
                        }
                    </UlMdrt>
                </section>
                <section>
                    <div className="titleTop">Moderators</div>
                    <UlMdrt>
                        {
                            memberlistStatus &&  <LoadingNew  />
                        }
                        {
                            !memberlistStatus &&memberlist.map((i,index) => <li key={`members_${index}_${i[0]}`}>
                                <img src={ props.match.params.owner === i[0] ? Owner :Admin} alt=""/>
                                <div>
                                    <div className="names">{i[1]}</div>
                                    <Address>{i[0]}</Address>
                                </div>
                            </li>)
                        }
                        {
                            applyAuth &&<li  onClick={()=>handleAdd('Members')}>
                                <img src={ Owner} alt=""/>
                                <NamesAdd>Add Member</NamesAdd>
                            </li>
                        }
                        {
                            !applyAuth  &&  <li  onClick={()=>handleaddApply()}>
                                <img src={ Owner} alt=""/>
                                <NamesAdd>Apply Member</NamesAdd>
                            </li>
                        }
                    </UlMdrt>
                </section>
            </div>
        </div>
    )
}

