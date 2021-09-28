import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Select, Button } from 'antd';
import right from '../img/right.png';
import { withRouter } from 'react-router-dom';
import { useSubstrate } from "../api/contracts";
import api from "../api";


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
            font-family: Roboto-Light, Roboto;
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
    const { moreDaos, handleClose } = props
    const account = JSON.parse(sessionStorage.getItem('account'));

    const { state, dispatch } = useSubstrate();
    const { homepage, maincontract, allAccounts, myDao, apiState } = state;
    const [selected, setselected] = useState([]);
    const [imglist, setimglist] = useState([]);


    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
        if (maincontract == null || (selected && !selected.length)) return;
        const setInstances = async () => {
            let addresslist = await api.main.listDaoInstances(maincontract);
            console.log('===========addresslist============', addresslist)
            let arr = [];

            let mydaolist;
            if (myDao === 'TRUE') {
                mydaolist = addresslist.filter(i => i.owner === selected[0].address);
            } else {
                mydaolist = addresslist;
            }
            if (mydaolist && mydaolist.length) {

                for (let item of mydaolist) {

                    const data = await api.base.InitHome(state, item.dao_manager_addr);
                    const logo = data && data.logo ? data.logo : '';
                    arr.push({
                        address: item.dao_manager_addr,
                        logo
                    });
                }
            }
            console.info(222,arr)
            setimglist(arr);
            dispatch({ type: 'SET_HOME', payload: arr });
        };
        setInstances();

    }, [allAccounts, maincontract, myDao]);


    const handleClick = () => {
        if (account != null && account.length) {
            props.history.push('/create')
        }
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
                        imglist.map((item, index) =>
                            <div key={item.address} className="daoItem">
                                <img src={item.logo} alt="" />
                                <div className="title">Patract</div>
                                <div className="detail">
                                    Litentry is built on Substrate, which inherits great features and the best technologies in
                                </div>
                            </div>
                        )
                    }
                </div>
            </DaoBody>
        </Modal>
    );
}

export default withRouter(DaosModal);
