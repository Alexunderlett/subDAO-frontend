import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Input, DatePicker, Checkbox } from 'antd';
import { useSubstrate } from '../../api/contracts';
import api from "../../api";
import left from '../../img/left.png';
import right from '../../img/right.png';

import newVote from '../../img/newvoting.png';
import NewVoteTop from './newVoteTop';
import remove from "../../img/shutdown.png";
import add from "../../img/Add.png";
import { useTranslation } from "react-i18next";
import Datetime from 'react-datetime';
import moment from 'moment';
import styled from 'styled-components';

const AddButton = styled(Button)`
    width: 100%;
    height: 4.4rem;
    background: #F1F3FA;
    box-shadow: 0rem 0rem 0.4rem 0rem rgba(16, 22, 75, 0.1);
    border-radius: 0.8rem;
    font-size: 1.6rem;
    font-family: Roboto-Light, Roboto;
    font-weight: 300;
    color: #10164B !important;
    line-height: 1.9rem;
`

const Vote = styled.div`
    width: 50.9rem !Important;
    .title{
        width: 50.9rem;
        height: 4rem;
        font-size: 3.4rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #10134E;
        line-height: 4rem;
        margin-bottom: 3.9rem;
    }
    .line{
        margin-bottom: 2.6rem;

        .label{
            height: 2.1rem;
            font-size: 1.8rem;
            font-family: Roboto-Light, Roboto;
            font-weight: 300;
            color: #10164B;
            line-height: 2.1rem;
            margin-bottom: 1rem;
            span{
                height: 1.4rem;
                font-size: 1.2rem;
                font-family: Roboto-Light, Roboto;
                font-weight: 300;
                color: #A6A6B7;
                line-height: 1.4rem;
                margin-left: 1rem;
            }
        }
        .addLine{
            display: flex;
            margin-bottom: 2rem;
            .removerht{
                margin-left: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 4.4rem;
                height: 4.4rem;
                background: rgba(230, 233, 242, 0.4);
                box-shadow: 0rem 0rem 0.4rem 0rem rgba(16, 22, 75, 0.1);
                border-radius: 0.8rem;
                img{
                    width: 3.2rem;
                    height: 3.2rem;
                }
            }
            .showOption{
                width: 100%;
                height: 4.4rem;
                line-height: 4.4rem;
                color: #A6A6B7;
                box-shadow: 0rem 0rem 0.4rem 0rem rgba(16, 22, 75, 0.1);
                border-radius: 0.8rem;
                padding-left: 2rem;
            }
        }
    }
    .btnLine{
        margin-top: 6rem;
        display: flex;
        justify-content: space-between;
        .previous{
            color: #e34b8a;
            border-color: #e34b8a;
        }
    }
    .myDatePicker{
        border: 0;
        height: 4.4rem;
        box-shadow: 0rem 0rem 0.4rem 0rem rgba(16, 22, 75, 0.1);
        border-radius: 0.8rem;
        input{
            height: 100%;
            box-shadow: none;
        }
        &.ant-picker-focused{
            box-shadow: 0 0 0 2px rgb(213 36 115 / 20%) !important;
        }
    }

    input{
        border: 0;
        height: 4.4rem;
        background: #FFFFFF;
        box-shadow: 0rem 0rem 0.4rem 0rem rgba(16, 22, 75, 0.1);
        border-radius: 0.8rem;
    }
    textarea{
        border: 0;
        box-shadow: 0rem 0rem 0.4rem 0rem rgba(16, 22, 75, 0.1);
        border-radius: 0.8rem;
    }
`

