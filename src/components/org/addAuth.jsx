import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormLabel, Modal} from "react-bootstrap";
import api from "../../api";
import {useSubstrate} from "../../api/contracts";
import Loading from "../loading/Loading";
import auth from '../../images/Vector.png';
import authWhite from '../../images/auth.png';
import {useTranslation} from "react-i18next";

export default function AddAuth(props){

    const {state} = useSubstrate();
    const {orgcontract} = state;

    const [loading,setLoading]= useState(false);
    const [tips,setTips]= useState('');

    const [name,setname]= useState('');
    const [address,setaddress]= useState('');

    const [addModerator, setaddModerator] = useState(false);
    const [optionlist, setoptionlist] = useState([
        {
            name:'create a DAO'
        }
        ,{
            name:'create a DAO'
        }
        ,{
            name:'Vote'
        },{
            name:'Add member'
        },{
            name:'create a DAO'
        }
        ,{
            name:'Vote'
        },{
            name:'Add member'
        }
        ]);
    const [active, setActive] = useState(null);

    let { t } = useTranslation();

    useEffect(() => {
        if(addModerator){
            setLoading(false);
        }
    }, [addModerator]);

    const submitModerators = async (obj) =>{
        setLoading(true);
        setTips(t('AddModerator'));
        await api.org.addDaoModerator(orgcontract,obj,function (result) {
            setaddModerator(result)
            props.handleClose()
        });
    }

    const handleSubmit = () => {
        const obj= {
            address,
            name
        };
        submitModerators(obj)
    }
    const handleActive = (e) =>{
        let index = e.currentTarget.id.split("_")[1];
        setActive(index)
    }
    let {handleClose, showTips} = props;
    return <div>
        <Loading showLoading={loading} tips={tips}/>

        <Modal  show={showTips} onHide={handleClose} centered={true} className='authBrdr'>
            <Modal.Header closeButton>
                <Modal.Title><img src={authWhite} alt=""/><span >Update Authority</span></Modal.Title>
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
                                                           value={index}
                                                    />
                                                    <label htmlFor={`radio_${index}`}>{i.name}</label>

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
                                <Button variant="primary" >Confirm</Button>
                            </div>
                        </li>
                    </ul>





                </section>
            </Modal.Body>
        </Modal>


    </div>;

}
