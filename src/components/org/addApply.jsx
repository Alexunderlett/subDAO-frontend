import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import addnew from '../../images/newvoting.png';
import { useTranslation } from "react-i18next";
import remove from "../../img/shutdown.png";
import add from "../../img/Add.png";
import applyList from "../../images/apply.png";

export default function AddApply(props) {

    const { state, dispatch } = useSubstrate();
    const { orgcontract } = state;

    const [name, setname] = useState('');

    const [addMember, setaddMember] = useState(false);

    let { t } = useTranslation();


    useEffect(() => {
        if (addMember) {
            dispatch({ type: 'LOADINGTYPE', payload: null });
            props.handleTips()
        }
    }, [addMember])

    const handleInputChange = (e) => {
        const { value } = e.target;
        setname(value)
    }
    const handleSubmit = async () => {
        const obj = {
            name
        };

        dispatch({ type: 'LOADINGTYPE', payload: t('ApplyMember') });
        props.handleClose()
        await api.org.applyMember(orgcontract, name, function (result) {
            setaddMember(result)

            props.refresh()
            setname('')
        }).catch((error) => {
            dispatch({ type: 'MSGTYPE', payload: { msg: `Apply Member: ${error.message}` } });
            dispatch({ type: 'LOADINGTYPE', payload: null });
        });
    }

    let { handleClose, showTips } = props;
    return <div>
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title">
                {/* <img src={applyList} alt="" /> */}
                <span >Apply</span>
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

            <Button type="primary" onClick={() => handleSubmit()} style={{ width: '100%', marginTop: '3rem' }}>
                Add
            </Button>
        </Modal>
    </div>;
}
