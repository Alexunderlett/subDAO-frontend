import React, {useEffect, useState} from 'react';

import {Button} from "antd";
import styled from "styled-components";
import Transfer from "./transfer";
import ExitOrg from "./exitOrg";

import {useSubstrate} from "../api/contracts";
import api from '../api/index';
import LoadingNew from "./loadingNEW";


import Addnew from './org/addNew';
import AddApply from './org/addApply';

const TopTitles = styled.div`
    width: 100%;
    min-height: 17rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: 2.4rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 3rem;
    box-sizing: border-box;

    img{
      width: 11rem;
      height: 11rem;
      border-radius: 2.4rem;
      margin-right: 2rem;
    }
`;
const LftTop = styled.div`
  display: flex;
  justify-content: flex-start;

`;
const Tit = styled.div`
    font-size: 2.8rem;

    font-weight: 300;
    color: #10164B;
    line-height: 3.3rem;
    margin: 1.3rem 0 1rem;
`;
const Contents = styled.div`
     width: 73.6rem;
     height: 5.4rem;
     font-size: 1.6rem;
     font-weight: 300;
     color: #10164B;
     line-height: 2.2rem;
     .contentDesc{
        font-size: 1.6rem;
        font-weight: 300;
        color: #10164B;
        line-height: 2.16rem;
     }
`;

const RhtTop = styled.div`
  white-space: nowrap;
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;
  button{
    font-size: 1.2rem!important;
     border-radius: 0.4rem;
     width: 9rem;
    height: 3rem;
    line-height: 3rem;
    margin-left: 1rem;
    padding: 0!important;
  }
`;

const BtnGroup = styled.div`
  margin-top: 6rem;
  span{
      border: 1px solid #B7B9C9;
      width: 7rem;
     height: 3rem;
     border-radius: 0.4rem;
     display: inline-block;
     margin-right: 1rem;
     text-align: center;
    font-size: 1.2rem;
    font-family: Roboto-Regular;
    font-weight: 400;
    color: #10164B;
    line-height: 3rem;

    cursor: pointer;
     &.active,&:hover{
        border: 0.1rem solid #D51172;
         background: #FFEFF7;
         color: #D51172;
     }
  }
`;

