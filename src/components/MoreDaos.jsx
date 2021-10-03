import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import right from '../img/right.png'
import {useSubstrate} from "../api/contracts";
import api from "../api";


const favoriteDAOs = window.mainAddress.favoriteDAOs;

const AllDaos = styled.div`
    display: flex;
    flex-direction: column;

    .more{
        text-align: right;
        cursor: pointer;
        height: 2.5rem;
        font-size: 1.8rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
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

const MoreDaos = () => {

    const { dispatch,state } = useSubstrate();

    const [list, setList] = useState([]);

    const showDAOModal = () =>{
        dispatch({ type: 'DAOTYPE',payload:'all' });
    }

    useEffect(()=>{
        const setALLlist = async () =>{
            let arr=[];
            for( let item of favoriteDAOs){
                const data = await api.base.InitHome(state,item);
                if(!data) continue;
                const logo = data.logo ? data.logo : '';
                const name = data.name ? data.name : '';
                const desc = data.desc ? data.desc : '';
                arr.push({
                    address: item,
                    logo,
                    name,
                    desc,
                })
            }
            setList(arr);
        }
        setALLlist()

    },[]);

    return (
        <AllDaos>
            <div className="more" onClick={() => showDAOModal()}>
                More DAOs<span>···</span>
            </div>
            <div className="daos">
                {
                    list.map((item, index) =>
                        <div key={index} className="daoItem">
                            <img src={right} alt="" />
                            <div className="title">Patract</div>
                            <div className="detail">
                                Litentry is built on Substrate, which inherits great features and the best technologies in
                            </div>
                        </div>
                    )
                }
            </div>

        </AllDaos>
    );
}

export default MoreDaos;
