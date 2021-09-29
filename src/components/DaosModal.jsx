import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Select, Button } from 'antd';
import { withRouter } from 'react-router-dom';
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
    const { homepage, maincontract, allAccounts, myDao, apiState } = state;
    const [alls, setAlls] = useState(false);
    const [imglist, setimglist] = useState([]);


    const setInstances = async () => {
        let addresslist = await api.main.listDaoInstances(maincontract);
        console.log('===========addresslist============', addresslist)
        let arr = [];

        setAlls(true);
        let mydaolist;
        if (myDao === 'TRUE') {
            mydaolist = addresslist.filter(i => i.owner === allAccounts[0].address);
        } else {
            mydaolist = addresslist;
        }
        if (mydaolist && mydaolist.length) {
            for (let item of mydaolist) {
                const data = await api.base.InitHome(state, item.dao_manager_addr);
                if(!data) continue;
                const logo = data.logo ? data.logo : '';
                const name = data.name ? data.name : '';
                const owner = data.owner ? data.owner : '';
                const desc = data.desc ? data.desc : '';
                arr.push({
                    address: item.dao_manager_addr,
                    logo,
                    name,
                    owner,
                    desc,
                });
            }
        }
        setimglist(arr);
        setAlls(false);
        dispatch({ type: 'SET_HOME', payload: arr });
    };
    useEffect(() => {

        if (maincontract == null || allAccounts == null) return;

        setInstances();

    }, [allAccounts, maincontract, myDao]);


    const handleClick = () => {
        if (allAccounts != null && allAccounts.length) {
            props.history.push('/create')
        }
    }

    const handleClicktoAbout = (id,owner) => {
        props.history.push(`/about/${id}/${owner}`)
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
                    <div className="left">There's always one for you</div>
                    <Button onClick={handleClick}>CreateDAO</Button>
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

export default withRouter(DaosModal);
