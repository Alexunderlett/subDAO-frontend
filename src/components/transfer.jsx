import React, {useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Button, Form, InputGroup, FormControl, Modal, FormLabel} from "react-bootstrap";
import api from "../api";
import {useSubstrate} from "../api/contracts";

import Loading from "./loading/Loading";
import sender from "./../images/send.png";
import {useTranslation} from "react-i18next";

 const Transfer = forwardRef((props, ref) =>{
    const {state} = useSubstrate();
    const {vaultcontract,erc20contract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [selected, setSelected] = useState(null);
    const [amount, setAmount] = useState('');
    const [deposit, setdeposit] = useState(false);


     let { t } = useTranslation();

    useEffect( () => {

        if(!deposit)return;
        let obj = {
            amount,selected
        }

        const setdeposittrs =async () => {
            await api.vault.deposit(vaultcontract, obj, (result) => {
                if (result) {
                    setLoading(false);
                    props.handleClose()
                    props.setShow()
                    setdeposit(false)
                }
            });

        };
        setdeposittrs();

    }, [deposit]);

    const handleChange = (e) => {
        const {value} = e.target;
        setAmount(value)
    }
    const handleConfirm= async()=>{
        setLoading(true);
        setTips(t('Createdeposit'));
        await api.erc20.approveOp(erc20contract, vaultcontract.address.toHuman(), amount,(result)=> {
            setdeposit(true)
        })

    }
    const handleSelect = (e) => {
        setSelected(e.target.value)
    }


     useImperativeHandle(ref, () => ({
         resultToVault: () => {
            return {
                selected,
                amount
            }
         },
         amountToNull:()=>{
             setAmount('')
         }
     }));

    let {handleClose, showTips} = props;
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>

            <Modal  show={showTips} onHide={handleClose} className='newVoteBrdr'>
                <Modal.Header closeButton>
                    <Modal.Title><img src={sender} alt=""/><span>{t('transferBtn')}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section>
                        <ul className="withdraw">

                            <li>

                                <InputGroup className="mb-3">
                                    <FormLabel>{t('fillAddress')}</FormLabel>
                                    <div className="inputBrdr">
                                    <FormControl
                                        placeholder={t('fillAddress')}
                                        value={amount}
                                        name='address'
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
export default Transfer
