import React, {useEffect, useState} from 'react';

import {Button} from "antd";
import styled from "styled-components";
import Transfer from "./transfer";
import ExitOrg from "./exitOrg";

import {useSubstrate} from "../api/contracts";
import api from '../api/index';
import LoadingNew from "./loadingNEW";

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
    margin-top: 4rem;
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
    const { state } = useSubstrate();
    const {  basecontract, vaultcontract, orgcontract,  daoManagercontract, apiState, erc20contract} = state;
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
            if (isModerator) {
                await api.org.resignModerator(orgcontract, function (result) {
                    if (!result) return;
                    setdelAdmin(true)
                }).catch((error) => {
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
        if (orgcontract == null || !delAdmin || !delMem) return;
        setTimeout(async () => {
            window.location.reload()
        }, 5000)
    }, [delAdmin]);

    useEffect(() => {
        if (basecontract == null || orgcontract == null || daoManagercontract == null || apiState == null) return;
       init();
    }, [props.id,basecontract, vaultcontract, orgcontract,  daoManagercontract, apiState, erc20contract]);
    useEffect(() => {
       init();
    }, []);
    const init = () =>{
        const setBase = async () => {
            await api.base.getBaseData(basecontract).then(data => {
                if (!data) return;
                let { owner, name, logo, desc } = data;
                setName(name);
                setLogo(logo);
                setDescription(desc);
                setOwner(owner);
                setinfo(false);
            });
        };
        setBase();

        setisMember(JSON.parse(sessionStorage.getItem('isMember')));
        setisModerator(JSON.parse(sessionStorage.getItem('isModerator')));
        setisOwner(JSON.parse(sessionStorage.getItem('isOwner')));

        let contractlistBg = JSON.parse(sessionStorage.getItem('contractlist'));

        if(contractlistBg!=null){
            setcontractlist(contractlistBg);
        }

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
        let str;
        switch(typeNow) {
            case 'org':
            case 'about':
                str = `/${typeNow}/${props.id}/${props.owner}`;
                break;
            default:
                str = `/${typeNow}/${props.id}`;
                break;
        }
        props.history.push(str);
    }

    const handleExit = () => {
        setShowModal(true)
    }

    const handleExitConfirm = async () => {
        setShowModal(false);

        if (isMember) {
            await api.org.resignMember(orgcontract, function (result) {
                if (!result) return;
                setdelMem(true)
            }).catch((error) => {
                // seterrorShow(true);
                // seterrorTips(`Resign Member: ${error.message}`);
                // setLoading(false);

            });
        } else {
            setdelMem(true)
        }
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
                            ( !isOwner && !isMember && !isModerator) &&  <Button type="primary">Join</Button>
                        }
                    </RhtTop>
                </TopTitles>
            }
            {
                info && <TopTitles><LoadingNew  /></TopTitles>
            }

            <BtnGroup>
                <span className={type === 'about' ? 'active' : ''} onClick={() => handleClicktoType('about')}>Home</span>
                {
                    contractlist.vote_addr != null &&<span className={type === 'vote' ? 'active' : ''} onClick={() => handleClicktoType('vote')}>Voting</span>
                }
                {
                    contractlist.vault_addr != null && <span className={type === 'vault' ? 'active' : ''} onClick={() => handleClicktoType('vault')}>Vault</span>
                }
                {
                    contractlist.org_addr != null && <span className={type === 'org' ? 'active' : ''} onClick={() => handleClicktoType('org')}>Org</span>
                }
            </BtnGroup>
        </div>
    )

}