export default function NewVote(props) {
    const { search } = props.location
    const searchParams = new URLSearchParams(search)
    const pURL = searchParams.get('url')

    const { state, dispatch } = useSubstrate();
    const { votecontract, erc20address } = state;


    const [date, setdate] = useState('');
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [id, setId] = useState(null);
    const [supportInput, setsupportInput] = useState('');
    const [min, setmin] = useState('');
    const [type, settype] = useState(1);
    const [to_address, setto_address] = useState('');
    const [valueAmount, setvalueAmount] = useState('');

    const [optionlist, setoptionlist] = useState(['Agree', 'Disagree']);
    const [optchecked, setoptchecked] = useState(false);
    const [walletTips, setWalletTips] = useState(false);
    const [resultDate, setresultDate] = useState('');
    const [mydate, setmydate] = useState(null);

    const { TextArea } = Input;

    let { t } = useTranslation();
    const datetimeRef = useRef();

    const handleClicktoVote = async () => {

        if (optchecked) {
            if (to_address && valueAmount) {
                dispatch({ type: 'LOADINGTYPE', payload: t('CreateNewVote') });

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
                    dispatch({ type: 'LOADINGTYPE', payload: null });

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
                        props.history.push(pURL)
                    }
                }).catch((error) => {
                    setWalletTips(true)
                    dispatch({ type: 'MSGTYPE', payload: { msg: `Create New Vote: ${error.message}` } });

                    dispatch({ type: 'LOADINGTYPE', payload: null });
                });
            } else {
                setWalletTips(true)
                dispatch({ type: 'MSGTYPE', payload: { msg: 'Receiver\'s address & Amount is requierd' } });
            }
        } else {
            dispatch({ type: 'LOADINGTYPE', payload: t('CreateNewVote') });

            let dataobj = {
                title,
                desc,
                vote_time: date,
                support_require_num: supportInput,
                min_require_num: min,
                choices: optionlist.join('|')
            }
            await api.vote.newVote(votecontract, dataobj, (result) => {
                dispatch({ type: 'LOADINGTYPE', payload: null });

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
                    props.history.push(pURL)
                }
            }).catch((error) => {
                setWalletTips(true)
                dispatch({ type: 'MSGTYPE', payload: { msg: `Create New Vote: ${error.message}` } });

                dispatch({ type: 'LOADINGTYPE', payload: null });
            });
        }
    }

    const disabledDate = (current) => {
        return current && current <= moment().startOf('day');
    }

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    const disabledDateTime = (dates) => {
        let hours = moment().hours(); //0~23
        let minutes = moment().minutes(); //0~59
        let seconds = moment().seconds(); //0~59
        if (dates && moment(dates[1]).date() === moment().date()) {
            return {
                disabledHours: () => range(0, hours),
                disabledMinutes: () => range(0, minutes),
                disabledSeconds: () => range(0, seconds + 1),
            };
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
            dispatch({ type: 'MSGTYPE', payload: { msg: 'Please fill the correct time' } });
        } else {
            settype(type)
        }

    }

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
        setmydate(value)
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
        let values = JSON.parse(e.target.checked)
        setoptchecked(values)
    };
    const removeDate = () => {
        setdate('')
    };

    let { handleClose, showTips } = props;
    return (
        <Vote className="container">
            <div className="title">
                {/* <img src={newVote} alt="" /> */}
                <span>{t('Newvoting')}</span>
            </div>

            <NewVoteTop type={type} style={{ marginBottom: '10rem' }} />

            {
                type === 1 && <div>
                    <div className="line">
                        <div className="label">
                            Voting Time
                            <span>Select how long the vote durate by seconds</span>
                        </div>
                        <DatePicker
                            className="myDatePicker"
                            placeholder='Please select end time'
                            defaultValue={mydate}
                            style={{ width: '100%' }}
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            allowClear={false}
                            onChange={handleChange}
                            showTime={true}
                            showNow={false} />
                    </div>
                    <div>
                        <div className="label">{t('Title')}</div>
                        <Input
                            placeholder={t('fillTitle')}
                            name='title'
                            value={title}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='btnLine'>
                        <Button className="previous" onClick={() => { props.history.push(pURL) }}>
                            <img className="left" src={left} alt="" />
                            Previous
                        </Button>
                        <Button type="primary" disabled={!date} onClick={() => nextStep(2)}>
                            {t('Next')}
                            <img src={right} alt="" />
                        </Button>
                    </div>
                </div>
            }

            {
                type === 2 && <div>
                    <div className="line">
                        <div className="label">{t('MinimumSupport')}</div>
                        <Input
                            placeholder={t('FillMinimumSupport')}
                            name='supportInput'
                            value={supportInput}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="line">
                        <div className="label">{t('MinimumVoter')}</div>
                        <Input
                            placeholder={t('FillMinimumVoter')}
                            name='min'
                            value={min}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='btnLine'>
                        <Button className="previous" onClick={() => nextStep(1)}>
                            <img className="left" src={left} alt="" />
                            Previous
                        </Button>
                        <Button type="primary" onClick={() => nextStep(3)}>
                            {t('Next')}
                            <img src={right} alt="" />
                        </Button>
                    </div>
                </div>
            }
            {
                type === 3 && <div>

                    <div className="line">
                        <div className="label">{t('Description')}</div>
                        <TextArea
                            rows={4}
                            placeholder={t('FillDescription')}
                            name='desc'
                            value={desc}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='btnLine'>
                        <Button className="previous" onClick={() => nextStep(2)}>
                            <img className="left" src={left} alt="" />
                            Previous
                        </Button>
                        <Button type="primary" onClick={() => nextStep(4)}>
                            {t('Next')}
                            <img src={right} alt="" />
                        </Button>
                    </div>
                </div>
            }

            {
                type === 4 &&
                <div>
                    <div className="line">
                        <div className="label">Fill in options</div>

                        {optionlist.map((i, index) => (
                            <div className="addLine" key={index}>
                                <div className="showOption">{i}</div>
                                {/* <Input
                                    placeholder={t('FillOption')}
                                    value={optionlist[index]}
                                    onChange={(event) => setAddress(event, index)}
                                /> */}
                                {/* {
                                    !!index && <div className="removerht" onClick={removeOption.bind(this, i, index)} >
                                        <img src={remove} alt='' />
                                    </div>
                                } */}
                            </div>
                        ))
                        }
                    </div>

                    {/* <AddButton onClick={addOption}> */}
                    {/* <img src={add} className="addRht" alt='' /> */}
                    {/* + {t('AddOption')} */}
                    {/* </AddButton> */}

                    <div className='btnLine'>
                        <Button className="previous" onClick={() => nextStep(3)}>
                            <img className="left" src={left} alt="" />
                            Previous
                        </Button>
                        <Button type="primary" onClick={() => nextStep(5)}>
                            {t('Next')}
                            <img src={right} alt="" />
                        </Button>
                    </div>
                </div>
            }
            {
                type === 5 &&
                <div>
                    <div className="line">
                        <Checkbox onChange={(e) => handleActive(e)}>add transfer</Checkbox>
                    </div>
                    {
                        optchecked && <div className="line">
                            <div className="label">{t('fillAddress')}</div>
                            <Input
                                placeholder={t('fillAddress')}
                                name='to_address'
                                value={to_address}
                                onChange={handleInputChange}
                            />
                        </div>
                    }

                    {
                        optchecked && <div className="line">
                            <div className="label">{t('fillAmount')}</div>
                            <Input
                                placeholder={t('fillAmount')}
                                name='valueAmount'
                                value={valueAmount}
                                onChange={handleInputChange}
                            />
                        </div>
                    }

                    <div className='btnLine'>
                        <Button className="previous" onClick={() => nextStep(4)}>
                            <img className="left" src={left} alt="" />
                            Previous
                        </Button>
                        <Button type="primary" onClick={handleClicktoVote}>
                            {t('Create')}
                            <img src={right} alt="" />
                        </Button>
                    </div>
                </div>
            }
        </Vote >
    )
}


