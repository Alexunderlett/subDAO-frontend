import React, { useEffect, useState, useRef } from 'react';
import { useSubstrate } from "./api/contracts";
import { Spin } from 'antd';

import api from './api/index';
import Loading from "./components/loading/Loading";
import Left from './components/left';

import CopyStr from "./components/copy";
import { Modal, Button } from 'antd';
import styled from 'styled-components';


import Owner from "./img/owner.png";
import Admin from "./img/admin.png";
import AUTH from "./img/AUTH.png";
import BASE from "./img/BASE.png";
import ERC20 from "./img/ERC20.png";
import ORG from "./img/ORG.png";
import VAULT from "./img/VAULT.png";
import VOTE from "./img/VOTE.png";
import MoreDaos from "./components/MoreDaos";
import VoteActive from "./components/vote/voteActive";


const Tip = styled.div`
    text-align: center;
    padding: 50px 20px;
    font-size: 18px;
    font-family: Roboto-Light;
    font-weight: 300;
    color: #010643;
    line-height: 21px;
`;

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


const Ul = styled.ul`
    color: #10164B;
    display: flex;

    margin-left: -6.3rem;
  li{
    width: 31.3rem;
    height: 16rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: 2.4rem;
    padding: 2rem 2.8rem;
    box-sizing: border-box;
    word-break: break-all;    
    margin-left: 6.3rem;
  }
`;

const BalanceNum = styled.div`
    font-size: 3.2rem;
    font-weight: 300;
    line-height: 3.8rem;
    margin-bottom: 0.1rem;
`;

const Symbol = styled.div`
    font-size: 2.2rem;
    font-weight: 300;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.6;
`;

const Address = styled.div`
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 2.2rem;
    opacity: 0.4;
`;

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
  }
`;
const Names = styled.div`
    font-size: 2rem;
    font-weight: 300;
    line-height: 2.4rem;
    margin-top: 1rem;
`;

const UlContr = styled.ul`
  li{
    width: 78rem;
    height: 4.4rem;
    background: #FFFFFF;
    box-shadow: 0 0 0.4rem 0 rgba(16, 22, 75, 0.1);
    border-radius: 0.8rem;
    padding: 1rem 3.7rem 1rem 1rem ;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin-bottom: 1.5rem;
    img{
 
    }
  }
`
const ContractName = styled.div`
    min-width: 6.3rem;
    font-size: 1.6rem;
    font-weight: 300;
    margin-right: 1rem;
    line-height: 2.4rem;
`;
const Imglft = styled.img`
   width: 3.2rem;
    height: 3.2rem;
    display: inline-block;
    margin-top: -0.4rem;
`;
const CopyImg = styled.span`
  margin:-5px 0 0  0.7rem;
`;

const LoadingSpin = styled.div`
 width: 100%;
 text-align: center;
