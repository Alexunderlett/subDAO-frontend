import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Input, Select } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";

import Loading from "../loading/Loading";
import sender from "../../images/send.png";
import { useTranslation } from "react-i18next";

const Withdraw = forwardRef((props, ref) => {
    const { state, dispatch } = useSubstrate();
    const { vaultcontract } = state;

    const [selected, setSelected] = useState(null);
    const [address, setaddress] = useState('');
    const [amount, setamount] = useState('');

    const [list, setList] = useState([]);

    let { t } = useTranslation();

    useEffect(() => {
        const settokenlist = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setList(data)
            });
        };
        settokenlist();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const handleConfirm = async () => {

        let obj = {
            address, amount, selected
        }

        dispatch({ type: 'LOADINGTYPE', payload: t('Createwithdraw') });

        await api.vault.withdraw(vaultcontract, obj, (result) => {
            dispatch({ type: 'LOADINGTYPE', payload: null });
            props.handleClose()
            props.setShow()
        });
    }
    const handleSelect = (e) => {
        setSelected(e.target.value)
    }
    useImperativeHandle(ref, () => ({
        resultToVault: (newVal) => {
            return {
                address,
                amount
            }
        },
        amountToNull: () => {
            setamount('')
            setaddress('')
        }
    }));

    let { handleClose, showTips } = props;
    return (
        <div>
            <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title">
                    {/* <img src={sender} alt="" /> */}
                    <span>{t('withdraw')}</span>
                </div>

                <div className="label">{t('SelectOption')}</div>
                <div className="inputBrdr">
                    <Select style={{ width: '100%' }} onChange={handleSelect} placeholder={t('SelectOption')}>
                        {
                            list.map((i) =>
                                <Select.Option value={i} key={i}>{i}</Select.Option>
                            )
                        }
                    </Select>
                </div>

                <div className="label">{t('fillAddress')}</div>
                <Input
                    placeholder={t('fillAddress')}
                    value={address}
                    name='address'
                    onChange={handleChange}
                />

                <div className="label">{t('fillAmount')}</div>
                <Input
                    placeholder={t('fillAmount')}
                    value={amount}
                    name='amount'
                    onChange={handleChange}
                />

                <Button type="primary" onClick={() => handleConfirm()} style={{ width: '100%', marginTop: '3.9rem' }}>{t('Request')}</Button>
            </Modal>
        </div>
    )

})
export default Withdraw;
