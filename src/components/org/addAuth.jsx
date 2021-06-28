import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormLabel, Modal} from "react-bootstrap";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";
import authWhite from '../../images/auth.png';
import {useTranslation} from "react-i18next";

export default function AddAuth(props){

    const {state,dispatch} = useSubstrate();
    const {authcontract,allAccounts,apiState} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [active, setActive] = useState(null);
    const [optionlist, setoptionlist] = useState([]);

    let { t } = useTranslation();

    useEffect(() => {
        let arr = props.authlist
        arr.map(i=>{
            i.checked = false;
        })
        setoptionlist(arr)
    }, [props.authlist]);

    const handleActive = (e) =>{
        let index = e.currentTarget.id.split("_")[1];
        setActive(index)
    }
    const isChecked = (e, obj) =>{
        let currentbool = e.target.checked;
        let arr = optionlist
        arr.map(item => {
            if (item.action_id === obj.action_id) {
                item.checked = currentbool;
            }
            return item;
        });
        setoptionlist(arr)
    }

    const confirmAuth = async () =>{
        setLoading(true);
        setTips(t('triggering'));
        let arr = authlist.filter(i=>i.checked === true);
        for (let item of arr) {
            let obj={
                contract_name: arr[0].contract_name,
                function_name: arr[0].function_name
            }
            console.error("====arr",arr,obj)
            await api.auth.grantPermission(authcontract,obj,(data) => {
               console.log(data)
            });
        }
        setLoading(false);
        props.handleClose();
    }

    let {handleClose, showTips,authlist} = props;
    return <div>
        <Loading showLoading={loading} tips={tips}/>

        <Modal  show={showTips} onHide={handleClose} centered={true} className='authBrdr'>
            <Modal.Header closeButton>
                <Modal.Title><img src={authWhite} alt=""/><span >{t('UpdateAuthority')}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section>
                    <ul className='orgSelect'>
                        <li className="row">
                            {optionlist.map((i, index) => (

                                <div key={index} className='col-3'>
                                    <div>
                                        <div className={parseInt(active) === index?'radioOption radioActive':'radioOption'} id={`active_${index}`} onClick={handleActive}>
                                            <div className="form-group">
                                                <div className="form-check"  >
                                                    <input name="radiobutton"
                                                           type="checkbox"
                                                           id={`radio_${index}`}
                                                           className="form-check-inputRadio"
                                                           value={i.action_id}
                                                           onChange={e => isChecked(e, i)}
                                                    />
                                                    <label htmlFor={`radio_${index}`}>{i.action_title}</label>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                            }
                        </li>
                        <li className='btmBtn'>
                            <div className='NextBrdr100'>
                                <Button variant="primary" onClick={confirmAuth}>{t('Confirm')}</Button>
                            </div>
                        </li>
                    </ul>
                </section>
            </Modal.Body>
        </Modal>
    </div>;

}
