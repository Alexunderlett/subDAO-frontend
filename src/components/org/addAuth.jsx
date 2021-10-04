import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import api from "../../api";
import { useSubstrate } from "../../api/contracts";
import authWhite from '../../images/auth.png';
import { useTranslation } from "react-i18next";

export default function AddAuth(props) {

    const { state, dispatch } = useSubstrate();
    const { authcontract, allAccounts, apiState } = state;

    const [tips, setTips] = useState('');

    const [optionlist, setoptionlist] = useState([]);
    const [cancel, setcancel] = useState([]);
    const [selected, setselected] = useState([]);
    const [handleselected, sethandleselected] = useState(false);
    const [handlecancel, sethandlecancel] = useState(false);
    const [afterselected, setafterselected] = useState(false);
    const [aftercancel, setaftercancel] = useState(false);

    let { t } = useTranslation();

    useEffect(() => {
        setoptionlist([])
        if (!props.address || !props.authlist) return
        let arr = props.authlist;
        arr.map(i => {
            i.checked = false;
            return i;
        });

        const actionsByuser = async () => {
            let list = [];
            list = await api.auth.showActionsByUser(authcontract, props.address);
            if (list && list.length) {
                list.map(i => {
                    arr.map(item => {
                        if (item.action_id === i.action_id) {
                            item.checked = true
                        }
                    })
                })
            }
            setoptionlist(arr)
        };
        if (props.address) {
            actionsByuser()
        }
    }, [props.authlist, props.address]);

    useEffect(() => {

        if (aftercancel && afterselected) {
            dispatch({ type: 'LOADINGTYPE', payload: null });
            props.handleClose();
            setcancel([]);
            setselected([]);
            setoptionlist([]);
            setafterselected(false);
            setaftercancel(false);
            sethandleselected(false);
        }

    }, [afterselected, aftercancel]);
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    useEffect(() => {
        if (!handleselected) return;

        if (!selected.length) {
            setafterselected(true)
            return
        }

        const handlesel = async () => {
            let afterArr = [];
            let index = 0;

            for (let item of selected) {
                setTips(`${t('grantPermission')}...`);
                if (index) {
                    while (!afterArr[index - 1]) {
                        await delay(500);
                    }
                }
                let obj = {
                    address: props.address,
                    contract_name: item.contract_name,
                    function_name: item.function_name
                };

                await api.auth.grantPermission(authcontract, obj, (data) => {
                    if (!data) return;
                    afterArr.push(obj);
                    if (selected.length === afterArr.length) {
                        setafterselected(true)
                    }
                }).catch((error) => {
                    dispatch({ type: 'MSGTYPE', payload: { msg: `Grant Permission: ${error.message}` } });
                    dispatch({ type: 'LOADINGTYPE', payload: null });
                    props.handleClose();
                    setcancel([]);
                    setselected([]);
                    setoptionlist([]);
                    setafterselected(false);
                    setaftercancel(false);
                    sethandleselected(false);
                });

                index++;
            }
        };
        handlesel()

    }, [handleselected]);

    useEffect(() => {
        if (!afterselected) return;
        if (!cancel.length) {
            setaftercancel(true)
            return
        }
        const handlecal = async () => {
            let afterArr = [];
            let index = 0;
            for (let item of cancel) {
                setTips(`${t('RevokePermission')}...`);
                if (index) {
                    while (!afterArr[index - 1]) {
                        await delay(500);
                    }
                }
                let obj = {
                    address: props.address,
                    contract_name: item.contract_name,
                    function_name: item.function_name
                };

                await api.auth.revokePermission(authcontract, obj, (data) => {
                    if (!data) return;
                    afterArr.push(obj);
                    if (cancel.length === afterArr.length) {
                        setaftercancel(true)
                    }
                }).catch((error) => {
                    dispatch({ type: 'MSGTYPE', payload: { msg: `Revoke Permission: ${error.message}` } });
                    dispatch({ type: 'LOADINGTYPE', payload: null });
                    props.handleClose();
                    setcancel([]);
                    setselected([]);
                    setoptionlist([]);
                    setafterselected(false);
                    setaftercancel(false);
                    sethandleselected(false);
                });

                index++;
            }
        };
        handlecal()

    }, [afterselected]);

    const handleActive = (e) => {

        let index = e.currentTarget.value;
        optionlist.map(item => {
            if (item.action_id == index) {
                item.checked = !item.checked
            }
        })
    };
    const isChecked = (e, obj) => {
        let currentbool = e.target.checked;
        let arr = [...optionlist];
        arr.map(item => {
            if (item.action_id === obj.action_id) {
                item.checked = currentbool;
            }
            return item;
        });
        setoptionlist(arr);
        let selectArr = arr.filter(i => i.checked === true);
        setselected(selectArr);
        let cancelArr = arr.filter(i => i.checked === false);
        setcancel(cancelArr)
    }

    const confirmAuth = async () => {
        dispatch({ type: 'LOADINGTYPE', payload: tips });
        sethandleselected(true)
    }

    let { handleClose, showTips, authlist } = props;
    return <div>
        <Modal visible={showTips} onCancel={handleClose} footer={null}>
            <div className="title">
                {/* <img src={authWhite} alt="" /> */}
                <span >{t('UpdateAuthority')}</span>
            </div>
            <section>
                <ul className='orgSelect'>
                    <li className="row">
                        {!!optionlist.length && optionlist.map((i, index) => (

                            <div key={index} className='col-4'>
                                <div>
                                    {/*<div className={parseInt(active) === index?'radioOption radioActive':'radioOption'} id={`active_${index}`} onClick={handleActive}>*/}
                                    <div className={i.checked ? 'radioOption radioActive' : 'radioOption'} id={`active_${index}`} >
                                        <div className="form-group">
                                            <div className="form-check"  >
                                                <input name="radiobutton"
                                                    type="checkbox"
                                                    id={`radio_${index}`}
                                                    className="form-check-inputRadio"
                                                    value={i.action_id}
                                                    onChange={e => isChecked(e, i)}
                                                    checked={i.checked}
                                                />
                                                <label htmlFor={`radio_${index}`}>{i.contract_name}: {i.action_title}</label>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                        }
                        {
                            !optionlist.length && <div animation="border" variant="light" />
                        }
                    </li>
                    <li className='btmBtn'>
                        <div className='NextBrdr100'>
                            <Button type="primary" onClick={confirmAuth} style={{ width: '100%', marginTop: '3rem' }}>{t('Confirm')}</Button>
                        </div>
                    </li>
                </ul>
            </section>
        </Modal>
    </div>;
}
