import React, { useEffect, useState } from 'react';
import { useSubstrate } from "./api/contracts";

import api from './api/index';
import LoadingNew from "./components/loadingNEW";
import Left from './components/left';

import CopyStr from "./components/copy";
import { Modal } from 'antd';
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
import mainContract from "./api/mainContract";


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
const Ul = styled.ul`
    color: #10164B;
    display: flex;
    flex-wrap: wrap;
    margin-left: -6rem;
  li{
    width: 31.3rem;
    height: 16rem;
    background: #FFFFFF;
    box-shadow: 0 0 1rem 0 rgba(16, 22, 75, 0.05);
    border-radius: 2.4rem;
    padding: 2rem 2.8rem;
    box-sizing: border-box;
    word-break: break-all;    
    margin-left: 6rem;
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
  margin:-0.1rem 0 0  0.7rem;
`;

export default function About(props) {
    const { state, dispatch } = useSubstrate();
    const { basecontract, vaultcontract, orgcontract, votecontract, daoManagercontract, apiState, erc20contract } = state;

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

    const [isMember, setisMember] = useState(false);
    const [isModerator, setisModerator] = useState(false);
    const [isOwner, setisOwner] = useState(false);
    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');

    const [moreDaos, setMoreDaos] = useState(false);


    useEffect(() => {
        if (apiState !== 'READY') return;
        const setInitDAO = async () => {

            await api.dao.InitDAO(state, dispatch, props.match.params.id, (data) => {
                setdaostate(data);
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

        setAId(props.match.params.id);

    }, [props.match.params.id]);
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
                setcontractArr(arr);
                setcontractlist(data);
                setcontractshow(false)
            }
        });
    };
    useEffect(() => {
        if (daoManagercontract == null && daostate) return;
        queryAddrs();
    }, [daoManagercontract, daostate, id]);
    useEffect(() => {
        queryAddrs();
    }, []);

    useEffect(() => {

        const { vault_addr, org_addr, vote_addr, erc20_addr, base_addr, auth_addr } = contractlist;
        sessionStorage.setItem('contractlist', JSON.stringify(contractlist));
        if (base_addr != null) {

            const setInitBase = async () => {
                await api.base.InitBase(state, dispatch, base_addr, (data) => {
                    setbasestate(data);
                });
            };
            setInitBase();
        }
        if (vault_addr != null) {
            const setInitVault = async () => {
                await api.vault.InitVault(state, dispatch, vault_addr, (data) => {
                    setvaultstate(data)
                });
            };
            setInitVault();
        }

        if (org_addr != null) {
            const setInitOrg = async () => {
                await api.org.InitOrg(state, dispatch, org_addr, (data) => {
                    setorgstate(data)
                });
            };
            setInitOrg();
        }
        if (auth_addr != null) {
            const setInitAuth = async () => {
                await api.auth.InitAuth(state, dispatch, auth_addr, (data) => {
                    console.log("====", data)
                });
            };
            setInitAuth();
        }
        if (vote_addr != null) {
            const setInitVote = async () => {
                await api.vote.InitVote(state, dispatch, vote_addr, (data) => {
                    setvotestate(data)
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
    }, [daoManagercontract, contractlist, id]);

    useEffect(() => {
        const setBalance = async () => {
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
                setbalanceshow(false);
            }
        }
        setBalance();
    }, [tokenlist, id]);
    // useEffect(() => {
    //     if (!basestate || contractlist.base_addr == null || !contractlist.base_addr) return;
    //     const setBase = async () => {
    //         await api.base.getBaseData(basecontract).then(data => {
    //             if (!data) return;
    //             let { owner, name, logo, desc } = data;
    //             setName(name);
    //             setLogo(logo);
    //             setDescription(desc);
    //             setOwner(owner);
    //         console.error("======getBaseData",name,logo,desc,owner)
    //             sessionStorage.setItem('logo', logo);
    //             sessionStorage.setItem('description', description);
    //             sessionStorage.setItem('owner', owner);
    //             sessionStorage.setItem('DaoName', name);
    //             setinfo(false);
    //         });
    //     };
    //     setBase();
    // }, [basecontract, basestate, id]);

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

                if (!data) return;
                setisMember(data[0]);
                sessionStorage.setItem('isMember',data[0]);
                setisModerator(data[1]);
                sessionStorage.setItem('isModerator',data[1]);
                setisOwner(data[2]);
                sessionStorage.setItem('isOwner',data[2]);
            });
        };
        whoAmI();
    }, [orgcontract, orgstate, id]);

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
            <Modal
                visible={errorShow}
                onCancel={() => seterrorShow(false)}
                footer={null}
            >
                <Tip>{errorTips}</Tip>
            </Modal>

            <div className='container'>
                <Left history={props.history} id={id} owner={props.match.params.owner}/>
                <section>
                    <div className="titleTop">Balance</div>
                    <Ul>
                        {
                            balanceshow && <LoadingNew  />
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
                            moderatorShow &&  <LoadingNew />
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
                            contractshow &&<LoadingNew  />
                        }
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

                </section>
                {/*<section>*/}
                {/*    <MoreDaos showMoreDaos={moreDaos}/>*/}
                {/*</section>*/}
            </div>

        </div>
    )
}
