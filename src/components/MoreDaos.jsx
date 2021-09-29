import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DaosModal from "./DaosModal";
import right from '../img/right.png'
import {useSubstrate} from "../api/contracts";


const topDaos = window.mainAddress.topDaos;

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

    const { dispatch } = useSubstrate();

    const showDAOModal = () =>{
        dispatch({ type: 'DAOTYPE',payload:'all' });
    }

    return (
        <AllDaos>
            <div className="more" onClick={() => showDAOModal()}>
                More DAOs<span>···</span>
            </div>
            <div className="daos">
                {
                    [1, 1, 1, 1, 1].map((item, index) =>
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
