import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Input, Select} from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";

import Loading from "../loading/Loading";
import sender from "../../images/send.png";
import { useTranslation } from "react-i18next";

const Withdraw = forwardRef((props, ref) => {
    const { state } = useSubstrate();
    const { vaultcontract } = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');


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
        setLoading(true);
        setTips(t('Createwithdraw'));
        await api.vault.withdraw(vaultcontract, obj, (result) => {
            setLoading(false);
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
            <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} />
            <Modal visible={showTips} onCancel={handleClose} footer={null}>

                <div className="title"><img src={sender} alt="" /><span>{t('withdraw')}</span></div>

                <section>
                    <ul className="withdraw">
                        <li>
                            <div>{t('SelectOption')}</div>
                            <div className="inputBrdr">
                                <Select style={{ width: '100%' }} onChange={handleSelect}>
                                    <Select.Option key='noselect'>{t('SelectOption')}</Select.Option>
                                    {
                                        list.map((i) =>
                                            <Select.Option  value={i} key={i}>{i}</Select.Option>
                                        )
                                    }
                                </Select>
                            </div>
                        </li>
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

                            <div className="mb-3">
                                <div>{t('fillAmount')}</div>
                                <div className="inputBrdr">
                                    <Input
                                        placeholder={t('fillAmount')}
                                        value={amount}
                                        name='amount'
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
export default Withdraw;