export default function Left(props){
    const { state,dispatch } = useSubstrate();
    const {  basecontract, vaultcontract, orgcontract,  daoManagercontract, apiState, erc20contract,votecontract,maincontract} = state;
    const [delMem, setdelMem] = useState(false);
    const [delAdmin, setdelAdmin] = useState(false);
    const [info, setinfo] = useState(true);

    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);



    const [addshow,setaddshow]= useState(false);
    const [applyAuth, setapplyAuth] = useState(false);
    const [addapplyshow,setaddapplyshow]= useState(false);

    const [contractlist, setcontractlist] = useState({
        base_addr:null,
        erc20_addr:null,
        org_addr:null,
        vault_addr:null,
        vote_addr:null,
        auth_addr:null,
    });

    const [showTransfer, setShowTransfer] = useState(false);
    useEffect(() => {
        if (orgcontract == null || !delMem) return;
        const setAdmin = async () => {
            dispatch({ type: 'LOADINGTYPE', payload:'Quitting' });
            if (isModerator) {
                await api.org.resignModerator(orgcontract, function (result) {
                    if (!result) return;
                    setdelAdmin(true)
                }).catch((error) => {

                    dispatch({ type: 'LOADINGTYPE', payload: null });
                    dispatch({ type: 'MSGTYPE', payload: { msg: `Resign Moderator: ${error.message}` } });
                    // seterrorShow(true);
                    // seterrorTips(`Resign Moderator: ${error.message}`);
                    // setLoading(false);

                });
            } else {
                setdelAdmin(true)
            }
        };
        setAdmin();

    }, [delMem]);

    useEffect(() => {
        if (apiState !== 'READY') return;
        const setInitDAO = async () => {
            await api.dao.InitDAO(state, dispatch, props.id, (data) => {
                console.log(data)
            });
        };
        setInitDAO();
    }, [apiState, props.id]);


    const queryAddrs = async () => {

        await api.dao.queryComponentAddrs(daoManagercontract).then(data => {
            if (data) {
                let arr=[];
                Object.keys(data).map((item) => {
                    arr.push({
                        name: item,
                        address: data[item]
                    });
                    return item;
                });
                sessionStorage.setItem('contractArr', JSON.stringify(arr));
                setcontractlist(data);
            }
        });
    };
    useEffect(() => {
        if (daoManagercontract == null ) return;
        queryAddrs();
    }, [daoManagercontract, props.id,maincontract]);

    useEffect(() => {
        const { vault_addr, org_addr, vote_addr, erc20_addr, base_addr, auth_addr } = contractlist;
        sessionStorage.setItem('contractlist', JSON.stringify(contractlist));


        if (base_addr != null) {
            const setInitBase = async () => {
                await api.base.InitBase(state, dispatch, base_addr, (data) => {
                    console.log("====setInitBase", data)
                });
            };
            setInitBase();
        }
        if (vault_addr != null) {
            const setInitVault = async () => {
                await api.vault.InitVault(state, dispatch, vault_addr, (data) => {
                    console.log("====setInitVault", data)
                });
            };
            setInitVault();
        }

        if (org_addr != null) {
            const setInitOrg = async () => {
                await api.org.InitOrg(state, dispatch, org_addr, (data) => {
                    console.log("====setInitOrg", data)
                });
            };
            setInitOrg();
        }
        if (auth_addr != null) {
            const setInitAuth = async () => {
                await api.auth.InitAuth(state, dispatch, auth_addr, (data) => {
                    console.log("====setInitAuth", data)
                });
            };
            setInitAuth();
        }
        if (vote_addr != null) {
            const setInitVote = async () => {
                await api.vote.InitVote(state, dispatch, vote_addr, (data) => {
                    console.log("====setInitVote", data)
                });
            };
            setInitVote();
        }
        if (erc20_addr != null) {
            const setInitErc20 = async () => {
                await api.erc20.InitErc20(state, dispatch, erc20_addr);
            };
            setInitErc20();
        }
    }, [daoManagercontract, props.id,contractlist]);

    useEffect(() => {
        if (orgcontract == null || !delAdmin || !delMem) return;
        setTimeout(async () => {
            window.location.reload()
        }, 5000)
    }, [delAdmin]);

    useEffect(() => {
        if (basecontract == null  || daoManagercontract == null || apiState == null ) return;
       init();

    }, [props.id,basecontract, daoManagercontract, apiState]);

    useEffect(() => {
        if (orgcontract == null || contractlist.org_addr == null || !contractlist.org_addr) return;
        const whoAmI = async () => {
            await api.org.whoAmI(orgcontract).then(data => {
                if (!data) return;
                setisMember(data[0]);
                setisModerator(data[1]);
                setisOwner(data[2]);
                sessionStorage.setItem('isMember',data[0]);
                sessionStorage.setItem('isModerator',data[1]);
                sessionStorage.setItem('isOwner',data[2]);
            });
        };
        whoAmI();
    }, [orgcontract, props.id]);
    useEffect(()=>{
        setName('');
        setLogo('');
        setDescription('');
        setOwner('');
    },[props.id])

    const init = () =>{
        const setBase = async () => {
            await api.base.getBaseData(basecontract).then(data => {
                if (!data) return;
                let { owner, name, logo, desc } = data;
                setName(name);
                setLogo(logo);
                setDescription(desc);
                setOwner(owner);
                setTimeout(()=>{
                    setinfo(false);
                },2000)

            });
        };
        setBase();

        let pageType = props.history.location.pathname.split('/')[1];
        setType(pageType);
    }

    const handleTransfer = () => {
        setShowTransfer(true)

    };

    const handleClose = () => {
        setShowTransfer(false);
    };

    const handleExitClose = () => {
        setShowModal(false)
    };
    const handleClicktoType = (typeNow) => {
        if(typeNow === type) return;

        props.history.push(`/${typeNow}/${props.id}`);
    }
    const handleExit = () => {
        setShowModal(true)
    }

    const joinDaos = async () =>{
        await api.org.getFreeAddMember(orgcontract).then(data => {
            if(data){
                setaddshow(true)
            }else{
                setaddapplyshow(true)
            }
        });
    }

    const handleExitConfirm = async () => {
        setShowModal(false);
        dispatch({ type: 'LOADINGTYPE', payload:'Quitting' });
        if (isMember) {
            await api.org.resignMember(orgcontract, function (result) {
                if (!result) return;
                setdelMem(true)
            }).catch((error) => {
                dispatch({ type: 'LOADINGTYPE', payload: null });
                dispatch({ type: 'MSGTYPE', payload: { msg: `Resign Member: ${error.message}` } });
                // seterrorShow(true);
                // seterrorTips(`Resign Member: ${error.message}`);
                // setLoading(false);

            });
        } else {
            setdelMem(true)
        }
    }

    //add members begin
    const handleAddClose = () => {
        setaddshow(false)
    }


    const setall = () => {
        // setModeratorFunc()
        // setMemberFunc()
        window.location.reload()

    }
    const handleApplyClose = () => {
        setaddapplyshow(false)
    }
    // const handleaddApply = () => {
    //     setaddapplyshow(true)
    // }
    const handleAppTips = () => {
        // setshowTips(true)
    }
    const handleAppTipsClose = () => {
        // setshowTips(false)
    }
    return (
        <div>
            <Transfer
                showTips={showTransfer}
                handleClose={handleClose}
            />
            <ExitOrg
                handleClose={handleExitClose}
                handleConfirm={() => handleExitConfirm()}
                showTips={showModal} />


            <Addnew
                handleClose={handleAddClose}

                showTips={addshow}
                typeName='members'
                refresh={setall}
                handleBatch={false}
                applyAuth={applyAuth}
            />
            <AddApply
                handleClose={handleApplyClose}
                showTips={addapplyshow}
                handleTips={handleAppTips}
                refresh={setall} />

            {
                !info && <TopTitles>
                    <LftTop>
                        <img src={logo} alt=""/>
                        <Contents>
                            <Tit>{name}</Tit>
                            <div className="contentDesc">{description}</div>
                        </Contents>
                    </LftTop>
                    <RhtTop>
                        {(isOwner || isMember || isModerator) && <div>
                            {
                                isOwner && <Button onClick={()=>handleTransfer()}>
                                    Transfer
                                </Button>
                            }
                            {(isMember || isModerator) &&
                            <Button onClick={()=>handleExit()}>Quit</Button>
                            }
                        </div>
                        }
                        {
                            ( !isOwner && !isMember && !isModerator) &&  <Button type="primary" onClick={()=>joinDaos()}>Join</Button>
                        }
                    </RhtTop>
                </TopTitles>
            }
            {
                info && <TopTitles><LoadingNew  /></TopTitles>
            }

            {
                !props.removeGroup && <BtnGroup>
                    <span className={type === 'about' ? 'active' : ''} onClick={() => handleClicktoType('about')}>Home</span>
                    {
                        contractlist.vote_addr != null &&<span className={type === 'vote' ? 'active' : ''} onClick={() => handleClicktoType('vote')}>Voting</span>
                    }
                    {
                        contractlist.vault_addr != null && <span className={type === 'vault' ? 'active' : ''} onClick={() => handleClicktoType('vault')}>Vault</span>
                    }
                    {
                        contractlist.org_addr != null && <span className={type === 'org' ? 'active' : ''} onClick={() => handleClicktoType('org')}>ORG</span>
                    }
                </BtnGroup>
            }

        </div>
    )

}

