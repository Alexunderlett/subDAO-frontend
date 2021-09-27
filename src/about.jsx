import React, { useEffect, useState, useRef } from 'react';
import { useSubstrate } from "./api/contracts";

import api from './api/index';
import Loading from "./components/loading/Loading";
// import votingimg from './images/voting.png';
// import orgimg from './images/org.png';
// import vaultimg from "./images/vault.png";
// import moreImg from "./images/menu.png";
// import transferImg from "./images/transfer.png";
// import exitImg from "./images/drop.png";
// import { useTranslation } from "react-i18next";
// import Transfer from "./components/transfer";
// import ExitOrg from "./components/exitOrg";
// import CopyStr from "./components/copy";
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';


import DemoImg from "./img/demo/t-1.png";


const Tip = styled.div`
    text-align: center;
    padding: 50px 20px;
    font-size: 18px;
    font-family: Roboto-Light, Roboto;
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
     
     
     &.active{
        border: 0.1rem solid #D51172;
         background: #FFEFF7;
         color: #D51172;
     }
  }
`;


const Ul = styled.ul`
  li{
    width: 31.3rem;
    height: 16rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: 2.4rem;
    padding: 2rem -2.8rem;
    box-sizing: border-box;
  }
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
    const [contractlist, setcontractlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    const [daostate, setdaostate] = useState(false);
    const [basestate, setbasestate] = useState(false);
    const [vaultstate, setvaultstate] = useState(false);
    const [votestate, setvotestate] = useState(false);
    const [orgstate, setorgstate] = useState(false);

    const [showMore, setShowMore] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);
    const [delMem, setdelMem] = useState(false);
    const [delAdmin, setdelAdmin] = useState(false);

    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');


    // let { t } = useTranslation();
    const myRef = useRef();

    useEffect(() => {
        if (apiState !== 'READY') return;
        const setInitDAO = async () => {
            setLoading(true)
            setTips('InitializeDAO');

            await api.dao.InitDAO(state, dispatch, props.match.params.id, (data) => {
                setdaostate(data)
                setLoading(false)
            });

        };
        setInitDAO();
    }, [apiState, id]);
    useEffect(() => {
        setcontractlist([]);
        setcontractshow(true);
        setbalancelist([]);
        setbalanceshow(true)
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
                    setcontractlist(data)
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
                setbalancelist(arr)
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
                setModerators(data)
                setmoderatorShow(false)
            });
        };
        setModeratorList();

    }, [orgcontract, orgstate, id]);

    useEffect(() => {
        if (!orgstate || contractlist.org_addr == null || !contractlist.org_addr) return;
        const whoAmI = async () => {
            await api.org.whoAmI(orgcontract).then(data => {
                if (!data) return;
                setisMember(data[0])
                setisModerator(data[1])
                setisOwner(data[2])
            });
        };
        whoAmI();
    }, [orgcontract, orgstate, id]);

    const handleClicktoType = (type) => {
        props.history.push(`/${type}/${id}`)
    }

    const handleMore = (val) => {
        if (!showMore) {
            document.addEventListener("click", handleOutsideClick, false);
        } else {
            document.removeEventListener("click", handleOutsideClick, false);
        }

        setShowMore(val)
    };

    const handleExit = () => {
        setShowModal(true)
    };
    const handleTransfer = () => {
        setShowTransfer(true)

    };

    const handleClose = () => {
        setShowTransfer(false)
    };

    const handleExitClose = () => {
        setShowModal(false)
    };

    const handleExitConfirm = async () => {
        setShowModal(false);
        setLoading(true);
        setTips('ExitDAO');
        if (isMember) {
            await api.org.resignMember(orgcontract, function (result) {
                if (!result) return;
                setdelMem(true)
            }).catch((error) => {
                seterrorShow(true)
                seterrorTips(`Resign Member: ${error.message}`)
                setLoading(false);

            });
        } else {
            setdelMem(true)
        }
    };

    useEffect(() => {
        if (orgcontract == null || !delMem) return;
        const setAdmin = async () => {
            if (isModerator) {
                await api.org.resignModerator(orgcontract, function (result) {
                    if (!result) return;
                    setdelAdmin(true)
                }).catch((error) => {
                    seterrorShow(true)
                    seterrorTips(`Resign Moderator: ${error.message}`)
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
    const handleOutsideClick = e => {
        if (myRef.current == null) return;
        if (!myRef.current.contains(e.target)) handleMore(myRef.current.contains(e.target));
    };
    const AddresstoShow = (address) => {

        let frontStr = address.substring(0, 4);

        let afterStr = address.substring(address.length - 4, address.length);

        return `${frontStr}...${afterStr}`

    }
    const switchKey = (key) => {
        let str = '';
        switch (key) {
            case 'base_addr':
                str = 'Base';
                break;
            case 'erc20_addr':
                str = 'ERC20';
                break;
            case 'org_addr':
                str = 'ORG';
                break;
            case 'vault_addr':
                str = 'Vault';
                break;
            case 'vote_addr':
                str = 'Vote';
                break;
            case 'auth_addr':
                str = 'Auth';
                break;
            case 'github_addr':
                str = 'Github';
                break;
            default:
                str = key;
                break;
        }
        return str;
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
                <TopTitles>
                    <LftTop>
                        <img src={DemoImg} alt=""/>
                        <Contents>
                            <Tit>Patract</Tit>
                            <div className="contentDesc">Plasm Network is built on Parity Substrate and designedto be a Polkadot Parachain.ParitySubstrate and designedto be a Polkadot Parachain.</div>
                        </Contents>
                    </LftTop>

                    <RhtTop>
                        <Button type="primary">Join</Button>
                    </RhtTop>
                </TopTitles>

                <BtnGroup>
                    <span className="active">Home</span>
                    <span>Voting</span>
                    <span>Vault</span>
                    <span>Org</span>
                </BtnGroup>

                <div>
                    <div className="titleTop">Balance</div>
                    <Ul>
                        <li>
                            <div>5.8910</div>
                            <div>DWT</div>
                            <div>5CtUz67MBtme5SF7caHaWJ75wKP6hnx122MTy863CxTMuu2J</div>
                        </li>
                    </Ul>
                </div>
            </div>








            {/*<section className="section blog-single position-relative">*/}
            {/*    <div className="row">*/}
            {/*        <aside className="col-lg-3">*/}
            {/*            {*/}
            {/*                info && <div animation="border" variant="light" />*/}
            {/*            }*/}
            {/*            {*/}
            {/*                !info && <ul className='leftSide'>*/}
            {/*                    <li>*/}
            {/*                        <h2>SubDAO</h2>*/}
            {/*                        <div className='titleTips'>{t('DAOdescription')}</div>*/}
            {/*                    </li>*/}
            {/*                    <li><img src={logo} alt="" /></li>*/}
            {/*                    <li className='lftname'>{name}</li>*/}
            {/*                    <li>{owner}<CopyStr address={owner} /></li>*/}
            {/*                    <li>{description}</li>*/}
            {/*                </ul>*/}
            {/*            }*/}

            {/*        </aside>*/}
            {/*        <Transfer*/}
            {/*            showTips={showTransfer}*/}
            {/*            handleClose={handleClose}*/}
            {/*        />*/}
            {/*        <ExitOrg*/}
            {/*            handleClose={handleExitClose}*/}
            {/*            handleConfirm={() => handleExitConfirm()}*/}
            {/*            showTips={showModal} />*/}
            {/*        <div className="col-lg-9 ">*/}
            {/*            <div>*/}
            {/*                <ul className="service-docs">*/}
            {/*                    {*/}
            {/*                        contractlist.vote_addr != null && <li onClick={() => handleClicktoType('vote')}>*/}
            {/*                            <span>*/}
            {/*                                <img src={votingimg} alt='' />*/}
            {/*                                {t('Voting')}*/}
            {/*                            </span>*/}
            {/*                        </li>*/}
            {/*                    }*/}
            {/*                    /!*{*!/*/}
            {/*                    /!*    contractlist.vault_addr != null && <li onClick={() => handleClicktoType('vault')}>*!/*/}
            {/*                    /!*        <span>*!/*/}
            {/*                    /!*            <img src={vaultimg}/>*!/*/}
            {/*                    /!*            {t('Vault')}*!/*/}
            {/*                    /!*        </span>*!/*/}
            {/*                    /!*    </li>*!/*/}
            {/*                    /!*} *!/*/}
            {/*                    {*/}
            {/*                        <li onClick={() => handleClicktoType('vault')}>*/}
            {/*                            <span>*/}
            {/*                                <img src={vaultimg} alt='' />*/}
            {/*                                {t('Vault')}*/}
            {/*                            </span>*/}
            {/*                        </li>*/}
            {/*                    }*/}

            {/*                    /!*{*!/*/}
            {/*                    /!*    contractlist.org_addr != null && <li onClick={() => handleClicktoType('org')}>*!/*/}
            {/*                    /!*        <span>*!/*/}
            {/*                    /!*            <img src={orgimg}/>*!/*/}
            {/*                    /!*            {t('Org')}*!/*/}
            {/*                    /!*        </span>*!/*/}
            {/*                    /!*    </li>*!/*/}
            {/*                    /!*}*!/*/}
            {/*                    {*/}
            {/*                        <li onClick={() => handleClicktoType('org')}>*/}
            {/*                            <span>*/}
            {/*                                <img src={orgimg} alt='' />*/}
            {/*                                {t('Org')}*/}
            {/*                            </span>*/}
            {/*                        </li>*/}
            {/*                    }*/}
            {/*                    {(isOwner || isMember || isModerator) &&*/}
            {/*                        <li>*/}
            {/*                            <div className='moreBtn'>*/}
            {/*                                <div*/}
            {/*                                    className={`moreBg ${showMore ? 'hasBg' : 'noBg'}`}*/}
            {/*                                >*/}
            {/*                                    <button className="btn">*/}
            {/*                                        <span onClick={handleMore} className='clickBtn' ref={myRef}>*/}
            {/*                                            <img src={moreImg} alt='' />*/}
            {/*                                            {t('More')}*/}
            {/*                                        </span>*/}
            {/*                                    </button>*/}
            {/*                                    {*/}
            {/*                                        showMore && (isOwner || isMember || isModerator) && <ul className='morelist'>*/}
            {/*                                            {*/}
            {/*                                                isOwner && <li onClick={handleTransfer}>*/}
            {/*                                                    <span><img src={transferImg} alt="" /></span>{t('transferBtn')}*/}
            {/*                                                </li>*/}
            {/*                                            }*/}
            {/*                                            {(isMember || isModerator) &&*/}
            {/*                                                <li onClick={handleExit}><span><img src={exitImg} alt="" /></span>{t('Exit')}</li>*/}
            {/*                                            }*/}


            {/*                                        </ul>*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </li>*/}
            {/*                    }*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*            <div className="norow">*/}
            {/*                <div className="row">*/}
            {/*                    <div className="col-lg-5">*/}
            {/*                        <div className='balance'>*/}
            {/*                            <h3>{t('Balance')}</h3>*/}
            {/*                            <div className="listwrap">*/}
            {/*                                <div className='listbg'>*/}
            {/*                                    <div className="listbalance">*/}
            {/*                                        {*/}
            {/*                                            balanceshow && <div animation="border" variant="light" />*/}
            {/*                                        }*/}
            {/*                                        {*/}
            {/*                                            !balanceshow && balancelist.map((item, index) =>*/}
            {/*                                                <dl key={`balance_${index}`}>*/}
            {/*                                                    <dd className='symbol'>{item.balance} {item.symbol}</dd>*/}
            {/*                                                    /!*<dt>{item.address}</dt>*!/*/}
            {/*                                                    <dt>{item.name}</dt>*/}
            {/*                                                </dl>*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                        <div className='balance'>*/}
            {/*                            <h3>{t('Moderators')}</h3>*/}
            {/*                            <div className="listwrap">*/}
            {/*                                <div className='listbg'>*/}
            {/*                                    <div className="listbalance">*/}
            {/*                                        {*/}
            {/*                                            moderatorShow && <div animation="border" variant="light" />*/}
            {/*                                        }*/}
            {/*                                        {*/}
            {/*                                            !moderatorShow && moderators.map((i, index) => <dl key={moderators[index]}>*/}
            {/*                                                <dd>{moderators[index][1]}</dd>*/}
            {/*                                                <dt>{moderators[index][0]}</dt>*/}
            {/*                                            </dl>)*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-lg-7">*/}

            {/*                        <div className='contracts'>*/}
            {/*                            <h3>{t('Contracts')}</h3>*/}
            {/*                            {*/}
            {/*                                !contractshow && contractlist != null && <ul className='list'>{*/}
            {/*                                    Object.keys(contractlist).map((key) => (*/}
            {/*                                        (contractlist[key] != null && <li key={`contract_${key}`}>*/}
            {/*                                            <span>{switchKey(key)} </span>*/}
            {/*                                            {AddresstoShow(contractlist[key])} <CopyStr address={contractlist[key]} />*/}
            {/*                                        </li>*/}
            {/*                                        )))*/}
            {/*                                }*/}
            {/*                                </ul>*/}
            {/*                            }*/}
            {/*                            {*/}
            {/*                                contractshow && <div animation="border" variant="light" />*/}
            {/*                            }*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</section>*/}
        </div>
    )

}