`;

export default function About(props) {
    const { state, dispatch } = useSubstrate();
    const { basecontract, vaultcontract, orgcontract, votecontract, daoManagercontract, apiState, erc20contract } = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    const [id, setAId] = useState(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [moderators, setModerators] = useState([]);
    const [moderatorShow, setmoderatorShow] = useState(true);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);
    const [balanceshow, setbalanceshow] = useState(true);
    const [contractshow, setcontractshow] = useState(true);
    const [info, setinfo] = useState(true);
    const [contractlist, setcontractlist] = useState({
        base_addr:null,
        erc20_addr:null,
        org_addr:null,
        vault_addr:null,
        vote_addr:null,
        auth_addr:null,
    });
    const [contractArr, setcontractArr] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    const [daostate, setdaostate] = useState(false);
    const [basestate, setbasestate] = useState(false);
    const [vaultstate, setvaultstate] = useState(false);
    const [votestate, setvotestate] = useState(false);
    const [orgstate, setorgstate] = useState(false);

    const [showTransfer, setShowTransfer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);
    const [delMem, setdelMem] = useState(false);
    const [delAdmin, setdelAdmin] = useState(false);

    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');

    const [moreDaos, setMoreDaos] = useState(true);

    // const myRef = useRef();

    useEffect(() => {
        if (apiState !== 'READY') return;
        const setInitDAO = async () => {
            setLoading(true);
            setTips('InitializeDAO');

            await api.dao.InitDAO(state, dispatch, props.match.params.id, (data) => {
                setdaostate(data);
                setLoading(false)
            });
        };
        setInitDAO();
    }, [apiState, id]);
    useEffect(() => {
        setcontractlist({
            base_addr:null,
            erc20_addr:null,
            org_addr:null,
            vault_addr:null,
            vote_addr:null,
            auth_addr:null,
        });
        setcontractArr([]);
        setcontractshow(true);
        setbalancelist([]);
        setbalanceshow(true);
        setName('');
        setLogo('');
        setDescription('');
        setOwner('');
        setinfo(true);
        setAId(props.match.params.id);

    }, [props.match.params.id]);
    useEffect(() => {
        if (daoManagercontract == null && daostate) return;
        const queryAddrs = async () => {
            // setTips(t('GetContractAddress'));
            await api.dao.queryComponentAddrs(daoManagercontract).then(data => {
                if (data) {
                    console.log("==============setcontractlist============", data)
                    let arr=[];
                    Object.keys(data).map((item) => {
                            arr.push({
                                name: item,
                                address: data[item]
                            })
                        return item;
                    });

                    setcontractArr(arr);
                    setcontractlist(data);
                    setcontractshow(false)
                }
            });
        };
        queryAddrs();
    }, [daoManagercontract, daostate, id]);

    useEffect(() => {

        const { vault_addr, org_addr, vote_addr, erc20_addr, base_addr, auth_addr } = contractlist;
        sessionStorage.setItem('contractlist', JSON.stringify(contractlist));
        if (base_addr != null) {

            const setInitBase = async () => {
                // setTips(t('InitializingContracts'));
                await api.base.InitBase(state, dispatch, base_addr, (data) => {
                    setbasestate(data);
                });
            };
            setInitBase();
        }
        if (vault_addr != null) {
            const setInitVault = async () => {
                // setTips(t('InitializingContracts'));
                await api.vault.InitVault(state, dispatch, vault_addr, (data) => {
                    setvaultstate(data)
                });
            };
            setInitVault();
        }

        if (org_addr != null) {
            const setInitOrg = async () => {
                setTips('InitializingContracts');
                await api.org.InitOrg(state, dispatch, org_addr, (data) => {
                    setorgstate(data)
                });
            };
            setInitOrg();
        }
        if (auth_addr != null) {
            const setInitAuth = async () => {
                // setTips(t('InitializingContracts'));
                await api.auth.InitAuth(state, dispatch, auth_addr, (data) => {
                    console.log("====", data)
                });
            };
            setInitAuth();
        }
        if (vote_addr != null) {
            const setInitVote = async () => {
                // setTips(t('InitializingContracts'));
                await api.vote.InitVote(state, dispatch, vote_addr, (data) => {
                    setvotestate(data)
                });
            };
            setInitVote();
        }
        if (erc20_addr != null) {
            const setInitErc20 = async () => {
                // setTips(t('InitializingContracts'));
                await api.erc20.InitErc20(state, dispatch, erc20_addr);
            };
            setInitErc20();
        }
    }, [daoManagercontract, contractlist, id]);

    useEffect(() => {
        sessionStorage.setItem('logo', logo);
        sessionStorage.setItem('description', description);
        sessionStorage.setItem('owner', owner);
        sessionStorage.setItem('DaoName', name)
    }, [logo, description, owner, name]);
    useEffect(() => {
        const setBalance = async () => {
            // setTips(t('Getbalance'));
            let arr = [];
            let index = 0;
            for (let item of tokenlist) {
                // eslint-disable-next-line no-loop-func
                await api.vault.getBalanceOf(vaultcontract, item).then(async (data) => {

                    if (!data) return;
                    arr[index] = {
                        address: item,
                        balance: data
                    };
                    let result = await api.erc20.queryInfo(erc20contract, item);
                    let { symbol, name } = result;
                    arr[index].symbol = symbol;
                    arr[index].name = name;
                });
                index++;
                setbalancelist(arr);
                setbalanceshow(false)

            }

        }
        setBalance();
    }, [tokenlist, id]);
    useEffect(() => {
        if (!basestate || contractlist.base_addr == null || !contractlist.base_addr) return;

        const setBase = async () => {
            // setTips(t('Getinformation'));
            await api.base.getBaseData(basecontract).then(data => {
                if (!data) return;

                let { owner, name, logo, desc } = data;

                setName(name);
                setLogo(logo);
                setDescription(desc);
                setOwner(owner);
                setinfo(false);

                // setTimeout(()=>{
                //     setLoading(false)
                // },2000)
            });
        };
        setBase();
    }, [basecontract, basestate, id]);

    useEffect(() => {
        if (!vaultstate || contractlist.vault_addr == null || !contractlist.vault_addr) return;
        const setToken = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                settokenlist(data)
            });
        };
        setToken();
    }, [vaultcontract, vaultstate, id]);

    useEffect(() => {
        if (!votestate || contractlist.vote_addr == null || !contractlist.vote_addr) return;
        const setActiveVote = async () => {
            await api.vote.queryOpenVote(votecontract).then(data => {
                if (!data) return;
                let arr = data.slice(0, 3);
                setActivelist(arr)
            });
        };
        setActiveVote();
    }, [votecontract, votestate, id]);

    useEffect(() => {
        if (!orgstate || contractlist.org_addr == null || !contractlist.org_addr) return;
        const setModeratorList = async () => {
            await api.org.getDaoModeratorList(orgcontract).then(data => {
                if (!data) return;
                setModerators(data);
                setmoderatorShow(false)
            });
        };
        setModeratorList();

    }, [orgcontract, orgstate, id]);

    useEffect(() => {
        if (!orgstate || contractlist.org_addr == null || !contractlist.org_addr) return;
        const whoAmI = async () => {
            await api.org.whoAmI(orgcontract).then(data => {

                console.log("======whoAmI",data)
                if (!data) return;
                setisMember(data[0]);
                setisModerator(data[1]);
                setisOwner(data[2])
            });
        };
        whoAmI();
    }, [orgcontract, orgstate, id]);

    const handleClicktoType = (type) => {
        if(type === 'org'){
            props.history.push(`/${type}/${id}/${props.match.params.owner}`)
        }else{
            props.history.push(`/${type}/${id}`)
        }

    }



    // const handleExitConfirm = async () => {
    //     setShowModal(false);
    //     setLoading(true);
    //     setTips('ExitDAO');
    //     if (isMember) {
    //         await api.org.resignMember(orgcontract, function (result) {
    //             if (!result) return;
    //             setdelMem(true)
    //         }).catch((error) => {
    //             seterrorShow(true);
    //             seterrorTips(`Resign Member: ${error.message}`);
    //             setLoading(false);
    //
    //         });
    //     } else {
    //         setdelMem(true)
    //     }
    // };
    useEffect(() => {
        if (orgcontract == null || !delMem) return;
        const setAdmin = async () => {
            if (isModerator) {
                await api.org.resignModerator(orgcontract, function (result) {
                    if (!result) return;
                    setdelAdmin(true)
                }).catch((error) => {
                    seterrorShow(true);
                    seterrorTips(`Resign Moderator: ${error.message}`);
                    setLoading(false);

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
    const switchKey = (key) => {
        let str = '';
        let img = '';
        switch (key) {
            case 'base_addr':
                str = 'Base';
                img = BASE;
                break;
            case 'erc20_addr':
                str = 'ERC20';
                img = ERC20;
                break;
            case 'org_addr':
                str = 'ORG';
                img = ORG;
                break;
            case 'vault_addr':
                str = 'Vault';
                img = VAULT;
                break;
            case 'vote_addr':
                str = 'Vote';
                img =  VOTE;
                break;
            case 'auth_addr':
                str = 'Auth';
                img = AUTH;
                break;
            default:
                str = key;
                img ='';
                break;
        }
        return {
            addr:str.toUpperCase(),
            img
        };
    }
    return (
        <div>
            <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips} />
            <Modal
                visible={errorShow}
                onCancel={() => seterrorShow(false)}
                footer={null}
            >
                <Tip>{errorTips}</Tip>
            </Modal>

            <div className='container'>
                <Left history={props.history} id={id} owner={props.match.params.owner}/>
                {/*<section>*/}
                {/*    <Transfer*/}
                {/*        showTips={showTransfer}*/}
                {/*        handleClose={handleClose}*/}
                {/*    />*/}
                {/*    <ExitOrg*/}
                {/*        handleClose={handleExitClose}*/}
                {/*        handleConfirm={() => handleExitConfirm()}*/}
                {/*        showTips={showModal} />*/}

                {/*    {*/}
                {/*        info &&  <TopTitles><LoadingSpin><Spin /></LoadingSpin></TopTitles>*/}
                {/*    }*/}
                {/*    {*/}
                {/*        !info && <TopTitles>*/}
                {/*            <LftTop>*/}
                {/*                <img src={logo} alt=""/>*/}
                {/*                <Contents>*/}
                {/*                    <Tit>{name}</Tit>*/}
                {/*                    <div className="contentDesc">{description}</div>*/}
                {/*                </Contents>*/}
                {/*            </LftTop>*/}
                {/*            <RhtTop>*/}
                {/*                {(isOwner || isMember || isModerator) && <ul className='morelist'>*/}
                {/*                    {*/}
                {/*                        isOwner && <Button onClick={handleTransfer}>*/}
                {/*                            Transfer*/}
                {/*                        </Button>*/}
                {/*                    }*/}
                {/*                    {(isMember || isModerator) &&*/}
                {/*                    <Button onClick={handleExit}>Quit</Button>*/}
                {/*                    }*/}
                {/*                </ul>*/}
                {/*                }*/}
                {/*                {*/}
                {/*                    ( !isOwner && !isMember && !isModerator) &&  <Button type="primary">Join</Button>*/}
                {/*                }*/}
                {/*            </RhtTop>*/}
                {/*        </TopTitles>*/}
                {/*    }*/}
                {/*</section>*/}

                <section>
                    <div className="titleTop">Balance</div>
                    <Ul>
                        {
                            balanceshow && <LoadingSpin><Spin /></LoadingSpin>
                        }
                        {
                            !balanceshow && balancelist.map((item, index) =>
                                <li key={`balance_${index}`}>
                                    <BalanceNum>{item.balance}</BalanceNum>
                                    <Symbol>{item.symbol}</Symbol>
                                    <Address>{item.name}</Address>
                                </li>
                            )
                        }

                    </Ul>
                </section>
                <section>
                    <div className="titleTop">Moderators</div>
                    <UlMdrt>
                        {
                            moderatorShow && <LoadingSpin><Spin /></LoadingSpin>
                        }
                        {
                            !moderatorShow && moderators.map((i, index) => <li key={moderators[index]}>
                                <img src={ props.match.params.owner === moderators[index][0] ? Owner :Admin} alt=""/>
                                <div>
                                    <Names>{moderators[index][1]}</Names>
                                    <Address>{moderators[index][0]}</Address>
                                </div>
                            </li>)
                        }
                    </UlMdrt>
                </section>
                <section>
                    <div className="titleTop">Contracts</div>
                        {
                            !contractshow && contractlist != null && <UlContr>{
                                contractArr.map((item) => (<li key={`contract_${item.address}`}>
                                            <Imglft src={switchKey(item.name).img} alt=""/>
                                            <ContractName>{switchKey(item.name).addr} </ContractName>
                                            <Address>{item.address}</Address>
                                             <CopyImg><CopyStr address={item.address} alt=""/></CopyImg>
                                        </li>
                                    ))
                            }
                            </UlContr>
                        }
                        {
                            contractshow && <LoadingSpin><Spin /></LoadingSpin>
                        }
                </section>
                {/*<section>*/}
                {/*    <MoreDaos showMoreDaos={moreDaos}/>*/}
                {/*</section>*/}
            </div>

        </div>
    )
}
