import React, { useEffect, useState } from 'react';
import { useSubstrate } from '../../api/contracts';
import api from "../../api";
import Loading from "../loading/Loading";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';
import right from '../../img/right.png';

const Content = styled.div`
    .listBrdr{
        overflow-y: auto;
        dl{
            margin: 15px 0;
            height: 178px;
            padding: 30px;
            background: #FFFFFF;
            box-shadow: 0px 0px 20px 0px rgba(16, 22, 75, 0.1);
            border-radius: 4px 12px 12px 4px;
            border-left: 10px solid #7DDC8B;;
            position: relative;
            &.active{
                border-top: 1px solid #A6A6B7;
                border-right: 1px solid #A6A6B7;
                border-bottom: 1px solid #A6A6B7;
            }
            dt{
                height: 28px;
                font-size: 24px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #212758;
                line-height: 28px;
                
            }
            .ddBox{
                height: calc(100% - 30px);
                overflow-y: auto;
                dd{
                    height: 28px;
                    font-size: 18px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #212758;
                    line-height: 21px;
                    float: left;
                    margin: 10px 10px 0 0;
                }
            }
            .useBtn{
                position: absolute;
                top: 24px;
                right: 40px;
            }
        }
    }
`

const Info = styled.div`
    margin-bottom: 60px;

    .title{
        height: 40px;
        font-size: 34px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #10134E;
        line-height: 40px;
    }
    .detail{
        width: 600px;
        font-size: 18px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #A6A6B7;
        line-height: 22px;
    }
`

export default function SecondStep(props) {
    const { state, dispatch } = useSubstrate();
    const { maincontract, apiState } = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    let [selected, setselected] = useState([{ id: null }]);
    let [list, setlist] = useState([]);

    let { t } = useTranslation();

    const toThirdStep = () => {
        props.handlerSet(3);
        sessionStorage.setItem('secondStep', JSON.stringify(selected))
    }
    const toFirstStep = () => {
        props.handlerSet(1)
    }
    const handleSelect = (e) => {
        let id = e.currentTarget.id;
        let template = list.filter(item => item.id === id);
        setselected(template)
    }
    useEffect(() => {
        let selected = JSON.parse(sessionStorage.getItem('secondStep'));
        if (selected) {
            setselected(selected)
        }
    }, []);
    useEffect(() => {

        if (selected[0].id == null && list.length) {
            setselected([list[0]])
        }
    }, [selected, list]);
    useEffect(() => {

        let account = JSON.parse(sessionStorage.getItem('account'));

        if (apiState !== 'READY') return;
        dispatch({ type: 'LOAD_MAINCONTRACT' });

    }, [apiState]);
    useEffect(() => {
        if (maincontract == null) return;
        const setlisttemplate = async () => {
            setLoading(true);
            setTips(t('InitializeTemplate'));
            await api.main.listTemplates(maincontract).then(data => {
                if (!data) {
                    setTips(t('initializationFailed'));
                    setTimeout(() => {
                        props.history.push(`/`)
                    }, 2000)
                } else {
                    setlist(data);
                    setLoading(false);
                }
            })
        };
        setlisttemplate();
    }, [maincontract]);
    return (
        <Content className="content">
            <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips} />
            <Info>
                <div className="title">Template selection</div>
                <div className='detail'>{t('chooseTemplate')}</div>
            </Info>

            <div className="listBrdr">
                {
                    list.map(i => (
                        <dl key={i.id} id={i.id} className={selected[0].id === i.id ? 'active' : ''}>
                            <dt >{i.name}</dt>
                            <div className="ddBox">
                                {i.components.map(item => (
                                    <dd key={item[1]}>  {item[0]}</dd>
                                ))}
                            </div>
                            <Button className="useBtn" id={i.id} onClick={handleSelect}>
                                Use
                            </Button>
                        </dl>
                    ))
                }
            </div>

            <div className="line" style={{ textAlign: 'right', marginTop: '40px' }}>
                <Button className='leftBtn' style={{ marginRight: '30px' }} onClick={toFirstStep}>
                    <img src={right} alt="" style={{ width: '20px' }} />
                    {t('think')}
                </Button>
                <Button type="primary" onClick={toThirdStep}>
                    {t('Next')}
                    <img src={right} alt="" style={{ width: '20px' }} />
                </Button>
            </div>
        </Content>
    )
}
