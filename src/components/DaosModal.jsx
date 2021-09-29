import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import { useSubstrate } from "../api/contracts";
import api from "../api";
import LoadingNew from "./loadingNEW";

const DaoBody = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .top{
        display: flex;
        justify-content: space-between;
        .left{
            font-size: 5.6rem;
            font-family: Roboto-Light;
            font-weight: 300;
            color: #10134E;
            line-height: 6.6rem;
        }
    }
    .daos{
        width: calc(100% + 2.5rem);
        margin-left: -1rem;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        padding: 2rem 0;
        .daoItem{
            width: 18.7rem;
            margin: 1rem 2rem;
        }
    }
`


const DaosModal = (props) => {
    const { moreDaos, handleClose } = props;

    const { state, dispatch } = useSubstrate();
    const {  maincontract, allAccounts, apiState,daoType } = state;
    const [alls, setAlls] = useState(false);
    const [imglist, setimglist] = useState([]);

    const setInstances = async () => {

        setAlls(true);
        let mydaolist=[];

        if (daoType === 'my') {
            mydaolist = JSON.parse(sessionStorage.getItem('mydaoList')) ;
        } else if(daoType === 'all'){
            mydaolist = JSON.parse(sessionStorage.getItem('daoList')) ;
        } else {
            return
        }
        setimglist(mydaolist);
        setAlls(false);

    };
    useEffect(() => {
        setimglist([]);
        if (maincontract == null || allAccounts == null || daoType == null) return;

        setInstances();

    }, [allAccounts, maincontract,daoType]);


    const handleClick = () => {
        if (allAccounts != null && allAccounts.length) {
            props.history.push('/create')
        }
    }

    const handleClicktoAbout = (id,owner) => {
        props.history.push(`/about/${id}/${owner}`);
        dispatch({ type: 'DAOTYPE',payload: null });
    }
    return (
        <Modal
            visible={moreDaos}
            onCancel={handleClose}
            className='daoModal'
            footer={null}
            mask={false}
        >
            <DaoBody>
                <div className="top">
                    <div className="left">{daoType ==='all' ? 'There\'s always one for you' :'My Daos'}</div>
                    <Button onClick={()=>handleClick()}>CreateDAO</Button>
                </div>
                <div className="daos">
                    {
                        alls && <LoadingNew  />
                    }
                    {
                        !alls && imglist.map((item) =>
                            <div key={item.address} className="daoItem" onClick={() => handleClicktoAbout(item.address, item.owner)}>
                                <img src={item.logo} alt="" />
                                <div className="title">{item.name}</div>
                                <div className="detail">{item.desc}</div>
                            </div>
                        )
                    }
                </div>
            </DaoBody>
        </Modal>
    );
}

export default DaosModal;
