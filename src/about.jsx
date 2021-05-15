import React, {useEffect, useState} from 'react';
import {useSubstrate} from "./api/contracts";

import api from './api/index';
import Loading from "./components/loading/Loading";
import votingimg from './images/voting.png';
import orgimg from  './images/org.png';
import vaultimg from "./images/vault.png";
import {useTranslation} from "react-i18next";

export default function About(props) {
    const {state, dispatch} = useSubstrate();
    const {basecontract, vaultcontract, orgcontract, votecontract, daoManagercontract, apiState} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [id, setAId] = useState(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [moderators, setModerators] = useState([]);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);
    const [contractlist, setcontractlist] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    const [daostate, setdaostate] = useState(false);
    const [basestate, setbasestate] = useState(false);
    const [vaultstate, setvaultstate] = useState(false);
    const [votestate, setvotestate] = useState(false);
    const [orgstate, setorgstate] = useState(false);

    let { t } = useTranslation();

    useEffect(() => {
        if (apiState !== 'READY') return;
        const setInitDAO = async () => {
            setLoading(true)
            setTips(t('InitializeDAO'))

            await api.dao.InitDAO(state, dispatch, props.match.params.id, (data) => {
                setdaostate(data)
            });

        };
        setInitDAO();
    }, [apiState,id]);
    useEffect(() => {
        setAId(props.match.params.id);
        console.log(props.match.params.id)
    }, [props.match.params.id]);
    useEffect( () => {
        if (daoManagercontract == null && daostate) return;
        const queryAddrs = async () => {
            setTips(t('GetContractAddress'));
            await api.dao.queryComponentAddrs(daoManagercontract).then(data => {
                if (data) {
                    setcontractlist(data)
                }
            });
        };
        queryAddrs();
    }, [daoManagercontract, daostate,id]);

    useEffect(() => {

        const {vault_addr, org_addr, vote_addr, erc20_addr, base_addr} = contractlist;
        if (base_addr != null) {

            const setInitBase = async () => {
                setTips(t('InitializingContracts'));
                await api.base.InitBase(state, dispatch, base_addr, (data) => {
                    setbasestate(data);
                });
            };
            setInitBase();
        }
        if (vault_addr != null) {
            const setInitVault = async () => {
                setTips(t('InitializingContracts'));
                await api.vault.InitVault(state, dispatch, vault_addr, (data) => {
                    setvaultstate(data)
                });
            };
            setInitVault();
        }

        if (org_addr != null) {
            const setInitOrg = async () => {
                setTips(t('InitializingContracts'));
                await api.org.InitOrg(state, dispatch, org_addr, (data) => {
                    setorgstate(data)
                });
            };
            setInitOrg();
        }
        if (vote_addr != null) {
            const setInitVote = async () => {
                setTips(t('InitializingContracts'));
                await api.vote.InitVote(state, dispatch, vote_addr, (data) => {
                    setvotestate(data)
                });
            };
            setInitVote();
        }
        if (erc20_addr != null) {
            const setInitErc20 = async () => {
                setTips(t('InitializingContracts'));
                await api.erc20.InitErc20(state, dispatch, erc20_addr);
            };
            setInitErc20();
        }

    }, [daoManagercontract, contractlist,id]);

    useEffect(() => {
        sessionStorage.setItem('logo', logo)
        sessionStorage.setItem('description', description)
        sessionStorage.setItem('owner', owner)
        sessionStorage.setItem('DaoName', name)
    }, [logo,description,owner,name]);
    useEffect( () => {
        const setBalance = async () => {
            setTips(t('Getbalance'));
            let arr = [];
            let index = 0;
            for (let item of tokenlist) {
                // eslint-disable-next-line no-loop-func
                await api.vault.getBalanceOf(vaultcontract, item).then(data => {
                    if (!data) return;

                    arr[index] = {
                        address: item,
                        balance: data
                    };
                    index++;
                });
            }
            setbalancelist(arr)
        };
        setBalance();
    }, [tokenlist,id]);
    useEffect( () => {
        if (!basestate || contractlist.base_addr == null || !contractlist.base_addr) return;

        const setBase = async () => {
            setTips(t('Getinformation'));
            await api.base.getBaseData(basecontract).then(data => {
                if (!data) return;

                let {owner, name, logo, desc} = data;

                setName(name);
                setLogo(logo);
                setDescription(desc);
                setOwner(owner);

                setTimeout(()=>{
                    setLoading(false)
                },2000)
            });
        };
        setBase();
    }, [basecontract, basestate,id]);

    useEffect( () => {
        if (!vaultstate || contractlist.vault_addr == null || !contractlist.vault_addr) return;
        const setToken = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                settokenlist(data)
            });
        };
        setToken();
    }, [vaultcontract, vaultstate,id]);

    useEffect( () => {
        if (!votestate || contractlist.vote_addr == null || !contractlist.vote_addr) return;
        const setActiveVote = async () => {
            await api.vote.queryOpenVote(votecontract).then(data => {
                if (!data) return;
                let arr = data.slice(0, 3);
                setActivelist(arr)
            });
        };
        setActiveVote();
    }, [votecontract, votestate,id]);

    useEffect( () => {
        if (!orgstate || contractlist.org_addr == null || !contractlist.org_addr) return;
        const setModeratorList = async () => {
            await api.org.getDaoModeratorList(orgcontract).then(data => {
                if (!data) return;
                setModerators(data)
            });
        };
        setModeratorList();

    }, [orgcontract, orgstate,id]);



    const handleClicktoType = (type) => {
        props.history.push(`/${type}/${id}`)
    }
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
            <section className="section blog-single position-relative">
                <div className="row">
                    <aside className="col-lg-3">
                        <ul className='leftSide'>
                            <li>
                                <h2>SubDAO</h2>
                                <div className='titleTips'>{t('DAOdescription')}</div>
                            </li>
                            <li><img src={logo} alt=""/></li>
                            <li className='lftname'>{name}</li>
                            <li>{owner}</li>
                            <li>{description}</li>
                        </ul>
                    </aside>
                    <div className="col-lg-9 ">
                        <div>
                            <ul className="service-docs">
                                {
                                    contractlist.vote_addr != null && <li onClick={() => handleClicktoType('vote')}>
                                            <span>
                                                <img src={votingimg} />
                                                {t('Voting')}
                                            </span>
                                    </li>
                                }
                                {
                                    contractlist.vault_addr != null && <li onClick={() => handleClicktoType('vault')}>
                                        <span>
                                            <img src={vaultimg}/>
                                            {t('Vault')}
                                        </span>
                                    </li>
                                }

                                {
                                    contractlist.org_addr != null && <li onClick={() => handleClicktoType('org')}>
                                        <span>
                                            <img src={orgimg}/>
                                            {t('Org')}
                                        </span>
                                    </li>
                                }

                            </ul>
                        </div>
                        <div className="norow">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className='balance'>
                                        <h3>{t('Balance')}</h3>
                                        <div className="listwrap">
                                            <div className='listbg'>
                                                <div className="listbalance">
                                            {
                                                balancelist.map((item, index) =>
                                                    <dl key={`balance_${index}`}>
                                                        <dd>{item.balance}</dd>
                                                        <dt>{item.address}</dt>
                                                    </dl>
                                                )
                                            }
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        <h3>{t('Moderators')}</h3>
                                        <div className="listwrap">
                                            <div className='listbg'>
                                                <div className="listbalance">
                                            {
                                                moderators.map((i, index) => <dl key={moderators[index]}>
                                                    <dd>{moderators[index][1]}</dd>
                                                    <dt>{moderators[index][0]}</dt>
                                                </dl>)
                                            }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">

                                    <div className='contracts'>
                                        <h3>{t('Contracts')}</h3>
                                        {
                                            contractlist != null && <ul className='list'>{
                                                Object.keys(contractlist).map((key) => (
                                                    (contractlist[key] != null && <li key={`contract_${key}`}>
                                                        <span>{key} </span>
                                                        {contractlist[key]}
                                                        </li>
                                                    ) ))
                                            }
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )

}
