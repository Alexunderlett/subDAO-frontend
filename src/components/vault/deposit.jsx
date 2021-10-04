import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Input, Select } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";

import Loading from "../loading/Loading";
import sender from "../../images/send.png";
import { useTranslation } from "react-i18next";

const Deposit = forwardRef((props, ref) => {
    const { state, dispatch } = useSubstrate();
    const { vaultcontract, erc20contract, allAccounts, apiState } = state;

    const [selected, setSelected] = useState(null);
    const [amount, setAmount] = useState('');
    const [deposit, setdeposit] = useState(false);

    const [list, setList] = useState([]);


    let { t } = useTranslation();

    useEffect(() => {
        if (vaultcontract == null) return;
        const setTokenlist = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setList(data)
            });
        };
        setTokenlist();
    }, [vaultcontract]);

    useEffect(() => {

        if (!deposit) return;
        let obj = {
            amount, selected
        }

        const setdeposittrs = async () => {
            await api.vault.deposit(vaultcontract, obj, (result) => {
                if (result) {
                    dispatch({ type: 'LOADINGTYPE', payload: null });
                    props.handleClose()
                    props.setShow()
                    setdeposit(false)
                }
            }).catch((error) => {
                dispatch({ type: 'MSGTYPE', payload: { msg: `Deposit: ${error.message}` } });

                dispatch({ type: 'LOADINGTYPE', payload: null });
            });

        };
        setdeposittrs();

    }, [deposit]);

    const handleChange = (e) => {
        const { value } = e.target;
        setAmount(value)
    }
    const handleConfirm = async () => {
        dispatch({ type: 'LOADINGTYPE', payload: t('Createdeposit') });

        await api.erc20.approveOp(erc20contract, vaultcontract.address.toHuman(), amount, (result) => {
            setdeposit(true)
        }).catch((error) => {
            dispatch({ type: 'MSGTYPE', payload: { msg: `Deposit approve: ${error.message}` } });

            dispatch({ type: 'LOADINGTYPE', payload: null });
        })

    }
    const handleSelect = (value) => {
        setSelected(value)
    }


    useImperativeHandle(ref, () => ({
        resultToVault: () => {
            return {
                selected,
                amount
            }
        },
        amountToNull: () => {
            setAmount('')
        }
    }));

    let { handleClose, showTips } = props;
    return (
        <div>
            <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title">
                    {/* <img src={sender} alt="" /> */}
                    <span>{t('send')}</span>
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

                <div className="label">{t('fillAmount')}</div>
                <div className="inputBrdr">
                    <Input
                        placeholder={t('fillAmount')}
                        value={amount}
                        name='amount'
                        onChange={handleChange}
                    />
                </div>

                <Button type="primary" onClick={() => handleConfirm()} style={{ width: '100%', marginTop: '3.9rem' }}>Confirm</Button>
            </Modal>
        </div>
    )
})
export default Deposit
