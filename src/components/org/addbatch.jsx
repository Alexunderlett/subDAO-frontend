import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import { useTranslation } from "react-i18next";
import remove from "../../img/remove.png";
import add from "../../img/plus.png";
import Back from "../../img/left.png";

import styled from "styled-components";

const ModalWidth = styled(Modal)`
  width: 89rem!important;
`

const Batchlist = styled.ul`
  li{
    margin-bottom: 2rem;
        display: flex;
        justify-content: flex-start;
        position: relative;
  }
  .nameInput{
    padding-right: 3rem;
    width: 29rem!important;
    .ant-input{
       width: 29rem!important;
    }
  }
  .addrInput{
    flex-grow: 1;
    
  }
`;

const BatchTop = styled.div`
  display: flex;
  justify-content: space-between;
  .btnRTop{
    background: #FFFFFF;
    border-radius: 0.6rem;
    border: 0.1rem solid #B7B9C9;
    padding: 0.2rem 1.2rem;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    img{
    width: 1.2rem;
    margin-right: 0.6rem;
    }
  }
`;

const VoteLft = styled.div`
  font-size: 1.4rem;
  padding-top: 1rem;
color: #D52473;
  img{
  width: 1.8rem;
  }
`;
const NextBrdr = styled.div`
   margin-top: 4rem;
   button{
   width: 100%;
   }
`;
const RemoveImg = styled.div`
    position: absolute;
    right: -1.6rem;
    top:  -1.6rem;
   
    img{
     width: 3.6rem;
     height: 3.6rem;
      cursor: pointer;
    }
`


export default function AddBatch(props) {

    const { state, dispatch } = useSubstrate();
    const { orgcontract } = state;

    const [addMember, setaddMember] = useState(false);
    const [adminlist, setadminlist] = useState([
        {
            name: '',
            address: ''
        }
    ]);

    let { t } = useTranslation();


    const handleSubmit = async () => {
        dispatch({ type: 'LOADINGTYPE', payload: t('AddMember') });

        let obj = [];
        let i = 0;
        for (let item in adminlist) {

            obj[i] = [adminlist[item].name, adminlist[item].address];
            i++;
        }

        await api.org.batchAddMember(orgcontract, obj, function (result) {
            dispatch({ type: 'LOADINGTYPE', payload: null });
            props.handleClose();
            props.refresh();
            setadminlist([
                {
                    name: '',
                    address: ''
                }
            ])

        }).catch((error) => {
            dispatch({ type: 'MSGTYPE', payload: { msg: `Batch Add Member: ${error.message}` } });
            dispatch({ type: 'LOADINGTYPE', payload: null });
        });
    }
    const setAdminInput = (e, index) => {
        let newArray = [...adminlist];
        const { name, value } = e.target;
        newArray[index][name] = value;
        setadminlist(newArray)
    }
    const removeAdmin = (selectItem, index) => {
        let newArray = [...adminlist];
        newArray.splice(index, 1);
        setadminlist(newArray)
    }
    const addAdmin = () => {
        let newArray = [...adminlist];
        newArray.push({
            name: '',
            address: ''

        });
        setadminlist(newArray)
    }
    const handleBack = () => {
        props.handleBatchAdd()
    }

    let { handleClose, showTips } = props;
    return <div>
        <ModalWidth visible={showTips} onCancel={()=>handleClose()} footer={null}   maskClosable={false} >
            <div className="title"><span >Add Members</span></div>

            <section>
                <BatchTop>
                    <VoteLft onClick={()=>handleBack()}>
                        <img src={Back} alt="" /> {t('Back')}
                    </VoteLft>
                    <div>
                        <div className='btnRTop' onClick={()=>addAdmin()}><img src={add} alt='' />{t('AddOption')}</div>
                    </div>
                </BatchTop>
                <Batchlist>


                        {adminlist.map((i, index) => (

                            <li key={index}>

                                    <div className='inputBrdr nameInput'>
                                        <Input
                                            placeholder={t('FilltheName')}
                                            value={adminlist[index].name}
                                            name='name'
                                            autoComplete="off"
                                            onChange={(event) => setAdminInput(event, index)}
                                        />
                                    </div>
                                    <div className='inputBrdr addrInput'>
                                        <Input
                                            placeholder={t('FillAddress')}
                                            value={adminlist[index].address}
                                            name='address'
                                            autoComplete="off"
                                            onChange={(event) => setAdminInput(event, index)}
                                        />
                                    </div>
                                    <RemoveImg>

                                        {
                                            !!index &&
                                            <img src={remove} onClick={() => removeAdmin(i, index)} className="removerht" alt='' />
                                        }
                                    </RemoveImg>

                            </li>
                        ))
                        }




                </Batchlist>

                <NextBrdr>
                    <Button type="primary" onClick={() => handleSubmit()}>
                        Add
                    </Button>
                </NextBrdr>

            </section>
        </ModalWidth>
    </div>;
}
