import React, {useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Button, Form, InputGroup, FormControl, Modal, FormLabel} from "react-bootstrap";
import api from "../api";
import {useSubstrate} from "../api/contracts";

import Loading from "./loading/Loading";
import sender from "./../images/send.png";
import {useTranslation} from "react-i18next";

 const Transfer = forwardRef((props, ref) =>{
    const {state} = useSubstrate();
    const {orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [address, setAddress] = useState('');

     const [errorShow,seterrorShow]= useState(false);
     const [errorTips,seterrorTips]= useState('');
     let { t } = useTranslation();

    const handleChange = (e) => {
        const {value} = e.target;
        setAddress(value)
    }
    const handleConfirm= async()=>{
        console.log(address)
        setLoading(true);
        setTips(t('transferOrg'));

        const setdeposittrs =async () => {
            await api.org.transferOwnership(orgcontract, address, (result) => {
                if (result) {
                    setLoading(false);
                    props.handleClose()
                    window.location.reload()
                }
            }).catch((error) => {
                seterrorShow(true)
                seterrorTips(`Transfer Ownership: ${error.message}`)
                setLoading(false);
            });

        };
        setdeposittrs();

    }


     useImperativeHandle(ref, () => ({
         resultToVault: () => {
            return {
                address
            }
         },
         amountToNull:()=>{
             setAddress('')
         }
     }));

    let {handleClose, showTips} = props;
    return (
        <div>
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
                                        value={address}
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
