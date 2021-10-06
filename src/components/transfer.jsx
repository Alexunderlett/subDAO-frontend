import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../api";
import { useSubstrate } from "../api/contracts";

import { useTranslation } from "react-i18next";

const Transfer = forwardRef((props, ref) => {
    const { state, dispatch } = useSubstrate();
    const { orgcontract } = state;

    const [address, setAddress] = useState('');

    let { t } = useTranslation();

    const handleChange = (e) => {
        const { value } = e.target;
        setAddress(value)
    }
    const handleConfirm = async () => {
        console.log(address)
        dispatch({ type: 'LOADINGTYPE', payload: t('transferOrg') });

        const setdeposittrs = async () => {
            await api.org.transferOwnership(orgcontract, address, (result) => {
                if (result) {
                    dispatch({ type: 'LOADINGTYPE', payload: null });
                    props.handleClose()
                    window.location.reload()
                }
            }).catch((error) => {
                dispatch({ type: 'MSGTYPE', payload: { msg: `Transfer Ownership: ${error.message}`, closable: true } });
                dispatch({ type: 'LOADINGTYPE', payload: null });
            });

        };
        setdeposittrs();
    }

    useImperativeHandle(ref, () => ({
        resultToVault: () => {
            return {
                address
            }
        },
        amountToNull: () => {
            setAddress('')
        }
    }));

    let { handleClose, showTips } = props;
    return (
        <div>
            <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title">
                    {/* <img src={sender} alt="" /> */}
                    <span>Transfer Ownership</span>
                </div>

                <div className="label">{t('fillAddress')}</div>
                <div className="inputBrdr">
                    <Input
                        placeholder={t('fillAddress')}
                        value={address}
                        name='address'
                        onChange={handleChange}
                    />
                </div>

                <Button type="primary" onClick={() => handleConfirm()} style={{ width: '100%', marginTop: '10rem' }}>{t('Request')}</Button>
            </Modal>
        </div>
    )
})
export default Transfer
