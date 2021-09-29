import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Input } from 'antd';


import { useSubstrate } from '../../api/contracts';
import api from "../../api";

import Loading from "../loading/Loading";
import newVote from '../../images/newvoting.png';
import NewVoteTop from './newVoteTop';
import remove from "../../images/shutdown.png";
import add from "../../images/Add.png";
import { useTranslation } from "react-i18next";
import Datetime from 'react-datetime';
import moment from 'moment';

export default function NewVote(props) {


    const { state } = useSubstrate();
    const { votecontract, erc20address } = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    const [date, setdate] = useState('');
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [id, setId] = useState(null);
    const [supportInput, setsupportInput] = useState('');
    const [min, setmin] = useState('');
    const [type, settype] = useState(1);
    const [to_address, setto_address] = useState('');
    const [valueAmount, setvalueAmount] = useState('');

    const [optionlist, setoptionlist] = useState(['']);
    const [optchecked, setoptchecked] = useState(true);
    const [walletTips, setWalletTips] = useState(false);
    const [errorTips, seterrorTips] = useState('');
    const [errorShow, seterrorShow] = useState(false);
    const [resultDate, setresultDate] = useState('');

    let { t } = useTranslation();
    const datetimeRef = useRef();

    const handleClicktoVote = async () => {

        if (optchecked) {
            if (to_address && valueAmount) {
                setLoading(true);
                setTips(t('CreateNewVote'));
                let dataobj = {
                    title,
                    desc,
                    vote_time: date,
                    support_require_num: supportInput,
                    min_require_num: min,
                    choices: optionlist.join('|'),
                    erc20_address: erc20address,
                    to_address, valueAmount
                }

                await api.vote.newVoteTransfer(votecontract, dataobj, (result) => {
                    setLoading(false);
                    if (result) {
                        setdate('')
                        settitle('')
                        setdesc('')
                        setvalueAmount('')
                        setto_address('')
                        setsupportInput('')
                        setmin('')
                        setoptionlist(['', '', ''])
                        settype(1)
                        props.handleClose()
                        props.refresh()
                    }
                }).catch((error) => {
                    setWalletTips(true)
                    seterrorTips(`Create New Vote: ${error.message}`)
                    setLoading(false);
                });
            } else {
                setWalletTips(true)
                seterrorTips('Receiver\'s address & Amount is requierd')

            }
        } else {
            setLoading(true);
            setTips(t('CreateNewVote'));
            let dataobj = {
                title,
                desc,
                vote_time: date,
                support_require_num: supportInput,
                min_require_num: min,
                choices: optionlist.join('|')
            }
            await api.vote.newVote(votecontract, dataobj, (result) => {
                setLoading(false);
                if (result) {
                    setdate('')
                    settitle('')
                    setdesc('')
                    setvalueAmount('')
                    setto_address('')
                    setsupportInput('')
                    setmin('')
                    setoptionlist(['', '', ''])
                    settype(1)
                    props.handleClose()
                    props.refresh()
                }
            }).catch((error) => {
                setWalletTips(true)
                seterrorTips(`Create New Vote: ${error.message}`)
                setLoading(false);
            });
        }



    }

    const removeOption = (selectItem, index) => {
        let arr = optionlist;
        arr.splice(index, 1);
        setoptionlist([...arr])

    }

    const addOption = () => {
        let newArray = [...optionlist];
        newArray.push('');
        setoptionlist(newArray)
    }
    const setAddress = (e, index) => {

        let arr = optionlist;

        arr[index] = e.target.value;
        setoptionlist([...arr])
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const nextStep = (type) => {
        const nowTime = Date.parse(new Date());
        if (type === 2 && date <= 0) {
            setWalletTips(true)
            seterrorTips('Please fill the correct time')
        } else {
            settype(type)
        }

    }

    const yesterday = moment().subtract(1, 'day');
    const valid = function (current) {
        return current.isAfter(yesterday);
    };

    let inputProps = {
        placeholder: 'Please select end time',
        // disabled:true
    };

    const format = (dateTime) => {
        var time = new Date(dateTime);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
    }

    const handleChange = (value) => {
        const nowTime = Date.parse(new Date())
        const dateTime = Date.parse(value._d)
        setdate(dateTime - nowTime)
        setresultDate(format(dateTime))

    }
    const renderInput = (itemprops, openCalendar, closeCalendar) => {
        function clear() {
            itemprops.onChange({ target: { value: '' } });
        }
        itemprops.value = resultDate
        return (
            <div>
                <input {...itemprops} />
                <button className="selectedCal" onClick={openCalendar} />
                {
                    itemprops.value.length !== 0 &&
                    <div className='removeDate' onClick={clear}><i className='fa fa-close' /></div>
                }

            </div>
        );
    }
    const handleActive = (e) => {
        let values = JSON.parse(e.currentTarget.value)
        setoptchecked(!values)
    };
    const removeDate = () => {
        setdate('')
    };

    let { handleClose, showTips } = props;
    return (
        <div>
            <Loading showLoading={loading} setLoading={() => { setLoading(false) }} tips={tips} />
            <Modal
                visible={walletTips}
                onCancel={() => setWalletTips(false)}
                footer={null}
            >
                <div>{errorTips}</div>
            </Modal>

            <Modal backdrop={false} visible={showTips} onCancel={handleClose} footer={null}>
                <div className="title">
                    <img src={newVote} alt="" /><span>{t('Newvoting')}</span>
                </div>

                <div><NewVoteTop type={type} /></div>
                <section>
                    {
                        type === 1 && <div>
                            <ul>
                                <li>
                                    <div>
                                        <div className="mb-3">
                                            <div>{t('Votingtime')}</div>
                                            <div className='inputBrdr'>
                                                <Datetime
                                                    renderInput={renderInput}
                                                    inputProps={inputProps}
                                                    isValidDate={valid}
                                                    ref={datetimeRef}
                                                    onChange={handleChange}
                                                />

                                                {/*{*/}
                                                {/*    !date &&<Datetime*/}
                                                {/*        renderInput={renderInput}*/}
                                                {/*        inputProps={inputProps}*/}
                                                {/*        isValidDate={valid}*/}
                                                {/*        ref={datetimeRef}*/}
                                                {/*        onChange={handleChange}*/}
                                                {/*    />*/}
                                                {/*}*/}
                                                {/*{*/}
                                                {/*    date &&<div>*/}
                                                {/*        <FormControl*/}
                                                {/*            name='date'*/}
                                                {/*            value={resultDate}*/}
                                                {/*            autoComplete="off"*/}
                                                {/*            disabled*/}
                                                {/*        />*/}
                                                {/*        <img src={remove} className='removeInput' onClick={removeDate}/>*/}
                                                {/*    </div>*/}

                                                {/*}*/}

                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div className="mb-3">
                                            <div>{t('Title')}</div>
                                            <div className='inputBrdr'>
                                                <Input
                                                    placeholder={t('fillTitle')}
                                                    name='title'
                                                    value={title}
                                                    autoComplete="off"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className='NextBrdr'>
                                    <Button type="primary" onClick={() => nextStep(2)}>{t('Next')}</Button>
                                </li>
                            </ul>
                        </div>
                    }

                    {
                        type === 2 && <div>
                            <ul>
                                <li>
                                    <div>
                                        <div className="mb-3">
                                            <div>{t('MinimumSupport')}</div>
                                            <div className='inputBrdr'>
                                                <Input
                                                    placeholder={t('FillMinimumSupport')}
                                                    name='supportInput'
                                                    value={supportInput}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div className="mb-3">
                                            <div>{t('MinimumVoter')}</div>
                                            <div className='inputBrdr'>
                                                <Input
                                                    placeholder={t('FillMinimumVoter')}
                                                    name='min'
                                                    value={min}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className='NextBrdr button2'>
                                    <Button type="primary" onClick={() => nextStep(1)}>{t('Back')}</Button>
                                    <Button type="primary" onClick={() => nextStep(3)}>{t('Next')}</Button>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        type === 3 && <div>
                            <ul>
                                <li>
                                    <div>
                                        <div>
                                            <div>{t('Description')}</div>
                                            <div className='inputBrdr'>
                                                <Input as="textarea"
                                                    placeholder={t('FillDescription')}
                                                    name='desc'
                                                    value={desc}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className='NextBrdr button2'>
                                    <Button type="primary" onClick={() => nextStep(2)}>{t('Back')}</Button>
                                    <Button type="primary" onClick={() => nextStep(4)}>{t('Next')}</Button>
                                </li>
                            </ul>
                        </div>
                    }

                    {
                        type === 4 &&
                        <div>
                            <ul>

                                <li>
                                    {optionlist.map((i, index) => (

                                        <div key={index}>
                                            <div className="row">
                                                <div className="col-12 flexBrdr">
                                                    <div className="mb-3">
                                                        <div className='inputBrdr'>
                                                            <Input
                                                                placeholder={t('FillOption')}
                                                                value={optionlist[index]}
                                                                onChange={(event) => setAddress(event, index)}
                                                            />
                                                        </div>
                                                    </div>

                                                    {
                                                        !!index && <img src={remove} className="removerht" alt=''
                                                            onClick={removeOption.bind(this, i, index)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }

                                    <div className='NextBrdr NextBrdrAdd'>
                                        <Button onClick={addOption}><img src={add} className="addRht" alt='' /> {t('AddOption')}</Button>

                                    </div>

                                </li>

                                <li className='NextBrdr button2'>
                                    <Button type="primary" onClick={() => nextStep(3)}>{t('Back')}</Button>
                                    <Button type="primary" onClick={() => nextStep(5)}>{t('Next')}</Button>

                                </li>
                            </ul>
                        </div>
                    }
                    {
                        type === 5 &&
                        <ul>
                            <li>
                                <div className='orgSelect'>
                                    <div className={optchecked ? 'radioOption radioActive' : 'radioOption'} id={`active`} >
                                        <div className="form-group">
                                            <div className="form-check"  >
                                                <input name="radiobutton"
                                                    type="checkbox"
                                                    id={`radio`}
                                                    className="form-check-inputRadio"
                                                    value={optchecked}
                                                    onChange={(e) => handleActive(e)}
                                                    checked={optchecked}
                                                />
                                                <label htmlFor={`radio`}>add transfer</label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    optchecked && <div>
                                        <div className="mb-3">
                                            <div>{t('fillAddress')}</div>
                                            <div className='inputBrdr'>
                                                <Input
                                                    placeholder={t('fillAddress')}
                                                    name='to_address'
                                                    value={to_address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }

                            </li>
                            {
                                optchecked && <li>
                                    <div>
                                        <div className="mb-3">
                                            <div>{t('fillAmount')}</div>
                                            <div className='inputBrdr'>
                                                <Input
                                                    placeholder={t('fillAmount')}
                                                    name='valueAmount'
                                                    value={valueAmount}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            }


                            <li className='NextBrdr button2'>
                                <Button type="primary" onClick={() => nextStep(4)}>{t('Back')}</Button>
                                <Button type="primary" onClick={handleClicktoVote}>{t('Create')}</Button>
                            </li>
                        </ul>
                    }
                </section>
            </Modal>
        </div>
    )
}


