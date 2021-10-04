import React, { useEffect, useState } from 'react';
import { useSubstrate } from "../../api/contracts";
import api from "../../api";
import { Trans, Translation, useTranslation } from 'react-i18next';
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';
import right from '../../img/right.png';
import left from "../../img/left.png";

const Content = styled.div`
    .line{
        margin-top: 3rem;
        
        .title{
            height: 2.1rem;
            font-size: 1.8rem;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #10164B;
            line-height: 2.1rem;
            margin-bottom: 1rem;
        }
        .previous{
            color: #e34b8a;
            border:0.15rem solid #e34b8a;
                  width: 18rem;
        height: 5rem;
        padding: 0;
        }
            .nextBtn{
        width: 18rem;
        height: 5rem;
        border-radius: 0.8rem;
        font-family: PingFang-Regular;
        padding: 0;
        &:disabled{
        opacity: 0.3;
        }
    }
    }
`

const Tip = styled.div`
    text-align: center;
    padding: 5rem 2rem;
    font-size: 1.8rem;
    font-family: Roboto-Light, Roboto;
    font-weight: 300;
    color: #010643;
    line-height: 2.1rem;
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
        margin-bottom: 0.9rem;
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

export default function ThirdStep(props) {

    const { state, dispatch } = useSubstrate();
    const { maincontract, daoManagercontract, orgcontract } = state;

    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState(true);
    const [name, setname] = useState('');
    const [symbol, setsymbol] = useState('');
    const [supply, setsupply] = useState('');
    const [adminlist, setadminlist] = useState([
        {
            name: '',
            address: ''
        }
    ]);
    const [tokenlist, settokenlist] = useState([
        {
            address: '',
            token: ''
        }
    ]);
    const [start, setstart] = useState(false);

    const [instanceByTemplate, setinstanceByTemplate] = useState(false);

    const [logo, setlogo] = useState('');
    const [daoname, setdaoname] = useState('');
    const [desc, setdesc] = useState('');
    const [ercUrl, setercUrl] = useState('');

    const [baseC, setbaseC] = useState(null);

    const [contractlist, setcontractlist] = useState(null);
    const [transfer, settransfer] = useState(false);

    const [queryAddrs, setqueryAddrs] = useState(false);
    const [next, setnext] = useState(false);
    const [daoinit, setDaoinit] = useState(false);
    const [adminstate, setadminstate] = useState(false);
    const [errorShow, seterrorShow] = useState(false);
    const [errorTips, seterrorTips] = useState('');
    const [showDisable, setshowDisable] = useState(false);

    let { t } = useTranslation();


    const Submit = () => {

        let form = {
            token,
            name,
            symbol,
            supply,
            tokenlist
        }
        sessionStorage.setItem('forthStep', JSON.stringify(form));
        toDataFormat()
    }

    const toThirdStep = () => {
        props.handlerSet(2);
        let form = {
            admin,
            token,
            name,
            symbol,
            supply,
            adminlist,
            tokenlist
        }
        sessionStorage.setItem('forthStep', JSON.stringify(form))
    }

    const addtoken = () => {

        let newArray = [...tokenlist];
        newArray.push({
            address: '',
            token: ''

        });
        settokenlist(newArray)
    }

    const setAddress = (e, index) => {
        let newArray = [...tokenlist];
        const { name, value } = e.target;
        newArray[index][name] = value;
        settokenlist(newArray)
    }

    const removeToken = (selectItem, index) => {
        let newArray = [...tokenlist];
        newArray.splice(index, 1);
        settokenlist(newArray)

    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setname(e.target.value);
                break;
            case 'symbol':
                setsymbol(e.target.value);
                break;
            case 'supply':
                setsupply(e.target.value);
                break;
            default:
                break;
        }

    }

    const handleCheck = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'admin':
                setAdmin(!JSON.parse(value))
                break;
            case 'token':
                setToken(!JSON.parse(value))
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        let form = JSON.parse(sessionStorage.getItem('forthStep'));
        if (form) {
            // setAdmin(form.admin);
            setToken(form.token);
            setname(form.name);
            setsymbol(form.symbol);
            setsupply(form.supply);
            // setadminlist(form.adminlist);
            settokenlist(form.tokenlist);
        }

    }, []);

    useEffect(() => {
        setshowDisable(name.length && symbol.length&&supply.length)
    }, [name,symbol,supply]);

    const toDataFormat = () => {
        const firstStep = JSON.parse(sessionStorage.getItem('firstStep'));
        setdaoname(firstStep.name);
        setdesc(firstStep.description);

        const imgUrl = JSON.parse(sessionStorage.getItem('imgUrl'));
        setlogo(imgUrl);

        const secondStep = JSON.parse(sessionStorage.getItem('secondStep'));
        setercUrl(secondStep[0].dao_manager_code_hash);

        // const thirdStep = JSON.parse(sessionStorage.getItem('thirdStep'));
        // const {admin,adminlist} = thirdStep;

        setadminstate(false);
        // if(admin){
        //     setadminlist(adminlist);
        // }

        setstart(true)
    }




    useEffect(() => {
        if (!start) return;

        const secondStep = JSON.parse(sessionStorage.getItem('secondStep'));

        if (secondStep && secondStep[0] && secondStep[0].id) {
            const stepone = async () => {
                dispatch({ type: 'LOADINGTYPE', payload: t('InstanceByTemplate') });
                await api.main.instanceByTemplate(maincontract, secondStep[0].id, (result) => {
                    setinstanceByTemplate(result);
                    console.log("Step 1 =======instanceByTemplate", secondStep[0].id, parseInt(secondStep[0].id))
                }).catch((error) => {
                    seterrorShow(true)
                    seterrorTips(`instance By Template: ${error.message}`)
                    // setLoading(false);
                    setstart(false);
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)

                });
            };
            stepone();
        }
    }, [maincontract, start]);


    useEffect(() => {
        if (instanceByTemplate) {
            console.log("Step 2 =======listDaoInstancesByOwner")
            const steptwo = async () => {
                dispatch({ type: 'LOADINGTYPE', payload: t('ListDao')});
                await api.main.listDaoInstancesByOwner(maincontract).then(data => {
                    if (!data) return;
                    if (data.length) {
                        console.log("======listDaoInstancesByOwner", baseC, data)
                        setbaseC(data && data.length ? data[data.length - 1] : [])
                    }
                });
            };
            steptwo()
        }
    }, [instanceByTemplate]);

    useEffect(() => {
        if (baseC != null && instanceByTemplate) {
            console.log("Step 3 =======InitDAO")
            const stepthree = async () => {
                dispatch({ type: 'LOADINGTYPE', payload: t('InitDAO')});
                await api.dao.InitDAO(state, dispatch, baseC.dao_manager_addr, (data) => {
                    setDaoinit(true)
                });
            };
            stepthree();
        }
    }, [baseC]);
    useEffect(() => {
        if (daoinit && instanceByTemplate && baseC != null) {
            console.log("Step 4 =======Upload information", baseC.dao_manager_addr);
            let obj = {
                base_name: daoname,
                base_logo: logo,
                base_desc: desc,
                erc20_name: name,
                erc20_symbol: symbol,
                erc20_initial_supply: supply,
                erc20_decimals: 0,
                token,
                tokenlist,
                admin: adminstate,
                adminlist
            };
            if (daoManagercontract == null) return;
            const stepfour = async () => {
                dispatch({ type: 'LOADINGTYPE', payload: t('Uploadinformation')});
                await api.dao.setDAO(daoManagercontract, obj, (data) => {
                    // setqueryAddrs(true)
                    setnext(true);
                }).catch((error) => {
                    seterrorShow(true)
                    seterrorTips(`Upload information: ${error.message}`)
                    dispatch({ type: 'LOADINGTYPE', payload: null });
                    setstart(false);
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                });
            };
            stepfour();
        }
    }, [daoinit]);

    useEffect(() => {
        if (next) {
            sessionStorage.removeItem("step");
            sessionStorage.removeItem("secondStep");
            sessionStorage.removeItem("thirdStep");
            sessionStorage.removeItem("forthStep");
            sessionStorage.removeItem("firstStep");
            sessionStorage.removeItem("ImageUrl");

            setTimeout(() => {
                props.history.push(`home/about/${baseC.dao_manager_addr}`);
            }, 2000)
        }
    }, [next]);


    return <Content className="content">

        <Modal
            visible={errorShow}
            onCancel={() => seterrorShow(false)}
            footer={null}
        >
            <Tip>{errorTips}</Tip>
        </Modal>
        <Info>
            <div className="title">Template configuration</div>
            <div className='detail'>Token Configuration</div>
        </Info>

        <Translation>{t =>
            <div title={t('Token')} >
                {/*<div className='steptitle'>*/}
                {/*    <Form.Group controlId="formBasicCheckbox">*/}
                {/*        <Form.Check*/}
                {/*            type="checkbox"*/}
                {/*            label={t('Token')}*/}
                {/*            value={token}*/}
                {/*            checked={token}*/}
                {/*            name='token'*/}
                {/*            onChange={handleCheck}*/}
                {/*        />*/}
                {/*    </Form.Group>*/}
                {/*</div>*/}

                <div className="line">
                    <div className="title"><Trans>Fill Token Name</Trans></div>
                    <div className='inputBrdr'>
                        <Input
                            placeholder={t('FillToken')}
                            value={name}
                            checked={name}
                            name='name'
                            autoComplete="off"
                            onChange={handleInput}
                        /></div>
                </div>

                <div className="line">
                    <div className="title"><Trans>Fill the symbol</Trans></div>
                    <div className='inputBrdr'>
                        <Input
                            placeholder={t('FillSymbol')}
                            value={symbol}
                            checked={symbol}
                            name='symbol'
                            autoComplete="off"
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="line">
                    <div className="title"><Trans>Fill the total supply</Trans></div>
                    <div className='inputBrdr'>
                        <Input
                            placeholder={t('FillSupply')}
                            value={supply}
                            checked={supply}
                            name='supply'
                            autoComplete="off"
                            onChange={handleInput}
                        />
                    </div>
                </div>


                {/* {tokenlist.map((i, index) => (
                    <div key={index} className='norow'>
                        <div className="row">
                            <div className="col-7">
                                <div className="mb-3">
                                    <div className='inputBrdr'>
                                        <Input
                                            placeholder={t('FillAddress')}
                                            value={tokenlist[index].address}
                                            name='address'
                                            autoComplete="off"
                                            onChange={(event) => setAddress(event, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 flexBrdr">
                                <div className="mb-3">
                                    <div className='inputBrdr'>
                                        <Input
                                            placeholder={t('FillTokenAmount')}
                                            value={tokenlist[index].token}
                                            name='token'
                                            type='number'
                                            autoComplete="off"
                                            onChange={(event) => setAddress(event, index)}
                                        />
                                    </div>
                                </div>
                                {
                                    !!index &&
                                    <img src={remove} onClick={() => removeToken(i, index)} className="removerht" alt='' />
                                }
                            </div>
                        </div>
                    </div>
                ))
                }

                <button className="addToken" onClick={addtoken}><img src={add} className="addRht" alt='' /> {t('AddToken')}</button> */}
            </div>

        }
        </Translation>

        <div className="line" style={{ textAlign: 'right', marginTop: '4rem' }}>
            <Button className='previous' style={{ marginRight: '3rem' }} onClick={()=>toThirdStep()}>
                <img className="left" src={left} alt="" />
                <Trans>think</Trans>
            </Button>
            <Button type="primary" onClick={()=>Submit()} className="nextBtn"  disabled={!showDisable}>
                Submit
                <img src={right} alt="" />
            </Button>
        </div>

    </Content>;

}

