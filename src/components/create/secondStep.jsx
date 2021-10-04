import React, { useEffect, useState } from 'react';
import { useSubstrate } from '../../api/contracts';
import api from "../../api";
import Loading from "../loading/Loading";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';
import left from '../../img/left.png';
import right from '../../img/right.png';

const Content = styled.div`
    .listBrdr{
        overflow-y: auto;
        dl{
            margin: 1.5rem 0;
            height: 17.8rem;
            padding: 3rem;
            background: #FFFFFF;
            box-shadow: 0 0 2rem 0 rgba(16, 22, 75, 0.1);
            border-radius: 0.4rem 1.2rem 1.2rem 0.4rem;
            border-left: 1rem solid #7DDC8B;;
            position: relative;
            &.active{
                border-top: 1px solid #A6A6B7;
                border-right: 1px solid #A6A6B7;
                border-bottom: 1px solid #A6A6B7;
            }
            dt{
                height: 2.8rem;
                font-size: 2.4rem;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #212758;
                line-height: 2.8rem;
                
            }
            .ddBox{
                height: calc(100% - 3rem);
                overflow-y: auto;
                dd{
                    height: 2.8rem;
                    font-size: 1.8rem;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #212758;
                    line-height: 2.1rem;
                    float: left;
                    margin: 1rem 1rem 0 0;
                }
            }
            .useBtn{
                position: absolute;
                top: 2.4rem;
                right: 4rem;
            }
        }
    }
    .line{
        .previous{
            color: #e34b8a;
            border-color: #e34b8a;
        }
    }
`

const Info = styled.div`
    margin-bottom: 6rem;

    .title{
        height: 4rem;
        font-size: 3.4rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #10134E;
        line-height: 4rem;
    }
    .detail{
        width: 60rem;
        font-size: 1.8rem;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #A6A6B7;
        line-height: 2.2rem;
    }
`

export default function SecondStep(props) {
    const { state, dispatch } = useSubstrate();
    const { maincontract, apiState } = state;

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
            dispatch({ type: 'LOADINGTYPE', payload: t('InitializeTemplate') });

            await api.main.listTemplates(maincontract).then(data => {
                if (!data) {
                    dispatch({ type: 'LOADINGTYPE', payload: t('initializationFailed') });

                    setTimeout(() => {
                        props.history.push(`/`)
                    }, 2000)
                } else {
                    setlist(data);

                    dispatch({ type: 'LOADINGTYPE', payload: null });
                }
            })
        };
        setlisttemplate();
    }, [maincontract]);
    return (
        <Content className="content">
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

            <div className="line" style={{ textAlign: 'right', marginTop: '4rem' }}>
                <Button className="previous" style={{ marginRight: '3rem' }} onClick={toFirstStep}>
                    <img className="left" src={left} alt="" />
                    {t('think')}
                </Button>
                <Button type="primary" onClick={toThirdStep}>
                    {t('Next')}
                    <img src={right} alt="" />
                </Button>
            </div>
        </Content>
    )
}
