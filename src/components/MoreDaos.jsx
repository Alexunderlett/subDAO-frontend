import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useSubstrate} from "../api/contracts";
import api from "../api";
import LoadingNew from "./loadingNEW";

const favoriteDAOs = window.mainAddress.favoriteDAOs;

const AllDaos = styled.div`
    display: flex;
    flex-direction: column;

    .more{
        text-align: right;
        cursor: pointer;
        height: 2.5rem;
        font-size: 1.8rem;
        font-family: PingFang-Medium;
        font-weight: 500;
        color: #10164B;
        line-height: 2.5rem;
        margin-bottom: 2rem;
    }
    .daos{
        display: flex;
        justify-content: space-around;
    }
`

const MoreDaos = (props) => {

    const { dispatch,state } = useSubstrate();
    const { maincontract, allAccounts } = state;

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [len, setLen] = useState(0);

    const showDAOModal = () =>{
        dispatch({ type: 'DAOTYPE',payload:'all' });
        window.scrollTo(0,0);
    }
    const setALLlist = async () =>{

        // let daolist = JSON.parse(sessionStorage.getItem('daoList')) ;
        // if(daolist == null) return;
        // setLen(daolist.length)
        let arr=[];
        let index = 0;
        for( let item  of favoriteDAOs){
            index ++;
            const data = await api.base.InitHome(state,item);

            if(!data) continue;
            const logo = data.logo ? data.logo : '';
            const name = data.name ? data.name : '';
            const desc = data.desc ? data.desc : '';
            const owner = data.owner ? data.owner : '';
            arr.push({
                address: item,
                logo,
                name,
                desc,
                owner,
            });

            if(index >= favoriteDAOs.length-1){
                setLoading(false)
            }
        }
        setList(arr);
    }
    useEffect(()=>{
        if(maincontract ==null ) return;
        setALLlist()
    },[]);

    useEffect(()=>{
        if(maincontract ==null ) return;
        setALLlist()
    },[maincontract]);

    const toAbout = (obj) =>{
        if(allAccounts == null){
            dispatch({ type: 'MSGTYPE', payload:'Please connect wallet'  });
            return;
        }
        const { address, owner } = obj;
        props.history.push(`/about/${address}/${owner}`)
    }

    return (
        <AllDaos>
            {/*{*/}
            {/*    len >5 &&<div className="more" onClick={() => showDAOModal()}>*/}
            {/*    More DAOs<span>···</span>*/}
            {/*    </div>*/}
            {/*}*/}
            <div className="more" onClick={() => showDAOModal()}>
                More DAO
            </div>
            <div className="daos">
                {
                    loading && <LoadingNew  />
                }
                {
                    !loading && !!list.length && list.slice(0, 5).map((item, index) =>
                        <div key={index} className="daoItem" onClick={()=>toAbout(item)}>
                            <img src={item.logo} alt="" />
                            <div className="title">{item.name}</div>
                            <div className="detail">{item.desc}</div>
                        </div>
                    )
                }
            </div>

        </AllDaos>
    );
}

export default MoreDaos;
