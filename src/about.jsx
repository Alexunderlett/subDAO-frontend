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

const Other = styled.div`
    height: 2.1rem;
    font-size: 1.8rem;
    font-family: Roboto-Regular;
    font-weight: 400;
    color: #10164B;
    line-height: 2.1rem;
    margin-top: 4rem;
`

export default function About(props) {
    const { state, dispatch } = useSubstrate();
    const { basecontract, vaultcontract, orgcontract, votecontract, daoManagercontract, apiState, erc20contract, maincontract } = state;

    const [id, setAId] = useState(null);
    const [moderators, setModerators] = useState([]);
    const [moderatorShow, setmoderatorShow] = useState(true);
    const [activelist, setActivelist] = useState([]);
    const [balancelist, setbalancelist] = useState([]);
    const [balanceshow, setbalanceshow] = useState(true);
    const [contractshow, setcontractshow] = useState(true);
    const [owner, setowner] = useState('');

    const [contractlist, setcontractlist] = useState({
        base_addr: null,
        erc20_addr: null,
        org_addr: null,
        vault_addr: null,
        vote_addr: null,
        auth_addr: null,
    });
    const [contractArr, setcontractArr] = useState([]);
    const [tokenlist, settokenlist] = useState([]);

    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');

    const [moreDaos, setMoreDaos] = useState(false);


    useEffect(() => {
        setcontractlist({
            base_addr: null,
            erc20_addr: null,
            org_addr: null,
            vault_addr: null,
            vote_addr: null,
            auth_addr: null,
        });
        setcontractArr([]);
        setcontractshow(true);
        setbalancelist([]);
        setbalanceshow(true);

        setAId(props.match.params.id);
        initOwner();
    }, [props.match.params.id]);
    const queryAddrs = () => {

        let contractlistBg = JSON.parse(sessionStorage.getItem('contractlist'));

        if (contractlistBg != null) {
            setcontractlist(contractlistBg);
        }
        let contractArrA = JSON.parse(sessionStorage.getItem('contractArr'));
        if (contractArrA != null) {
            setcontractArr(contractArrA);
        }
        setcontractshow(false);

    };
    const initOwner = async()=>{
        await api.main.listDAOInfo(maincontract, props.match.params.id).then((data)=>{
            if(!data)return;
            setowner(data.owner)
        });
    }
    useEffect(() => {
        if (daoManagercontract == null) return;
        queryAddrs();
    }, [daoManagercontract, id, maincontract, basecontract]);
    useEffect(() => {
        queryAddrs();
        initOwner();
        if(maincontract == null) dispatch({ type: 'LOAD_MAINCONTRACT' });
    }, []);

    // useEffect(() => {
    //     const setBalance = async () => {
    //         let arr = [];
    //         let index = 0;
    //         for (let item of tokenlist) {
    //             // eslint-disable-next-line no-loop-func
    //             await api.vault.getBalanceOf(vaultcontract, item).then(async (data) => {
    //
    //                 if (!data) return;
    //                 arr[index] = {
    //                     address: item,
    //                     balance: data
    //                 };
    //                 let result = await api.erc20.queryInfo(erc20contract, item);
    //                 let { symbol, name } = result;
    //                 arr[index].symbol = symbol;
    //                 arr[index].name = name;
    //             });
    //             index++;
    //             setbalancelist(arr);
    //             setbalanceshow(false);
    //         }
    //     }
    //     setBalance();
    // }, [tokenlist, id]);

    useEffect(() => {
        if (vaultcontract == null || contractlist.vault_addr == null || !contractlist.vault_addr) return;
        const setToken = async () => {
            await api.vault.getBalanceList(vaultcontract).then(data => {
                if (!data) return;
                // settokenlist(data)

                setbalancelist(data);
                setbalanceshow(false);
            });
        };
        setToken();
    }, [vaultcontract, id]);

    useEffect(() => {
        if (orgcontract == null || contractlist.org_addr == null || !contractlist.org_addr) return;
        const setModeratorList = async () => {
            await api.org.getDaoModeratorList(orgcontract).then(data => {
                if (!data) return;
                setModerators(data);
                setmoderatorShow(false)
            });
        };
        setModeratorList();

    }, [orgcontract, id]);


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
                img = VOTE;
                break;
            case 'auth_addr':
                str = 'Auth';
                img = AUTH;
                break;
            default:
                str = key;
                img = '';
                break;
        }
        return {
            addr: str.toUpperCase(),
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
                <Left history={props.history} id={props.match.params.id} owner={props.match.params.owner} />
                <section>
                    <div className="titleTop">Balance</div>
                    <Ul>
                        {
                            balanceshow && <LoadingNew />
                        }

                        {
                            !balanceshow && balancelist.map((item, index) =>
                                <li key={`balance_${index}`}>
                                    <BalanceNum>{item.balance}</BalanceNum>
                                    <Symbol>{item.symbol}</Symbol>
                                    <Address>
                                        {item.erc20}
                                        <CopyStr address={item.erc20} />
                                    </Address>
                                </li>
                            )
                        }
                    </Ul>
                </section>
                <section>
                    <div className="titleTop">Moderators</div>
                    <UlMdrt>

                        {
                            moderatorShow && <LoadingNew />
                        }
                        {
                            !moderatorShow && moderators.map((i, index) => <li key={moderators[index]}>
                                <img src={owner === moderators[index][0] ? Owner : Admin} alt="" />
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
                        contractshow && <LoadingNew />
                    }
                    {
                        !contractshow && contractlist != null && <UlContr>{
                            contractArr.map((item) => (<li key={`contract_${item.address}`}>
                                <Imglft src={switchKey(item.name).img} alt="" />
                                <ContractName>{switchKey(item.name).addr} </ContractName>
                                <Address>{item.address}</Address>
                                <CopyStr address={item.address} alt="" />
                            </li>
                            ))
                        }
                        </UlContr>
                    }
                </section>

                <Other>Other DAOs</Other>
                <MoreDaos history={props.history} title="Explorer other DAOs" />
            </div>
        </div>
    )
}
