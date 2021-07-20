import React, { useEffect, useState} from 'react';
import {Button, Form, FormControl, InputGroup, Tabs, Tab, Modal} from "react-bootstrap";
import remove from '../../images/shutdown.png';
import add from '../../images/Add.png';
import {useSubstrate} from "../../api/contracts";
import api from "../../api";
import Loading from "../loading/Loading";
import {Trans, Translation, useTranslation} from 'react-i18next';

export default function ThirdStep(props){

    const {state, dispatch} = useSubstrate();
    const {maincontract, daoManagercontract,orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [admin,setAdmin]= useState(false);
    const [token,setToken]= useState(true);
    const [name,setname]= useState('');
    const [symbol,setsymbol]= useState('');
    const [supply,setsupply]= useState('');
    const [adminlist,setadminlist]= useState([
        {
            name: '',
            address: ''
        }
    ]);
    const [tokenlist,settokenlist]= useState([
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

    const [contractlist,setcontractlist]= useState(null);
    const [transfer,settransfer]= useState(false);

    const [queryAddrs,setqueryAddrs]= useState(false);
    const [next,setnext]= useState(false);
    const [daoinit,setDaoinit]= useState(false);
    const [adminstate,setadminstate]= useState(false);
    const [errorShow,seterrorShow]= useState(false);
    const [errorTips,seterrorTips]= useState('');

    let { t } = useTranslation();


    const Submit = () => {
        let form = {
            token,
            name,
            symbol,
            supply,
            tokenlist
        }
        sessionStorage.setItem('forthStep',JSON.stringify(form))
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
        sessionStorage.setItem('forthStep',JSON.stringify(form))
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
        const {name, value} = e.target;
        newArray[index][name] = value;
        settokenlist(newArray)
    }

    const removeToken = (selectItem, index) => {
        let newArray = [...tokenlist];
        newArray.splice(index, 1);
        settokenlist(newArray)

    }

    const handleInput = (e) => {
        const {name, value} = e.target;

        switch(name){
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
        const {name, value} = e.target;
        switch(name){
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

    useEffect( () => {
        let form = JSON.parse(sessionStorage.getItem('forthStep'));
        if(form){
            // setAdmin(form.admin);
            setToken(form.token);
            setname(form.name);
            setsymbol(form.symbol);
            setsupply(form.supply);
            // setadminlist(form.adminlist);
            settokenlist(form.tokenlist);
        }

    }, []);

    const toDataFormat = () =>{
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




    useEffect( () => {
        if(!start) return;

        const secondStep = JSON.parse(sessionStorage.getItem('secondStep'));

        if(secondStep && secondStep[0] && secondStep[0].id){
            const stepone = async () => {
                setLoading(true);
                setTips(t('InstanceByTemplate'));
                await api.main.instanceByTemplate(maincontract, secondStep[0].id,(result) => {
                    setinstanceByTemplate(result);
                    console.log("Step 1 =======instanceByTemplate",secondStep[0].id, parseInt(secondStep[0].id))
                }).catch((error) => {
                    seterrorShow(true)
                    seterrorTips(`instance By Template: ${error.message}`)
                    setLoading(false);
                    setstart(false);
                    setTimeout(()=>{
                        window.location.reload()
                    },2000)

                });
            };
            stepone();
        }
    }, [maincontract,start]);


    useEffect( () => {
        if (instanceByTemplate){
            console.log("Step 2 =======listDaoInstancesByOwner")
            const steptwo = async () => {
                setTips(t('ListDao'));
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

    useEffect( () => {
        if (baseC != null && instanceByTemplate) {
            console.log("Step 3 =======InitDAO")
            const stepthree = async () => {
                setTips(t('InitDAO'));
                await api.dao.InitDAO(state, dispatch, baseC.dao_manager_addr, (data) => {
                    setDaoinit(true)
                });
            };
            stepthree();
        }
    }, [baseC]);
    useEffect( () => {
        if(daoinit && instanceByTemplate && baseC!=null){
            console.log("Step 4 =======Upload information",baseC.dao_manager_addr);
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
                admin:adminstate,
                adminlist
            };
            if (daoManagercontract == null) return;
            const stepfour = async () => {
                setTips(t('Uploadinformation'));
                await api.dao.setDAO(daoManagercontract, obj, (data) => {
                    // setqueryAddrs(true)
                    setnext(true);
                }).catch((error) => {
                    seterrorShow(true)
                    seterrorTips(`Upload information: ${error.message}`)
                    setLoading(false);
                    setstart(false);
                    setTimeout(()=>{
                      window.location.reload()
                    },2000)
                });
            };
            stepfour();
        }
    }, [daoinit]);

    useEffect( () => {
        if(next){
            sessionStorage.removeItem("step");
            sessionStorage.removeItem("secondStep");
            sessionStorage.removeItem("thirdStep");
            sessionStorage.removeItem("forthStep");
            sessionStorage.removeItem("firstStep");
            sessionStorage.removeItem("ImageUrl");

            setTimeout(()=>{
                props.history.push(`home/about/${baseC.dao_manager_addr}`);
            },2000)
        }
    }, [next]);


    return <div>
        <Loading showLoading={loading} tips={tips}/>
        <Modal
            show={errorShow}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => seterrorShow(false)}
            className='newVoteBrdr homebtm'
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <h4>{errorTips}</h4>
            </Modal.Body>
        </Modal>
        <Translation>{t =>
                <div  title={t('Token')} >
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
                    <div>
                        <InputGroup className="mb-3">
                            <div className='inputBrdr'>
                                <FormControl
                                    placeholder={t('FillToken')}
                                    value={name}
                                    checked={name}
                                    name='name'
                                    autoComplete="off"
                                    onChange={handleInput}
                                /></div>
                        </InputGroup>
                    </div>
                    <div>
                        <InputGroup className="mb-3">
                            <div className='inputBrdr'>
                                <FormControl
                                    placeholder={t('FillSymbol')}
                                    value={symbol}
                                    checked={symbol}
                                    name='symbol'
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </div>
                        </InputGroup>
                    </div>
                    <div>
                        <InputGroup className="mb-3">
                            <div className='inputBrdr'>
                                <FormControl
                                    placeholder={t('FillSupply')}
                                    value={supply}
                                    checked={supply}
                                    name='supply'
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </div>
                        </InputGroup>
                    </div>
                    {tokenlist.map((i, index) => (

                        <div key={index} className='norow'>
                            <div className="row">
                                <div className="col-7">
                                    <InputGroup className="mb-3">
                                        <div className='inputBrdr'>
                                            <FormControl
                                                placeholder={t('FillAddress')}
                                                value={tokenlist[index].address}
                                                name='address'
                                                autoComplete="off"
                                                onChange={(event) => setAddress(event, index)}
                                            />
                                        </div>
                                    </InputGroup>
                                </div>
                                <div className="col-5 flexBrdr">
                                    <InputGroup className="mb-3">
                                        <div className='inputBrdr'>
                                            <FormControl
                                                placeholder={t('FillTokenAmount')}
                                                value={tokenlist[index].token}
                                                name='token'
                                                type='number'
                                                autoComplete="off"
                                                onChange={(event) => setAddress(event, index)}
                                            />
                                        </div>
                                    </InputGroup>
                                    {
                                        !!index &&
                                        <img src={remove} onClick={()=>removeToken(i, index)} className="removerht" alt=''/>

                                    }
                                </div>

                            </div>
                        </div>
                    ))
                    }

                    <div>
                        <button className="addToken" onClick={addtoken}><img src={add} className="addRht" alt=''/> {t('AddToken')}</button>

                    </div>
                </div>

        }
        </Translation>
        <div className='step2brdr'>
            <Button variant="outline-primary" className='leftBtn' onClick={toThirdStep}><Trans>think</Trans></Button>
            <Button variant="primary" onClick={Submit}>Submit</Button>
        </div>

    </div>;

}

