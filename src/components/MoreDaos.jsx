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

const MoreDaos = (props) => {

    const { dispatch,state } = useSubstrate();

    const [list, setList] = useState([]);

    const showDAOModal = () =>{
        dispatch({ type: 'DAOTYPE',payload:'all' });
        window.scrollTo(0,0);
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
                const owner = data.owner ? data.owner : '';
                arr.push({
                    address: item,
                    logo,
                    name,
                    desc,
                    owner,
                })
            }
            setList(arr);
            console.error("====arr=======",arr)
        }
        setALLlist()

    },[]);

    const toAbout = (obj) =>{
        const { address, owner } = obj
        props.history.push(`/about/${address}/${owner}`)
    }

    return (
        <AllDaos>
            <div className="more" onClick={() => showDAOModal()}>
                More DAOs<span>···</span>
            </div>
            <div className="daos">
                {
                    list.map((item, index) =>
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
