import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Button, Input } from 'antd';
import { useSubstrate } from "../api/contracts";
import LoadingNew from "./loadingNEW";
import { useLocation } from 'react-router-dom';
import nodaos from "../img/noDaos.png";
import api from "../api";

const DaoBody = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
        width: 144rem;
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
        width: 151rem;
        margin-left: 1rem;
        //max-height: 100%;
        display: flex;
        flex-wrap: wrap;
        //overflow-y: auto;
        padding: 2rem 0;
        .daoItem{
            width: 23rem;
            height: 26.8rem;
            margin: 3rem 3.6rem;
        }
        .detail{
        font-size: 1.4rem;
        line-height: 1.9rem;
        }
    }
`;

const Imgbrdr = styled.img`
    width: 40rem;
    height: 21.8rem;
`;
const Bgmid = styled.div`
   width: 100%;
   text-align: center;
   padding-top: 7.6rem;
   span{
        display:block;
        font-size: 1.8rem;
        font-family: PingFang-Medium;
        font-weight: 500;
        color: #878AA5;
        line-height: 2.5rem;
        padding-top: 4rem;
   }
`;
const Inputbrdr = styled(Input)`
    width: 30rem;
    height: 6rem;
    background:#F5F5F7!important;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
    border-radius: 1.2rem;
    border: 0;
    outline: none;
    font-size: 1.8rem;
    font-family: Roboto-Light;
    padding-left: 4.1rem;
    margin-left: 1rem;
    .ant-input{
    background: #Fff!important;
    height: 100%!important;
    }
    &:focus{
     outline: none;
    }
    &::placeholder{
      color: #B5B6C6;

    }
`;
const Tips = styled.div`
    text-align: center;
    font-size: 1.8rem;
    font-family: PingFang-Medium;
    line-height: 2.5rem;
    color: #0069ff;
    cursor: pointer;
`;
const DaosModal = (props) => {
    const { moreDaos, handleClose } = props;

    const { state, dispatch } = useSubstrate();
    const {  maincontract, allAccounts, daoManagercontract,daoType } = state;
    const [alls, setAlls] = useState(true);
    const [imglist, setimglist] = useState([]);
    const [showCreatDaoBtn, setshowCreatDaoBtn] = useState(true);
    const { pathname } = useLocation()

    useEffect(()=>{
        if(pathname === '/create') {
            setshowCreatDaoBtn(false)
        }else{
            setshowCreatDaoBtn(true)
        }
    },[pathname])

    const setInstances = async () => {


       let mydaolist = JSON.parse(sessionStorage.getItem('addresslist')) ;


        if ( daoType === 'my'){
            mydaolist = mydaolist.filter(i => i.owner === allAccounts[0].address);
        }

        setTimeout(()=>{
            setAlls(false);
            setimglist(mydaolist);
        },0)

    };


    useEffect(() => {
        if (maincontract == null || allAccounts == null || daoType == null) return;
        setInstances();

    }, [allAccounts, maincontract,daoType]);

    useEffect(() => {
        setAlls(true);
        setimglist([]);
    }, [daoType]);

    const handleClick = () => {
        if (allAccounts != null && allAccounts.length) {
            props.history.push('/create');
            dispatch({ type: 'DAOTYPE',payload: null });
        }
    }

    const handleClicktoAbout = (id,owner) => {

        props.history.push(`/about/${id}/${owner}`);
        dispatch({ type: 'DAOTYPE',payload: null });
    }
    const handleSearch = (e) =>{
        let list = JSON.parse(sessionStorage.getItem('daoList'));
        let arr;
        if(e.target.value.length){
            arr =  list.filter(item=> {
                return item.name.indexOf(e.target.value)>-1
            });
        }else{
            arr = list ;
        }
        setimglist(arr);
    }
    const switchModal = () =>{
        dispatch({ type: 'DAOTYPE',payload: 'all' });
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
                    {
                        daoType ==='all' && <div className="left">
                            <Inputbrdr type="text" placeholder="search" onChange={(e) =>handleSearch(e)}/>
                        </div>
                    }
                   {
                        daoType ==='my' && <div className="left">My Daos</div>
                    }

                    {showCreatDaoBtn &&
                    <Button type="primary" onClick={()=>handleClick()} style={{width:'20rem', height: '6rem'}}>
                        Create DAO
                    </Button>}
                </div>
                <div className="daos">
                    {
                        alls && <LoadingNew  />
                    }
                    {
                        !alls && !!imglist.length && imglist.map((item) =>
                            <div key={item.address} className="daoItem" onClick={() => handleClicktoAbout(item.address, item.owner)}>
                                <img src={item.logo} alt="" />
                                <div className="title">{item.name}</div>
                                <div className="detail">{item.desc}</div>
                            </div>
                        )
                    }
                    {
                        !alls && !imglist.length && <Bgmid>
                            <Imgbrdr src={nodaos} alt=""/>
                            <span>sorry,there is no DAOs</span>
                        </Bgmid>
                    }
                </div>
                {
                    daoType ==='my' && <Tips onClick={()=>switchModal()}>
                        Explorer other DAOs ...
                    </Tips>
                }

            </DaoBody>
        </Modal>
    );
}

export default DaosModal;
