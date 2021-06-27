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


    // const [optionlist, setoptionlist] = useState([
    //     {
    //         name:'create a DAO'
    //     }
    //     ,{
    //         name:'create a DAO'
    //     }
    //     ,{
    //         name:'Vote'
    //     },{
    //         name:'Add member'
    //     },{
    //         name:'create a DAO'
    //     }
    //     ,{
    //         name:'Vote'
    //     },{
    //         name:'Add member'
    //     }
    //     ]);
    const [active, setActive] = useState(null);

    let { t } = useTranslation();

    const handleActive = (e) =>{
        let index = e.currentTarget.id.split("_")[1];
        setActive(index)
    }
    const isChecked = (e, obj) =>{
        let currentbool = e.target.checked;

        // // let listobj =  eval(listname);
        //
        // listobj.map(item => {
        //     if (item.id === obj.id) {
        //         item.checked = currentbool;
        //     }
        //     return item;
        // });
        //
        // // setChecklist([...listobj])
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
                            {authlist.map((i, index) => (

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
                                <Button variant="primary" >{t('Confirm')}</Button>
                            </div>
                        </li>
                    </ul>
                </section>
            </Modal.Body>
        </Modal>
    </div>;

}
