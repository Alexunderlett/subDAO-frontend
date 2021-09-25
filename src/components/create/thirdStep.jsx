import React, { useEffect, useState} from 'react';
import {Button, Form, FormControl, InputGroup,Tabs,Tab} from "react-bootstrap";
import remove from '../../images/shutdown.png';
import add from '../../images/Add.png';
import Loading from "../loading/Loading";
import {Trans, Translation, useTranslation} from 'react-i18next';

export default function ThirdStep(props){

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');
    const [admin,setAdmin]= useState(true);
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


    let { t } = useTranslation();


   const toForthStep = () => {
       props.handlerSet(4)
       let obj = {
           admin,
           adminlist
       }
       sessionStorage.setItem('thirdStep', JSON.stringify(obj))
    }

    const toSecondStep = () => {
       props.handlerSet(2)
    }

    const addAdmin = () => {
        let newArray = [...adminlist];
        newArray.push({
            name: '',
            address: ''

        });
        setadminlist(newArray)
    }
   const setAdminInput = (e, index) => {
       let newArray = [...adminlist];
        const {name, value} = e.target;
       newArray[index][name] = value;
       setadminlist(newArray)
    }
   const removeAdmin = (selectItem, index) =>{
       let newArray = [...adminlist];
       newArray.splice(index, 1);
       setadminlist(newArray)
    }


   const handleCheck = (e) => {
        const {value} = e.target;
       setAdmin(!JSON.parse(value));
    }

    useEffect( () => {
        let form = JSON.parse(sessionStorage.getItem('thirdStep'));
        if(form){
            setAdmin(form.admin);
            setadminlist(form.adminlist);
        }

    }, []);

        return <div>
            <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips}/>
            <Translation>{t =>
                <div  title={t('Moderators')}>
                    <div className='steptitle'>
                        <Form.Group controlId="formBasicCheckbox">

                            <Form.Check
                                type="checkbox"
                                label={t('DAOAdmin')}
                                value={admin}
                                checked={admin}
                                name='admin'
                                onChange={handleCheck}
                            />
                        </Form.Group>
                    </div>
                    <div>
                        { admin && adminlist.map((i, index) => (

                            <div key={index} className='norow'>
                                <div className="row">
                                    <div className="col-4">
                                        <InputGroup className="mb-3">
                                            <div className='inputBrdr'>
                                            <FormControl
                                                placeholder={t('FilltheName')}
                                                value={adminlist[index].name}
                                                name='name'
                                                autoComplete="off"
                                                onChange={(event) => setAdminInput(event, index)}
                                            />
                                            </div>
                                        </InputGroup>
                                    </div>
                                    <div className="col-8 flexBrdr">
                                        <InputGroup className="mb-3">
                                            <div className='inputBrdr'>
                                            <FormControl
                                                placeholder={t('FillAddress')}
                                                value={adminlist[index].address}
                                                name='address'
                                                autoComplete="off"
                                                onChange={(event) => setAdminInput(event, index)}
                                            />
                                            </div>
                                        </InputGroup>
                                        {
                                            !!index &&
                                            <img src={remove} onClick={()=>removeAdmin( i, index)} className="removerht" alt=''/>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                        <div>
                            <button className="addToken" onClick={addAdmin}><img src={add} className="addRht"  alt=''/>{t('AddAdmin')}</button>
                        </div>
                    </div>
                </div>
                }
            </Translation>
                <div className='step2brdr'>
                    <Button variant="outline-primary" className='leftBtn' onClick={toSecondStep}><Trans>think</Trans></Button>
                    <Button variant="primary" onClick={toForthStep}><Trans>Next</Trans></Button>
                </div>

            </div>;

}

