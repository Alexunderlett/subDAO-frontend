import React, { useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Button, Form, FormControl, FormLabel, InputGroup, Modal} from "react-bootstrap";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";

import Loading from "../loading/Loading";
import sender from "../../images/send.png";
import {useTranslation} from "react-i18next";

 const Withdraw = forwardRef((props,ref) =>{
    const {state} = useSubstrate();
    const {vaultcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');


    const [selected, setSelected] = useState(null);
    const [address, setaddress] = useState('');
    const [amount, setamount] = useState('');

    const [list, setList] = useState([]);

     let { t } = useTranslation();

    useEffect( () => {
        const settokenlist = async () => {
            await api.vault.getTokenList(vaultcontract).then(data => {
                if (!data) return;
                setList(data)
            });
        };
        settokenlist();
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target;
        let str = `set${name}`
        eval(str)(value)
    }
    const handleConfirm= async()=>{

        let obj = {
            address,amount,selected
        }
        setLoading(true);
        setTips(t('Createwithdraw'));
        await api.vault.withdraw(vaultcontract,obj,(result)=> {
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
         amountToNull:()=>{
             setamount('')
             setaddress('')
         }
     }));

    let {handleClose, showTips} = props;
        return (
            <div>
                <Loading showLoading={loading} setLoading={()=>{setLoading(false)}} tips={tips}/>
                <Modal  show={showTips} onHide={handleClose} className='newVoteBrdr'>
                    <Modal.Header closeButton>
                        <Modal.Title><img src={sender} alt=""/><span>{t('withdraw')}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <section>
                            <ul className="withdraw">
                                <li>
                                    <FormLabel>{t('SelectOption')}</FormLabel>
                                    <div className="inputBrdr">
                                    <Form.Control as="select" name='selected' onChange={handleSelect}>
                                        <option key='noselect'>{t('SelectOption')}</option>
                                        {
                                            list.map(i => (
                                                <option value={i} key={i}>{i}</option>
                                            ))
                                        }
                                    </Form.Control>
                                    </div>
                                </li>
                                <li>
                                    <InputGroup className="mb-3">
                                        <FormLabel>{t('fillAddress')}</FormLabel>
                                        <div className="inputBrdr">
                                        <FormControl
                                            placeholder={t('fillAddress')}
                                            value={address}
                                            name='address'
                                            onChange={handleChange}
                                        />
                                        </div>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <FormLabel>{t('fillAmount')}</FormLabel>
                                        <div className="inputBrdr">
                                        <FormControl
                                            placeholder={t('fillAmount')}
                                            value={amount}
                                            name='amount'
                                            onChange={handleChange}
                                        />
                                        </div>
                                    </InputGroup>
                                </li>
                                <li className='NextBrdr'>

                                    <Button variant="outline-primary" onClick={()=>handleConfirm()}>{t('Request')}</Button>
                                </li>
                            </ul>

            </section>
                    </Modal.Body>
                </Modal>
            </div>
        )

})
export default Withdraw;
