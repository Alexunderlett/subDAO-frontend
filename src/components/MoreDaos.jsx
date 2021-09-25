import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DaosModal from "./DaosModal";
import right from '../images/right.png'


const topDaos = window.mainAddress.topDaos;

const AllDaos = styled.div`
    display: flex;
    flex-direction: column;

    .more{
        text-align: right;
        cursor: pointer;
        height: 25px;
        font-size: 18px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #10164B;
        line-height: 25px;
        margin-bottom: 20px;
    }
    .daos{
        display: flex;
        justify-content: space-around;
    }
`

const MoreDaos = (props) => {
    const { showMoreDaos } = props
    const [moreDaos, setMoreDaos] = useState(showMoreDaos);

    useEffect(() => {
        setMoreDaos(showMoreDaos)
    }, [showMoreDaos])

    return (
        <AllDaos>
            {/* {topDaos} */}
            <div className="more" onClick={() => { setMoreDaos(true) }}>
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
            <DaosModal moreDaos={moreDaos} handleClose={() => { setMoreDaos(false) }} />
        </AllDaos>
    );
}

export default MoreDaos;
