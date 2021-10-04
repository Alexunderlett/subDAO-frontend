import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../api";
import { useSubstrate } from "../api/contracts";

import Loading from "./loading/Loading";
import sender from "./../images/send.png";
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
                dispatch({ type: 'MSGTYPE', payload: `Transfer Ownership: ${error.message}` });
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
                    <span>{t('transferBtn')}</span>
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

                <Button onClick={() => handleConfirm()} style={{ width: '100%' }}>{t('Request')}</Button>
            </Modal>
        </div>
    )
})
export default Transfer
