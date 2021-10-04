import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import addnew from '../../images/newvoting.png';
import { useTranslation } from "react-i18next";
import remove from "../../img/shutdown.png";
import add from "../../img/Add.png";

export default function AddNew(props) {

    const { state, dispatch } = useSubstrate();
    const { orgcontract } = state;

    const [tips, setTips] = useState('');

    const [name, setname] = useState('');
    const [address, setaddress] = useState('');


    const [addModerator, setaddModerator] = useState(false);
    const [addMember, setaddMember] = useState(false);
    const [adminlist, setadminlist] = useState([
        {
            name: '',
            address: ''
        }
    ]);
    const [errorShow, seterrorShow] = useState(false);

    let { t } = useTranslation();


    const submitModerators = async (obj) => {
        dispatch({ type: 'LOADINGTYPE', payload: t('AddModerator') });

        await api.org.addDaoModerator(orgcontract, obj, function (result) {
            setaddModerator(result)
            props.handleClose()
            props.refresh()
            setname('')
            setaddress('')
            dispatch({ type: 'LOADINGTYPE', payload: null });
        }).catch((error) => {
            seterrorShow(true)

            dispatch({ type: 'MSGTYPE', payload: { msg: `Add Moderator: ${error.message}` } });
            dispatch({ type: 'LOADINGTYPE', payload: null });
        });
    }
    const submitMembers = async (obj) => {
        dispatch({ type: 'LOADINGTYPE', payload: t('AddMember') });

        await api.org.addDaoMember(orgcontract, obj, function (result) {
            setaddMember(result)
            props.handleClose()
            props.refresh()
            setname('')
            setaddress('')
            dispatch({ type: 'LOADINGTYPE', payload: null });
        }).catch((error) => {
            seterrorShow(true)

            dispatch({ type: 'MSGTYPE', payload: { msg: `Add Member: ${error.message}` } });
            dispatch({ type: 'LOADINGTYPE', payload: null });
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const handleSubmit = (type) => {
        const obj = {
            address,
            name
        };

        if (type === "Moderators") {
            submitModerators(obj)
        } else {
            submitMembers(obj)
        }
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
    const handleBatch = () => {
        props.handleBatch()
    }

    let { handleClose, showTips, typeName, applyAuth } = props;
    return <div>
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title">
                {/* <img src={add} alt="" /> */}
                <span >{t(typeName)}</span>
            </div>

            <div className="label">{t('FilltheName')}</div>
            <div className="inputBrdr">
                <Input
                    placeholder={t('FilltheName')}
                    name='name'
                    value={name}
                    autoComplete="off"
                    onChange={handleInputChange}
                />
            </div>

            <div className="label">{t('FillAddress')}</div>
            <div className="inputBrdr">
                <Input
                    placeholder={t('FillAddress')}
                    name='address'
                    value={address}
                    autoComplete="off"
                    onChange={handleInputChange}
                />
            </div>

            <div className='NextBrdr'>
                <Button type="primary" onClick={() => handleSubmit(typeName)} style={{ width: '100%', marginTop: '3rem' }}>
                    Add
                </Button>
                {
                    typeName === 'Members' && applyAuth &&
                    <Button className="default" onClick={() => handleBatch()} style={{ width: '100%', marginTop: '3rem' }}>
                        Batch Import
                    </Button>
                }
            </div>
        </Modal>
    </div>;
}
