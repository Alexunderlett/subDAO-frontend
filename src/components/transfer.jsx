import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Input } from 'antd';

import api from "../api";
import { useSubstrate } from "../api/contracts";

import Loading from "./loading/Loading";
import sender from "./../images/send.png";
import { useTranslation } from "react-i18next";

const Transfer = forwardRef((props, ref) => {
    const { state } = useSubstrate();
    const { orgcontract } = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    const [address, setAddress] = useState('');

    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');
    let { t } = useTranslation();

    const handleChange = (e) => {
        const { value } = e.target;
        setAddress(value)
    }
    const handleConfirm = async () => {
        console.log(address)
        setLoading(true);
        setTips(t('transferOrg'));

        const setdeposittrs = async () => {
            await api.org.transferOwnership(orgcontract, address, (result) => {
                if (result) {
                    setLoading(false);
                    props.handleClose()
                    window.location.reload()
                }
            }).catch((error) => {
                seterrorShow(true)
                seterrorTips(`Transfer Ownership: ${error.message}`)
                setLoading(false);
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
            <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} />
            <Modal
                visible={errorShow}
                onCancel={() => seterrorShow(false)}
                footer={null}
            >
                <div className="title">{errorTips}</div>
            </Modal>
            <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title"><img src={sender} alt="" /><span>{t('transferBtn')}</span></div>

                <section>
                    <ul className="withdraw">

                        <li>
                            <div className="mb-3">
                                <div>{t('fillAddress')}</div>
                                <div className="inputBrdr">
                                    <Input
                                        placeholder={t('fillAddress')}
                                        value={address}
                                        name='address'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className='NextBrdr'>
                            <Button onClick={() => handleConfirm()}>{t('Request')}</Button>
                        </li>
                    </ul>
                </section>
            </Modal>
        </div>
    )
})
export default Transfer
