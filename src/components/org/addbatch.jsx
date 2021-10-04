import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import addnew from '../../images/newvoting.png';
import { useTranslation } from "react-i18next";
import remove from "../../img/shutdown.png";
import add from "../../img/Add.png";
import Back from "../../images/prev.png";

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
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title"><img src={addnew} alt="" /><span >{t('Members')}</span></div>

            <section>
                <div className='batchTop'>
                    <div className='voteLft' onClick={handleBack}>
                        <img src={Back} alt="" /> {t('Back')}
                    </div>
                    <div>
                        <div className='btnRTop' onClick={addAdmin}><img src={add} alt='' />{t('AddOption')}</div>
                    </div>
                </div>
                <ul className='batchlist'>
                    <li>
                        <div>
                            {adminlist.map((i, index) => (

                                <div key={index} className='norow'>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="mb-3">
                                                <div className='inputBrdr'>
                                                    <Input
                                                        placeholder={t('FilltheName')}
                                                        value={adminlist[index].name}
                                                        name='name'
                                                        autoComplete="off"
                                                        onChange={(event) => setAdminInput(event, index)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-8 flexBrdr">
                                            <div className="mb-3">
                                                <div className='inputBrdr'>
                                                    <Input
                                                        placeholder={t('FillAddress')}
                                                        value={adminlist[index].address}
                                                        name='address'
                                                        autoComplete="off"
                                                        onChange={(event) => setAdminInput(event, index)}
                                                    />
                                                </div>
                                            </div>
                                            {
                                                !!index &&
                                                <img src={remove} onClick={() => removeAdmin(i, index)} className="removerht" alt='' />
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                            }

                        </div>
                    </li>

                </ul>
                <div>
                    <div className='NextBrdr'>
                        <Button type="primary" onClick={() => handleSubmit()}>
                            Add
                        </Button>
                    </div>
                </div>
            </section>
        </Modal>
    </div>;
}
