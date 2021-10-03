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

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    const [selected, setSelected] = useState(null);
    const [amount, setAmount] = useState('');
    const [deposit, setdeposit] = useState(false);

    const [list, setList] = useState([]);
    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');


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
                    setLoading(false);
                    props.handleClose()
                    props.setShow()
                    setdeposit(false)
                }
            }).catch((error) => {
                seterrorShow(true)
                seterrorTips(`Deposit: ${error.message}`)
                setLoading(false);

            });

        };
        setdeposittrs();

    }, [deposit]);

    const handleChange = (e) => {
        const { value } = e.target;
        setAmount(value)
    }
    const handleConfirm = async () => {
        setLoading(true);
        setTips(t('Createdeposit'));
        await api.erc20.approveOp(erc20contract, vaultcontract.address.toHuman(), amount, (result) => {
            setdeposit(true)
        }).catch((error) => {
            seterrorShow(true)
            seterrorTips(`Deposit approve: ${error.message}`)
            setLoading(false);

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
            <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} />
            <Modal
                visible={errorShow}
                onCancel={() => seterrorShow(false)}
                footer={null}
            >
                <div className="title">{errorTips}</div>
            </Modal>
            <Modal visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title">
                    {/* <img src={sender} alt="" /> */}
                    <span>{t('send')}</span>
                </div>
                <div>

                    <div className="label">Select recipient</div>
                    <div className="inputBrdr">
                        <Select style={{ width: '100%' }} onChange={handleSelect} placeholder={t('SelectOption')}>
                            {
                                // list.map((i) =>
                                //     <Select.Option value={i} key={i}>{i}</Select.Option>
                                // )
                            }
                        </Select>
                    </div>

                    <div className="label">Select token</div>
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

                    <Button type="primary" onClick={() => handleConfirm()} style={{width: '100%', marginTop:'3.9rem'}}>Confirm</Button>
                </div>
            </Modal>
        </div>
    )
})
export default Deposit
