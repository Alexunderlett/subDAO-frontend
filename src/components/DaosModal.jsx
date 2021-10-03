import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Button, Input } from 'antd';
import { useSubstrate } from "../api/contracts";
import api from "../api";
import LoadingNew from "./loadingNEW";
import { useHistory, useLocation } from 'react-router-dom';
import nodaos from "../img/noDaos.png";



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
        width: calc(100% + 7rem);
        margin-left: -3.5rem;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        padding: 2rem 0;
        .daoItem{
            width: 23rem;
            height: 26.8rem;
            margin: 1rem 3.6rem;
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
    background: #FFFFFF!important;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
    border-radius: 1.2rem;
    border: 0;
    outline: none;
    font-size: 1.8rem;
  font-family: Roboto-Light;
  padding-left: 4.1rem;
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
`


const DaosModal = (props) => {
    const { moreDaos, handleClose } = props;

    const { state, dispatch } = useSubstrate();
    const {  maincontract, allAccounts, daoManagercontract,daoType } = state;
    const [alls, setAlls] = useState(false);
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

        setAlls(true);
        let mydaolist=[];

        if (daoType === 'my') {
            mydaolist = JSON.parse(sessionStorage.getItem('mydaoList')) ;
        } else if(daoType === 'all'){
            mydaolist = JSON.parse(sessionStorage.getItem('daoList')) ;
        } else {
            return
        }

        console.error(sessionStorage.getItem('mydaoList'),sessionStorage.getItem('daoList'))
        setimglist(mydaolist);
        setAlls(false);

    };
    useEffect(() => {

        if (maincontract == null || allAccounts == null || daoType == null) return;

        setInstances();

    }, [allAccounts, maincontract,daoType]);


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
       let arr =  imglist.filter(item=> item.name.indexOf(e.target.value)>-1);
        setimglist(arr);
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
                            <Inputbrdr type="text" placeholder="search" onChange={(e) =>handleSearch(e)}  allowClear={true}/>
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
            </DaoBody>
        </Modal>
    );
}

export default DaosModal;
